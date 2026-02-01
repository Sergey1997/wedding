-- Миграция для создания таблицы RSVP submissions
-- Выполните этот SQL в Supabase SQL Editor

-- Создание таблицы
CREATE TABLE IF NOT EXISTS rsvp_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  attendance TEXT NOT NULL,
  transfer TEXT NOT NULL,
  additional_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Включить Row Level Security (RLS)
ALTER TABLE rsvp_submissions ENABLE ROW LEVEL SECURITY;

-- Политика: Разрешить публичные вставки (любой может отправить форму)
CREATE POLICY "Allow public inserts" ON rsvp_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Политика: Разрешить чтение только авторизованным пользователям
-- (чтобы только вы могли видеть ответы)
CREATE POLICY "Allow authenticated read" ON rsvp_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Опционально: Создать индекс для быстрого поиска по дате
CREATE INDEX IF NOT EXISTS idx_rsvp_submissions_created_at 
ON rsvp_submissions(created_at DESC);

-- Опционально: Создать индекс для поиска по имени
CREATE INDEX IF NOT EXISTS idx_rsvp_submissions_name 
ON rsvp_submissions(name);
