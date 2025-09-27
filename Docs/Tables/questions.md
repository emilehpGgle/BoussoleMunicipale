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
  political_axis character varying(20) null default 'neutral'::character varying,
  political_weight numeric(3, 2) null default 1.0,
  political_interpretation character varying(30) null default 'neutral'::character varying,
  score_inversion boolean null default false,
  constraint questions_pkey primary key (id),
  constraint fk_questions_municipality foreign KEY (municipality_id) references municipalities (id),
  constraint chk_political_weight check (
    (
      (political_weight >= 0.1)
      and (political_weight <= 3.0)
    )
  ),
  constraint chk_political_axis check (
    (
      (political_axis)::text = any (
        (
          array[
            'economic'::character varying,
            'social'::character varying,
            'neutral'::character varying
          ]
        )::text[]
      )
    )
  ),
  constraint chk_political_interpretation check (
    (
      (political_interpretation)::text = any (
        (
          array[
            'progressive'::character varying,
            'conservative'::character varying,
            'interventionist'::character varying,
            'free_market'::character varying,
            'neutral'::character varying,
            'decentralization'::character varying,
            'collaborative'::character varying
          ]
        )::text[]
      )
    )
  ),
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

create index IF not exists idx_questions_municipality_perf on public.questions using btree (municipality_id) TABLESPACE pg_default;

create index IF not exists idx_questions_municipality_order on public.questions using btree (municipality_id, order_index) TABLESPACE pg_default;

create index IF not exists idx_questions_political_axis on public.questions using btree (political_axis) TABLESPACE pg_default;

create index IF not exists idx_questions_municipality_axis on public.questions using btree (municipality_id, political_axis) TABLESPACE pg_default;

create index IF not exists idx_questions_political_weight on public.questions using btree (political_weight) TABLESPACE pg_default;