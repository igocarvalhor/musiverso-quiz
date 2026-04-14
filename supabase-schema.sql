-- =====================================================
-- Musiverso Quiz - Supabase Schema
-- Execute este arquivo por completo no SQL Editor do Supabase.
-- =====================================================

begin;

create extension if not exists pgcrypto;

-- -------------------------------------
-- Tipos
-- -------------------------------------
do $$
begin
  if not exists (
    select 1 from pg_type where typname = 'difficulty_level'
  ) then
    create type difficulty_level as enum ('easy', 'medium', 'hard');
  end if;
end
$$;

-- -------------------------------------
-- Tabela de jogadores
-- -------------------------------------
create table if not exists public.players (
  id uuid primary key default gen_random_uuid(),
  name varchar(30) not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint players_name_trimmed check (char_length(trim(name)) >= 2)
);

-- -------------------------------------
-- Credenciais de login do jogador
-- -------------------------------------
create table if not exists public.player_auth (
  player_id uuid primary key references public.players(id) on delete cascade,
  password_hash text not null,
  created_at timestamptz not null default now()
);

-- -------------------------------------
-- Progresso do jogador
-- -------------------------------------
create table if not exists public.player_progress (
  player_id uuid primary key references public.players(id) on delete cascade,
  current_level difficulty_level not null default 'easy',
  total_score integer not null default 0,
  highest_title text not null default 'Aventureiro Ritmico',
  unlocked_medium boolean not null default false,
  unlocked_hard boolean not null default false,
  updated_at timestamptz not null default now(),
  constraint player_progress_total_score_non_negative check (total_score >= 0)
);

-- -------------------------------------
-- Banco de perguntas do quiz
-- -------------------------------------
create table if not exists public.quiz_questions (
  id bigserial primary key,
  level difficulty_level not null,
  question_text text not null,
  options jsonb not null,
  correct_option smallint not null,
  explanation text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint quiz_questions_options_is_array check (jsonb_typeof(options) = 'array'),
  constraint quiz_questions_options_len check (jsonb_array_length(options) = 4),
  constraint quiz_questions_correct_option_range check (correct_option between 0 and 3)
);

-- -------------------------------------
-- Sessoes/partidas do quiz
-- -------------------------------------
create table if not exists public.game_sessions (
  id bigserial primary key,
  player_id uuid not null references public.players(id) on delete cascade,
  level difficulty_level not null,
  score integer not null default 0,
  correct_answers integer not null default 0,
  total_questions integer not null default 0,
  best_streak integer not null default 0,
  created_at timestamptz not null default now(),
  constraint game_sessions_score_non_negative check (score >= 0),
  constraint game_sessions_correct_answers_non_negative check (correct_answers >= 0),
  constraint game_sessions_total_questions_non_negative check (total_questions >= 0),
  constraint game_sessions_best_streak_non_negative check (best_streak >= 0),
  constraint game_sessions_correct_lte_total check (correct_answers <= total_questions)
);

-- -------------------------------------
-- Indices
-- -------------------------------------
create index if not exists idx_quiz_questions_level_active
  on public.quiz_questions(level, active);

create index if not exists idx_game_sessions_player_id
  on public.game_sessions(player_id);

create index if not exists idx_game_sessions_level
  on public.game_sessions(level);

create index if not exists idx_game_sessions_score_desc
  on public.game_sessions(score desc);

-- -------------------------------------
-- Trigger para updated_at
-- -------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_players_updated_at on public.players;
create trigger trg_players_updated_at
before update on public.players
for each row execute function public.set_updated_at();

drop trigger if exists trg_quiz_questions_updated_at on public.quiz_questions;
create trigger trg_quiz_questions_updated_at
before update on public.quiz_questions
for each row execute function public.set_updated_at();

-- -------------------------------------
-- Views de ranking
-- -------------------------------------
create or replace view public.leaderboard_overall as
select
  p.name as player_name,
  coalesce(pp.total_score, 0) as total_score,
  coalesce(max(gs.score), 0) as best_score,
  count(gs.id)::int as total_sessions,
  coalesce(pp.current_level, 'easy'::difficulty_level) as current_level,
  coalesce(pp.highest_title, 'Aventureiro Ritmico') as highest_title
from public.players p
left join public.player_progress pp on pp.player_id = p.id
left join public.game_sessions gs on gs.player_id = p.id
group by p.id, p.name, pp.total_score, pp.current_level, pp.highest_title;

create or replace view public.leaderboard_by_level as
select
  p.name as player_name,
  gs.level,
  max(gs.score) as best_score,
  count(gs.id)::int as total_sessions,
  max(gs.created_at) as last_played_at
from public.game_sessions gs
join public.players p on p.id = gs.player_id
group by p.name, gs.level;

-- -------------------------------------
-- Seed minimo de perguntas (exemplo)
-- Pode ser removido depois que voce inserir seu conteudo oficial.
-- -------------------------------------
insert into public.quiz_questions (level, question_text, options, correct_option, explanation)
values
  ('easy', 'Qual instrumento tem teclas?', '["Tambor", "Piano", "Chocalho", "Triangulo"]', 1, 'O piano e um instrumento de teclas.'),
  ('easy', 'Quando cantamos bem baixinho, o volume esta...', '["Baixo", "Alto", "Raspado", "Quebrado"]', 0, 'Baixo significa som suave.'),
  ('medium', 'Qual instrumento pertence a familia das cordas?', '["Violao", "Pandeiro", "Flauta", "Bateria"]', 0, 'O violao produz som com cordas vibrando.'),
  ('medium', 'O que indica se a musica esta rapida ou lenta?', '["Tempo", "Cor", "Cheiro", "Peso"]', 0, 'Tempo musical define a velocidade da musica.'),
  ('hard', 'Sequencia principal de notas que podemos cantar chama-se...', '["Melodia", "Ritmo visual", "Ruido", "Silencio"]', 0, 'Melodia e uma sequencia organizada de notas.'),
  ('hard', 'Qual sinal pode indicar repeticao de um trecho?', '["Barra com pontos", "Pausa longa", "Clave de Sol", "Sustenido"]', 0, 'A barra com pontos indica repeticao de parte da musica.')
on conflict do nothing;

-- -------------------------------------
-- RLS e politicas
-- -------------------------------------
alter table public.players enable row level security;
alter table public.player_auth enable row level security;
alter table public.player_progress enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.game_sessions enable row level security;

-- Leitura publica das perguntas ativas.
drop policy if exists quiz_questions_read_active on public.quiz_questions;
create policy quiz_questions_read_active
on public.quiz_questions
for select
using (active = true);

-- Leitura publica dos rankings/views depende das tabelas base.
drop policy if exists players_public_read on public.players;
create policy players_public_read
on public.players
for select
using (true);

drop policy if exists player_progress_public_read on public.player_progress;
create policy player_progress_public_read
on public.player_progress
for select
using (true);

drop policy if exists game_sessions_public_read on public.game_sessions;
create policy game_sessions_public_read
on public.game_sessions
for select
using (true);

-- Insercoes permitidas para criar jogadores e registrar sessoes.
drop policy if exists players_public_insert on public.players;
create policy players_public_insert
on public.players
for insert
with check (true);

drop policy if exists player_progress_public_upsert on public.player_progress;
create policy player_progress_public_upsert
on public.player_progress
for all
using (true)
with check (true);

drop policy if exists game_sessions_public_insert on public.game_sessions;
create policy game_sessions_public_insert
on public.game_sessions
for insert
with check (true);

commit;
