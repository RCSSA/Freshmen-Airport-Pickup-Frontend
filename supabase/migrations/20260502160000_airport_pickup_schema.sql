create extension if not exists citext;

create table if not exists public.students (
  id bigint generated always as identity primary key,
  firstname text not null,
  lastname text not null,
  phone text not null,
  email citext not null unique,
  wechat text,
  airport text not null check (airport in ('IAH', 'HOU')),
  arriving_time timestamptz not null,
  flight_number text,
  status text not null default 'Not matched' check (status in ('Not matched', 'Matched')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.volunteers (
  id bigint generated always as identity primary key,
  firstname text not null,
  lastname text not null,
  phone text not null,
  email citext not null unique,
  wechat text,
  matched_count integer not null default 0 check (matched_count >= 0),
  confirmed boolean not null default false,
  notified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.matches (
  id bigint generated always as identity primary key,
  student_id bigint not null unique references public.students(id) on delete cascade,
  volunteer_id bigint references public.volunteers(id) on delete set null,
  matched_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.app_logs (
  id bigint generated always as identity primary key,
  level text not null default 'INFO',
  message text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists students_arriving_time_idx on public.students(arriving_time);
create index if not exists students_airport_idx on public.students(airport);
create index if not exists volunteers_confirmed_idx on public.volunteers(confirmed);
create index if not exists matches_volunteer_id_idx on public.matches(volunteer_id);
create index if not exists matches_student_id_idx on public.matches(student_id);

alter table public.students enable row level security;
alter table public.volunteers enable row level security;
alter table public.matches enable row level security;
alter table public.app_logs enable row level security;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists students_set_updated_at on public.students;
create trigger students_set_updated_at
before update on public.students
for each row execute function public.set_updated_at();

drop trigger if exists volunteers_set_updated_at on public.volunteers;
create trigger volunteers_set_updated_at
before update on public.volunteers
for each row execute function public.set_updated_at();

drop trigger if exists matches_set_updated_at on public.matches;
create trigger matches_set_updated_at
before update on public.matches
for each row execute function public.set_updated_at();

create or replace function public.create_match_row_for_student()
returns trigger
language plpgsql
as $$
begin
  insert into public.matches(student_id)
  values (new.id)
  on conflict (student_id) do nothing;
  return new;
end;
$$;

drop trigger if exists students_create_match_row on public.students;
create trigger students_create_match_row
after insert on public.students
for each row execute function public.create_match_row_for_student();

create or replace function public.refresh_match_derived_fields()
returns trigger
language plpgsql
as $$
begin
  if tg_op in ('INSERT', 'UPDATE') then
    update public.students
    set status = case when new.volunteer_id is null then 'Not matched' else 'Matched' end
    where id = new.student_id;
  end if;

  if tg_op in ('UPDATE', 'DELETE') and old.volunteer_id is not null then
    update public.volunteers
    set matched_count = (
      select count(*)::integer
      from public.matches
      where volunteer_id = old.volunteer_id
    )
    where id = old.volunteer_id;
  end if;

  if tg_op in ('INSERT', 'UPDATE') and new.volunteer_id is not null then
    update public.volunteers
    set matched_count = (
      select count(*)::integer
      from public.matches
      where volunteer_id = new.volunteer_id
    )
    where id = new.volunteer_id;
  end if;

  return coalesce(new, old);
end;
$$;

drop trigger if exists matches_refresh_derived_fields on public.matches;
create trigger matches_refresh_derived_fields
after insert or update or delete on public.matches
for each row execute function public.refresh_match_derived_fields();

create or replace function public.allocate_matches(
  p_date date,
  p_start_hour integer,
  p_end_hour integer,
  p_airport text,
  p_number integer,
  p_vol_email citext
)
returns table(num_allocated integer, has_reached_limit boolean, match_ids bigint[])
language plpgsql
security definer
set search_path = public
as $$
declare
  v_volunteer_id bigint;
  v_current_count integer;
  v_remaining integer;
begin
  if p_number is null or p_number <= 0 then
    return query select 0, false, array[]::bigint[];
    return;
  end if;

  select id
  into v_volunteer_id
  from public.volunteers
  where email = p_vol_email
    and confirmed is true
  for update;

  if v_volunteer_id is null then
    return query select 0, false, array[]::bigint[];
    return;
  end if;

  select count(*)::integer
  into v_current_count
  from public.matches
  where volunteer_id = v_volunteer_id;

  if v_current_count >= 10 then
    return query select 0, true, array[]::bigint[];
    return;
  end if;

  v_remaining := least(p_number, 10 - v_current_count);

  return query
  with candidates as (
    select m.id
    from public.matches m
    join public.students s on s.id = m.student_id
    where m.volunteer_id is null
      and s.airport = p_airport
      and (s.arriving_time at time zone 'America/Chicago')::date = p_date
      and extract(hour from s.arriving_time at time zone 'America/Chicago') >= p_start_hour
      and extract(hour from s.arriving_time at time zone 'America/Chicago') < p_end_hour
    order by s.arriving_time, s.id
    limit v_remaining
    for update of m skip locked
  ),
  updated as (
    update public.matches m
    set volunteer_id = v_volunteer_id,
        matched_at = now()
    from candidates c
    where m.id = c.id
    returning m.id
  )
  select count(*)::integer, false, coalesce(array_agg(id), array[]::bigint[])
  from updated;
end;
$$;
