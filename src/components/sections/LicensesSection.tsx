"use client";

import { cn } from "@/lib/utils";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useState } from "react";

const LICENSES = [
  "Выписка из реестра ОГР · лицензия",
  "Приложение подпись · печать",
  "Сан.-эпид. заключение",
  "Документ 4",
  "Документ 5",
];

export default function LicensesSection() {
  const [offset, setOffset] = useState(0);

  const canPrev = offset > 0;
  const canNext = offset < LICENSES.length - 4;

  return (
    <section id="licenses" className="bg-cream py-20 md:py-24" aria-labelledby="licenses-title">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10 lg:px-14">
        <h2 id="licenses-title" className="font-display text-display-sm text-graphite md:text-[clamp(30px,3vw,40px)]">
          Лицензия и сертификаты
        </h2>

        <div className="relative mt-5">
          <button
            type="button"
            onClick={() => canPrev && setOffset((prev) => prev - 1)}
            className={cn(
              "absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[var(--line)] bg-cream p-2",
              !canPrev && "opacity-40",
            )}
            aria-label="Прокрутить влево"
          >
            <CaretLeft size={16} className="text-graphite" />
          </button>

          <div className="overflow-hidden">
            <div className="flex gap-4 transition-transform duration-300" style={{ transform: `translateX(-${offset * 25}%)` }}>
              {LICENSES.map((item) => (
                <article key={item} className="min-w-[24%] rounded-2xl border border-[var(--line)] p-2">
                  <div className="flex aspect-[3/4] items-center justify-center rounded-xl border border-dashed border-[var(--line)] bg-silver/20 p-4 text-center">
                    <span className="font-body text-sm text-gray">{item}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => canNext && setOffset((prev) => prev + 1)}
            className={cn(
              "absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[var(--line)] bg-cream p-2",
              !canNext && "opacity-40",
            )}
            aria-label="Прокрутить вправо"
          >
            <CaretRight size={16} className="text-graphite" />
          </button>
        </div>
      </div>
    </section>
  );
}
