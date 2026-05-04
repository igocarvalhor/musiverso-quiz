-- =====================================================
-- MUSIVERSO - Schema Expandido (Plataforma Completa)
-- Mantém compatibilidade com schema antigo
-- =====================================================

begin;

-- =====================================================
-- TIPOS ENUM
-- =====================================================

do $$
begin
  if not exists (select 1 from pg_type where typname = 'player_tier') then
    create type player_tier as enum ('iniciante', 'explorador', 'harmonicista', 'maestro');
  end if;
end
$$;

-- =====================================================
-- 1. WORLDS (OS 9 MUNDOS)
-- =====================================================

create table if not exists public.worlds (
  id uuid primary key default gen_random_uuid(),
  order_number int not null unique check (order_number between 1 and 9),
  name text not null unique,
  description text,
  icon text, -- emoji ou ícone
  unlocked_at_xp int not null default 0,
  created_at timestamptz default now()
);

insert into public.worlds (order_number, name, description, icon, unlocked_at_xp) values
(1, 'Fundamentos', 'O que é música, elementos do som, pentagrama, figuras', '🎵', 0),
(2, 'Leitura e Ritmo', 'Compassos, síncope, clave Sol e Fá', '🎶', 100),
(3, 'Intervalos e Escalas', 'Tons, semitons, escalas maior/menor', '🎼', 300),
(4, 'Acordes', 'Tríades, campo harmônico, tétrades', '🎹', 600),
(5, 'Harmonia Funcional', 'Tônica, subdominante, dominante, sensível', '🔗', 1000),
(6, 'Progressões', 'II–V–I, I–IV–V–I, ciclo de quintas', '🔄', 1500),
(7, 'Cadências', 'Perfeita, plagal, deceptiva, imperfeita', '⚡', 2000),
(8, 'Análise Real', 'Análise funcional, identificação, harmonia', '🔍', 2500),
(9, 'Avançado', 'Modulação, dominantes secundárias, modos', '👑', 3000)
on conflict do nothing;

-- =====================================================
-- 2. LESSONS (LIÇÕES DENTRO DE CADA MUNDO)
-- =====================================================

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  world_id uuid not null references public.worlds(id) on delete cascade,
  order_number int not null,
  name text not null,
  description text,
  xp_reward int default 50,
  created_at timestamptz default now(),
  unique (world_id, order_number)
);

-- World 1: Fundamentos
insert into public.lessons (world_id, order_number, name, description, xp_reward) 
select id, 1, 'O que é Música?', 'Conceitos básicos e vibração', 50 from public.worlds where order_number = 1 on conflict do nothing;

insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 2, 'Elementos do Som', 'Altura, intensidade, timbre, duração', 50 from public.worlds where order_number = 1 on conflict do nothing;

insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 3, 'O Pentagrama', 'Linhas, espaços, claves', 50 from public.worlds where order_number = 1 on conflict do nothing;

insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 4, 'Figuras Rítmicas', 'Semibreve, mínima, semínima', 50 from public.worlds where order_number = 1 on conflict do nothing;

-- World 2: Leitura e Ritmo
insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 1, 'Compassos Básicos', '2/4, 3/4 e 4/4', 60 from public.worlds where order_number = 2 on conflict do nothing;

insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 2, 'Síncope e Contratempo', 'Deslocamentos rítmicos', 60 from public.worlds where order_number = 2 on conflict do nothing;

insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 3, 'Claves e Leitura', 'Clave de Sol e de Fá', 60 from public.worlds where order_number = 2 on conflict do nothing;

insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 4, 'Ditado Rítmico', 'Percepção e escrita de padrões', 60 from public.worlds where order_number = 2 on conflict do nothing;

-- World 3: Intervalos e Escalas
insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 1, 'Intervalos Simples', 'Classificação e semitons', 70 from public.worlds where order_number = 3 on conflict do nothing;

insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 2, 'Escala Maior', 'Fórmula T-T-ST-T-T-T-ST', 70 from public.worlds where order_number = 3 on conflict do nothing;

insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 3, 'Escala Menor', 'Natural, harmônica e melódica', 70 from public.worlds where order_number = 3 on conflict do nothing;

insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 4, 'Aplicação em Tons', 'Transposição básica', 70 from public.worlds where order_number = 3 on conflict do nothing;

