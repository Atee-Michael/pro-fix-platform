create extension if not exists pgcrypto;

create type public.profile_role as enum (
  'customer',
  'staff',
  'admin'
);

create type public.appointment_status as enum (
  'pending',
  'confirmed',
  'in_progress',
  'completed',
  'cancelled',
  'no_show'
);

create type public.support_ticket_status as enum (
  'open',
  'in_progress',
  'waiting_on_customer',
  'resolved',
  'closed'
);

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role public.profile_role not null default 'customer',
  name text,
  email text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.vehicles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  make text not null,
  model text not null,
  year integer check (year between 1886 and 9999),
  vin text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  vehicle_id uuid not null references public.vehicles (id) on delete restrict,
  service_type text not null,
  appointment_date timestamptz not null,
  status public.appointment_status not null default 'pending',
  notes text,
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.repair_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  vehicle_id uuid not null references public.vehicles (id) on delete cascade,
  appointment_id uuid references public.appointments (id) on delete set null,
  diagnostics text,
  repairs text,
  technician_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  vehicle_id uuid not null references public.vehicles (id) on delete cascade,
  appointment_id uuid references public.appointments (id) on delete set null,
  file_url text not null,
  summary text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.receipts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  appointment_id uuid not null references public.appointments (id) on delete restrict,
  amount numeric(12, 2) not null check (amount >= 0),
  currency text not null default 'GBP',
  status text not null,
  receipt_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  subject text not null,
  message text not null,
  status public.support_ticket_status not null default 'open',
  priority text not null default 'normal',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.support_messages (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references public.support_tickets (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  message text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references public.profiles (id) on delete set null,
  title text not null,
  slug text not null,
  language text not null default 'en',
  content text not null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (slug, language)
);

create table public.admin_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles (id) on delete set null,
  action text not null,
  entity_type text,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index vehicles_user_id_idx on public.vehicles (user_id);
create index appointments_user_id_idx on public.appointments (user_id);
create index appointments_vehicle_id_idx on public.appointments (vehicle_id);
create index repair_history_user_id_idx on public.repair_history (user_id);
create index repair_history_vehicle_id_idx on public.repair_history (vehicle_id);
create index repair_history_appointment_id_idx on public.repair_history (appointment_id);
create index reports_user_id_idx on public.reports (user_id);
create index reports_vehicle_id_idx on public.reports (vehicle_id);
create index reports_appointment_id_idx on public.reports (appointment_id);
create index receipts_user_id_idx on public.receipts (user_id);
create index receipts_appointment_id_idx on public.receipts (appointment_id);
create index support_tickets_user_id_idx on public.support_tickets (user_id);
create index support_tickets_status_idx on public.support_tickets (status);
create index support_messages_ticket_id_idx on public.support_messages (ticket_id);
create index support_messages_user_id_idx on public.support_messages (user_id);
create index articles_author_id_idx on public.articles (author_id);
create index admin_logs_actor_id_idx on public.admin_logs (actor_id);

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger vehicles_set_updated_at
before update on public.vehicles
for each row execute function public.set_updated_at();

create trigger appointments_set_updated_at
before update on public.appointments
for each row execute function public.set_updated_at();

create trigger repair_history_set_updated_at
before update on public.repair_history
for each row execute function public.set_updated_at();

create trigger reports_set_updated_at
before update on public.reports
for each row execute function public.set_updated_at();

create trigger receipts_set_updated_at
before update on public.receipts
for each row execute function public.set_updated_at();

create trigger support_tickets_set_updated_at
before update on public.support_tickets
for each row execute function public.set_updated_at();

create trigger support_messages_set_updated_at
before update on public.support_messages
for each row execute function public.set_updated_at();

create trigger articles_set_updated_at
before update on public.articles
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.vehicles enable row level security;
alter table public.appointments enable row level security;
alter table public.repair_history enable row level security;
alter table public.reports enable row level security;
alter table public.receipts enable row level security;
alter table public.support_tickets enable row level security;
alter table public.support_messages enable row level security;
alter table public.articles enable row level security;
alter table public.admin_logs enable row level security;
