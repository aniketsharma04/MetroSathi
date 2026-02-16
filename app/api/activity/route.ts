import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/activity - Fetch recent trips + messages from user's connections
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get all accepted connections with IDs
  const { data: connections, error: connError } = await supabase
    .from("connections")
    .select("id, requester_id, recipient_id")
    .eq("status", "accepted")
    .or(`requester_id.eq.${user.id},recipient_id.eq.${user.id}`);

  if (connError) {
    return NextResponse.json({ error: connError.message }, { status: 500 });
  }

  const friendIds = (connections ?? []).map((c) =>
    c.requester_id === user.id ? c.recipient_id : c.requester_id
  );

  if (friendIds.length === 0) {
    return NextResponse.json({ items: [], messages: [] });
  }

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const connectionIds = (connections ?? []).map((c) => c.id);

  // Fetch trips and recent messages in parallel
  const [tripsResult, messagesResult] = await Promise.all([
    // Trips created in last 7 days by connected users
    supabase
      .from("trips")
      .select(
        `
        *,
        user:profiles!trips_user_id_fkey (
          id, name, profile_pic_url
        )
      `
      )
      .in("user_id", friendIds)
      .gte("created_at", sevenDaysAgo.toISOString())
      .order("created_at", { ascending: false })
      .limit(20),

    // Recent messages from connections (not sent by current user)
    connectionIds.length > 0
      ? supabase
          .from("messages")
          .select(
            `
            id, connection_id, sender_id, content, created_at
          `
          )
          .in("connection_id", connectionIds)
          .neq("sender_id", user.id)
          .gte("created_at", sevenDaysAgo.toISOString())
          .order("created_at", { ascending: false })
          .limit(20)
      : Promise.resolve({ data: [], error: null }),
  ]);

  if (tripsResult.error) {
    return NextResponse.json({ error: tripsResult.error.message }, { status: 500 });
  }

  // Build a map of friend profiles for messages
  const friendProfileMap: Record<string, { id: string; name: string; profile_pic_url: string | null }> = {};
  for (const trip of tripsResult.data ?? []) {
    if (trip.user) {
      friendProfileMap[trip.user.id] = trip.user;
    }
  }

  // If we have messages from users not in trips, fetch their profiles
  const messagesSenderIds = [
    ...new Set((messagesResult.data ?? []).map((m) => m.sender_id)),
  ].filter((id) => !friendProfileMap[id]);

  if (messagesSenderIds.length > 0) {
    const { data: extraProfiles } = await supabase
      .from("profiles")
      .select("id, name, profile_pic_url")
      .in("id", messagesSenderIds);

    for (const p of extraProfiles ?? []) {
      friendProfileMap[p.id] = p;
    }
  }

  // Deduplicate messages: only show the latest message per sender
  type MessageRow = { id: string; connection_id: string; sender_id: string; content: string; created_at: string };
  const latestPerSender: Record<string, MessageRow> = {};
  for (const msg of (messagesResult.data ?? []) as MessageRow[]) {
    if (!latestPerSender[msg.sender_id] || new Date(msg.created_at) > new Date(latestPerSender[msg.sender_id].created_at)) {
      latestPerSender[msg.sender_id] = msg;
    }
  }

  const messageItems = Object.values(latestPerSender).map((msg) => ({
    ...msg,
    user: friendProfileMap[msg.sender_id] ?? { id: msg.sender_id, name: "Unknown", profile_pic_url: null },
  }));

  // Fetch pending join requests for the user's trips
  const { data: userTrips } = await supabase
    .from("trips")
    .select("id, start_station, end_station")
    .eq("user_id", user.id);

  let joinRequestItems: Array<{
    id: string;
    trip_id: string;
    requester_id: string;
    status: string;
    created_at: string;
    requester: { id: string; name: string; profile_pic_url: string | null };
    trip: { start_station: string; end_station: string };
  }> = [];

  if (userTrips && userTrips.length > 0) {
    const tripIds = userTrips.map((t) => t.id);
    const { data: joinReqs } = await supabase
      .from("trip_join_requests")
      .select(
        `
        id, trip_id, requester_id, status, created_at,
        requester:profiles!trip_join_requests_requester_id_fkey (
          id, name, profile_pic_url
        )
      `
      )
      .in("trip_id", tripIds)
      .eq("status", "pending")
      .order("created_at", { ascending: false })
      .limit(20);

    if (joinReqs) {
      const tripMap: Record<string, { start_station: string; end_station: string }> = {};
      for (const t of userTrips) {
        tripMap[t.id] = { start_station: t.start_station, end_station: t.end_station };
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      joinRequestItems = (joinReqs as any[]).map((jr) => ({
        id: jr.id,
        trip_id: jr.trip_id,
        requester_id: jr.requester_id,
        status: jr.status,
        created_at: jr.created_at,
        requester: Array.isArray(jr.requester) ? jr.requester[0] : jr.requester,
        trip: tripMap[jr.trip_id] ?? { start_station: "Unknown", end_station: "Unknown" },
      }));
    }
  }

  return NextResponse.json({
    items: tripsResult.data ?? [],
    messages: messageItems,
    joinRequests: joinRequestItems,
  });
}
