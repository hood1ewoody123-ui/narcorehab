"use client";

import { Button } from "@/components/ui/Button";
import { LogoAnimated } from "@/components/ui/LogoAnimated";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  EASE_OUT,
  NAV_LEFT,
  NAV_RIGHT,
  SITE_PHONE_MAIN,
  SITE_PHONE_MAIN_DISPLAY,
} from "@/components/sections/hero/constants";
import { MobileNavMenu } from "./MobileNavMenu";

/** Логотип с подписью (~47px высоты при width 68) */
const STICKY_LOGO_WIDTH = 68;

const navLinkClass =
  "font-body text-[11px] tracking-[0.02em] text-graphite/75 transition-colors duration-200 hover:text-teal lg:text-xs";

export function StickySiteHeader() {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const pains = document.getElementById("pains");
    if (!pains) return;

    const update = () => {
      setVisible(pains.getBoundingClientRect().top <= 8);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-0 z-50",
        "border-b border-[var(--line)]/30",
        "bg-cream/72 shadow-[0_4px_24px_-8px_rgba(23,25,26,0.06)]",
        "backdrop-blur-lg backdrop-saturate-125",
        "supports-[backdrop-filter]:bg-cream/58",
        !visible && "pointer-events-none",
      )}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : reducedMotion ? 0 : -8,
      }}
      transition={{ duration: reducedMotion ? 0 : 0.4, ease: EASE_OUT }}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between gap-2 px-4 md:h-[3.75rem] md:gap-4 md:px-8 lg:px-10">
        <Link
          href="#"
          className="flex shrink-0 items-center py-0.5 leading-none"
          aria-label="На главную"
        >
          <LogoAnimated
            width={STICKY_LOGO_WIDTH}
            showText
            fill="var(--teal)"
            play={false}
          />
        </Link>

        <nav
          className="hidden flex-1 items-center justify-center gap-5 lg:flex"
          aria-label="Основная навигация"
        >
          {[...NAV_LEFT, ...NAV_RIGHT].map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href={`tel:+${SITE_PHONE_MAIN}`}
            className="hidden font-body text-xs text-teal/90 transition-colors hover:text-teal md:inline"
          >
            {SITE_PHONE_MAIN_DISPLAY}
          </a>
          <Button
            variant="primary"
            size="sm"
            className="hidden h-8 rounded-full px-3.5 text-[11px] font-medium tracking-wide md:inline-flex"
          >
            Заказать звонок
          </Button>
          <MobileNavMenu variant="sticky" className="lg:hidden" />
        </div>
      </div>
    </motion.header>
  );
}

export default StickySiteHeader;
