import { cn } from "@/lib/utils";
import { HERO_CURTAIN_HEIGHT } from "@/lib/subtract-curtain";

type LandingCanvasProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Контент над hero: overlap на subtract, z выше hero — при скролле блоки
 * (боли, обращение…) наезжают на hero, hero уходит под ними.
 */
export function LandingCanvas({ children, className }: LandingCanvasProps) {
  return (
    <div
      className={cn("relative z-10 -mt-[var(--hero-curtain-h)]", className)}
      style={{ "--hero-curtain-h": `${HERO_CURTAIN_HEIGHT}px` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

export default LandingCanvas;
