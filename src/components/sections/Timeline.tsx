"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { TIMELINE_STEPS, TIMELINE_TITLE } from "./timeline/constants";

function getClosestStepId(
  elements: (HTMLElement | null)[],
  fallbackId: string,
): string {
  if (typeof window === "undefined") return fallbackId;

  const viewportCenter = window.innerHeight / 2;
  let closestId = fallbackId;
  let closestDistance = Number.POSITIVE_INFINITY;

  elements.forEach((el, index) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    const distance = Math.abs(centerY - viewportCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestId = TIMELINE_STEPS[index]?.id ?? closestId;
    }
  });

  return closestId;
}

export default function Timeline() {
  const [activeId, setActiveId] = useState<string>(TIMELINE_STEPS[0].id);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const nextId = getClosestStepId(stepRefs.current, TIMELINE_STEPS[0].id);
      setActiveId((current) => (current === nextId ? current : nextId));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section
      id="timeline"
      className="bg-cream py-20 md:py-24 lg:py-28"
      aria-labelledby="timeline-title"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10 lg:px-14">
        <h2
          id="timeline-title"
          className="max-w-3xl font-display text-display-sm text-graphite md:text-[clamp(28px,3vw,40px)] md:leading-[1.15]"
        >
          {TIMELINE_TITLE}
        </h2>

        <ol className="mt-10 max-w-2xl space-y-6 md:mt-12 md:space-y-8">
          {TIMELINE_STEPS.map((step, index) => {
            const isActive = activeId === step.id;
            const isLast = index === TIMELINE_STEPS.length - 1;

            return (
              <li
                key={step.id}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                className="relative flex items-start gap-4 md:gap-6"
              >
                <div className="flex flex-col items-center">
                  <span
                    className={cn(
                      "font-body text-xs tracking-[0.16em] md:text-sm",
                      isActive ? "text-teal" : "text-gray",
                    )}
                  >
                    {step.number}
                  </span>
                  {!isLast ? (
                    <span
                      aria-hidden
                      className="mt-2 h-10 w-px bg-[var(--line)] md:h-16"
                    />
                  ) : null}
                </div>

                <div className="flex-1">
                  <p
                    className={cn(
                      "font-body text-sm md:text-base",
                      isActive ? "text-graphite" : "text-gray",
                    )}
                  >
                    {step.title}
                  </p>
                  {step.description ? (
                    <p className="mt-1 font-body text-xs leading-relaxed text-gray md:text-sm">
                      {step.description}
                    </p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
