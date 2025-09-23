create table public.user_profiles (
  id uuid not null default gen_random_uuid (),
  session_id uuid not null,
  profile_data jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  municipality_id character varying null,
  constraint user_profiles_pkey primary key (id),
  constraint user_profiles_session_id_key unique (session_id),
  constraint user_profiles_session_id_fkey foreign KEY (session_id) references user_sessions (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists idx_user_profiles_municipality on public.user_profiles using btree (municipality_id) TABLESPACE pg_default;