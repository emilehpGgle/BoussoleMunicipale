create table public.municipalities (
  id character varying not null,
  name character varying not null,
  code character varying not null,
  province character varying null default 'QC'::character varying,
  population integer null,
  is_active boolean null default true,
  created_at timestamp without time zone null default now(),
  updated_at timestamp without time zone null default now(),
  constraint municipalities_pkey primary key (id),
  constraint municipalities_code_key unique (code)
) TABLESPACE pg_default;