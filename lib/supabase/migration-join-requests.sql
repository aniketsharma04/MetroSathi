-- Migration: Add trip_join_requests table
-- Run this in Supabase SQL Editor

create table public.trip_join_requests (
  id uuid default uuid_generate_v4() primary key,
  trip_id uuid references public.trips(id) on delete cascade not null,
  requester_id uuid references public.profiles(id) on delete cascade not null,
  status text default 'pending' check (status in ('pending', 'accepted', 'rejected')),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(trip_id, requester_id)
);

-- Indexes
create index idx_join_requests_trip on public.trip_join_requests(trip_id);
create index idx_join_requests_requester on public.trip_join_requests(requester_id);
create index idx_join_requests_status on public.trip_join_requests(status);

-- RLS
alter table public.trip_join_requests enable row level security;

-- Users can view their own requests OR requests on trips they own
create policy "Users can view own or owned trip join requests"
  on public.trip_join_requests for select
  using (
    auth.uid() = requester_id
    or exists (
      select 1 from public.trips
      where trips.id = trip_join_requests.trip_id
      and trips.user_id = auth.uid()
    )
  );

-- Only non-owners can insert requests
create policy "Non-owners can request to join trips"
  on public.trip_join_requests for insert
  with check (
    auth.uid() = requester_id
    and not exists (
      select 1 from public.trips
      where trips.id = trip_join_requests.trip_id
      and trips.user_id = auth.uid()
    )
  );

-- Only trip owners can update (accept/reject)
create policy "Trip owners can update join requests"
  on public.trip_join_requests for update
  using (
    exists (
      select 1 from public.trips
      where trips.id = trip_join_requests.trip_id
      and trips.user_id = auth.uid()
    )
  );

-- Either party can delete
create policy "Either party can delete join requests"
  on public.trip_join_requests for delete
  using (
    auth.uid() = requester_id
    or exists (
      select 1 from public.trips
      where trips.id = trip_join_requests.trip_id
      and trips.user_id = auth.uid()
    )
  );

-- Auto-update updated_at
create trigger set_join_requests_updated_at
  before update on public.trip_join_requests
  for each row execute procedure public.handle_updated_at();