-- World 4: Acordes
insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 1, 'Tríades Maiores e Menores', 'Empilhamento de terças', 80 from public.worlds where order_number = 4 on conflict do nothing;

insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 2, 'Acordes Diminutos e Aumentados', 'Qualidade dos acordes', 80 from public.worlds where order_number = 4 on conflict do nothing;

insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 3, 'Campo Harmônico Maior', 'Graus e funções', 80 from public.worlds where order_number = 4 on conflict do nothing;

insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 4, 'Tétrades Básicas', 'Acordes com sétima', 80 from public.worlds where order_number = 4 on conflict do nothing;

-- World 5: Harmonia Funcional
insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 1, 'Funções Harmônicas', 'Tônica, subdominante e dominante', 90 from public.worlds where order_number = 5 on conflict do nothing;

insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 2, 'Cadência Autêntica', 'Relação V-I', 90 from public.worlds where order_number = 5 on conflict do nothing;

insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 3, 'Cadência Plagal e Deceptiva', 'IV-I e V-VI', 90 from public.worlds where order_number = 5 on conflict do nothing;

insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 4, 'Análise Funcional Básica', 'Leitura por graus', 90 from public.worlds where order_number = 5 on conflict do nothing;

-- World 6: Progressões
insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 1, 'Progressão II-V-I', 'Encadeamento essencial', 100 from public.worlds where order_number = 6 on conflict do nothing;

insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 2, 'Progressão I-IV-V-I', 'Base tonal', 100 from public.worlds where order_number = 6 on conflict do nothing;

insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 3, 'Ciclo de Quintas', 'Movimento por dominantes', 100 from public.worlds where order_number = 6 on conflict do nothing;

insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 4, 'Turnarounds', 'Padrões de retorno', 100 from public.worlds where order_number = 6 on conflict do nothing;

-- World 7: Cadências
insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 1, 'Cadência Perfeita', 'Fechamento forte', 110 from public.worlds where order_number = 7 on conflict do nothing;

insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 2, 'Cadência Imperfeita', 'Resolução parcial', 110 from public.worlds where order_number = 7 on conflict do nothing;

insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 3, 'Cadência Plagal', 'Resolução suave', 110 from public.worlds where order_number = 7 on conflict do nothing;

insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 4, 'Cadência Deceptiva', 'Desvio de expectativa', 110 from public.worlds where order_number = 7 on conflict do nothing;

-- World 8: Análise Real
insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 1, 'Análise por Graus', 'Leitura de função', 120 from public.worlds where order_number = 8 on conflict do nothing;

insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 2, 'Análise de Progressões', 'Identificação em contexto', 120 from public.worlds where order_number = 8 on conflict do nothing;

insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 3, 'Análise de Cadências', 'Reconhecimento auditivo', 120 from public.worlds where order_number = 8 on conflict do nothing;

insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 4, 'Estudo de Repertório', 'Aplicação em exemplos reais', 120 from public.worlds where order_number = 8 on conflict do nothing;

-- World 9: Avançado
insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 1, 'Dominantes Secundárias', 'Funções temporárias', 140 from public.worlds where order_number = 9 on conflict do nothing;

insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 2, 'Modulação', 'Mudança de centro tonal', 140 from public.worlds where order_number = 9 on conflict do nothing;

insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 3, 'Empréstimo Modal', 'Acordes do paralelo', 140 from public.worlds where order_number = 9 on conflict do nothing;

insert into public.lessons (world_id, order_number, name, description, xp_reward)
select id, 4, 'Rearmonização', 'Substituições e variações', 140 from public.worlds where order_number = 9 on conflict do nothing;

-- =====================================================
-- 3. ESTENDER PLAYERS COM GAMIFICAÇÃO
-- =====================================================

alter table if exists public.players add column if not exists xp integer default 0 check (xp >= 0);
alter table if exists public.players add column if not exists tier player_tier default 'iniciante';
alter table if exists public.players add column if not exists streak_days integer default 0;
alter table if exists public.players add column if not exists last_activity timestamptz;
alter table if exists public.players add column if not exists total_questions_answered integer default 0;
alter table if exists public.players add column if not exists total_correct integer default 0;

-- =====================================================
-- 4. PROGRESSION (RASTREAMENTO DE PROGRESSO)
-- =====================================================

