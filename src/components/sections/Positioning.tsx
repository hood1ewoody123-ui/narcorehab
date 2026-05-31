"use client";

import { cn } from "@/lib/utils";
import { lightCard } from "@/lib/theme";
import { motion, useReducedMotion } from "framer-motion";
import {
  POSITIONING_EYEBROW,
  POSITIONING_LEAD,
  POSITIONING_PILLARS,
  POSITIONING_STATS,
  POSITIONING_TITLE,
} from "./positioning/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

type PositioningProps = {
  className?: string;
};

export function Positioning({ className }: PositioningProps) {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="about"
      className={cn(
        "mx-auto w-full max-w-[1280px] px-6 pb-12 pt-4 md:px-10 md:pb-16 md:pt-6 lg:px-14",
        className,
      )}
      aria-labelledby="positioning-title"
    >
      <motion.header
        className="max-w-4xl"
        initial={reducedMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <p className="text-section-label">{POSITIONING_EYEBROW}</p>
        <h2
          id="positioning-title"
          className="mt-4 font-display text-display-sm text-graphite md:text-display-md"
        >
          {POSITIONING_TITLE}
        </h2>
        <p className="mt-6 max-w-3xl text-section-body">{POSITIONING_LEAD}</p>
      </motion.header>

      <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {POSITIONING_PILLARS.map((pillar, index) => (
          <motion.li
            key={pillar.title}
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, ease: EASE, delay: reducedMotion ? 0 : index * 0.05 }}
          >
            <div
              className={cn(
                lightCard,
                "flex h-full flex-col px-5 py-6 md:px-6 md:py-7",
              )}
            >
              <h3 className="font-body text-lg font-medium text-graphite md:text-xl">
                {pillar.title}
              </h3>
              <p className="mt-3 text-section-muted">{pillar.description}</p>
            </div>
          </motion.li>
        ))}
      </ul>

      <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-[var(--line)] pt-10 md:mt-14 md:gap-8">
        {POSITIONING_STATS.map((stat) => (
          <div key={stat.label} className="text-center md:text-left">
            <dt className="font-display text-display-sm text-teal md:text-[clamp(28px,3vw,40px)]">
              {stat.value}
            </dt>
            <dd className="mt-2 text-section-muted">{stat.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default Positioning;
