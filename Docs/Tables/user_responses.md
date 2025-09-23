create table public.user_responses (
  id uuid not null default gen_random_uuid (),
  session_id uuid not null,
  question_id text not null,
  response_type text not null,
  agreement_value text null,
  importance_direct_value text null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  priority_data jsonb null,
  municipality_id character varying null,
  constraint user_responses_pkey primary key (id),
  constraint user_responses_session_id_question_id_response_type_key unique (session_id, question_id, response_type),
  constraint user_responses_question_id_fkey foreign KEY (question_id) references questions (id) on delete CASCADE,
  constraint user_responses_session_id_fkey foreign KEY (session_id) references user_sessions (id) on delete CASCADE,
  constraint user_responses_response_type_check check (
    (
      response_type = any (
        array[
          'agreement'::text,
          'importance_direct'::text,
          'priority_ranking'::text
        ]
      )
    )
  ),
  constraint user_responses_importance_direct_value_check check (
    (
      importance_direct_value = any (
        array[
          'TI'::text,
          'AI'::text,
          'NI'::text,
          'PI'::text,
          'PTI'::text,
          'IDK'::text
        ]
      )
    )
  ),
  constraint user_responses_agreement_value_check check (
    (
      agreement_value = any (
        array[
          'FA'::text,
          'PA'::text,
          'N'::text,
          'PD'::text,
          'FD'::text,
          'IDK'::text
        ]
      )
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_user_responses_session_id on public.user_responses using btree (session_id) TABLESPACE pg_default;

create index IF not exists idx_user_responses_question_id on public.user_responses using btree (question_id) TABLESPACE pg_default;

create index IF not exists idx_user_responses_priority on public.user_responses using btree (session_id, question_id) TABLESPACE pg_default
where
  (response_type = 'priority_ranking'::text);

create index IF not exists idx_user_responses_municipality on public.user_responses using btree (municipality_id) TABLESPACE pg_default;