create table if not exists public.player_progression (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.players(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  xp_earned integer default 0,
  attempts integer default 0,
  correct_answers integer default 0,
  last_attempt timestamptz,
  completed_at timestamptz,
  unlocked_at timestamptz default now(),
  created_at timestamptz default now(),
  unique (player_id, lesson_id)
);

-- =====================================================
-- 5. ACHIEVEMENTS (CONQUISTAS)
-- =====================================================

create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  icon text, -- emoji
  category text, -- 'mastery', 'streak', 'discovery', 'explorer'
  unlock_requirement jsonb, -- condição para desbloquear
  created_at timestamptz default now()
);

insert into public.achievements (name, description, icon, category, unlock_requirement) values
('Mestre das Cadências', 'Acerte 10 perguntas de cadências seguidas', '⚡', 'mastery', '{"type": "streak", "topic": "cadencias", "count": 10}'),
('Rei do II–V–I', 'Complete a lição do II–V–I', '👑', 'mastery', '{"type": "lesson_complete", "lesson": "II-V-I"}'),
('Caçador de Modulações', 'Desbloqueie o mundo Avançado', '🔍', 'explorer', '{"type": "world_unlock", "world": 9}'),
('Harmonicista de Ouro', 'Atinja 1000 XP', '🌟', 'mastery', '{"type": "xp_reach", "xp": 1000}'),
('Streak de Fogo', 'Estude 7 dias seguidos', '🔥', 'streak', '{"type": "daily_streak", "days": 7}')
on conflict do nothing;

-- =====================================================
-- 6. PLAYER ACHIEVEMENTS (CONQUISTAS DESBLOQUEADAS)
-- =====================================================

create table if not exists public.player_achievements (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.players(id) on delete cascade,
  achievement_id uuid not null references public.achievements(id) on delete cascade,
  unlocked_at timestamptz default now(),
  unique (player_id, achievement_id)
);

-- =====================================================
-- 7. ADAPTIVITY LOG (LOG PARA MOTOR ADAPTATIVO)
-- =====================================================

create table if not exists public.adaptivity_log (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.players(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  question_id bigint,
  correct boolean not null,
  time_taken_seconds int,
  difficulty_adjustment text, -- 'none', 'increase', 'decrease'
  created_at timestamptz default now()
);

-- =====================================================
-- 8. IA FEEDBACK (ARMAZENAR RESPOSTAS DA IA)
-- =====================================================

create table if not exists public.ai_feedback (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.players(id) on delete cascade,
  question_id bigint not null,
  user_answer text,
  correct_answer text,
  feedback_text text, -- resposta da OpenAI
  created_at timestamptz default now()
);

-- =====================================================
-- ÍNDICES PARA PERFORMANCE
-- =====================================================

create index if not exists idx_lessons_world_id on public.lessons(world_id);
create index if not exists idx_progression_player_id on public.player_progression(player_id);
create index if not exists idx_progression_lesson_id on public.player_progression(lesson_id);
create index if not exists idx_player_achievements_player_id on public.player_achievements(player_id);
create index if not exists idx_adaptivity_log_player_id on public.adaptivity_log(player_id);
create index if not exists idx_players_xp on public.players(xp desc);
create index if not exists idx_players_tier on public.players(tier);

-- =====================================================
-- VIEWS ÚTEIS
-- =====================================================

-- Ranking global
create or replace view public.leaderboard as
select 
  rank() over (order by xp desc) as position,
  name,
  xp,
  tier,
  total_questions_answered,
  round(100.0 * total_correct / nullif(total_questions_answered, 0), 2) as accuracy_percent
from public.players
order by xp desc
limit 100;

-- Progresso do jogador
create or replace view public.player_world_progress as
select 
  p.id as player_id,
  w.id as world_id,
  w.order_number,
  w.name as world_name,
  count(l.id) as total_lessons,
  count(pp.id) as lessons_completed,
  sum(pp.xp_earned) as world_xp,
  (count(pp.id) > 0 and count(l.id) = count(pp.id)) as completed
from public.players p
cross join public.worlds w
left join public.lessons l on l.world_id = w.id
left join public.player_progression pp on pp.player_id = p.id and pp.lesson_id = l.id and pp.completed_at is not null
group by p.id, w.id, w.order_number, w.name;

commit;
