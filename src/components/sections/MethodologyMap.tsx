"use client";

import { cn } from "@/lib/utils";
import {
  Brain,
  HeartStraight,
  Path,
  Stethoscope,
  UsersThree,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import {
  CLIENT_QUESTIONS,
  METHODOLOGY_CTA,
  METHODOLOGY_HUB,
  METHODOLOGY_PILLARS,
  METHODOLOGY_SUBTITLE,
  METHODOLOGY_TITLE,
  ORBIT_ANGLES,
  ROUTE_STEPS,
  type ClientQuestionId,
  type RouteStep,
} from "./methodology/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

const STEP_ICONS = [Stethoscope, HeartStraight, Brain, UsersThree, Path] as const;

const ORBIT_RADIUS = 42;

function polarToPercent(angleDeg: number, radiusPercent: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    left: `${50 + radiusPercent * Math.cos(rad)}%`,
    top: `${50 + radiusPercent * Math.sin(rad)}%`,
  };
}

function OrbitVisual({
  activeStepId,
  highlightedIds,
  onSelectStep,
  reducedMotion,
}: {
  activeStepId: number;
  highlightedIds: Set<number>;
  onSelectStep: (id: number) => void;
  reducedMotion: boolean | null;
}) {
  const activeIndex = ROUTE_STEPS.findIndex((s) => s.id === activeStepId);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[min(100%,420px)]">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        aria-hidden
      >
        <circle
          cx="50"
          cy="50"
          r={ORBIT_RADIUS}
          fill="none"
          stroke="var(--line)"
          strokeWidth="0.35"
          strokeDasharray="2 2.5"
        />
        {ROUTE_STEPS.map((step, index) => {
          const angle = ORBIT_ANGLES[index] ?? 0;
          const rad = ((angle - 90) * Math.PI) / 180;
          const x2 = 50 + ORBIT_RADIUS * Math.cos(rad);
          const y2 = 50 + ORBIT_RADIUS * Math.sin(rad);
          const isActive = step.id === activeStepId;
          const isHighlighted = highlightedIds.has(step.id);

          return (
            <motion.line
              key={step.id}
              x1="50"
              y1="50"
              x2={x2}
              y2={y2}
              stroke={isActive ? "var(--teal)" : isHighlighted ? "var(--silver)" : "var(--line)"}
              strokeWidth={isActive ? 0.55 : 0.3}
              initial={false}
              animate={{
                opacity: isActive ? 1 : isHighlighted ? 0.75 : 0.35,
              }}
              transition={{ duration: reducedMotion ? 0 : 0.35, ease: EASE }}
            />
          );
        })}
        {activeIndex >= 0 && (
          <motion.circle
            cx="50"
            cy="50"
            r={ORBIT_RADIUS}
            fill="none"
            stroke="var(--teal)"
            strokeWidth="0.5"
            strokeDasharray={`${(2 * Math.PI * ORBIT_RADIUS) / 5} ${2 * Math.PI * ORBIT_RADIUS}`}
            strokeLinecap="round"
            initial={false}
            animate={{ rotate: activeIndex * 72 }}
            style={{ transformOrigin: "50px 50px" }}
            transition={{ duration: reducedMotion ? 0 : 0.5, ease: EASE }}
          />
        )}
      </svg>

      <div className="absolute left-1/2 top-1/2 z-10 flex h-[clamp(100px,28vw,132px)] w-[clamp(100px,28vw,132px)] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-teal/40 bg-teal text-center shadow-[var(--shadow-md)]">
        <span className="font-display text-[clamp(22px,4vw,28px)] leading-none text-cream">
          {METHODOLOGY_HUB.title}
        </span>
        <span className="mt-1 max-w-[86%] px-1.5 text-center font-body text-[7px] uppercase leading-[1.25] tracking-[0.04em] text-cream/85 sm:text-[7.5px] md:mt-1.5 md:text-[8.5px] md:leading-tight md:tracking-[0.05em]">
          <span className="block">
            {METHODOLOGY_HUB.lines[0]} · {METHODOLOGY_HUB.lines[1]}
          </span>
          <span className="block">· {METHODOLOGY_HUB.lines[2]}</span>
        </span>
      </div>

      {ROUTE_STEPS.map((step, index) => {
        const pos = polarToPercent(ORBIT_ANGLES[index] ?? 0, ORBIT_RADIUS);
        const isActive = step.id === activeStepId;
        const isHighlighted = highlightedIds.has(step.id);
        const Icon = STEP_ICONS[index];

        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onSelectStep(step.id)}
            className={cn(
              "absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-xl border px-2 py-2 transition-all duration-300 md:px-2.5 md:py-2.5",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal",
              isActive
                ? "border-teal bg-cream text-graphite shadow-[var(--shadow-md)] scale-105"
                : isHighlighted
                  ? "border-graphite/40 bg-cream text-graphite"
                  : "border-[var(--line)] bg-cream/95 text-gray hover:border-gray hover:text-graphite",
            )}
            style={pos}
            aria-pressed={isActive}
            aria-label={`Этап ${step.phase}: ${step.title}`}
          >
            <span
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full md:h-9 md:w-9",
                isActive ? "bg-teal text-cream" : "bg-[var(--teal-20)] text-teal",
              )}
            >
              <Icon size={18} weight="duotone" aria-hidden />
            </span>
            <span className="max-w-[72px] font-body text-[10px] leading-tight md:max-w-[88px] md:text-xs">
              {step.title.split(" ")[0]}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function StepDetailPanel({ step }: { step: RouteStep }) {
  return (
    <div className="flex h-full flex-col">
      <p className="font-body text-xs uppercase tracking-[0.12em] text-teal">
        Этап {step.phase} · {step.focus}
      </p>
      <h3 className="mt-2 font-display text-[clamp(26px,2.8vw,34px)] leading-[1.1] text-graphite">
        {step.title}
      </h3>
      <p className="mt-1 font-body text-sm text-gray">{step.tagline}</p>

      <blockquote className="mt-5 rounded-xl border border-[var(--line)] bg-cream px-4 py-3">
        <p className="font-body text-xs text-gray">Вопрос, который часто звучит</p>
        <p className="mt-1 font-display text-[clamp(18px,2vw,22px)] leading-snug text-graphite">
          «{step.clientQuestion}»
        </p>
      </blockquote>

      <p className="mt-4 font-body text-sm leading-relaxed text-graphite md:text-base">
        {step.answer}
      </p>

      <ul className="mt-4 space-y-2">
        {step.actions.map((action) => (
          <li key={action} className="flex gap-2 font-body text-sm text-graphite">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" aria-hidden />
            {action}
          </li>
        ))}
      </ul>

      <p className="mt-auto pt-5 font-body text-xs text-gray">
        Ориентир по срокам: {step.timing}. Точный план — после консультации врача.
      </p>
    </div>
  );
}

export default function MethodologyMap() {
  const reducedMotion = useReducedMotion();
  const [activeStepId, setActiveStepId] = useState(1);
  const [activeQuestionId, setActiveQuestionId] = useState<ClientQuestionId | null>(null);

  const activeStep = useMemo(
    () => ROUTE_STEPS.find((s) => s.id === activeStepId) ?? ROUTE_STEPS[0],
    [activeStepId],
  );

  const highlightedIds = useMemo(() => {
    const set = new Set<number>([activeStepId]);
    const question = CLIENT_QUESTIONS.find((q) => q.id === activeQuestionId);
    question?.relatedSteps.forEach((id) => set.add(id));
    return set;
  }, [activeStepId, activeQuestionId]);

  const handleQuestion = useCallback((id: ClientQuestionId) => {
    setActiveQuestionId((prev) => (prev === id ? null : id));
    const question = CLIENT_QUESTIONS.find((q) => q.id === id);
    const firstStep = question?.relatedSteps[0];
    if (firstStep) setActiveStepId(firstStep);
  }, []);

  const handleSelectStep = useCallback((id: number) => {
    setActiveStepId(id);
    setActiveQuestionId(null);
  }, []);

  return (
    <section
      id="methodology"
      className="bg-cream py-20 md:py-24 lg:py-28"
      aria-labelledby="methodology-title"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10 lg:px-14">
        <motion.header
          className="max-w-3xl"
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <h2
            id="methodology-title"
            className="font-display text-display-sm text-graphite md:text-[clamp(30px,3.2vw,42px)] md:leading-[1.12]"
          >
            {METHODOLOGY_TITLE}
          </h2>
          <p className="mt-4 font-body text-sm leading-relaxed text-gray md:text-base">
            {METHODOLOGY_SUBTITLE}
          </p>
        </motion.header>

        <motion.div
          className="mt-8"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
        >
          <p className="font-body text-xs uppercase tracking-[0.14em] text-gray">
            Частые вопросы — нажмите, чтобы подсветить этап маршрута
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {CLIENT_QUESTIONS.map((q) => {
              const isActive = activeQuestionId === q.id;
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => handleQuestion(q.id)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-left transition-colors duration-200",
                    isActive
                      ? "border-teal bg-teal text-cream"
                      : "border-[var(--line)] bg-cream text-graphite hover:border-teal/50",
                  )}
                  aria-pressed={isActive}
                >
                  <span className="block font-body text-sm">{q.label}</span>
                  <span
                    className={cn(
                      "mt-0.5 block font-body text-[11px]",
                      isActive ? "text-cream/80" : "text-gray",
                    )}
                  >
                    {q.hint}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="mt-10 overflow-hidden rounded-2xl border border-[var(--line)] bg-cream shadow-[var(--shadow-sm)] md:rounded-3xl"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
        >
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
            <div className="relative border-b border-[var(--line)] bg-[var(--teal-20)] px-5 py-8 md:px-8 md:py-10 lg:border-b-0 lg:border-r">
              <p className="font-body text-xs uppercase tracking-[0.14em] text-teal">
                Маршрут из пяти этапов
              </p>
              <p className="mt-2 max-w-sm font-body text-sm text-gray">
                Выберите этап на схеме — справа появится ответ на типичный вопрос и что именно
                происходит.
              </p>
              <div className="mt-6 md:mt-8">
                <OrbitVisual
                  activeStepId={activeStepId}
                  highlightedIds={highlightedIds}
                  onSelectStep={handleSelectStep}
                  reducedMotion={reducedMotion}
                />
              </div>
              <div className="mt-6 hidden gap-2 sm:grid sm:grid-cols-5 lg:hidden">
                {ROUTE_STEPS.map((step) => (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => handleSelectStep(step.id)}
                    className={cn(
                      "rounded-lg border px-2 py-2 font-body text-[11px] transition-colors",
                      step.id === activeStepId
                        ? "border-teal bg-teal text-cream"
                        : "border-[var(--line)] bg-cream text-gray hover:border-teal/40 hover:text-graphite",
                    )}
                  >
                    {step.phase}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-cream px-5 py-8 md:min-h-[420px] md:px-8 md:py-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.id}
                  initial={reducedMotion ? false : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, x: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="min-h-[360px] md:min-h-[400px]"
                >
                  <StepDetailPanel step={activeStep} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <motion.ul
          className="mt-8 grid gap-4 md:grid-cols-3 md:gap-6"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
        >
          {METHODOLOGY_PILLARS.map((pillar) => (
            <li
              key={pillar.title}
              className="rounded-xl border border-[var(--line)] bg-cream px-5 py-4 md:rounded-2xl md:px-6 md:py-5"
            >
              <h3 className="font-display text-xl text-graphite md:text-2xl">{pillar.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-gray">{pillar.text}</p>
            </li>
          ))}
        </motion.ul>

        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl font-body text-sm text-gray">
            Маршрут не фиксированный чек-лист: этапы могут идти параллельно или в другом порядке —
            врач предложит вариант после первой беседы.
          </p>
          <Link
            href={METHODOLOGY_CTA.href}
            className="inline-flex shrink-0 rounded-xl bg-teal px-5 py-3 font-body text-sm text-cream transition-colors duration-200 hover:bg-teal/90"
          >
            {METHODOLOGY_CTA.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
