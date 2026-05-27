"use client";

import { cn } from "@/lib/utils";
import { ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";
import { useMemo, useState } from "react";

type Topic = "all" | "family" | "addiction" | "anxiety";

const TOPICS: { id: Topic; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "family", label: "Семья" },
  { id: "addiction", label: "Зависимости" },
  { id: "anxiety", label: "Тревога" },
];

const ARTICLES = [
  { title: "Как помочь сыну", duration: "7 мин", topic: "family" as const },
  { title: "Первая консультация", duration: "5 мин", topic: "all" as const },
  { title: "Игровая зависимость: признаки", duration: "8 мин", topic: "addiction" as const },
  { title: "Тревога у близкого: что делать", duration: "6 мин", topic: "anxiety" as const },
];

export default function TopicArticles() {
  const [topic, setTopic] = useState<Topic>("all");

  const filtered = useMemo(() => {
    if (topic === "all") return ARTICLES;
    return ARTICLES.filter((item) => item.topic === topic || item.topic === "all");
  }, [topic]);

  return (
    <section id="articles" className="bg-cream py-20 md:py-24" aria-labelledby="articles-title">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10 lg:px-14">
        <h2 id="articles-title" className="font-display text-display-sm text-graphite md:text-[clamp(30px,3vw,40px)]">
          Статьи по темам
        </h2>

        <div className="mt-4 flex flex-wrap gap-2">
          {TOPICS.map((tab) => {
            const active = tab.id === topic;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setTopic(tab.id)}
                className={cn(
                  "rounded-full border px-4 py-2 font-body text-sm transition-colors",
                  active ? "border-teal bg-teal text-cream" : "border-[var(--line)] bg-cream text-graphite hover:border-teal/40",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-[var(--line)]">
          {filtered.map((article, index) => (
            <Link
              key={article.title}
              href="#"
              className={cn(
                "flex items-center justify-between px-5 py-4 transition-colors hover:bg-silver/20",
                index !== filtered.length - 1 && "border-b border-[var(--line)]",
              )}
            >
              <span className="font-body text-base text-graphite">
                {article.title}
                <span className="ml-2 text-gray">· {article.duration}</span>
              </span>
              <ArrowRight size={16} className="text-gray" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
