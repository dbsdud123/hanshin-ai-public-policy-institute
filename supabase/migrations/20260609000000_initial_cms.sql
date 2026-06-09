-- 한신대학교 AI 공공정책연구소 1차 운영 CMS
-- Public visitors can read published content and submit inquiries.
-- Only approved admin emails can update content or manage inquiries.

create table if not exists public.site_content (
  key text primary key,
  value jsonb not null,
  public_read boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id text primary key,
  name text not null,
  email text not null,
  phone text,
  affiliation text,
  title text not null,
  content text not null,
  status text not null default 'PENDING' check (status in ('PENDING', 'RESOLVED')),
  created_at timestamptz not null default now()
);

create or replace function public.is_hs_aipp_admin()
returns boolean
language sql
stable
as $$
  select lower(coalesce(auth.jwt() ->> 'email', '')) = any (
    array[
      'lps.official.231128@gmail.com',
      'lubjugi3@hs.ac.kr',
      'newmind68@hs.ac.kr'
    ]
  );
$$;

alter table public.site_content enable row level security;
alter table public.inquiries enable row level security;

drop policy if exists "Public can read published site content" on public.site_content;
create policy "Public can read published site content"
on public.site_content
for select
using (public_read = true);

drop policy if exists "Admins can manage site content" on public.site_content;
create policy "Admins can manage site content"
on public.site_content
for all
using (public.is_hs_aipp_admin())
with check (public.is_hs_aipp_admin());

drop policy if exists "Anyone can submit an inquiry" on public.inquiries;
create policy "Anyone can submit an inquiry"
on public.inquiries
for insert
with check (true);

drop policy if exists "Admins can read inquiries" on public.inquiries;
create policy "Admins can read inquiries"
on public.inquiries
for select
using (public.is_hs_aipp_admin());

drop policy if exists "Admins can update inquiries" on public.inquiries;
create policy "Admins can update inquiries"
on public.inquiries
for update
using (public.is_hs_aipp_admin())
with check (public.is_hs_aipp_admin());

drop policy if exists "Admins can delete inquiries" on public.inquiries;
create policy "Admins can delete inquiries"
on public.inquiries
for delete
using (public.is_hs_aipp_admin());

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists inquiries_status_idx on public.inquiries (status);

