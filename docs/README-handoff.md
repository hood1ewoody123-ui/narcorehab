# Handoff HTML → Figma

## Файл

`narcorehab-handoff.html` — полная спецификация для команды разработки ЦМПП «Здравница».

## Как открыть

1. Откройте файл **из папки `docs/`** в браузере (Chrome рекомендуется), чтобы подгрузились изображения из `../public/`.
2. Путь: `docs/narcorehab-handoff.html`

## Импорт в Figma

1. Установите плагин импорта HTML (например html.to.design / Anima / аналог).
2. Импортируйте страницу целиком или по секциям (`#tokens`, `#states`, `#desktop`, `#mobile`).
3. Атрибуты `data-figma-frame="desktop-home"` и `data-figma-frame="mobile-home"` — якоря для отдельных фреймов.

## Содержание документа

| Раздел | Содержание |
|--------|------------|
| 01 Введение | Порядок секций, ограничения копирайта |
| 02 Токены | Цвета, типографика, тени |
| 03 Компоненты | Все состояния кнопок рядом |
| 04 Состояния | Hero intro, header, Mila, методология, врачи |
| 05 Логика | Видео, sticky scroll, motion, API |
| 06 Desktop | Artboard 1440px |
| 07 Mobile | Artboard 390px + таблица отличий |
| 08 Стек | Next.js, Tailwind, Framer Motion |

## Актуальный код

Репозиторий: https://github.com/hood1ewoody123-ui/narcorehab
