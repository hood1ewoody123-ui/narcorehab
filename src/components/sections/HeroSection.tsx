"use client";

import { Button } from "@/components/ui/Button";
import HeroBackgroundVideo from "@/components/sections/HeroBackgroundVideo";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  EASE_OUT,
  HERO_CURTAIN_HEIGHT,
  HERO_SUBHEADLINE,
  INTRO_LOGO_PAUSE_MS,
} from "./hero/constants";
import HeroCurtain from "./hero/HeroCurtain";
import HeroHeader from "./hero/HeroHeader";
import HeroHeadline from "./hero/HeroHeadline";
import HeroLogoFlight from "./hero/HeroLogoFlight";

type IntroPhase = "splash" | "transition" | "revealed";

const TEAL = "#1D6666";
const WHITE = "#F7F7F5";

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const introEnabled = reducedMotion !== true;
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const introHandledRef = useRef(false);
  const logoSlotRef = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState<IntroPhase>("splash");
  const [logoFill, setLogoFill] = useState(TEAL);
  const [logoPlay, setLogoPlay] = useState(true);

  const activePhase: IntroPhase = introEnabled ? phase : "revealed";
  const activeLogoFill = introEnabled ? logoFill : WHITE;
  const activeLogoPlay = introEnabled && logoPlay && activePhase === "splash";

  useEffect(
    () => () => {
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
    },
    [],
  );

  const handleLogoIntroComplete = useCallback(() => {
    if (!introEnabled || introHandledRef.current) return;
    introHandledRef.current = true;

    pauseTimer.current = setTimeout(() => {
      setPhase("transition");
      setLogoFill(WHITE);
    }, INTRO_LOGO_PAUSE_MS);
  }, [introEnabled]);

  const handleLogoFlightComplete = useCallback(() => {
    setPhase("revealed");
    setLogoPlay(false);
  }, []);

  const contentVisible =
    activePhase === "transition" || activePhase === "revealed";
  const showHeaderLogo = activePhase === "revealed";
  const reserveLogoSlot = activePhase === "transition";

  return (
    <section
      className="sticky top-0 z-0 min-h-screen overflow-hidden bg-black"
      style={
        {
          "--hero-curtain-h": `${HERO_CURTAIN_HEIGHT}px`,
        } as React.CSSProperties
      }
    >
      <HeroBackgroundVideo />

      <HeroHeader
        visible={contentVisible}
        showHeaderLogo={showHeaderLogo}
        reserveLogoSlot={reserveLogoSlot}
        logoSlotRef={logoSlotRef}
      />

      <HeroLogoFlight
        phase={activePhase}
        logoFill={activeLogoFill}
        logoPlay={activeLogoPlay}
        logoSlotRef={logoSlotRef}
        onIntroComplete={handleLogoIntroComplete}
        onFlightComplete={handleLogoFlightComplete}
      />

      <motion.div
        className="relative z-30 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 pb-[calc(var(--hero-curtain-h)+2rem)] pt-36 text-center md:px-10 md:pt-40"
        initial={{ opacity: 0, y: 20 }}
        animate={
          contentVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
        }
        transition={{ duration: 0.65, delay: 0.4, ease: EASE_OUT }}
      >
        <HeroHeadline />
        <p className="mt-6 max-w-3xl font-body text-sm leading-relaxed text-white/90 md:text-base md:whitespace-nowrap">
          {HERO_SUBHEADLINE}
        </p>
        <Button variant="ghost" size="md" className="mt-8">
          Подобрать программу
        </Button>
      </motion.div>

      <HeroCurtain phase={activePhase} />
    </section>
  );
}

export default HeroSection;
