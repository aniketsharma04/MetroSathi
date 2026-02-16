import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// POST /api/join-requests - Create a join request
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { trip_id } = body;

  if (!trip_id) {
    return NextResponse.json(
      { error: "trip_id is required" },
      { status: 400 }
    );
  }

  // Check trip exists and user is not the owner
  const { data: trip, error: tripError } = await supabase
    .from("trips")
    .select("id, user_id")
    .eq("id", trip_id)
    .single();

  if (tripError || !trip) {
    return NextResponse.json({ error: "Trip not found" }, { status: 404 });
  }

  if (trip.user_id === user.id) {
    return NextResponse.json(
      { error: "Cannot join your own trip" },
      { status: 400 }
    );
  }

  // Check for duplicate
  const { data: existing } = await supabase
    .from("trip_join_requests")
    .select("id, status")
    .eq("trip_id", trip_id)
    .eq("requester_id", user.id)
    .maybeSingle();

  if (existing) {
    return NextResponse.json(
      { error: "Join request already exists", status: existing.status },
      { status: 409 }
    );
  }

  const { data, error } = await supabase
    .from("trip_join_requests")
    .insert({
      trip_id,
      requester_id: user.id,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

// GET /api/join-requests?trip_id= - List pending requests for a trip (trip owner only)
export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const tripId = searchParams.get("trip_id");

  if (!tripId) {
    return NextResponse.json(
      { error: "trip_id is required" },
      { status: 400 }
    );
  }

  // Verify user owns this trip
  const { data: trip } = await supabase
    .from("trips")
    .select("id, user_id")
    .eq("id", tripId)
    .single();

  if (!trip || trip.user_id !== user.id) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const { data, error } = await supabase
    .from("trip_join_requests")
    .select(
      `
      *,
      requester:profiles!trip_join_requests_requester_id_fkey (
        id, name, age, gender, profile_pic_url, bio
      )
    `
    )
    .eq("trip_id", tripId)
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}
