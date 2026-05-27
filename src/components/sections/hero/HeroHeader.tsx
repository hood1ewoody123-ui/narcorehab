"use client";

import { MobileNavMenu } from "@/components/layout/MobileNavMenu";
import { LogoAnimated } from "@/components/ui/LogoAnimated";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  EASE_OUT,
  LOGO_HEADER_HEIGHT,
  LOGO_HEADER_WIDTH,
  NAV_LEFT,
  NAV_RIGHT,
  SITE_ADDRESS,
  SITE_PHONE_MAIN,
  SITE_PHONE_MAIN_DISPLAY,
  SITE_PHONE_MOSCOW,
  SITE_PHONE_MOSCOW_DISPLAY,
} from "./constants";

type HeroHeaderProps = {
  visible: boolean;
  /** Логотип виден пользователю (после handoff) */
  showHeaderLogo: boolean;
  /** Логотип в DOM для стабильной геометрии слота во время полёта */
  reserveLogoSlot: boolean;
  logoSlotRef: React.RefObject<HTMLDivElement | null>;
};

const linkClass =
  "font-body text-xs tracking-wide text-white/85 transition-colors duration-300 hover:text-white md:text-sm";

function MetaDot() {
  return (
    <span className="text-white/20 select-none" aria-hidden>
      ·
    </span>
  );
}

export function HeroHeader({
  visible,
  showHeaderLogo,
  reserveLogoSlot,
  logoSlotRef,
}: HeroHeaderProps) {
  const logoMounted = showHeaderLogo || reserveLogoSlot;

  return (
    <motion.header
      className="absolute inset-x-0 top-0 z-40 px-5 md:px-10"
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
    >
      <div className="mx-auto max-w-[1280px] pt-4 md:pt-5">
        <div className="mb-3 hidden items-center justify-center gap-2.5 border-b border-white/10 pb-2.5 md:flex">
          <span className="font-body text-[11px] tracking-wide text-white/50">
            {SITE_ADDRESS}
          </span>
          <MetaDot />
          <a
            href={`tel:+${SITE_PHONE_MAIN}`}
            className={cn(linkClass, "text-[11px] text-white/65")}
          >
            {SITE_PHONE_MAIN_DISPLAY}
          </a>
          <MetaDot />
          <a
            href={`tel:+${SITE_PHONE_MOSCOW}`}
            className={cn(linkClass, "hidden text-[11px] text-white/50 lg:inline")}
          >
            {SITE_PHONE_MOSCOW_DISPLAY}
          </a>
        </div>

        <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-[1fr_auto_1fr] md:gap-6 lg:gap-10">
          <nav
            className="hidden items-center justify-end gap-5 md:flex lg:gap-8"
            aria-label="Навигация слева"
          >
            {NAV_LEFT.map((item) => (
              <a key={item.href} href={item.href} className={linkClass}>
                {item.label}
              </a>
            ))}
          </nav>

          <div
            ref={logoSlotRef}
            className="flex items-center justify-center justify-self-center px-2"
            style={{ width: LOGO_HEADER_WIDTH, height: LOGO_HEADER_HEIGHT }}
          >
            {logoMounted ? (
              <motion.div
                initial={false}
                animate={{ opacity: showHeaderLogo ? 1 : 0 }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
              >
                <LogoAnimated
                  width={LOGO_HEADER_WIDTH}
                  fill="#F7F7F5"
                  play={false}
                  showText
                />
              </motion.div>
            ) : null}
          </div>

          <div className="hidden items-center justify-start gap-5 md:flex lg:gap-8">
            <nav className="flex items-center gap-5 lg:gap-8" aria-label="Навигация справа">
              {NAV_RIGHT.map((item) => (
                <a key={item.href} href={item.href} className={linkClass}>
                  {item.label}
                </a>
              ))}
            </nav>
            <Button variant="ghost" size="sm" className="shrink-0 whitespace-nowrap">
              Заказать звонок
            </Button>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 md:hidden">
          <a href={`tel:+${SITE_PHONE_MAIN}`} className={cn(linkClass, "text-sm")}>
            {SITE_PHONE_MAIN_DISPLAY}
          </a>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="shrink-0">
              Заказать звонок
            </Button>
            <MobileNavMenu variant="hero" />
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default HeroHeader;
