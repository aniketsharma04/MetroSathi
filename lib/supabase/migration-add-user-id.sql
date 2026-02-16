-- Migration: Add user_id column to profiles
-- Run this in Supabase SQL Editor

-- 1. Add the column
alter table public.profiles add column if not exists user_id text unique;

-- 2. Backfill existing profiles with a generated user_id
do $$
declare
  rec record;
  base_name text;
  generated_id text;
  suffix int;
begin
  for rec in select id, name, email from public.profiles where user_id is null loop
    base_name := lower(regexp_replace(
      coalesce(rec.name, split_part(rec.email, '@', 1)),
      '[^a-zA-Z0-9]', '', 'g'
    ));
    generated_id := base_name;
    suffix := 0;

    while exists (select 1 from public.profiles where profiles.user_id = generated_id) loop
      suffix := suffix + 1;
      generated_id := base_name || suffix::text;
    end loop;

    update public.profiles set user_id = generated_id where id = rec.id;
  end loop;
end $$;

-- 3. Update the trigger function to auto-generate user_id on signup
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
