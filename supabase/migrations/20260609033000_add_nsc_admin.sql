-- Add Professor Noh Seungcheol's email to the Supabase RLS admin allowlist.

create or replace function public.is_hs_aipp_admin()
returns boolean
language sql
stable
as $$
  select lower(coalesce(auth.jwt() ->> 'email', '')) = any (
    array[
      'lps.official.231128@gmail.com',
      'lubjugi3@hs.ac.kr',
      'newmind68@hs.ac.kr',
      'nsc0203@hs.ac.kr'
    ]
  );
$$;
