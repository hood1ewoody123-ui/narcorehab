"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  CONVERSATION_BG,
  CONVERSATION_IMAGE_HEIGHT,
  CONVERSATION_IMAGE_WIDTH,
  CONVERSATION_MIN_HEIGHT_VH,
  CONVERSATION_PILLS,
  CONVERSATION_REVEAL_RANGE_VH,
  CONVERSATION_TITLE,
} from "./conversation/constants";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function useCenterReveal(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const vhCenter = window.innerHeight / 2;
      const range = window.innerHeight * CONVERSATION_REVEAL_RANGE_VH;
      const offset = centerY - vhCenter;

      setProgress(clamp(1 - offset / range, 0, 1));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref]);

  return progress;
}

export function ConversationStart() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollReveal = useCenterReveal(sectionRef);
  const reveal = reducedMotion ? 1 : scrollReveal;

  const bgOpacity = reveal;
  const bgBlur = (1 - reveal) * 10;

  return (
    <section
      ref={sectionRef}
      id="conversation"
      className="relative -mb-[12vh] flex min-h-[var(--conversation-min-h)] flex-col justify-center overflow-visible bg-cream py-20 md:py-28"
      style={
        {
          "--conversation-min-h": `${CONVERSATION_MIN_HEIGHT_VH}vh`,
        } as React.CSSProperties
      }
      aria-label="Начало разговора"
    >
      {/* z-10 — cream-заливка секции под PNG «люди в блюре» */}
      <div className="pointer-events-none absolute inset-0 z-[10] bg-cream" aria-hidden />

      {/* z-20 — поверх cream, под контентом программ (z-30) */}
      <div
        className="pointer-events-none absolute inset-0 left-1/2 z-[20] flex w-screen -translate-x-1/2 items-end justify-start overflow-hidden md:items-center md:justify-center md:overflow-visible"
        aria-hidden
        style={{ opacity: bgOpacity }}
      >
        <Image
          src={CONVERSATION_BG}
          alt=""
          width={CONVERSATION_IMAGE_WIDTH}
          height={CONVERSATION_IMAGE_HEIGHT}
          className="h-auto w-[175%] max-w-none object-cover object-[18%_center] md:w-full md:object-contain md:object-center"
          style={{ filter: bgBlur > 0 ? `blur(${bgBlur}px)` : undefined }}
          sizes="100vw"
          priority={false}
        />
      </div>

      <div className="relative z-[25] mx-auto flex max-w-3xl flex-col items-center px-6 text-center md:px-10">
        <h2 className="font-display text-display-sm text-graphite md:text-[clamp(28px,3.2vw,40px)] md:leading-[1.2]">
          {CONVERSATION_TITLE}
        </h2>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-3 md:mt-10 md:gap-4">
          {CONVERSATION_PILLS.map((label) => (
            <li key={label}>
              <span
                className={cn(
                  "inline-flex items-center rounded-full border border-[var(--line)] bg-cream/90 px-4 py-2",
                  "font-body text-xs tracking-wide text-graphite md:px-5 md:py-2.5 md:text-sm",
                )}
              >
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ConversationStart;
