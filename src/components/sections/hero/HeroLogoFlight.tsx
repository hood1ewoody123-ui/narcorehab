"use client";

import { motion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { LogoAnimated } from "@/components/ui/LogoAnimated";
import {
  EASE_OUT,
  INTRO_LOGO_FLIGHT_DURATION,
  LOGO_HEADER_WIDTH,
  LOGO_INTRO_WIDTH,
} from "./constants";

type IntroPhase = "splash" | "transition" | "revealed";

type HeroLogoFlightProps = {
  phase: IntroPhase;
  logoFill: string;
  logoPlay: boolean;
  logoSlotRef: React.RefObject<HTMLDivElement | null>;
  onIntroComplete?: () => void;
  onFlightComplete?: () => void;
};

type Point = { x: number; y: number; scale: number };

const FADE_OUT_MS = 180;

function readCenter(): Point {
  return {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    scale: 1,
  };
}

function readSlot(slot: DOMRect): Point {
  return {
    x: slot.left + slot.width / 2,
    y: slot.top + slot.height / 2,
    scale: LOGO_HEADER_WIDTH / LOGO_INTRO_WIDTH,
  };
}

export function HeroLogoFlight({
  phase,
  logoFill,
  logoPlay,
  logoSlotRef,
  onIntroComplete,
  onFlightComplete,
}: HeroLogoFlightProps) {
  const [mounted, setMounted] = useState(false);
  const [center, setCenter] = useState<Point | null>(null);
  const [slot, setSlot] = useState<Point | null>(null);
  const [fadingOut, setFadingOut] = useState(false);
  const [exited, setExited] = useState(false);
  const flightDoneRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const measure = useCallback(() => {
    setCenter(readCenter());

    const rect = logoSlotRef.current?.getBoundingClientRect();
    if (rect && rect.width > 0) setSlot(readSlot(rect));
  }, [logoSlotRef]);

  useLayoutEffect(() => {
    if (!mounted) return;

    if (phase === "splash") {
      flightDoneRef.current = false;
      setFadingOut(false);
      setExited(false);
      measure();
      return;
    }

    if (phase === "transition") {
      measure();
      const frame = requestAnimationFrame(measure);
      return () => cancelAnimationFrame(frame);
    }
  }, [mounted, measure, phase]);

  useEffect(() => {
    if (!mounted) return;
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [mounted, measure]);

  const handleFlightComplete = useCallback(() => {
    if (flightDoneRef.current) return;
    flightDoneRef.current = true;
    onFlightComplete?.();
    setFadingOut(true);
    window.setTimeout(() => setExited(true), FADE_OUT_MS);
  }, [onFlightComplete]);

  if (!mounted || exited || !center) return null;
  if (phase === "transition" && !slot && !fadingOut) return null;

  const position = phase === "splash" || !slot ? center : slot;

  return (
    <motion.div
      className="pointer-events-none fixed z-[50] origin-center"
      initial={
        phase === "transition"
          ? {
              left: center.x,
              top: center.y,
              x: "-50%",
              y: "-50%",
              scale: 1,
              opacity: 1,
            }
          : false
      }
      animate={{
        left: position.x,
        top: position.y,
        x: "-50%",
        y: "-50%",
        scale: position.scale,
        opacity: fadingOut ? 0 : 1,
      }}
      transition={{
        left: { duration: INTRO_LOGO_FLIGHT_DURATION, ease: EASE_OUT },
        top: { duration: INTRO_LOGO_FLIGHT_DURATION, ease: EASE_OUT },
        scale: { duration: INTRO_LOGO_FLIGHT_DURATION, ease: EASE_OUT },
        opacity: { duration: FADE_OUT_MS / 1000, ease: EASE_OUT },
      }}
      onAnimationComplete={() => {
        if (!fadingOut && phase === "transition") {
          handleFlightComplete();
        }
      }}
    >
      <LogoAnimated
        width={LOGO_INTRO_WIDTH}
        fill={logoFill}
        play={logoPlay && phase === "splash"}
        showText
        onComplete={onIntroComplete}
      />
    </motion.div>
  );
}

export default HeroLogoFlight;
