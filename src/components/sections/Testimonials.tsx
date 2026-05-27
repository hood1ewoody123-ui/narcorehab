"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Testimonial = {
  role: string;
  text: string;
};

type ReviewItem = {
  author: string;
  text: string;
};

type ReviewFeed = {
  id: string;
  name: string;
  rating: string;
  leftScore: string;
  leftMeta: string;
  rightScore: string;
  rightMeta: string;
  leftItems: ReviewItem[];
  rightItems: ReviewItem[];
};

const TESTIMONIALS: Testimonial[] = [
  {
    role: "Мама пациента · анонимно",
    text: "После консультации появился план — стало меньше хаоса в семье",
  },
  {
    role: "Супруга пациента · анонимно",
    text: "Важно, что с нами говорили спокойно и по делу, без давления",
  },
  {
    role: "Пациент · анонимно",
    text: "На первом приеме стало понятно, какой шаг следующий и зачем он нужен",
  },
  {
    role: "Дочь пациента · анонимно",
    text: "Мы получили понятный маршрут помощи и поддержку для всей семьи",
  },
  {
    role: "Брат пациента · анонимно",
    text: "После беседы тревоги стало меньше, появилась ясность по срокам и формату",
  },
];

const AUTO_SWITCH_MS = 5500;
const REVIEW_FEEDS: ReviewFeed[] = [
  {
    id: "yandex",
    name: "Яндекс",
    rating: "5.0",
    leftScore: "5,0",
    leftMeta: "127 оценок",
    rightScore: "4,9",
    rightMeta: "89 отзывов",
    leftItems: [
      { author: "Ирина · 12.01", text: "Спокойно объяснили маршрут помощи сыну" },
      { author: "Аноним · 03.12", text: "Без давления, конфиденциально, с уважением к семье" },
    ],
    rightItems: [
      { author: "Мария · 15 отзывов", text: "После консультации появился понятный план для семьи" },
      { author: "Алексей", text: "Деликатный подход и прозрачные рекомендации" },
    ],
  },
  {
    id: "2gis",
    name: "2ГИС",
    rating: "4.9",
    leftScore: "4,9",
    leftMeta: "96 оценок",
    rightScore: "4,8",
    rightMeta: "51 отзыв",
    leftItems: [
      { author: "Юлия", text: "Врачи деликатно объяснили шаги и риски, стало спокойнее" },
      { author: "Семья пациента", text: "Получили конкретный маршрут без лишних обещаний" },
    ],
    rightItems: [
      { author: "Ольга", text: "Поддержали на первом этапе и помогли определиться с форматом" },
      { author: "Игорь", text: "Четко, анонимно и с уважением к ситуации" },
    ],
  },
  {
    id: "flamp",
    name: "Flamp",
    rating: "4.8",
    leftScore: "4,8",
    leftMeta: "43 оценки",
    rightScore: "4,8",
    rightMeta: "34 отзыва",
    leftItems: [
      { author: "Екатерина", text: "Обратная связь быстрая, подробно ответили на вопросы" },
      { author: "Анонимно", text: "Не давили, помогли выбрать безопасный первый шаг" },
    ],
    rightItems: [
      { author: "Наталья", text: "Понравился спокойный тон и ясные рекомендации" },
      { author: "Михаил", text: "Прозрачный ориентир по стоимости и этапам" },
    ],
  },
  {
    id: "infodoctor",
    name: "infodoctor",
    rating: "4.9",
    leftScore: "4,9",
    leftMeta: "67 оценок",
    rightScore: "5,0",
    rightMeta: "22 отзыва",
    leftItems: [
      { author: "Валентина", text: "Консультация прошла спокойно и по делу" },
      { author: "Сын пациента", text: "Появилось понимание, как действовать дальше" },
    ],
    rightItems: [
      { author: "Елена", text: "Внимательный специалист, все объяснил простыми словами" },
      { author: "Аноним", text: "Удобно, что можно начать с онлайн-формата" },
    ],
  },
  {
    id: "other",
    name: "+2",
    rating: "",
    leftScore: "4,9",
    leftMeta: "40+ оценок",
    rightScore: "4,9",
    rightMeta: "20+ отзывов",
    leftItems: [
      { author: "Пациент", text: "Подобрали программу без резких решений и давления" },
      { author: "Супруга", text: "Стало понятнее, что делать семье уже сегодня" },
    ],
    rightItems: [
      { author: "Родственник", text: "Конфиденциально и очень бережно в общении" },
      { author: "Анонимно", text: "Команда объяснила каждый шаг и сроки" },
    ],
  },
];

