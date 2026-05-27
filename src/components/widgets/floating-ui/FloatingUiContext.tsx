"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { FLOATING_UI_SCROLL_THRESHOLD } from "./constants";

type FloatingUiContextValue = {
  pastScrollThreshold: boolean;
  /** Hero intro (логотип + шторка) завершён — можно показывать Милу */
  heroIntroReady: boolean;
  markHeroIntroReady: () => void;
  openMila: () => void;
  registerMilaOpener: (fn: () => void) => void;
};

const FloatingUiContext = createContext<FloatingUiContextValue | null>(null);

export function FloatingUiProvider({ children }: { children: ReactNode }) {
  const progress = useScrollProgress();
  const pastScrollThreshold = progress >= FLOATING_UI_SCROLL_THRESHOLD;
  const [heroIntroReady, setHeroIntroReady] = useState(false);
  const milaOpenRef = useRef<() => void>(() => {});

  const markHeroIntroReady = useCallback(() => {
    setHeroIntroReady(true);
  }, []);

  const registerMilaOpener = useCallback((fn: () => void) => {
    milaOpenRef.current = fn;
  }, []);

  const openMila = useCallback(() => {
    if (!heroIntroReady) return;
    milaOpenRef.current();
  }, [heroIntroReady]);

  const value = useMemo(
    () => ({
      pastScrollThreshold,
      heroIntroReady,
      markHeroIntroReady,
      openMila,
      registerMilaOpener,
    }),
    [pastScrollThreshold, heroIntroReady, markHeroIntroReady, openMila, registerMilaOpener],
  );

  return <FloatingUiContext.Provider value={value}>{children}</FloatingUiContext.Provider>;
}

export function useFloatingUi() {
  const ctx = useContext(FloatingUiContext);
  if (!ctx) {
    throw new Error("useFloatingUi must be used within FloatingUiProvider");
  }
  return ctx;
}
