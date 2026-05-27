"use client";

import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { Send, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useFloatingUi } from "../floating-ui/FloatingUiContext";
import {
  MILA_GREETING,
  MILA_INPUT_PLACEHOLDER,
  MILA_NAME,
  MILA_PANEL_WIDTH_PX,
  MILA_ROLE,
  MILA_TEASER_TITLE,
} from "./constants";

const EASE = [0.16, 1, 0.3, 1] as const;

function MilaAvatar({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-full bg-teal font-display text-lg text-cream",
        className,
      )}
      aria-hidden
    >
      M
    </span>
  );
}

export function MilaWidget() {
  const reducedMotion = useReducedMotion();
  const { pastScrollThreshold, heroIntroReady, registerMilaOpener } = useFloatingUi();
  const [open, setOpen] = useState(false);
  const [teaserDismissed, setTeaserDismissed] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);

  const openPanel = useCallback(() => {
    setOpen(true);
    setTeaserDismissed(true);
    setHasOpenedOnce(true);
  }, []);

  useEffect(() => {
    registerMilaOpener(openPanel);
  }, [registerMilaOpener, openPanel]);

  const showTeaser = !open && !teaserDismissed && !hasOpenedOnce;
  const showUnreadBadge = showTeaser;

  const fabBottomClass = pastScrollThreshold
    ? "bottom-[calc(5.25rem+env(safe-area-inset-bottom,0px))] md:bottom-6"
    : "bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] md:bottom-6";

  if (!heroIntroReady) return null;

  return (
    <motion.div
      className={cn(
        "pointer-events-none fixed right-4 z-[60] flex flex-col items-end md:right-6",
        fabBottomClass,
      )}
      aria-live="polite"
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <AnimatePresence>
        {showTeaser ? (
          <motion.button
            type="button"
            initial={reducedMotion ? false : { opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
            onClick={openPanel}
            className={cn(
              "pointer-events-auto mb-3 block w-[min(280px,calc(100vw-5.5rem))] rounded-xl",
              "border border-[var(--line)] bg-cream px-4 py-3 text-left shadow-[var(--shadow-md)]",
              "transition-shadow hover:shadow-[var(--shadow-lg)]",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal",
            )}
          >
            <span className="font-body text-sm font-medium text-teal">{MILA_TEASER_TITLE}</span>
            <p className="mt-1 font-body text-xs leading-relaxed text-graphite">{MILA_GREETING}</p>
          </motion.button>
        ) : null}
      </AnimatePresence>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <button
          type="button"
          onClick={openPanel}
          className={cn(
            "pointer-events-auto relative flex size-14 items-center justify-center rounded-full bg-teal",
            "font-display text-2xl text-cream shadow-[var(--shadow-md)]",
            "transition-[transform,box-shadow,opacity] duration-200 hover:scale-[1.03] hover:shadow-[var(--shadow-lg)]",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal",
            open && "pointer-events-none scale-90 opacity-0",
          )}
          aria-label={`Открыть чат с ${MILA_NAME}`}
          aria-expanded={open}
        >
          M
          {showUnreadBadge ? (
            <span
              className="absolute -right-0.5 -top-0.5 flex size-[18px] items-center justify-center rounded-full bg-graphite font-body text-[10px] font-medium text-cream"
              aria-hidden
            >
              1
            </span>
          ) : null}
        </button>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/25 backdrop-blur-[2px] md:bg-transparent md:backdrop-blur-none" />
          <Dialog.Content
            className={cn(
              "pointer-events-auto fixed z-[101] flex flex-col overflow-hidden outline-none",
              "max-h-[min(520px,72vh)] rounded-2xl border border-[var(--line)] bg-cream shadow-[var(--shadow-lg)]",
              "max-md:inset-x-4 md:inset-x-auto",
              pastScrollThreshold
                ? "max-md:bottom-[calc(5.25rem+env(safe-area-inset-bottom,0px))]"
                : "max-md:bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))]",
              "md:bottom-[5.5rem] md:right-6 md:max-h-[min(480px,calc(100vh-7rem))]",
            )}
            style={{ width: MILA_PANEL_WIDTH_PX, maxWidth: "calc(100vw - 2rem)" }}
            aria-describedby={undefined}
          >
            <Dialog.Title className="sr-only">Чат с координатором {MILA_NAME}</Dialog.Title>

            <header className="flex items-center gap-3 border-b border-[var(--line)] bg-cream px-4 py-3">
              <MilaAvatar />
              <div className="min-w-0 flex-1">
                <p className="font-body text-sm font-medium text-graphite">{MILA_NAME}</p>
                <p className="font-body text-xs text-gray">{MILA_ROLE}</p>
              </div>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="flex size-8 items-center justify-center rounded-full text-gray transition-colors hover:bg-black/5 hover:text-graphite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                  aria-label="Закрыть чат"
                >
                  <X size={18} strokeWidth={1.75} aria-hidden />
                </button>
              </Dialog.Close>
            </header>

            <div className="flex min-h-[200px] flex-1 flex-col bg-[#fafbfb] px-4 py-4">
              <div className="max-w-[92%] rounded-2xl rounded-tl-md border border-[var(--line)] bg-cream px-3.5 py-2.5">
                <p className="font-body text-sm leading-relaxed text-graphite">{MILA_GREETING}</p>
              </div>
            </div>

            <footer className="flex items-center gap-2 border-t border-[var(--line)] bg-cream px-3 py-3">
              <label className="sr-only" htmlFor="mila-message">
                Сообщение для {MILA_NAME}
              </label>
              <input
                id="mila-message"
                type="text"
                placeholder={MILA_INPUT_PLACEHOLDER}
                className="min-w-0 flex-1 rounded-lg border border-[var(--line)] bg-cream px-3 py-2.5 font-body text-sm text-graphite outline-none transition-colors placeholder:text-gray focus-visible:border-teal"
                autoComplete="off"
              />
              <button
                type="button"
                className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-teal text-cream transition-colors hover:bg-teal/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                aria-label="Отправить сообщение"
              >
                <Send size={18} strokeWidth={2} aria-hidden />
              </button>
            </footer>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </motion.div>
  );
}

export default MilaWidget;
