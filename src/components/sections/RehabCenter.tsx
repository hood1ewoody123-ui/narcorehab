"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type RehabCard = {
  id: string;
  title: string;
  text: string;
  cta: string;
  image: string;
  alt: string;
};

const REHAB_CARDS: RehabCard[] = [
  {
    id: "care-24-7",
    title: "Круглосуточная поддержка",
    text: "В первые дни рядом команда, которая помогает пройти сложный период спокойно и безопасно.",
    cta: "Понять, как проходит первые сутки",
    image: "/images/rehab/1.png",
    alt: "Поддержка пациента в первые дни",
  },
  {
    id: "center-space",
    title: "Отдельный реабилитационный центр",
    text: "Тихая территория и продуманное пространство помогают сосредоточиться на восстановлении без лишнего шума.",
    cta: "Посмотреть, где проходит программа",
    image: "/images/rehab/2.png",
    alt: "Здание реабилитационного центра",
  },
  {
    id: "nature-rhythm",
    title: "Природа и спокойный ритм",
    text: "Зелёная территория снижает напряжение и помогает возвращать ощущение опоры шаг за шагом.",
    cta: "Узнать, как устроен день в центре",
    image: "/images/rehab/3.png",
    alt: "Территория центра и природа",
  },
  {
    id: "comfortable-rooms",
    title: "Комфортные условия проживания",
    text: "Аккуратные номера, чистота и базовый бытовой комфорт создают ровный фон для лечения и восстановления.",
    cta: "Уточнить условия размещения",
    image: "/images/rehab/4.png",
    alt: "Номер для проживания в центре",
  },
];

const STICKY_TOP = "top-20 md:top-24";

export default function RehabCenter() {
  return (
    <section
      id="rehab-center"
      className="bg-cream py-20 md:py-24 lg:py-28"
      aria-labelledby="rehab-center-title"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10 lg:px-14">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1fr] lg:gap-10">
          <aside className={cn("lg:sticky lg:self-start", STICKY_TOP)}>
            <p className="font-body text-xs uppercase tracking-[0.14em] text-gray">
              Реабилитационный центр
            </p>
            <h2
              id="rehab-center-title"
              className="mt-3 font-display text-display-sm text-graphite md:text-[clamp(34px,3.2vw,48px)] md:leading-[1.08]"
            >
              Спокойное пространство для устойчивого восстановления
            </h2>
            <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-gray md:text-base">
              В центре мы соединяем медицинское сопровождение, психотерапию и понятный режим дня.
              Ниже вы можете увидеть, из каких условий складывается безопасная реабилитация.
            </p>
            <Link
              href="#contact"
              className="mt-7 inline-flex rounded-full border border-graphite px-5 py-2.5 font-body text-sm text-graphite transition-colors duration-200 hover:border-teal hover:text-teal"
            >
              Обсудить программу центра
            </Link>
          </aside>

          <div className="space-y-6 md:space-y-8">
            {REHAB_CARDS.map((card, index) => (
              <article
                key={card.id}
                className={cn(
                  "group relative isolate overflow-hidden rounded-2xl border border-[var(--line)] shadow-[var(--shadow-md)] md:rounded-3xl",
                  "h-[340px] sm:h-[380px] md:h-[420px]",
                  "lg:sticky",
                  STICKY_TOP,
                )}
                style={{ zIndex: index + 1 }}
              >
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-cover grayscale"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/25" />

                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5 text-cream md:p-7">
                  <h3 className="font-display text-[clamp(28px,3vw,38px)] leading-[1.02]">{card.title}</h3>
                  <p className="max-w-[48ch] font-body text-sm leading-relaxed text-silver md:text-base">
                    {card.text}
                  </p>
                  <span className="inline-flex w-fit border-b border-white/50 pb-1 font-body text-xs uppercase tracking-[0.1em] text-cream/95">
                    {card.cta}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
