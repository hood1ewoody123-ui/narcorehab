"use client";

import { motion } from "framer-motion";
import {
  EASE_OUT,
  HERO_CURTAIN_HEIGHT,
  HERO_CURTAIN_VIEW_HEIGHT,
  INTRO_CURTAIN_DURATION,
  SUBTRACT_CURTAIN_PATH,
  SUBTRACT_CURTAIN_WIDTH,
} from "./constants";

type IntroPhase = "splash" | "transition" | "revealed";

type HeroCurtainProps = {
  phase: IntroPhase;
};

export function HeroCurtain({ phase }: HeroCurtainProps) {
  const useShape = phase !== "splash";

  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 z-[35]"
      initial={false}
      animate={{
        top: phase === "splash" ? 0 : `calc(100% - ${HERO_CURTAIN_HEIGHT}px)`,
        height: phase === "splash" ? "100%" : HERO_CURTAIN_HEIGHT,
      }}
      transition={{
        duration: phase === "splash" ? 0 : INTRO_CURTAIN_DURATION,
        ease: EASE_OUT,
      }}
      aria-hidden
    >
      {useShape ? (
        <svg
          className="block h-full w-full"
          viewBox={`0 0 ${SUBTRACT_CURTAIN_WIDTH} ${HERO_CURTAIN_VIEW_HEIGHT}`}
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d={SUBTRACT_CURTAIN_PATH} fill="#F7F7F5" />
        </svg>
      ) : (
        <div className="h-full w-full bg-cream" />
      )}
    </motion.div>
  );
}

export default HeroCurtain;
