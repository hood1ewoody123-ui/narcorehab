"use client";

import {
  Footprints,
  HeartStraight,
  LockSimple,
  type Icon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { SAFETY_FEATURES, SAFETY_SUBTITLE, SAFETY_TITLE } from "./safety/constants";

const FEATURE_ICONS: Icon[] = [LockSimple, HeartStraight, Footprints];

const EASE = [0.16, 1, 0.3, 1] as const;

type SafetyProps = {
  /** Внутри общего cream-полотна (без отдельной секции и внешних отступов) */
  embedded?: boolean;
  className?: string;
};

export function Safety({
  embedded = false,
  className,
}: SafetyProps) {
  const reducedMotion = useReducedMotion();
  const animateInView = !embedded;

  const card = (
    <motion.div
      className="rounded-2xl bg-graphite px-6 py-10 md:rounded-3xl md:px-10 md:py-12 lg:px-14 lg:py-14"
      initial={reducedMotion || !animateInView ? false : { opacity: 0, y: 20 }}
      whileInView={animateInView ? { opacity: 1, y: 0 } : undefined}
      viewport={animateInView ? { once: true, margin: "-60px" } : undefined}
      transition={{ duration: 0.55, ease: EASE }}
    >
      <header className="max-w-3xl">
        <h2 className="font-display text-display-sm text-cream md:text-display-md">
          {SAFETY_TITLE}
        </h2>
        <p className="mt-4 font-body text-sm leading-relaxed text-silver md:text-base">
          {SAFETY_SUBTITLE}
        </p>
      </header>

      <ul className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8 md:mt-14 md:gap-10">
        {SAFETY_FEATURES.map((feature, index) => {
          const IconComponent = FEATURE_ICONS[index];

          return (
            <motion.li
              key={feature.title}
              className="flex flex-col items-start"
              initial={reducedMotion || !animateInView ? false : { opacity: 0, y: 12 }}
              whileInView={animateInView ? { opacity: 1, y: 0 } : undefined}
              viewport={animateInView ? { once: true, margin: "-40px" } : undefined}
              transition={{
                duration: 0.5,
                ease: EASE,
                delay: reducedMotion ? 0 : index * 0.06,
              }}
            >
              <span
                className="mb-5 flex size-12 items-center justify-center rounded-full border border-silver/35"
                aria-hidden
              >
                <IconComponent size={24} weight="light" className="text-cream" />
              </span>

              <h3 className="font-body text-base font-medium text-cream md:text-lg">
                {feature.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-silver">
                {feature.description}
              </p>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );

  if (embedded) {
    return (
      <div
        id="safety"
        className={cn(
          "mx-auto w-full max-w-[1280px] px-6 pb-16 md:px-10 md:pb-20 lg:px-14",
          className,
        )}
      >
        {card}
      </div>
    );
  }

  return (
    <section id="safety" className={cn("bg-cream py-16 md:py-20 lg:py-24", className)}>
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10 lg:px-14">
        {card}
      </div>
    </section>
  );
}

export default Safety;
