-- Run this in the Supabase SQL editor.
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number bigint generated always as identity,
  created_at timestamptz not null default now(),
  order_mode text not null check (order_mode in ('local','retirada','entrega')),
  customer_name text not null,
  phone text not null,
  spot text,      -- mesa / quiosque (order_mode = 'local')
  address text,   -- only for delivery
  area text,      -- only for delivery
  items jsonb not null,
  subtotal numeric(10,2) not null,
  delivery_fee numeric(10,2) not null default 0,
  total numeric(10,2) not null,
  payment_method text not null check (payment_method in ('dinheiro','cartao','pix')),
  change_for text,
  notes text,
  status text not null default 'recebido'
    check (status in ('recebido','preparando','pronto','saiu_para_entrega','entregue','cancelado'))
);

-- Only the server (service role key) writes/reads orders.
-- RLS enabled with no policies blocks all public access.
alter table public.orders enable row level security;
