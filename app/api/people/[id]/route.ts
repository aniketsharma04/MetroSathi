import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/people/[id] - Fetch a single user profile
export async function GET(
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

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, name, age, gender, profile_pic_url, bio, instagram_handle, twitter_handle")
    .eq("id", id)
    .single();

  if (error || !profile) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(profile);
}
