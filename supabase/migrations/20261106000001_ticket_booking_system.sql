-- Ticket Booking System for PROJECT PURPLE
-- Run: supabase migration new ticket_booking_system

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Events table
create table public.events (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  image_url text,
  event_date timestamp with time zone not null,
  event_end_time timestamp with time zone,
  venue text,
  max_capacity integer not null default 100,
  price numeric(10,2) not null check (price >= 0),
  currency text not null default 'INR',
  status text not null default 'upcoming' check (status in ('upcoming', 'ongoing', 'completed', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Bookings table (user books an event)
create table public.bookings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  event_id uuid references public.events(id) on delete cascade not null,
  quantity integer not null default 1 check (quantity > 0),
  total_amount numeric(10,2) not null check (total_amount >= 0),
  currency text not null default 'INR',
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'expired')),
  qr_code_data text,
  qr_expires_at timestamp with time zone,
  payment_mode text,
  payment_status text not null default 'pending' check (payment_status in ('pending', 'completed', 'failed', 'refunded')),
  provider text,
  provider_transaction_id text,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  completed_at timestamp with time zone
);

-- Tickets table (individual tickets per booking)
create table public.tickets (
  id uuid default uuid_generate_v4() primary key,
  booking_id uuid references public.bookings(id) on delete cascade not null,
  event_id uuid references public.events(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  ticket_number text not null unique,
  qr_code_data text not null,
  qr_expires_at timestamp with time zone not null,
  status text not null default 'valid' check (status in ('valid', 'used', 'expired', 'cancelled')),
  used_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes
create index idx_events_date on public.events(event_date);
create index idx_events_status on public.events(status);
create index idx_bookings_user_id on public.bookings(user_id);
create index idx_bookings_event_id on public.bookings(event_id);
create index idx_bookings_status on public.bookings(status);
create index idx_bookings_qr_expires on public.bookings(qr_expires_at);
create index idx_tickets_booking_id on public.tickets(booking_id);
create index idx_tickets_user_id on public.tickets(user_id);
create index idx_tickets_qr_expires on public.tickets(qr_expires_at);

-- Row Level Security
alter table public.events enable row level security;
alter table public.bookings enable row level security;
alter table public.tickets enable row level security;

-- Events policies (public read for upcoming events)
create policy "Anyone can view upcoming events"
  on public.events for select
  using (status = 'upcoming' or status = 'ongoing');

create policy "Admins can manage events"
  on public.events for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- Bookings policies
create policy "Users can view own bookings"
  on public.bookings for select
  using (auth.uid() = user_id);

create policy "Users can create bookings"
  on public.bookings for insert
  with check (auth.uid() = user_id);

create policy "Users can cancel own pending bookings"
  on public.bookings for update
  using (auth.uid() = user_id and status = 'pending');

create policy "Admins can view all bookings"
  on public.bookings for select
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

create policy "Admins can manage bookings"
  on public.bookings for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- Tickets policies
create policy "Users can view own tickets"
  on public.tickets for select
  using (auth.uid() = user_id);

create policy "Users can update own tickets (mark used)"
  on public.tickets for update
  using (auth.uid() = user_id);

create policy "Admins can view all tickets"
  on public.tickets for select
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

create policy "Admins can manage tickets"
  on public.tickets for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- Trigger to update updated_at
create trigger events_updated_at
  before update on public.events
  for each row execute function public.handle_updated_at();

create trigger bookings_updated_at
  before update on public.bookings
  for each row execute function public.handle_updated_at();

create trigger tickets_updated_at
  before update on public.tickets
  for each row execute function public.handle_updated_at();

-- Function to generate tickets when booking is confirmed
create or replace function public.generate_tickets_for_booking()
returns trigger as $$
declare
  i integer;
  ticket_num text;
  qr_data text;
  expires_at timestamp with time zone;
begin
  -- Only generate tickets when status changes to 'confirmed'
  if new.status = 'confirmed' and old.status != 'confirmed' then
    expires_at := now() + interval '2 minutes';
    
    for i in 1..new.quantity loop
      ticket_num := 'TK-' || upper(substr(md5(random()::text || clock_timestamp()::text), 1, 8));
      qr_data := json_build_object(
        'booking_id', new.id,
        'event_id', new.event_id,
        'ticket_number', ticket_num,
        'expires_at', expires_at
      )::text;
      
      insert into public.tickets (booking_id, event_id, user_id, ticket_number, qr_code_data, qr_expires_at)
      values (new.id, new.event_id, new.user_id, ticket_num, qr_data, expires_at);
    end loop;
  end if;
  return new;
end;
$$ language plpgsql security definer;

create trigger generate_tickets_on_confirm
  after update on public.bookings
  for each row
  when (new.status = 'confirmed' and old.status != 'confirmed')
  execute function public.generate_tickets_for_booking();

-- Function to expire pending bookings and QR codes
create or replace function public.expire_pending_bookings()
returns void as $$
begin
  -- Expire pending bookings older than 5 minutes
  update public.bookings
  set status = 'expired'
  where status = 'pending' 
    and created_at < now() - interval '5 minutes';
  
  -- Expire QR codes past expiry
  update public.bookings
  set qr_code_data = null
  where qr_expires_at < now();
  
  update public.tickets
  set status = 'expired'
  where qr_expires_at < now() and status = 'valid';
end;
$$ language plpgsql security definer;

-- Schedule the cleanup function (run via pg_cron or external scheduler)
-- select cron.schedule('expire-bookings', '* * * * *', 'select public.expire_pending_bookings();');