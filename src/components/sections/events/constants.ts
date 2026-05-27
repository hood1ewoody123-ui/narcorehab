export const EVENTS_TITLE = "Мероприятия центра";

export const EVENTS_ALL_HREF = "/meropriyatiya";

export const EVENTS_ALL_LABEL = "Все мероприятия центра";

export type CenterEvent = {
  id: string;
  title: string;
  excerpt: string;
  readMinutes: number;
  imageSrc: string;
  href: string;
};

export const CENTER_EVENTS: CenterEvent[] = [
  {
    id: "event-1",
    title: "Реабилитационные центры в России: перспективы и тенденции",
    excerpt:
      "Обсудили развитие реабилитационных программ, стандарты помощи и роль семьи в устойчивом восстановлении.",
    readMinutes: 2,
    imageSrc: "/images/events/1.jpg",
    href: "#",
  },
  {
    id: "event-2",
    title: "Рамадан и выздоровление",
    excerpt:
      "Спокойный разговор о том, как сочетать духовные практики, режим дня и медицинскую поддержку в период поста.",
    readMinutes: 2,
    imageSrc: "/images/events/2.jpg",
    href: "#",
  },
  {
    id: "event-3",
    title: "21-й Международный Антинаркотический лагерь: нас не догонят",
    excerpt:
      "Команда центра поделилась опытом профилактики и поддержки подростков в полевых форматах.",
    readMinutes: 3,
    imageSrc: "/images/events/3.jpg",
    href: "#",
  },
  {
    id: "event-4",
    title: "Порядок работы РЦ: круглый стол в Госдуме",
    excerpt:
      "Эксперты обсудили прозрачные правила работы реабилитационных центров и защиту прав пациентов.",
    readMinutes: 2,
    imageSrc: "/images/events/4.jpg",
    href: "#",
  },
  {
    id: "event-5",
    title:
      "Федеральные стандарты реабилитации: участие ЦМПП «Здравница» в экспертной дискуссии",
    excerpt:
      "Представили практический взгляд на внедрение стандартов — от диагностики до сопровождения семьи.",
    readMinutes: 3,
    imageSrc: "/images/events/5.jpeg",
    href: "#",
  },
  {
    id: "event-6",
    title: "Цель вижу",
    excerpt:
      "Открытый формат о мотивации, внимании и навыках, которые помогают удерживать курс после курса.",
    readMinutes: 2,
    imageSrc: "/images/events/6.jpg",
    href: "#",
  },
];
