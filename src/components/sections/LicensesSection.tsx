"use client";

import { cn } from "@/lib/utils";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";
import { LICENSES, LICENSES_TITLE } from "./licenses/constants";

const VISIBLE_DESKTOP = 4;

function LicenseCard({ imageSrc, alt }: { imageSrc: string; alt: string }) {
  return (
    <article className="rounded-2xl border border-[var(--line)] bg-cream p-2 shadow-[var(--shadow-sm)]">
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-[var(--line)] bg-cream">
        <Image src={imageSrc} alt={alt} fill className="object-contain object-center p-1" sizes="240px" />
      </div>
    </article>
  );
}

export default function LicensesSection() {
  const [offset, setOffset] = useState(0);

  const canPrev = offset > 0;
  const canNext = offset < LICENSES.length - VISIBLE_DESKTOP;

  return (
    <section id="licenses" className="bg-cream py-20 md:py-24" aria-labelledby="licenses-title">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10 lg:px-14">
        <h2
          id="licenses-title"
          className="font-display text-display-sm text-graphite md:text-[clamp(30px,3vw,40px)]"
        >
          {LICENSES_TITLE}
        </h2>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:hidden">
          {LICENSES.map((item) => (
            <LicenseCard key={item.id} imageSrc={item.imageSrc} alt={item.alt} />
          ))}
        </div>

        <div className="relative mt-5 hidden sm:block">
          <button
            type="button"
            onClick={() => canPrev && setOffset((prev) => prev - 1)}
            className={cn(
              "absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[var(--line)] bg-cream p-2 shadow-[var(--shadow-sm)]",
              !canPrev && "opacity-40",
            )}
            aria-label="Прокрутить влево"
          >
            <CaretLeft size={16} className="text-graphite" />
          </button>

          <div className="overflow-hidden px-10">
            <div
              className="flex gap-4 transition-transform duration-300"
              style={{ transform: `translateX(-${offset * 25}%)` }}
            >
              {LICENSES.map((item) => (
                <div key={item.id} className="w-1/4 shrink-0">
                  <LicenseCard imageSrc={item.imageSrc} alt={item.alt} />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => canNext && setOffset((prev) => prev + 1)}
            className={cn(
              "absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[var(--line)] bg-cream p-2 shadow-[var(--shadow-sm)]",
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
