"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useMemo, useState } from "react";

type Filter = "all" | "expertise" | "family";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "expertise", label: "Экспертиза" },
  { id: "family", label: "Семья" },
];

const EVENTS = [
  { title: "Круглый стол", tag: "expertise" as const },
  { title: "Лагерь", tag: "family" as const },
  { title: "Открытая лекция", tag: "expertise" as const },
];

export default function EventsExpertise() {
  const [filter, setFilter] = useState<Filter>("all");

  const cards = useMemo(() => {
    if (filter === "all") return EVENTS;
    return EVENTS.filter((event) => event.tag === filter);
  }, [filter]);

  return (
    <section id="events" className="bg-cream py-20 md:py-24" aria-labelledby="events-title">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10 lg:px-14">
        <h2 id="events-title" className="font-display text-display-sm text-graphite md:text-[clamp(30px,3vw,40px)]">
          События и экспертиза
        </h2>

        <div className="mt-4 flex flex-wrap gap-2">
          {FILTERS.map((item) => {
            const active = item.id === filter;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={cn(
                  "rounded-full border border-dashed px-4 py-2 font-body text-sm transition-colors",
                  active ? "border-graphite bg-graphite text-cream" : "border-[var(--line)] text-graphite hover:border-gray",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <article key={card.title} className="overflow-hidden rounded-2xl border border-[var(--line)] bg-cream">
              <div className="aspect-[16/10] bg-silver/25" />
              <div className="p-4">
                <h3 className="font-body text-lg text-graphite">{card.title}</h3>
                <Link href="#" className="mt-2 inline-flex font-body text-sm text-graphite hover:text-teal">
                  Читать →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
