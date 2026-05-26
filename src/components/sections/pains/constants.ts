export const PAINS_TITLE = "Когда уже трудно справляться одному";

export const PAINS_SUBTITLE =
  "Тревога, зависимость или семейное напряжение разрушают жизнь.";

export const PAINS_COLUMNS = [
  {
    title: "Тревога и депрессия",
    items: [
      "Постоянное напряжение и страх",
      "Потеря интереса к жизни, упадок сил",
      "Перепады настроения, навязчивые мысли",
    ],
    cta: "Вернуть баланс",
    href: "#programs",
  },
  {
    title: "Зависимости",
    items: [
      "Потеря контроля над привычками",
      "Цикл «обещание – срыв – стыд»",
      "Тяга к алкоголю, веществам, играм",
    ],
    cta: "Прекратить цикл",
    href: "#programs",
  },
  {
    title: "Семейный кризис и выгорание",
    items: [
      "Близкие хотят помочь, но не знают как",
      "Острое эмоциональное истощение",
      "Ощущение тупика в отношениях",
    ],
    cta: "Найти поддержку",
    href: "#family",
  },
] as const;

/** Scroll-дистанция анимации подъёма Subtract */
export const PAINS_ANIMATION_SCROLL_VH = 70;

export const PAINS_CURTAIN_RISE_END = 1;
/** Fade контента внутри той же панели — чуть позже старта подъёма */
export const PAINS_CONTENT_FADE_START = 0.32;
export const PAINS_CONTENT_FADE_END = 0.62;
