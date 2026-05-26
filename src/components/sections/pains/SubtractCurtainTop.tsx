import { cn } from "@/lib/utils";
import {
  CREAM,
  HERO_CURTAIN_HEIGHT,
  SUBTRACT_CURTAIN_PATH,
  SUBTRACT_CURTAIN_VIEW_HEIGHT,
  SUBTRACT_CURTAIN_WIDTH,
} from "@/lib/subtract-curtain";

type SubtractCurtainTopProps = {
  className?: string;
};

export function SubtractCurtainTop({ className }: SubtractCurtainTopProps) {
  return (
    <svg
      className={cn("block w-full shrink-0 leading-none -mb-px", className)}
      style={{ height: HERO_CURTAIN_HEIGHT }}
      viewBox={`0 0 ${SUBTRACT_CURTAIN_WIDTH} ${SUBTRACT_CURTAIN_VIEW_HEIGHT}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      <path d={SUBTRACT_CURTAIN_PATH} fill={CREAM} />
    </svg>
  );
}

export default SubtractCurtainTop;
