"use client";

import { Button } from "@/components/ui/Button";
import { LogoAnimated } from "@/components/ui/LogoAnimated";
import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { List, X } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import {
  LOGO_HEADER_WIDTH,
  NAV_LEFT,
  NAV_RIGHT,
  SITE_ADDRESS,
  SITE_PHONE_MAIN,
  SITE_PHONE_MAIN_DISPLAY,
} from "@/components/sections/hero/constants";

type MobileNavMenuProps = {
  variant?: "hero" | "sticky";
  className?: string;
};

const heroLinkClass =
  "font-body text-base text-graphite transition-colors hover:text-teal";

export function MobileNavMenu({ variant = "sticky", className }: MobileNavMenuProps) {
  const [open, setOpen] = useState(false);
  const isHero = variant === "hero";

  const triggerClass = cn(
    "inline-flex size-9 items-center justify-center rounded-full border transition-colors",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal",
    isHero
      ? "border-white/30 text-white hover:border-white/50 hover:bg-white/10"
      : "border-[var(--line)] text-graphite hover:border-teal hover:text-teal",
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button type="button" className={cn(triggerClass, className)} aria-label="Открыть меню">
          <List size={20} weight="regular" aria-hidden />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            "fixed inset-y-0 right-0 z-[101] flex w-[min(100%,320px)] flex-col bg-cream shadow-[var(--shadow-lg)]",
            "outline-none transition-transform duration-300 ease-out",
          )}
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">Меню сайта</Dialog.Title>

          <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-4">
            <LogoAnimated width={LOGO_HEADER_WIDTH} showText fill="var(--teal)" play={false} />
            <Dialog.Close asChild>
              <button
                type="button"
                className="inline-flex size-10 items-center justify-center rounded-full text-graphite transition-colors hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                aria-label="Закрыть меню"
              >
                <X size={22} weight="regular" aria-hidden />
              </button>
            </Dialog.Close>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 py-6" aria-label="Мобильная навигация">
            <ul className="space-y-1">
              {[...NAV_LEFT, ...NAV_RIGHT].map((item) => (
                <li key={item.href}>
                  <Dialog.Close asChild>
                    <Link href={item.href} className={cn("block py-3", heroLinkClass)}>
                      {item.label}
                    </Link>
                  </Dialog.Close>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-[var(--line)] px-5 py-5">
            <a
              href={`tel:+${SITE_PHONE_MAIN}`}
              className="font-body text-lg text-teal transition-colors hover:text-graphite"
            >
              {SITE_PHONE_MAIN_DISPLAY}
            </a>
            <p className="mt-2 font-body text-xs text-gray">{SITE_ADDRESS}</p>
            <Dialog.Close asChild>
              <Button
                type="button"
                variant="primary"
                size="md"
                className="mt-4 h-11 w-full rounded-xl"
              >
                Заказать звонок
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default MobileNavMenu;
