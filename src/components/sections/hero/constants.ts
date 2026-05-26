/** Точный path из Subtract.svg (Figma export) */
export const SUBTRACT_CURTAIN_PATH =
  "M1200 906 H0 V0 C1.93289e-07 11.0457 8.95431 20 20 20 H1180 C1191.05 20 1200 11.0457 1200 0 V906 Z";

export const SUBTRACT_CURTAIN_WIDTH = 1200;
export const HERO_CURTAIN_VIEW_HEIGHT = 112;
export const HERO_CURTAIN_HEIGHT = 112;

export const LOGO_INTRO_WIDTH = 220;
export const LOGO_HEADER_WIDTH = 92;
/** Высота логотипа в header (пропорция viewBox 505.6×445.6) */
export const LOGO_HEADER_HEIGHT = Math.round(
  (LOGO_HEADER_WIDTH / 505.6) * 445.6,
);

export const INTRO_LOGO_PAUSE_MS = 450;
export const INTRO_CURTAIN_DURATION = 1.15;
export const INTRO_LOGO_FLIGHT_DURATION = 1.05;

export const HEADLINE_POSITIONING =
  "Клиника психиатрии, наркологии и восстановления личности";

export const HERO_SUBHEADLINE =
  "Комплексная медицинская и психологическая помощь при зависимостях, тревоге и кризисных состояниях.";

export const SITE_ADDRESS = "Москва, Кутузовский пр-т, 36с1";

export const SITE_PHONE_MAIN = "88003006103";
export const SITE_PHONE_MAIN_DISPLAY = "8 800 300 61 03";

export const SITE_PHONE_MOSCOW = "84955324403";
export const SITE_PHONE_MOSCOW_DISPLAY = "8 495 532 44 03";

export const NAV_LEFT = [
  { label: "о нас", href: "#about" },
  { label: "специалисты", href: "#specialists" },
  { label: "услуги", href: "#services" },
] as const;

export const NAV_RIGHT = [
  { label: "стоимость", href: "#pricing" },
  { label: "документация", href: "#docs" },
] as const;

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
