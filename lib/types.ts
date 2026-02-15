export type Gender = "Male" | "Female" | "Other";

export type GenderFilter = Gender | "All";

export type TripType = "one-time" | "repeating";

export type ConnectionStatus = "pending" | "accepted" | "declined";

export type ReportReason =
  | "fake_profile"
  | "harassment"
  | "inappropriate"
  | "spam"
  | "safety"
  | "other";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  age: number;
  gender: Gender;
  profile_pic_url: string | null;
  bio: string | null;
  instagram_handle: string | null;
  twitter_handle: string | null;
  phone: string | null;
  phone_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface Trip {
  id: string;
  user_id: string;
  start_station: string;
  end_station: string;
  travel_date: string;
  travel_time: string;
  is_repeating: boolean;
  repeat_days: number[];
  created_at: string;
}

export interface TripWithUser extends Trip {
  user: UserProfile;
}

export interface Connection {
  id: string;
  requester_id: string;
  recipient_id: string;
  status: ConnectionStatus;
  created_at: string;
  updated_at: string;
}

export interface ConnectionWithUser extends Connection {
  requester: UserProfile;
  recipient: UserProfile;
}

export interface Message {
  id: string;
  connection_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

export interface Report {
  id: string;
  reporter_id: string;
  reported_user_id: string;
  reason: ReportReason;
  description: string | null;
  status: "pending" | "reviewed";
  created_at: string;
}

export interface SearchFilters {
  start_station: string;
  end_station: string;
  travel_date: string;
  travel_time: string;
  gender_filter: GenderFilter;
}
