"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { FAQ_ITEMS, FAQ_TITLE } from "./faq/constants";

export default function Faq() {
  return (
    <section id="faq" className="bg-cream py-16 md:py-20 lg:py-24" aria-labelledby="faq-title">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10 lg:px-14 lg:pr-[min(22vw,220px)]">
        <div className="overflow-hidden rounded-2xl bg-graphite px-5 py-6 md:rounded-3xl md:px-8 md:py-8 lg:px-10 lg:py-10">
          <h2
            id="faq-title"
            className="font-display text-display-sm text-cream md:text-[clamp(30px,3.2vw,42px)] md:leading-[1.1]"
          >
            {FAQ_TITLE}
          </h2>

          <Accordion.Root
            type="single"
            collapsible
            defaultValue={FAQ_ITEMS[0].id}
            className="mt-6 md:mt-8"
          >
            {FAQ_ITEMS.map((item) => (
              <Accordion.Item
                key={item.id}
                value={item.id}
                className="border-t border-white/15 first:border-t-0"
              >
                <Accordion.Header>
                  <Accordion.Trigger
                    className={cn(
                      "group flex w-full items-center justify-between gap-4 py-4 text-left",
                      "font-body text-sm text-cream md:text-base",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal",
                    )}
                  >
                    <span>{item.question}</span>
                    <span className="relative flex h-5 w-5 shrink-0 items-center justify-center text-cream/90">
                      <Plus
                        size={16}
                        weight="bold"
                        className="absolute transition-opacity duration-200 group-data-[state=open]:opacity-0"
                        aria-hidden
                      />
                      <Minus
                        size={16}
                        weight="bold"
                        className="absolute opacity-0 transition-opacity duration-200 group-data-[state=open]:opacity-100"
                        aria-hidden
                      />
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden">
                  <p className="pb-4 font-body text-sm leading-relaxed text-silver md:text-base">
                    {item.answer}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </section>
  );
}
