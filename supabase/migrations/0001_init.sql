-- ============================================================
-- EL PRINCE COMPANY — Esquema inicial (Fase B)
-- Rodar no projeto Supabase NOVO e dedicado da loja.
-- ============================================================

create table if not exists public.products (
  id            text primary key default gen_random_uuid()::text,
  category      text not null check (category in ('pods','perfume')),
  brand         text not null,
  name          text not null,
  price_atacado numeric not null default 0,
  price_varejo  numeric not null default 0,
  atacado_min   int     not null default 10,
  flavors       text[]  not null default '{}',
  description   text,
  image_url     text,
  active        boolean not null default true,
  sort          int     not null default 0,
  created_at    timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category);
create index if not exists products_sort_idx     on public.products (sort);

-- ---------------- RLS ----------------
alter table public.products enable row level security;

-- Vitrine pública: qualquer visitante lê apenas produtos ativos
drop policy if exists "public_read_active" on public.products;
create policy "public_read_active" on public.products
  for select using (active = true);

-- Admin: como este projeto é DEDICADO à loja, todo usuário autenticado é admin
drop policy if exists "auth_read_all" on public.products;
create policy "auth_read_all" on public.products
  for select to authenticated using (true);

drop policy if exists "auth_insert" on public.products;
create policy "auth_insert" on public.products
  for insert to authenticated with check (true);

drop policy if exists "auth_update" on public.products;
create policy "auth_update" on public.products
  for update to authenticated using (true) with check (true);

drop policy if exists "auth_delete" on public.products;
create policy "auth_delete" on public.products
  for delete to authenticated using (true);

-- ---------------- Storage (fotos dos produtos) ----------------
insert into storage.buckets (id, name, public)
values ('produtos', 'produtos', true)
on conflict (id) do nothing;

drop policy if exists "produtos_public_read" on storage.objects;
create policy "produtos_public_read" on storage.objects
  for select using (bucket_id = 'produtos');

drop policy if exists "produtos_auth_insert" on storage.objects;
create policy "produtos_auth_insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'produtos');

drop policy if exists "produtos_auth_update" on storage.objects;
create policy "produtos_auth_update" on storage.objects
  for update to authenticated using (bucket_id = 'produtos');

drop policy if exists "produtos_auth_delete" on storage.objects;
create policy "produtos_auth_delete" on storage.objects
  for delete to authenticated using (bucket_id = 'produtos');
