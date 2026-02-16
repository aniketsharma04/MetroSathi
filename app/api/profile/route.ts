import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/profile - Get current user's profile
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  console.log("[API /api/profile GET] user:", user?.id ?? "NULL", "| authError:", authError?.message ?? "none");

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  console.log("[API /api/profile GET] query result:", data ? "found" : "null", "| error:", error?.message ?? "none", "| code:", error?.code ?? "none");

  if (error) {
    return NextResponse.json({ error: error.message, code: error.code }, { status: 500 });
  }

  return NextResponse.json(data);
}

// PATCH /api/profile - Update current user's profile
export async function PATCH(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, age, gender, bio, instagram_handle, twitter_handle, phone, phone_visible, profile_pic_url, user_id } = body;

  // Validation
  if (name !== undefined) {
    if (typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters" },
        { status: 400 }
      );
    }
  }

  if (age !== undefined) {
    const ageNum = Number(age);
    if (isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
      return NextResponse.json(
        { error: "Age must be between 18 and 100" },
        { status: 400 }
      );
    }
  }

  if (gender !== undefined) {
    if (!["Male", "Female", "Other"].includes(gender)) {
      return NextResponse.json(
        { error: "Invalid gender value" },
        { status: 400 }
      );
    }
  }

  if (user_id !== undefined && user_id !== null) {
    const cleanId = user_id.trim().toLowerCase();
    if (cleanId.length < 3) {
      return NextResponse.json(
        { error: "User ID must be at least 3 characters" },
        { status: 400 }
      );
    }
    if (cleanId.length > 30) {
      return NextResponse.json(
        { error: "User ID must be at most 30 characters" },
        { status: 400 }
      );
    }
    if (!/^[a-z0-9_]+$/.test(cleanId)) {
      return NextResponse.json(
        { error: "User ID can only contain lowercase letters, numbers, and underscores" },
        { status: 400 }
      );
    }
    // Check uniqueness
    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", cleanId)
      .neq("id", user.id)
      .maybeSingle();
    if (existing) {
      return NextResponse.json(
        { error: "This User ID is already taken" },
        { status: 409 }
      );
    }
  }

  const updateData: Record<string, unknown> = {};
  if (name !== undefined) updateData.name = name.trim();
  if (user_id !== undefined) updateData.user_id = user_id?.trim().toLowerCase() || null;
  if (age !== undefined) updateData.age = Number(age);
  if (gender !== undefined) updateData.gender = gender;
  if (bio !== undefined) updateData.bio = bio?.trim() || null;
  if (instagram_handle !== undefined) updateData.instagram_handle = instagram_handle?.trim() || null;
  if (twitter_handle !== undefined) updateData.twitter_handle = twitter_handle?.trim() || null;
  if (phone !== undefined) updateData.phone = phone?.trim() || null;
  if (phone_visible !== undefined) updateData.phone_visible = phone_visible;
  if (profile_pic_url !== undefined) updateData.profile_pic_url = profile_pic_url;

  const { data, error } = await supabase
    .from("profiles")
    .update(updateData)
    .eq("id", user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
