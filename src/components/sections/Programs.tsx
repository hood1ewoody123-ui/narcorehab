"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import { useState } from "react";
import {
  PROGRAMS_ITEMS,
  PROGRAMS_SUBTITLE,
  PROGRAMS_TITLE,
} from "./programs/constants";

export function Programs() {
  const reducedMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string>(PROGRAMS_ITEMS[0].id);

  return (
    <section
      id="programs"
      className="relative overflow-visible bg-cream"
      aria-labelledby="programs-title"
    >
      {/* z-30 — заголовок и аккордеон поверх «люди в блюре» (z-20) */}
      <div className="relative z-[30] mx-auto w-full max-w-[1280px] px-6 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24">
        <header className="max-w-3xl">
          <h2
            id="programs-title"
            className="font-display text-display-md text-graphite md:text-[clamp(32px,3.8vw,52px)] md:leading-[1.12]"
          >
            {PROGRAMS_TITLE}
          </h2>
          <p className="mt-4 font-body text-sm leading-relaxed text-graphite/75 md:text-base md:leading-relaxed">
            {PROGRAMS_SUBTITLE}
          </p>
        </header>

        <ul className="mt-12 border-t border-[var(--line)] md:mt-14">
          {PROGRAMS_ITEMS.map((item) => {
            const isOpen = openId === item.id;

            return (
              <li key={item.id} className="border-b border-[var(--line)]">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-6 py-5 text-left md:py-6"
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? "" : item.id)}
                >
                  <span className="font-body text-base text-graphite md:text-lg">
                    {item.title}
                  </span>
                  <span
                    className="shrink-0 font-body text-xl leading-none text-graphite/60 md:text-2xl"
                    aria-hidden
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo",
                    reducedMotion
                      ? isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                      : isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 font-body text-sm leading-relaxed text-graphite/70 md:pb-6 md:text-base">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default Programs;
