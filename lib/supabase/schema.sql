-- Metro Connect Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ============================================
-- USERS TABLE (extends Supabase auth.users)
-- ============================================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  name text not null,
  user_id text unique,
  age integer check (age >= 18 and age <= 100),
  gender text check (gender in ('Male', 'Female', 'Other')),
  profile_pic_url text,
  bio text check (char_length(bio) <= 100),
  instagram_handle text,
  twitter_handle text,
  phone text,
  phone_visible boolean default false,
  onboarding_completed boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- TRIPS TABLE
-- ============================================
create table public.trips (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  start_station text not null,
  end_station text not null,
  travel_date date not null,
  travel_time time not null,
  is_repeating boolean default false,
  repeat_days integer[] default '{}',
  created_at timestamptz default now()
);

-- ============================================
-- CONNECTIONS TABLE
-- ============================================
create table public.connections (
  id uuid default uuid_generate_v4() primary key,
  requester_id uuid references public.profiles(id) on delete cascade not null,
  recipient_id uuid references public.profiles(id) on delete cascade not null,
  status text default 'pending' check (status in ('pending', 'accepted', 'declined')),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(requester_id, recipient_id)
);

-- ============================================
-- MESSAGES TABLE
-- ============================================
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  connection_id uuid references public.connections(id) on delete cascade not null,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  content text not null check (char_length(content) <= 500),
  created_at timestamptz default now()
);

-- ============================================
-- REPORTS TABLE
-- ============================================
create table public.reports (
  id uuid default uuid_generate_v4() primary key,
  reporter_id uuid references public.profiles(id) on delete cascade not null,
  reported_user_id uuid references public.profiles(id) on delete cascade not null,
  reason text not null check (reason in ('fake_profile', 'harassment', 'inappropriate', 'spam', 'safety', 'other')),
  description text check (char_length(description) <= 500),
  status text default 'pending' check (status in ('pending', 'reviewed')),
  created_at timestamptz default now()
);

-- ============================================
-- INDEXES
-- ============================================
create index idx_trips_user_id on public.trips(user_id);
create index idx_trips_date_time on public.trips(travel_date, travel_time);
create index idx_trips_stations on public.trips(start_station, end_station);
create index idx_connections_requester on public.connections(requester_id);
create index idx_connections_recipient on public.connections(recipient_id);
create index idx_connections_status on public.connections(status);
create index idx_messages_connection on public.messages(connection_id);
create index idx_messages_created on public.messages(created_at);
create index idx_reports_status on public.reports(status);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Profiles: users can read all profiles, but only edit their own
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Trips: users can read all trips, but only manage their own
alter table public.trips enable row level security;

create policy "Trips are viewable by everyone"
  on public.trips for select
  using (true);

create policy "Users can create own trips"
  on public.trips for insert
  with check (auth.uid() = user_id);

create policy "Users can update own trips"
  on public.trips for update
  using (auth.uid() = user_id);

create policy "Users can delete own trips"
  on public.trips for delete
  using (auth.uid() = user_id);

-- Connections: users can see their own connections
alter table public.connections enable row level security;

create policy "Users can view own connections"
  on public.connections for select
  using (auth.uid() = requester_id or auth.uid() = recipient_id);

create policy "Users can send connection requests"
  on public.connections for insert
  with check (auth.uid() = requester_id);

create policy "Users can update connections they received"
  on public.connections for update
  using (auth.uid() = recipient_id);

-- Messages: users can see messages in their connections
alter table public.messages enable row level security;

create policy "Users can view messages in their connections"
  on public.messages for select
  using (
    exists (
      select 1 from public.connections
      where connections.id = messages.connection_id
      and (connections.requester_id = auth.uid() or connections.recipient_id = auth.uid())
      and connections.status = 'accepted'
    )
  );

create policy "Users can send messages in accepted connections"
  on public.messages for insert
  with check (
    auth.uid() = sender_id
    and exists (
      select 1 from public.connections
      where connections.id = connection_id
      and (connections.requester_id = auth.uid() or connections.recipient_id = auth.uid())
      and connections.status = 'accepted'
    )
  );

-- Reports: users can create reports and view their own
alter table public.reports enable row level security;

create policy "Users can create reports"
  on public.reports for insert
  with check (auth.uid() = reporter_id);

create policy "Users can view own reports"
  on public.reports for select
  using (auth.uid() = reporter_id);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
declare
  base_name text;
  generated_id text;
  suffix int;
begin
  base_name := lower(regexp_replace(
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    '[^a-zA-Z0-9]', '', 'g'
  ));
  generated_id := base_name;
  suffix := 0;

  -- Ensure uniqueness by appending a number if needed
  while exists (select 1 from public.profiles where profiles.user_id = generated_id) loop
    suffix := suffix + 1;
    generated_id := base_name || suffix::text;
  end loop;

  insert into public.profiles (id, email, name, user_id)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    generated_id
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Auto-update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger set_connections_updated_at
  before update on public.connections
  for each row execute procedure public.handle_updated_at();

-- ============================================
-- REALTIME (for chat)
-- ============================================
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.connections;

-- ============================================
-- STORAGE (for profile pictures)
-- ============================================
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true);

create policy "Avatar images are publicly accessible"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "Users can upload their own avatar"
  on storage.objects for insert
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can update their own avatar"
  on storage.objects for update
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can delete their own avatar"
  on storage.objects for delete
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
