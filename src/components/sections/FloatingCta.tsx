"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  FLOATING_CTA_ACTIONS,
  FLOATING_CTA_TITLE,
} from "@/components/widgets/floating-ui/constants";
import { useFloatingUi } from "@/components/widgets/floating-ui/FloatingUiContext";

const EASE = [0.16, 1, 0.3, 1] as const;

const btnClass =
  "flex w-full items-center justify-center rounded-lg bg-teal px-4 py-2.5 font-body text-sm font-medium text-cream transition-colors hover:bg-teal/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal";

export default function FloatingCta() {
  const reducedMotion = useReducedMotion();
  const { pastScrollThreshold } = useFloatingUi();

  return (
    <motion.aside
      className={cn(
        "pointer-events-none fixed bottom-8 left-6 z-40 hidden w-[min(240px,calc(100vw-8rem))] lg:block",
      )}
      initial={false}
      animate={{
        opacity: pastScrollThreshold ? 1 : 0,
        x: pastScrollThreshold ? 0 : reducedMotion ? 0 : -12,
      }}
      transition={{ duration: reducedMotion ? 0 : 0.4, ease: EASE }}
      aria-hidden={!pastScrollThreshold}
      aria-label="Быстрые действия"
    >
      <div
        className={cn(
          "pointer-events-auto rounded-2xl border border-[var(--line)] bg-cream/95 p-5 shadow-[var(--shadow-md)] backdrop-blur-sm",
          !pastScrollThreshold && "pointer-events-none",
        )}
      >
        <h2 className="font-display text-xl leading-tight text-graphite">{FLOATING_CTA_TITLE}</h2>
        <div className="mt-4 flex flex-col gap-2">
          {FLOATING_CTA_ACTIONS.map((action) => (
            <Link key={action.label} href={action.href} className={btnClass}>
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}
