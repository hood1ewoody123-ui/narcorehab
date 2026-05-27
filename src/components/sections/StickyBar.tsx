"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { STICKY_BAR_ACTIONS } from "@/components/widgets/floating-ui/constants";
import { useFloatingUi } from "@/components/widgets/floating-ui/FloatingUiContext";

const EASE = [0.16, 1, 0.3, 1] as const;

const btnClass =
  "flex flex-1 items-center justify-center rounded-full bg-teal px-2 py-2.5 font-body text-xs font-medium text-cream transition-colors hover:bg-teal/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal";

export default function StickyBar() {
  const reducedMotion = useReducedMotion();
  const { pastScrollThreshold, openMila } = useFloatingUi();

  return (
    <motion.div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-40 md:hidden",
        "pb-[max(0.75rem,env(safe-area-inset-bottom))] px-4",
      )}
      initial={false}
      animate={{
        opacity: pastScrollThreshold ? 1 : 0,
        y: pastScrollThreshold ? 0 : reducedMotion ? 0 : 16,
      }}
      transition={{ duration: reducedMotion ? 0 : 0.4, ease: EASE }}
      aria-hidden={!pastScrollThreshold}
    >
      <div
        className={cn(
          "pointer-events-auto mx-auto max-w-[390px] rounded-full border border-[var(--line)]/50",
          "bg-cream/95 p-1 shadow-[var(--shadow-lg)] backdrop-blur-md",
          !pastScrollThreshold && "pointer-events-none",
        )}
      >
        <div className="flex gap-1">
          {STICKY_BAR_ACTIONS.map((action) =>
            action.id === "message" ? (
              <button key={action.id} type="button" onClick={openMila} className={btnClass}>
                {action.label}
              </button>
            ) : (
              <Link key={action.id} href={action.href} className={btnClass}>
                {action.label}
              </Link>
            ),
          )}
        </div>
      </div>
    </motion.div>
  );
}
