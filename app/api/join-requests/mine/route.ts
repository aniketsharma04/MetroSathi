import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/join-requests/mine?trip_ids=id1,id2 - Get current user's request statuses for given trips
export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const tripIdsParam = searchParams.get("trip_ids");

  if (!tripIdsParam) {
    return NextResponse.json(
      { error: "trip_ids is required" },
      { status: 400 }
    );
  }

  const tripIds = tripIdsParam.split(",").filter(Boolean);

  if (tripIds.length === 0) {
    return NextResponse.json({});
  }

  const { data, error } = await supabase
    .from("trip_join_requests")
    .select("trip_id, status")
    .eq("requester_id", user.id)
    .in("trip_id", tripIds);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Build a map of trip_id -> status
  const result: Record<string, string> = {};
  for (const row of data ?? []) {
    result[row.trip_id] = row.status;
  }

  return NextResponse.json(result);
}
