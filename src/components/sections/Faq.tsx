"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { darkCard, darkDivider, darkMuted, darkSubtitle, darkTitle } from "@/lib/theme";
import { FAQ_ITEMS, FAQ_TITLE } from "./faq/constants";

export default function Faq() {
  return (
    <section id="faq" className="bg-transparent py-16 md:py-20 lg:py-24" aria-labelledby="faq-title">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10 lg:px-14">
        <div className={cn(darkCard, "overflow-hidden px-5 py-6 md:px-8 md:py-8 lg:px-10 lg:py-10")}>
          <h2
            id="faq-title"
            className={cn(
              "font-display text-display-sm md:text-[clamp(30px,3.2vw,42px)] md:leading-[1.1]",
              darkTitle,
            )}
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
                className={cn("border-t first:border-t-0", darkDivider)}
              >
                <Accordion.Header>
                  <Accordion.Trigger
                    className={cn(
                      "group flex w-full items-center justify-between gap-4 py-4 text-left",
                      "font-body text-sm md:text-base",
                      darkSubtitle,
                      "transition-colors duration-200 hover:text-cream",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal",
                    )}
                  >
                    <span>{item.question}</span>
                    <span className="relative flex h-5 w-5 shrink-0 items-center justify-center text-teal transition-colors group-hover:text-cream">
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
                  <p className={cn("pb-4 font-body text-sm leading-relaxed md:text-base", darkMuted)}>
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
