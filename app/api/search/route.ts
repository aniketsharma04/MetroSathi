import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  getTimeDiffMinutes,
  getMatchQuality,
} from "@/lib/matching";

export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const startStation = searchParams.get("start_station");
  const endStation = searchParams.get("end_station");
  const travelDate = searchParams.get("travel_date");
  const travelTime = searchParams.get("travel_time");
  const genderFilter = searchParams.get("gender_filter") || "All";

  if (!startStation || !endStation || !travelDate || !travelTime) {
    return NextResponse.json(
      { error: "Missing required search parameters" },
      { status: 400 }
    );
  }

  // Fetch all trips on that date (or repeating trips matching day of week)
  const searchDate = new Date(travelDate + "T00:00:00");
  const dayOfWeek = searchDate.getDay(); // 0=Sun, 1=Mon, etc.

  // Get trips that match the date OR are repeating and include this day
  const { data: trips, error } = await supabase
    .from("trips")
    .select(
      `
      *,
      user:profiles!trips_user_id_fkey (
        id, name, age, gender, profile_pic_url, bio,
        instagram_handle, twitter_handle
      )
    `
    )
    .neq("user_id", user.id) // exclude current user
    .or(`travel_date.eq.${travelDate},and(is_repeating.eq.true,repeat_days.cs.{${dayOfWeek}})`);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Filter by gender only, then score and sort all results by match quality
  const results = (trips ?? [])
    .filter((trip) => {
      if (genderFilter !== "All" && trip.user?.gender !== genderFilter) {
        return false;
      }
      return true;
    })
    .map((trip) => {
      const matchQuality = getMatchQuality(
        startStation,
        endStation,
        trip.start_station,
        trip.end_station
      );
      const timeDiff = getTimeDiffMinutes(travelTime, trip.travel_time);

      // Cap Infinity distances to 100 for scoring
      const startDist = matchQuality.startDist === Infinity ? 100 : matchQuality.startDist;
      const endDist = matchQuality.endDist === Infinity ? 100 : matchQuality.endDist;

      return {
        ...trip,
        match_quality: matchQuality.label,
        start_distance: matchQuality.startDist,
        end_distance: matchQuality.endDist,
        time_diff: timeDiff,
        // Sort score: lower is better
        sort_score: startDist + endDist + timeDiff * 0.1,
      };
    })
    .sort((a, b) => a.sort_score - b.sort_score);

  return NextResponse.json(results);
}
