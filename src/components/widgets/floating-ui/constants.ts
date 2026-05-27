import { SITE_PHONE_MAIN } from "@/components/sections/hero/constants";

/** Появление sticky / floating CTA после 20–25% скролла */
export const FLOATING_UI_SCROLL_THRESHOLD = 0.22;

export const STICKY_BAR_ACTIONS = [
  {
    id: "call",
    label: "Позвонить",
    href: `tel:+${SITE_PHONE_MAIN}`,
  },
  {
    id: "message",
    label: "Написать",
    action: "open-mila" as const,
  },
  {
    id: "book",
    label: "Записаться",
    href: "#contact",
  },
] as const;

export const FLOATING_CTA_TITLE = "Нужна помощь?";

export const FLOATING_CTA_ACTIONS = [
  {
    label: "Позвонить",
    href: `tel:+${SITE_PHONE_MAIN}`,
  },
  {
    label: "Получить консультацию",
    href: "#contact",
  },
] as const;
