create table public.questions (
  id text not null,
  text text not null,
  category text not null,
  response_type text not null,
  description text null,
  response_format text null,
  agreement_options jsonb not null default '["FA", "PA", "N", "PD", "FD", "IDK"]'::jsonb,
  importance_options jsonb not null default '[5, 4, 3, 2, 1]'::jsonb,
  importance_direct_options jsonb null,
  custom_agreement_labels jsonb null,
  custom_importance_direct_labels jsonb null,
  order_index integer not null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  priority_options jsonb null,
  municipality_id character varying null,
  constraint questions_pkey primary key (id),
  constraint fk_questions_municipality foreign KEY (municipality_id) references municipalities (id),
  constraint questions_response_format_check check (
    (
      response_format = any (
        array[
          'standard'::text,
          'priority'::text,
          'frequency'::text,
          'financing'::text
        ]
      )
    )
  ),
  constraint questions_response_type_check check (
    (
      response_type = any (
        array[
          'agreement'::text,
          'importance_direct'::text,
          'priority_ranking'::text
        ]
      )
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_questions_municipality on public.questions using btree (municipality_id) TABLESPACE pg_default;