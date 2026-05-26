"use client";

import {
  motion,
  useReducedMotion,
  type Transition,
  type Variants,
} from "framer-motion";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  LOGO_HEART_PATHS,
  LOGO_PATHS,
  LOGO_PIVOT,
  LOGO_VIEWBOX,
} from "./logo-paths";

const EASE: Transition["ease"] = [0.16, 1, 0.3, 1];

const HEART_DELAY = 0.72;
const HEART_DURATION = 0.48;
const HEART_LAND_AT = HEART_DELAY + HEART_DURATION * 0.72;

const HEART_FALL = -LOGO_VIEWBOX.height * 0.1;
const TEXT_RISE = LOGO_VIEWBOX.height * 0.023;
const LANDING_BOUNCE = LOGO_VIEWBOX.height * 0.012;

/** Полная длительность intro-анимации: текст заканчивается на ~1.6s */
const LOGO_ANIMATION_DURATION_MS = 1680;

type LogoAnimatedProps = {
  className?: string;
  width?: number;
  showText?: boolean;
  play?: boolean;
  fill?: string;
  onComplete?: () => void;
};

function PivotRotate({
  pivot,
  fromRotate,
  delay,
  duration,
  play,
  reducedMotion,
  fill,
  d,
}: {
  pivot: { x: number; y: number };
  fromRotate: number;
  delay: number;
  duration: number;
  play: boolean;
  reducedMotion: boolean | null;
  fill: string;
  d: string;
}) {
  const instant = Boolean(reducedMotion);
  const settled = !play || instant;

  return (
    <g transform={`translate(${pivot.x} ${pivot.y})`}>
      <motion.g
        initial={
          settled
            ? { rotate: 0, opacity: 1 }
            : { rotate: fromRotate, opacity: 0 }
        }
        animate={{ rotate: 0, opacity: 1 }}
        transition={{
          duration: settled ? 0 : duration,
          delay: settled ? 0 : delay,
          ease: EASE,
        }}
      >
        <g transform={`translate(${-pivot.x} ${-pivot.y})`}>
          <path d={d} fill={fill} />
        </g>
      </motion.g>
    </g>
  );
}

function buildSlideVariants(
  offset: number,
  delay: number,
  duration: number,
): Variants {
  return {
    hidden: { opacity: 0, y: offset },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, delay, ease: EASE },
    },
  };
}

export function LogoAnimated({
  className,
  width = 200,
  showText = true,
  play = true,
  fill = "white",
  onComplete,
}: LogoAnimatedProps) {
  const reducedMotion = useReducedMotion();
  const instant = Boolean(reducedMotion);
  const settled = !play || instant;
  const height = (width / LOGO_VIEWBOX.width) * LOGO_VIEWBOX.height;

  const heartVariants = buildSlideVariants(
    HEART_FALL,
    instant ? 0 : HEART_DELAY,
    HEART_DURATION,
  );
  const textVariants = buildSlideVariants(
    TEXT_RISE,
    instant ? 0 : 1.12,
    0.48,
  );

  const landingDelay = instant ? 0 : HEART_LAND_AT;

  useEffect(() => {
    if (!play || !onComplete) return;

    if (instant) {
      onComplete();
      return;
    }

    const timer = window.setTimeout(onComplete, LOGO_ANIMATION_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [play, onComplete, instant]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("block shrink-0", className)}
      aria-label="ЦМПП «Здравница»"
      role="img"
    >
      <motion.g
        initial={{ y: 0 }}
        animate={
          play && !instant
            ? { y: [0, LANDING_BOUNCE, 0] }
            : { y: 0 }
        }
        transition={{
          delay: landingDelay,
          duration: 0.28,
          ease: EASE,
        }}
      >
        <PivotRotate
          pivot={LOGO_PIVOT}
          fromRotate={-45}
          delay={0}
          duration={0.52}
          play={play}
          reducedMotion={reducedMotion}
          fill={fill}
          d={LOGO_PATHS.leftHand}
        />

        <PivotRotate
          pivot={LOGO_PIVOT}
          fromRotate={45}
          delay={0.34}
          duration={0.52}
          play={play}
          reducedMotion={reducedMotion}
          fill={fill}
          d={LOGO_PATHS.rightHand}
        />

        <motion.g
          variants={heartVariants}
          initial={settled ? "visible" : "hidden"}
          animate="visible"
        >
          {LOGO_HEART_PATHS.map((d, i) => (
            <path key={`heart-${i}`} d={d} fill={fill} />
          ))}
        </motion.g>
      </motion.g>

      {showText ? (
        <motion.g
          variants={textVariants}
          initial={settled ? "visible" : "hidden"}
          animate="visible"
        >
          {LOGO_PATHS.text.map((d, i) => (
            <path key={`text-${i}`} d={d} fill={fill} />
          ))}
        </motion.g>
      ) : null}
    </svg>
  );
}

export default LogoAnimated;
