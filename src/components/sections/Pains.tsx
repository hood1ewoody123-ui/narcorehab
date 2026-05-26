"use client";

import { HERO_CURTAIN_HEIGHT } from "@/lib/subtract-curtain";
import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import PainsContent from "./pains/PainsContent";
import {
  PAINS_ANIMATION_SCROLL_VH,
  PAINS_CONTENT_FADE_END,
  PAINS_CONTENT_FADE_START,
  PAINS_CURTAIN_RISE_END,
} from "./pains/constants";
import SubtractCurtainTop from "./pains/SubtractCurtainTop";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function mapRange(
  value: number,
  [inMin, inMax]: [number, number],
  [outMin, outMax]: [number, number],
) {
  if (value <= inMin) return outMin;
  if (value >= inMax) return outMax;
  const t = (value - inMin) / (inMax - inMin);
  return outMin + t * (outMax - outMin);
}

export function Pains() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(800);

  useEffect(() => {
    const updateViewport = () => setViewportHeight(window.innerHeight);
    updateViewport();
    window.addEventListener("resize", updateViewport, { passive: true });
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const { top } = section.getBoundingClientRect();
      const animDistance = viewportHeight * (PAINS_ANIMATION_SCROLL_VH / 100);
      if (animDistance <= 0) return;

      setProgress(clamp((viewportHeight - top) / animDistance, 0, 1));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [viewportHeight]);

  const animationDone = progress >= 1;
  const riseProgress = mapRange(progress, [0, PAINS_CURTAIN_RISE_END], [0, 1]);

  const curtainHeight = useMemo(() => {
    return (
      HERO_CURTAIN_HEIGHT +
      riseProgress * (viewportHeight - HERO_CURTAIN_HEIGHT)
    );
  }, [riseProgress, viewportHeight]);

  const contentOpacity = animationDone
    ? 1
    : mapRange(riseProgress, [PAINS_CONTENT_FADE_START, PAINS_CONTENT_FADE_END], [0, 1]);

  const contentY = animationDone
    ? 0
    : mapRange(riseProgress, [PAINS_CONTENT_FADE_START, PAINS_CONTENT_FADE_END], [12, 0]);

  const linesScale = animationDone
    ? 1
    : mapRange(riseProgress, [PAINS_CONTENT_FADE_START, PAINS_CONTENT_FADE_END], [0.98, 1]);

  if (reducedMotion) {
    return (
      <section
        id="pains"
        className="relative z-20 -mt-[var(--hero-curtain-h)] bg-cream"
        style={{ "--hero-curtain-h": `${HERO_CURTAIN_HEIGHT}px` } as React.CSSProperties}
      >
        <SubtractCurtainTop />
        <PainsContent linesScale={1} />
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="pains"
      className="relative z-20 -mt-[var(--hero-curtain-h)]"
      style={{ "--hero-curtain-h": `${HERO_CURTAIN_HEIGHT}px` } as React.CSSProperties}
    >
      <div className="sticky top-0 min-h-screen overflow-hidden">
        <div
          className="absolute inset-x-0 flex flex-col overflow-hidden"
          style={
            animationDone
              ? { top: 0, bottom: 0 }
              : { bottom: 0, height: curtainHeight }
          }
        >
          <SubtractCurtainTop />

          <div className="relative min-h-0 flex-1 bg-cream">
            <div
              className="h-full"
              style={{
                opacity: contentOpacity,
                transform: contentY ? `translate3d(0, ${contentY}px, 0)` : undefined,
                pointerEvents: contentOpacity > 0.35 ? "auto" : "none",
              }}
            >
              <PainsContent linesScale={linesScale} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pains;
