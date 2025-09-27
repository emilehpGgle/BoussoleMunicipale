create table public.party_positions (
  id uuid not null default gen_random_uuid (),
  party_id text not null,
  question_id text not null,
  position text not null,
  source text null,
  note text null,
  quote text null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  priority_list jsonb null,
  constraint party_positions_pkey primary key (id),
  constraint party_positions_party_id_question_id_key unique (party_id, question_id),
  constraint party_positions_party_id_fkey foreign KEY (party_id) references parties (id) on delete CASCADE,
  constraint party_positions_question_id_fkey foreign KEY (question_id) references questions (id) on delete CASCADE,
  constraint party_positions_position_check check (
    (
      "position" = any (
        array[
          'FA'::text,
          'PA'::text,
          'N'::text,
          'PD'::text,
          'FD'::text,
          'IDK'::text,
          '?'::text
        ]
      )
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_party_positions_party_id on public.party_positions using btree (party_id) TABLESPACE pg_default;

create index IF not exists idx_party_positions_question_id on public.party_positions using btree (question_id) TABLESPACE pg_default;

create index IF not exists idx_party_positions_party_municipality on public.party_positions using btree (party_id) TABLESPACE pg_default;

create index IF not exists idx_party_positions_priority_list on public.party_positions using gin (priority_list) TABLESPACE pg_default;