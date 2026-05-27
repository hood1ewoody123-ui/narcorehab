import {
  SITE_ADDRESS,
  SITE_PHONE_MAIN,
  SITE_PHONE_MAIN_DISPLAY,
  SITE_PHONE_MOSCOW,
  SITE_PHONE_MOSCOW_DISPLAY,
} from "@/components/sections/hero/constants";
import { CONTACT_FORM_TELEGRAM_HREF } from "@/components/sections/contact-form/constants";

export const FOOTER_DISCLAIMER =
  "Вся реабилитация, представленная на сайте, реализуется организациями-партнёрами";

export const FOOTER_MEDICAL_NOTE = "Необходима консультация врача";

export const FOOTER_SOCIALS = [
  { label: "VK", href: "#" },
  { label: "Telegram", href: CONTACT_FORM_TELEGRAM_HREF },
  { label: "OK", href: "#" },
  { label: "Дзен", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "TikTok", href: "#" },
] as const;

export const FOOTER_NAV_COLUMNS = [
  {
    title: "Наркомания",
    links: [
      "Вывод на дому",
      "Лечение в стационаре",
      "УБОД",
      "Помощь подростку",
    ],
  },
  {
    title: "Алкоголизм",
    links: [
      "Вывод на дому",
      "Лечение запоя",
      "Вызов на дом",
      "Амбулаторно",
      "Стационар",
    ],
  },
  {
    title: "Кодирование",
    links: [
      "От наркотиков",
      "От алкоголя",
      "От курения",
      "Психологическое",
      "Декодирование",
    ],
  },
  {
    title: "Реабилитация",
    links: [
      "Алкоголиков",
      "Наркоманов",
      "Игроманов",
      "Амбулаторная",
      "Подростков",
      "За рубежом",
    ],
  },
  {
    title: "Игромания",
    links: [
      "Ставки на спорт",
      "Интернет-зависимость",
      "Соцсети",
      "Компьютерные игры",
      "Гипноз",
    ],
  },
  {
    title: "Созависимость",
    links: [
      "Группы",
      "Курсы восстановления",
      "Здоровая семья",
      "Бесплатные вебинары",
    ],
  },
  {
    title: "Терапия",
    links: [
      "Капельницы от похмелья",
      "Капельницы для мозга",
      "Железные капельницы",
      "Laennec",
      "Золушка",
    ],
  },
  {
    title: "Консультации",
    links: [
      "Терапевт",
      "Нарколог",
      "Психиатр",
      "Психотерапевт",
      "Психолог",
      "Семейный психолог",
      "Клинический психолог",
    ],
  },
] as const;

export const FOOTER_CONTACT = {
  phones: [
    { display: SITE_PHONE_MAIN_DISPLAY, href: `tel:${SITE_PHONE_MAIN}` },
    { display: SITE_PHONE_MOSCOW_DISPLAY, href: `tel:${SITE_PHONE_MOSCOW}` },
  ],
  telegram: { label: "Telegram", href: CONTACT_FORM_TELEGRAM_HREF },
  callback: { label: "Позвоните мне", href: "#contact" },
  locations: [
    {
      title: "Медицинский центр",
      address: SITE_ADDRESS,
      hours: "Ежедневно с 7:00 до 23:00",
    },
    {
      title: "Консультационный центр «Здравница»",
      address: "Москва, Кутузовский пр-т, 36, стр. 1, пом. 101",
      hours: "Ежедневно с 7:00 до 23:00",
    },
  ],
} as const;

export const FOOTER_LEGAL = {
  text: "Информация на сайте не является публичной офертой. Перед началом лечения необходима очная консультация специалиста. ООО «ЦМПП Здравница», ОГРН и реквизиты — в разделе правовой информации.",
  links: [
    { label: "Правовая информация", href: "#" },
    { label: "Политика конфиденциальности", href: "#" },
    { label: "Согласие на обработку персональных данных", href: "#" },
    { label: "Политика cookie", href: "#" },
  ],
  license: "Л041-01137-77/00369606 от 02.12.2019",
  payments: ["МИР", "VISA", "Mastercard", "Долями"],
} as const;

export const FOOTER_BOTTOM_LINKS = [
  "Контакты",
  "О нас",
  "Врачи",
  "Цены",
  "Акции",
  "Блог",
  "Карта сайта",
] as const;

export const FOOTER_COPYRIGHT =
  "© 2018 — 2026 Все права защищены. ООО «ЦМПП Здравница»";
