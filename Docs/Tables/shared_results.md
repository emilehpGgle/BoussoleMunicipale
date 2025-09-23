create table public.shared_results (
  id uuid not null default gen_random_uuid (),
  share_id text not null,
  share_data jsonb not null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  expires_at timestamp with time zone null default (now() + '30 days'::interval),
  access_count integer null default 0,
  last_accessed_at timestamp with time zone null,
  municipality_id character varying not null,
  constraint shared_results_pkey primary key (id),
  constraint shared_results_share_id_key unique (share_id),
  constraint shared_results_municipality_id_fkey foreign KEY (municipality_id) references municipalities (id)
) TABLESPACE pg_default;

create index IF not exists idx_shared_results_share_id on public.shared_results using btree (share_id) TABLESPACE pg_default;

create index IF not exists idx_shared_results_expires on public.shared_results using btree (expires_at) TABLESPACE pg_default;

create index IF not exists idx_shared_results_created on public.shared_results using btree (created_at) TABLESPACE pg_default;

create index IF not exists idx_shared_results_municipality on public.shared_results using btree (municipality_id) TABLESPACE pg_default;