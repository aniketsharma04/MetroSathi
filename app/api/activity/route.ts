import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/activity - Fetch recent trips from user's connections (last 7 days)
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get all accepted connection user IDs
  const { data: connections, error: connError } = await supabase
    .from("connections")
    .select("requester_id, recipient_id")
    .eq("status", "accepted")
    .or(`requester_id.eq.${user.id},recipient_id.eq.${user.id}`);

  if (connError) {
    return NextResponse.json({ error: connError.message }, { status: 500 });
  }

  const friendIds = (connections ?? []).map((c) =>
    c.requester_id === user.id ? c.recipient_id : c.requester_id
  );

  if (friendIds.length === 0) {
    return NextResponse.json({ items: [] });
  }

  // Fetch trips created in last 7 days by connected users
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { data: trips, error: tripsError } = await supabase
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
    .limit(20);

  if (tripsError) {
    return NextResponse.json({ error: tripsError.message }, { status: 500 });
  }

  return NextResponse.json({ items: trips ?? [] });
}
