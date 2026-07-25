create function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role = 'staff'
  );
$$;

create function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role = 'admin'
  );
$$;

revoke all on function public.is_staff() from public;
revoke all on function public.is_admin() from public;
grant execute on function public.is_staff() to authenticated;
grant execute on function public.is_admin() to authenticated;

-- Profiles
create policy "Users can read their own profile"
on public.profiles
for select
to authenticated
using (id = (select auth.uid()));

create policy "Customers can create their own profile"
on public.profiles
for insert
to authenticated
with check (
  id = (select auth.uid())
  and role = 'customer'
);

create policy "Customers can update their own profile"
on public.profiles
for update
to authenticated
using (
  id = (select auth.uid())
  and role = 'customer'
)
with check (
  id = (select auth.uid())
  and role = 'customer'
);

create policy "Admins can manage all profiles"
on public.profiles
for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

-- Vehicles
create policy "Customers can manage their own vehicles"
on public.vehicles
for all
to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

create policy "Admins can manage all vehicles"
on public.vehicles
for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

-- Appointments
create policy "Customers can manage their own appointments"
on public.appointments
for all
to authenticated
using (user_id = (select auth.uid()))
with check (
  user_id = (select auth.uid())
  and exists (
    select 1
    from public.vehicles
    where vehicles.id = appointments.vehicle_id
      and vehicles.user_id = (select auth.uid())
  )
);

create policy "Staff can manage operational appointments"
on public.appointments
for all
to authenticated
using ((select public.is_staff()))
with check ((select public.is_staff()));

create policy "Admins can manage all appointments"
on public.appointments
for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

-- Repair history
create policy "Customers can read their own repair history"
on public.repair_history
for select
to authenticated
using (user_id = (select auth.uid()));

create policy "Admins can manage all repair history"
on public.repair_history
for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

-- Reports
create policy "Customers can read their own reports"
on public.reports
for select
to authenticated
using (user_id = (select auth.uid()));

create policy "Admins can manage all reports"
on public.reports
for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

-- Receipts
create policy "Customers can read their own receipts"
on public.receipts
for select
to authenticated
using (user_id = (select auth.uid()));

create policy "Admins can manage all receipts"
on public.receipts
for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

-- Support tickets
create policy "Customers can manage their own support tickets"
on public.support_tickets
for all
to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

create policy "Staff can manage operational support tickets"
on public.support_tickets
for all
to authenticated
using ((select public.is_staff()))
with check ((select public.is_staff()));

create policy "Admins can manage all support tickets"
on public.support_tickets
for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

-- Support messages
create policy "Customers can read messages on their own tickets"
on public.support_messages
for select
to authenticated
using (
  exists (
    select 1
    from public.support_tickets
    where support_tickets.id = support_messages.ticket_id
      and support_tickets.user_id = (select auth.uid())
  )
);

create policy "Customers can create messages on their own tickets"
on public.support_messages
for insert
to authenticated
with check (
  user_id = (select auth.uid())
  and exists (
    select 1
    from public.support_tickets
    where support_tickets.id = support_messages.ticket_id
      and support_tickets.user_id = (select auth.uid())
  )
);

create policy "Customers can update their own support messages"
on public.support_messages
for update
to authenticated
using (
  user_id = (select auth.uid())
  and exists (
    select 1
    from public.support_tickets
    where support_tickets.id = support_messages.ticket_id
      and support_tickets.user_id = (select auth.uid())
  )
)
with check (
  user_id = (select auth.uid())
  and exists (
    select 1
    from public.support_tickets
    where support_tickets.id = support_messages.ticket_id
      and support_tickets.user_id = (select auth.uid())
  )
);

create policy "Customers can delete their own support messages"
on public.support_messages
for delete
to authenticated
using (
  user_id = (select auth.uid())
  and exists (
    select 1
    from public.support_tickets
    where support_tickets.id = support_messages.ticket_id
      and support_tickets.user_id = (select auth.uid())
  )
);

create policy "Staff can manage operational support messages"
on public.support_messages
for all
to authenticated
using ((select public.is_staff()))
with check ((select public.is_staff()));

create policy "Admins can manage all support messages"
on public.support_messages
for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

-- Articles
create policy "Public can read published articles"
on public.articles
for select
to anon, authenticated
using (
  published_at is not null
  and published_at <= now()
);

create policy "Admins can manage all articles"
on public.articles
for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

-- Admin logs
create policy "Admins can manage all admin logs"
on public.admin_logs
for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

-- Keep RLS explicit and deny access wherever no policy grants it.
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
