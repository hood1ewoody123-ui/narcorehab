/** Кремовая тема (основной лендинг) */

export const surfaceCard =
  "rounded-2xl border border-[var(--line)] bg-cream shadow-[var(--shadow-sm)] md:rounded-3xl";

export const btnPrimary =
  "bg-teal text-cream transition-colors duration-200 hover:bg-teal/90";

export const chipActive = "border-teal bg-teal text-cream";

export const chipInactive =
  "border-[var(--line)] bg-cream text-graphite transition-colors hover:border-teal/40";

/** Светлые карточки секций — Safety, FAQ (премиум, как у референсов) */

export const lightCard =
  "rounded-2xl border border-[var(--line)] bg-white shadow-[var(--shadow-sm)] md:rounded-3xl";

export const lightDivider = "border-[var(--line)]";

export const lightTitle = "text-graphite";

export const lightSubtitle = "text-graphite";

export const lightMuted = "text-gray";

/** @deprecated Используйте lightCard — оставлено для постепенной миграции */
export const darkCard = lightCard;
export const darkDivider = lightDivider;
export const darkTitle = lightTitle;
export const darkSubtitle = lightSubtitle;
export const darkMuted = lightMuted;
