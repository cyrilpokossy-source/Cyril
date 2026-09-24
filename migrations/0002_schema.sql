-- Synapse academic catalog, progress, and subscriptions
create table if not exists filieres (
  id serial primary key,
  slug text unique not null,
  name text not null,
  short_name text not null,
  description text not null default '',
  sort_order int not null default 0
);

create table if not exists profiles (
  user_id text primary key,
  role text not null default 'student',
  display_name text,
  email text,
  filiere_id int references filieres(id),
  niveau int,
  semestre int,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists courses (
  id serial primary key,
  filiere_id int not null references filieres(id) on delete cascade,
  niveau int not null,
  semestre int not null,
  slug text not null,
  title text not null,
  code text not null,
  description text not null default '',
  content text not null default '',
  resume text not null default '',
  hours int not null default 30,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  unique (filiere_id, niveau, semestre, slug)
);

create index if not exists courses_path_idx on courses (filiere_id, niveau, semestre);

create table if not exists questions (
  id serial primary key,
  course_id int not null references courses(id) on delete cascade,
  kind text not null,
  prompt text not null,
  options jsonb,
  correct_index int,
  explanation text not null default '',
  solution text not null default '',
  sort_order int not null default 0
);

create index if not exists questions_course_idx on questions (course_id, kind);

create table if not exists past_exams (
  id serial primary key,
  course_id int not null references courses(id) on delete cascade,
  title text not null,
  year int not null,
  content text not null default '',
  correction text not null default ''
);

create table if not exists student_answers (
  id serial primary key,
  user_id text not null,
  question_id int not null references questions(id) on delete cascade,
  selected_index int,
  is_correct boolean,
  attempt int not null default 1,
  created_at timestamptz not null default now()
);

create index if not exists student_answers_user_idx on student_answers (user_id, question_id);

create table if not exists progress (
  user_id text not null,
  course_id int not null references courses(id) on delete cascade,
  viewed_course boolean not null default false,
  viewed_resume boolean not null default false,
  viewed_exercises boolean not null default false,
  viewed_qcm boolean not null default false,
  viewed_exams boolean not null default false,
  viewed_corrections boolean not null default false,
  qcm_score int,
  qcm_attempts int not null default 0,
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, course_id)
);

create table if not exists subscriptions (
  id serial primary key,
  user_id text not null,
  plan text not null,
  amount_fcfa int not null,
  provider text not null default '',
  status text not null default 'pending',
  filiere_id int references filieres(id),
  niveau int,
  semestre int,
  phone text,
  starts_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists subscriptions_user_idx on subscriptions (user_id, status);
