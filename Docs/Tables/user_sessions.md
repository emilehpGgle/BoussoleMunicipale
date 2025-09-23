create table public.user_sessions (
  id uuid not null default gen_random_uuid (),
  session_token text not null,
  ip_address inet null,
  user_agent text null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  expires_at timestamp with time zone null,
  municipality_id character varying null,
  constraint user_sessions_pkey primary key (id),
  constraint user_sessions_session_token_key unique (session_token)
) TABLESPACE pg_default;

create index IF not exists idx_user_sessions_token on public.user_sessions using btree (session_token) TABLESPACE pg_default;

create index IF not exists idx_user_sessions_expires on public.user_sessions using btree (expires_at) TABLESPACE pg_default;

create index IF not exists idx_user_sessions_municipality on public.user_sessions using btree (municipality_id) TABLESPACE pg_default;