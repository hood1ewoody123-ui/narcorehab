"use client";

import FloatingCta from "@/components/sections/FloatingCta";
import StickyBar from "@/components/sections/StickyBar";
import { FloatingUiProvider } from "@/components/widgets/floating-ui/FloatingUiContext";
import { MilaWidget } from "@/components/widgets/mila/MilaWidget";

type HomeShellProps = {
  children: React.ReactNode;
};

export default function HomeShell({ children }: HomeShellProps) {
  return (
    <FloatingUiProvider>
      <StickyBar />
      <FloatingCta />
      <MilaWidget />
      {children}
    </FloatingUiProvider>
  );
}
