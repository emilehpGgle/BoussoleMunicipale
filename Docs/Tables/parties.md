create table public.parties (
  id text not null,
  name text not null,
  short_name text null,
  leader text not null,
  logo_url text not null,
  website_url text null,
  orientation text null,
  main_ideas_summary text null,
  strengths jsonb null default '[]'::jsonb,
  reserves jsonb null default '[]'::jsonb,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  municipality_id character varying null,
  constraint parties_pkey primary key (id),
  constraint fk_parties_municipality foreign KEY (municipality_id) references municipalities (id)
) TABLESPACE pg_default;

create index IF not exists idx_parties_municipality on public.parties using btree (municipality_id) TABLESPACE pg_default;

create index IF not exists idx_parties_municipality_perf on public.parties using btree (municipality_id) TABLESPACE pg_default;