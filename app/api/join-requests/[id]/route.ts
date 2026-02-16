import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// PATCH /api/join-requests/[id] - Accept or reject a join request (trip owner only)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { status } = body;

  if (!status || !["accepted", "rejected"].includes(status)) {
    return NextResponse.json(
      { error: "Status must be 'accepted' or 'rejected'" },
      { status: 400 }
    );
  }

  // Get the join request with trip info
  const { data: joinRequest, error: fetchError } = await supabase
    .from("trip_join_requests")
    .select("*, trip:trips!trip_join_requests_trip_id_fkey (id, user_id)")
    .eq("id", id)
    .single();

  if (fetchError || !joinRequest) {
    return NextResponse.json(
      { error: "Join request not found" },
      { status: 404 }
    );
  }

  // Only trip owner can accept/reject
  if (joinRequest.trip.user_id !== user.id) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  // Must be pending
  if (joinRequest.status !== "pending") {
    return NextResponse.json(
      { error: "Request is no longer pending" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("trip_join_requests")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// DELETE /api/join-requests/[id] - Withdraw or remove a join request (either party)
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  // Get the join request with trip info
  const { data: joinRequest } = await supabase
    .from("trip_join_requests")
    .select("*, trip:trips!trip_join_requests_trip_id_fkey (id, user_id)")
    .eq("id", id)
    .single();

  if (!joinRequest) {
    return NextResponse.json(
      { error: "Join request not found" },
      { status: 404 }
    );
  }

  // Either the requester or the trip owner can delete
  if (
    joinRequest.requester_id !== user.id &&
    joinRequest.trip.user_id !== user.id
  ) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const { error } = await supabase
    .from("trip_join_requests")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