export default function Testimonials() {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeFeedId, setActiveFeedId] = useState(REVIEW_FEEDS[0].id);
  const [flowerVisible, setFlowerVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setFlowerVisible(true);
      },
      { threshold: 0.18 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, AUTO_SWITCH_MS);

    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  const activeItem = useMemo(() => TESTIMONIALS[activeIndex], [activeIndex]);
  const activeFeed = useMemo(
    () => REVIEW_FEEDS.find((feed) => feed.id === activeFeedId) ?? REVIEW_FEEDS[0],
    [activeFeedId],
  );

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative overflow-visible bg-cream py-24 md:py-28 lg:py-32"
      aria-labelledby="testimonials-title"
    >
      <div className="relative z-10 mx-auto w-full max-w-[980px] px-6 text-center md:px-10 lg:px-14">
        <h2
          id="testimonials-title"
          className="font-display text-display-sm text-graphite md:text-[clamp(32px,3.2vw,46px)] md:leading-[1.15]"
        >
          Что говорят клиенты
        </h2>

        <p className="mt-8 font-body text-sm text-gray md:mt-9 md:text-base">{activeItem.role}</p>

        <p className="mx-auto mt-7 max-w-[760px] font-display text-[clamp(28px,3.2vw,52px)] leading-[1.15] text-graphite">
          «{activeItem.text}»
        </p>

        <div className="mt-8 flex items-center justify-center gap-2.5 md:mt-10">
          {TESTIMONIALS.map((_, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "h-2.5 w-2.5 rounded-full border border-gray/60 transition-colors duration-200",
                  isActive ? "bg-gray/70" : "bg-transparent hover:bg-gray/30",
                )}
                aria-label={`Показать отзыв ${index + 1}`}
                aria-current={isActive}
              />
            );
          })}
        </div>
      </div>

      <div className="relative mx-auto mt-16 w-full max-w-[1280px] overflow-visible px-6 md:mt-20 md:px-10 lg:px-14">
        {/* Нижний край цветка — по центру glass-плашки, стебель вверх */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 z-[5] w-[35vw] min-w-[260px] max-w-[460px] -translate-x-1/2 -translate-y-full">
          <Image
            src="/images/testimonials-flower.png"
            alt=""
            width={1280}
            height={1510}
            className={cn(
              "relative z-[1] h-auto w-full object-contain object-bottom mix-blend-multiply",
              "transition-[opacity,filter,transform] duration-700 ease-out-expo",
              flowerVisible ? "opacity-90 blur-0 translate-y-0" : "opacity-0 blur-xl translate-y-5",
            )}
            sizes="35vw"
            priority={false}
            aria-hidden
          />
          <Image
            src="/images/testimonials-flower.png"
            alt=""
            width={1280}
            height={1510}
            className={cn(
              "absolute inset-x-0 bottom-0 z-[2] h-[55%] w-full object-contain object-bottom mix-blend-multiply blur-md",
              "[mask-image:linear-gradient(to_top,black_0%,transparent_100%)]",
              flowerVisible ? "opacity-40" : "opacity-0",
            )}
            sizes="35vw"
            priority={false}
            aria-hidden
          />
        </div>

        <div className="relative z-10 rounded-2xl border border-white/45 bg-white/40 p-5 backdrop-blur-md md:rounded-3xl md:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <h3 className="max-w-xl font-display text-display-sm text-graphite md:text-[clamp(30px,3vw,40px)] md:leading-[1.15]">
              Отзывы, оставленные о нашем Центре на сторонних площадках
            </h3>
            <ul className="flex flex-wrap items-center gap-2 md:justify-end">
              {REVIEW_FEEDS.map((source) => {
                const isActive = source.id === activeFeed.id;
                return (
                <li key={source.id}>
                  <button
                    type="button"
                    onClick={() => setActiveFeedId(source.id)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-3 py-2 transition-colors duration-200",
                      isActive
                        ? "border-graphite/35 bg-cream text-graphite"
                        : "border-[var(--line)] bg-cream/75 text-gray hover:border-graphite/25 hover:text-graphite",
                    )}
                  >
                  <span className="h-5 w-5 rounded-full bg-silver/50" aria-hidden />
                  <span className="font-body text-xs text-graphite">{source.name}</span>
                  {source.rating ? (
                    <span className="rounded-full bg-teal px-1.5 py-0.5 font-body text-[11px] text-cream">
                      {source.rating}
                    </span>
                  ) : null}
                  </button>
                </li>
              )})}
            </ul>
          </div>

          <div className="mt-5 grid gap-4 md:mt-6 md:grid-cols-2">
            <article className="rounded-2xl border border-white/50 bg-cream/55 p-4 backdrop-blur-sm md:p-5">
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                <div className="flex items-end gap-2">
                  <p className="font-body text-2xl font-semibold text-graphite">{activeFeed.leftScore}</p>
                  <p className="font-body text-sm text-gray">{activeFeed.leftMeta}</p>
                </div>
                <button
                  type="button"
                  className="rounded-xl border border-[var(--line)] bg-cream/70 px-4 py-2 font-body text-sm text-graphite transition-colors duration-200 hover:border-teal hover:bg-teal hover:text-cream"
                >
                  Оценить
                </button>
              </div>
              <ul className="mt-3 space-y-2">
                {activeFeed.leftItems.map((item) => (
                  <li key={`${activeFeed.id}-${item.author}`} className="rounded-xl bg-white/35 p-3">
                    <p className="font-body text-sm font-medium text-graphite">{item.author}</p>
                    <p className="mt-1 font-body text-sm text-gray">{item.text}</p>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-white/50 bg-cream/55 p-4 backdrop-blur-sm md:p-5">
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                <p className="font-body text-2xl font-semibold text-graphite">{activeFeed.rightScore}</p>
                <p className="font-body text-sm text-gray">{activeFeed.rightMeta}</p>
              </div>
              <ul className="mt-3 space-y-2">
                {activeFeed.rightItems.map((item) => (
                  <li key={`${activeFeed.id}-${item.author}`} className="rounded-xl bg-white/35 p-3">
                    <p className="font-body text-sm font-medium text-graphite">{item.author}</p>
                    <p className="mt-1 font-body text-sm text-gray">{item.text}</p>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
