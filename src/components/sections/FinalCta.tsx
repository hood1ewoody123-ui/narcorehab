"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { btnPrimary, chipActive, chipInactive, surfaceCard } from "@/lib/theme";

type QuizStep = {
  id: string;
  question: string;
  options: string[];
};

const QUIZ_STEPS: QuizStep[] = [
  {
    id: "for-whom",
    question: "Подскажите, для кого вы рассматриваете помощь центра",
    options: [
      "Для себя",
      "Для сына или дочери",
      "Для супруга или супруги",
      "Для родителя",
      "Для друга или коллеги",
      "Пока не определились",
    ],
  },
  {
    id: "main-request",
    question: "Что сейчас беспокоит больше всего",
    options: [
      "Тревога и напряжение",
      "Снижение настроения",
      "Проблемы со сном",
      "Трудности с зависимостью",
      "Острое состояние",
      "Нужна консультация по маршруту помощи",
    ],
  },
  {
    id: "format",
    question: "Какой формат помощи вам ближе",
    options: [
      "Амбулаторно",
      "Стационар",
      "Онлайн-консультация",
      "Нужна оценка врача",
    ],
  },
  {
    id: "timeline",
    question: "Когда вам удобно начать первый шаг",
    options: ["Сегодня", "В течение 2-3 дней", "На этой неделе", "Пока собираю информацию"],
  },
  {
    id: "contact",
    question: "Как лучше с вами связаться",
    options: ["Телефонный звонок", "WhatsApp", "Telegram", "Уточню позже"],
  },
];

export default function FinalCta() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentStep = QUIZ_STEPS[stepIndex];
  const selected = answers[currentStep.id];
  const progressPercent = ((stepIndex + 1) / QUIZ_STEPS.length) * 100;
  const isLastStep = stepIndex === QUIZ_STEPS.length - 1;

  const buttonLabel = useMemo(() => {
    if (isLastStep) return "Отправить ответы";
    return "Следующий вопрос";
  }, [isLastStep]);

  const onNext = () => {
    if (!selected) return;
    if (isLastStep) return;
    setStepIndex((prev) => prev + 1);
  };

  return (
    <section id="final-quiz" className="bg-cream py-20 md:py-24 lg:py-28" aria-labelledby="final-quiz-title">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10 lg:px-14">
        <header className="max-w-3xl">
          <h2
            id="final-quiz-title"
            className="font-display text-display-sm text-graphite md:text-[clamp(30px,3.4vw,44px)] md:leading-[1.2]"
          >
            Ответьте на несколько вопросов, чтобы подобрать программу и узнать ориентир стоимости
          </h2>
          <p className="mt-5 font-body text-sm text-gray md:text-base">Подбор и расчет бесплатны и анонимны</p>
        </header>

        <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-[1.65fr_1fr] md:gap-6">
          <div className={cn(surfaceCard, "p-5 md:p-7")}>
            <p className="font-body text-base font-medium text-graphite md:text-lg">{currentStep.question}</p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {currentStep.options.map((option) => {
                const isActive = selected === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setAnswers((prev) => ({ ...prev, [currentStep.id]: option }))}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-left font-body text-sm md:text-base",
                      isActive ? chipActive : chipInactive,
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            <div className="mt-7 flex items-end justify-between gap-4">
              <div className="min-w-[140px]">
                <p className="font-body text-xs text-gray md:text-sm">
                  Вопрос: {stepIndex + 1} / {QUIZ_STEPS.length}
                </p>
                <div className="mt-2 h-1.5 w-full rounded-full bg-silver/30">
                  <div
                    className="h-1.5 rounded-full bg-teal transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={onNext}
                disabled={!selected || isLastStep}
                className={cn(
                  "rounded-xl px-5 py-3 font-body text-sm transition-colors md:text-base",
                  selected && !isLastStep
                    ? btnPrimary
                    : "cursor-not-allowed bg-silver/40 text-graphite/60",
                )}
              >
                {buttonLabel}
              </button>
            </div>
          </div>

          <aside className={cn(surfaceCard, "p-5 md:p-6")}>
            <div className="flex items-center gap-3">
              <Image
                src="/images/quiz/specialist.jpg"
                alt=""
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover object-center"
              />
              <div>
                <p className="font-body text-sm font-medium text-graphite md:text-base">Андрей Владимирович</p>
                <p className="font-body text-xs text-gray md:text-sm">психиатр, нарколог · online</p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-[var(--line)] bg-[var(--teal-20)] p-4">
              <p className="font-body text-sm leading-relaxed text-graphite">
                Окончательную программу назначают после очного осмотра.
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed text-gray">
                Квиз даст предварительный маршрут и вилку стоимости — без обязательств.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
