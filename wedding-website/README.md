# Свадебный сайт

Красивый одностраничный сайт-приглашение на свадьбу с нежными тонами и плавными анимациями.

## Технологии

- **React 19** + **TypeScript** - современный фреймворк
- **Vite** - быстрая сборка
- **Framer Motion** - плавные анимации
- **Supabase** - база данных для анкет гостей
- **CSS Modules** - изолированные стили

## Быстрый старт

### 1. Установка зависимостей

```bash
pnpm install
```

### 2. Настройка Supabase (опционально)

Создайте файл `.env` в корне проекта:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Создание таблицы в Supabase

Выполните этот SQL в Supabase SQL Editor:

```sql
CREATE TABLE rsvp_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  attendance TEXT NOT NULL,
  transfer TEXT NOT NULL,
  additional_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Включить Row Level Security
ALTER TABLE rsvp_submissions ENABLE ROW LEVEL SECURITY;

-- Разрешить публичные вставки
CREATE POLICY "Allow public inserts" ON rsvp_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Разрешить чтение авторизованным пользователям
CREATE POLICY "Allow authenticated read" ON rsvp_submissions
  FOR SELECT
  TO authenticated
  USING (true);
```

### 4. Запуск в режиме разработки

```bash
pnpm dev
```

Сайт будет доступен по адресу: http://localhost:5173

### 5. Сборка для продакшена

```bash
pnpm build
```

Готовые файлы будут в папке `dist/`.

## Структура проекта

```
src/
├── components/          # React компоненты
│   ├── Header.tsx       # Главный экран с заголовком
│   ├── Location.tsx     # Блок с местом проведения
│   ├── Program.tsx      # Программа дня
│   ├── Wishes.tsx       # Пожелания для гостей
│   ├── DressCode.tsx    # Дресс-код
│   ├── RSVPForm.tsx     # Форма анкеты
│   └── Footer.tsx       # Подвал сайта
├── styles/
│   └── global.css       # Глобальные стили и переменные
├── utils/
│   └── supabase.ts      # Клиент Supabase
├── App.tsx              # Главный компонент
└── main.tsx             # Точка входа
```

## Кастомизация

### Изменение цветовой палитры

Откройте `src/styles/global.css` и измените переменные в секции `:root`:

```css
:root {
  --color-background: #FAF8F3;
  --color-accent-dark: #D4C4B0;
  /* ... */
}
```

### Изменение шрифтов

Замените Google Fonts URL и переменные `--font-heading` / `--font-body`.

### Изменение изображений дресс-кода

Замените изображения в папке `public/images/`:
- `d1.jpg` - `d10.jpg` для девушек
- `m1.jpg` - `m8.jpg` для мужчин

## Деплой

### Vercel (рекомендуется)

1. Подключите репозиторий к Vercel
2. Добавьте переменные окружения в настройках проекта
3. Деплой произойдёт автоматически

### Netlify

1. Подключите репозиторий к Netlify
2. Команда сборки: `pnpm build`
3. Папка публикации: `dist`

---

Создано с любовью ♥
