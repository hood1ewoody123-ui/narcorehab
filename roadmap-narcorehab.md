# Роадмап — Главная страница narcorehab.com
## Next.js проект · Cursor · npm

---

## Стек

```
Framework:     Next.js 14 (App Router)
Language:      TypeScript
Styling:       Tailwind CSS + CSS Variables
Animation:     Framer Motion
Icons:         Lucide React + Phosphor Icons
Forms:         React Hook Form + Zod
UI Primitives: Radix UI
Fonts:         next/font (Cormorant Garamond + Manrope)
Linting:       ESLint + Prettier
Deploy:        Vercel
```

---

## Шаг 1 — Инициализация проекта

```bash
npx create-next-app@latest narcorehab-landing \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd narcorehab-landing
```

---

## Шаг 2 — Установка всех библиотек

```bash
# Анимации
npm install framer-motion

# Иконки
npm install lucide-react @phosphor-icons/react

# Формы и валидация
npm install react-hook-form zod @hookform/resolvers

# UI примитивы (доступность, аккордеон, диалоги)
npm install @radix-ui/react-accordion \
            @radix-ui/react-dialog \
            @radix-ui/react-label \
            @radix-ui/react-slot \
            @radix-ui/react-toast

# Утилиты
npm install clsx tailwind-merge class-variance-authority

# Шрифты (если нужны отдельно)
npm install @fontsource-variable/cormorant-garamond

# Dev утилиты
npm install -D prettier prettier-plugin-tailwindcss
```

---

## Шаг 3 — Структура проекта

```
narcorehab-landing/
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← корневой layout, шрифты, metadata
│   │   ├── page.tsx            ← главная страница
│   │   ├── globals.css         ← CSS переменные + базовые стили
│   │   └── favicon.ico
│   ├── components/
│   │   ├── ui/                 ← базовые переиспользуемые компоненты
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Input.tsx
│   │   └── sections/           ← блоки главной страницы
│   │       ├── Hero.tsx
│   │       ├── Pains.tsx
│   │       ├── Safety.tsx
│   │       ├── Programs.tsx
│   │       ├── Timeline.tsx
│   │       ├── Family.tsx
│   │       ├── Doctors.tsx
│   │       ├── WhyUs.tsx
│   │       ├── Testimonials.tsx
│   │       ├── Faq.tsx
│   │       ├── FinalCta.tsx
│   │       └── StickyBar.tsx
│   ├── lib/
│   │   ├── utils.ts            ← cn() helper
│   │   └── schemas.ts          ← Zod схемы для форм
│   ├── hooks/
│   │   └── useScrollProgress.ts
│   └── types/
│       └── index.ts
├── public/
│   └── images/
├── .cursorrules
├── .env.local
├── tailwind.config.ts
└── next.config.ts
```

---

## Шаг 4 — Ключевые файлы

### `src/lib/utils.ts`
```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### `src/lib/schemas.ts`
```typescript
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Введите имя").max(50),
  phone: z.string().regex(/^\+?[78]\d{9,10}$/, "Введите корректный номер"),
  who: z.enum(["self", "relative"]),
  message: z.string().max(300).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Необходимо согласие" }),
  }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

### `src/app/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --teal:       #1D6666;
  --teal-20:    rgba(29, 102, 102, 0.12);
  --teal-40:    rgba(29, 102, 102, 0.25);
  --black:      #17191A;
  --graphite:   #2B2B2B;
  --white:      #F7F7F5;
  --gray:       #7E8788;
  --silver:     #AEB5B7;
  --silver-20:  rgba(174, 181, 183, 0.2);
  --line:       rgba(174, 181, 183, 0.35);

  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body:    'Manrope', system-ui, sans-serif;

  --ease-out:   cubic-bezier(0.16, 1, 0.3, 1);

  --shadow-sm:  0 1px 3px rgba(23,25,26,0.06), 0 1px 2px rgba(23,25,26,0.04);
  --shadow-md:  0 4px 16px rgba(23,25,26,0.08), 0 2px 6px rgba(23,25,26,0.04);
  --shadow-lg:  0 16px 48px rgba(23,25,26,0.12), 0 4px 12px rgba(23,25,26,0.06);
}

* { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  background: var(--white);
  color: var(--graphite);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Заголовки всегда через display font */
h1, h2, h3 {
  font-family: var(--font-display);
  font-weight: 400;
  line-height: 1.1;
}

/* Убираем outline на мышке, оставляем для клавиатуры */
:focus:not(:focus-visible) { outline: none; }
:focus-visible { outline: 2px solid var(--teal); outline-offset: 2px; }
```

### `tailwind.config.ts`
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        teal:     "#1D6666",
        black:    "#17191A",
        graphite: "#2B2B2B",
        cream:    "#F7F7F5",
        gray:     "#7E8788",
        silver:   "#AEB5B7",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body:    ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["clamp(36px, 5vw, 72px)", { lineHeight: "1.05" }],
        "display-md": ["clamp(28px, 3.5vw, 48px)", { lineHeight: "1.15" }],
        "display-sm": ["clamp(22px, 2.5vw, 32px)", { lineHeight: "1.2" }],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
```

### `src/app/layout.tsx`
```typescript
import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ЦМПП «Здравница» — психиатрия, наркология, восстановление",
  description:
    "Комплексная медицинская и психологическая помощь при зависимостях, тревоге, депрессии и кризисных состояниях. Анонимно. Деликатно. Москва.",
  keywords: [
    "наркология Москва", "психиатрия анонимно", "лечение зависимостей",
    "вывод из запоя", "кодирование", "реабилитация",
  ],
  openGraph: {
    title: "ЦМПП «Здравница»",
    description: "Анонимная наркологическая и психиатрическая помощь в Москве",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

### `.env.local`
```bash
# API для форм (n8n вебхук)
N8N_WEBHOOK_URL=https://твой-n8n.ru/webhook/contact

# Если подключаем агентов
NEXT_PUBLIC_CHAT_WIDGET_URL=https://твой-сервис.vercel.app
```

---

## Шаг 5 — Порядок разработки блоков

```
Этап 1 — Основа (день 1)
  [ ] globals.css + CSS переменные
  [ ] tailwind.config.ts
  [ ] layout.tsx (шрифты + metadata)
  [ ] lib/utils.ts + lib/schemas.ts
  [ ] компонент Button.tsx
  [ ] компонент Input.tsx

Этап 2 — Hero (день 1-2)
  [ ] Hero.tsx — тёмный блок с анимацией
  [ ] StickyBar.tsx — мобильная нижняя панель
  [ ] FloatingCta.tsx — десктопный floating

Этап 3 — Контентные блоки (день 2-3)
  [ ] Pains.tsx — карточки болей
  [ ] Safety.tsx — три опоры доверия
  [ ] Programs.tsx — программы помощи
  [ ] Timeline.tsx — маршрут первого шага

Этап 4 — Социальное доказательство (день 3-4)
  [ ] Family.tsx — для близких
  [ ] Doctors.tsx — специалисты
  [ ] WhyUs.tsx — почему Здравница
  [ ] Testimonials.tsx — отзывы (анонимные)
  [ ] Faq.tsx — вопросы и ответы

Этап 5 — Финал и интеграции (день 4-5)
  [ ] FinalCta.tsx — финальный призыв
  [ ] Форма + React Hook Form + Zod
  [ ] API route для отправки в n8n
  [ ] SEO: Schema.org, OpenGraph
  [ ] Lighthouse аудит 90+
  [ ] Финальные правки
```

---

## Шаг 6 — Соглашения по анимациям

```typescript
// Стандартные варианты Framer Motion — используй везде

export const fadeUpVariant = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  },
};

export const staggerContainer = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  },
};

export const cardHover = {
  rest:  { y: 0, boxShadow: "var(--shadow-sm)" },
  hover: {
    y: -4,
    boxShadow: "var(--shadow-md)",
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
  },
};
```

---

## Правило безопасности — медицинская ниша

```typescript
// В каждой форме — обязательно
const schema = z.object({
  // ...поля...
  consent: z.literal(true), // Согласие на обработку ПД
});

// API route — rate limiting
// Максимум 10 запросов в минуту с одного IP
// Данные не логируются с персональной информацией
// HTTPS обязателен — настраивается на Vercel автоматически
```

---

## Критерий готовности

```
✓ npm run build — без ошибок
✓ npm run lint  — без предупреждений
✓ Lighthouse Desktop: Performance 90+, SEO 100
✓ Lighthouse Mobile: Performance 85+
✓ Форма отправляется и данные приходят в n8n
✓ Sticky bar работает на мобиле
✓ Все анимации 60fps
✓ Нет красного цвета нигде на странице
✓ Нет восклицательных знаков в текстах
✓ Consent checkbox обязателен перед отправкой
```
