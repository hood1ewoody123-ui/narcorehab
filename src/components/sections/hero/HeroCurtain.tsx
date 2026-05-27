"use client";

import {
  CREAM,
  HERO_CURTAIN_HEIGHT,
  SUBTRACT_CURTAIN_PATH,
  SUBTRACT_CURTAIN_VIEW_HEIGHT,
  SUBTRACT_CURTAIN_WIDTH,
} from "@/lib/subtract-curtain";
import { motion } from "framer-motion";
import {
  EASE_OUT,
  INTRO_CURTAIN_DURATION,
} from "./constants";

type IntroPhase = "splash" | "transition" | "revealed";

type HeroCurtainProps = {
  phase: IntroPhase;
};

/** SVG растягивается с контейнером при спуске → subtract виден в финальной позиции */
function CurtainShape() {
  return (
    <svg
      className="block h-full w-full"
      viewBox={`0 0 ${SUBTRACT_CURTAIN_WIDTH} ${SUBTRACT_CURTAIN_VIEW_HEIGHT}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      <path d={SUBTRACT_CURTAIN_PATH} fill={CREAM} />
    </svg>
  );
}

export function HeroCurtain({ phase }: HeroCurtainProps) {
  const showShape = phase !== "splash";

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
      {showShape ? (
        <CurtainShape />
      ) : (
        <div className="h-full w-full bg-cream" aria-hidden />
      )}
    </motion.div>
  );
}

export default HeroCurtain;
