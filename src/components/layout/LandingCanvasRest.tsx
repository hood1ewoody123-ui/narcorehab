import { cn } from "@/lib/utils";

type LandingCanvasRestProps = {
  children?: React.ReactNode;
  className?: string;
};

/** Заливка cream под блоком программ и дальше по лендингу */
export function LandingCanvasRest({ children, className }: LandingCanvasRestProps) {
  return (
    <div className={cn("relative z-10 bg-cream", className)}>{children}</div>
  );
}

export default LandingCanvasRest;
