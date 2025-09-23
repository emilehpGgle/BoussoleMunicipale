create table public.user_results (
  id uuid not null default gen_random_uuid (),
  session_id uuid not null,
  results_data jsonb not null,
  political_position jsonb null,
  completion_status text null default 'partial'::text,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  municipality_id character varying null,
  constraint user_results_pkey primary key (id),
  constraint user_results_session_id_key unique (session_id),
  constraint user_results_session_id_fkey foreign KEY (session_id) references user_sessions (id) on delete CASCADE,
  constraint user_results_completion_status_check check (
    (
      completion_status = any (array['partial'::text, 'completed'::text])
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_user_results_municipality on public.user_results using btree (municipality_id) TABLESPACE pg_default;