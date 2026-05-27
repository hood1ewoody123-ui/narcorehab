"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type FamilyTab = "parent" | "spouse" | "child";

type FamilyContent = {
  quote: string;
  description: string;
  cta: string;
};

const TABS: { id: FamilyTab; label: string }[] = [
  { id: "parent", label: "Родитель" },
  { id: "spouse", label: "Супруг(а)" },
  { id: "child", label: "Ребёнок" },
];

const CONTENT: Record<FamilyTab, FamilyContent> = {
  parent: {
    quote: "Как помочь, не становясь надзирателем",
    description: "Консультация для родственников — отдельный формат.",
    cta: "Поговорить о близком",
  },
  spouse: {
    quote: "Как говорить, чтобы вас действительно услышали",
    description: "Поможем выстроить спокойный диалог без конфликта и давления.",
    cta: "Обсудить ситуацию",
  },
  child: {
    quote: "Как поддержать ребёнка и не усилить тревогу",
    description: "Подберём деликатный маршрут для семьи и бережный первый шаг.",
    cta: "Получить рекомендации",
  },
};

export default function Family() {
  const [activeTab, setActiveTab] = useState<FamilyTab>("parent");
  const activeContent = useMemo(() => CONTENT[activeTab], [activeTab]);

  return (
    <section id="family" className="bg-cream py-20 md:py-24 lg:py-28" aria-labelledby="family-title">
      <div className="mx-auto grid w-full max-w-[1280px] gap-8 px-6 md:grid-cols-[0.92fr_1fr] md:items-start md:gap-12 md:px-10 lg:px-14">
        <Link
          href="#contact"
          className="group relative block overflow-hidden rounded-xl md:rounded-2xl"
          aria-label="Получить консультацию для семьи"
        >
          <Image
            src="/images/family-gradient.png"
            alt=""
            width={760}
            height={1120}
            className="h-auto w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 44vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-8 md:p-10">
            <h3 className="max-w-[320px] font-display text-[clamp(38px,4.8vw,56px)] leading-[0.95] text-cream">
              Консультация для родственников
            </h3>
            <span className="inline-flex w-fit rounded-full border border-white/70 px-5 py-2.5 font-body text-sm text-cream">
              получить консультацию для семьи
            </span>
          </div>
        </Link>

        <div>
          <h2
            id="family-title"
            className="font-display text-display-sm text-graphite md:text-[clamp(34px,3.1vw,46px)] md:leading-[1.15]"
          >
            Вы обращаетесь как...
          </h2>

          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            {TABS.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "rounded-sm border px-4 py-1.5 font-body text-sm transition-colors duration-200",
                    isActive
                      ? "border-teal bg-teal text-cream"
                      : "border-[var(--line)] bg-cream text-graphite hover:border-teal/40",
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <article className="mt-4 rounded-lg border border-[var(--line)] bg-cream p-5 md:rounded-xl md:p-6">
            <p className="font-display text-[clamp(28px,2.4vw,36px)] leading-[1.1] text-graphite">
              «{activeContent.quote}»
            </p>
            <p className="mt-3 font-body text-base text-gray">{activeContent.description}</p>
            <Link
              href="#contact"
              className="mt-5 inline-flex rounded-xl bg-teal px-5 py-3 font-body text-sm text-cream transition-colors duration-200 hover:bg-teal/90"
            >
              {activeContent.cta}
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
