import { ArrowUpRight } from "@phosphor-icons/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { DoctorSlot } from "./constants";

type DoctorsSeeAllCircleProps = {
  slot?: DoctorSlot;
  href: string;
  label: string;
  variant?: "absolute" | "inline";
};

const INLINE_SIZE = 148;

export function DoctorsSeeAllCircle({
  slot,
  href,
  label,
  variant = "absolute",
}: DoctorsSeeAllCircleProps) {
  const size = variant === "inline" ? INLINE_SIZE : (slot?.size ?? INLINE_SIZE);
  const isInline = variant === "inline";

  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center rounded-full",
        "border border-graphite/25 bg-cream text-center",
        "transition-colors duration-300 hover:border-teal hover:bg-teal",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal",
        "group",
        isInline ? "shrink-0" : "absolute",
      )}
      style={
        isInline
          ? { width: size, height: size }
          : {
              top: slot?.top,
              left: slot?.left,
              width: size,
              height: size,
            }
      }
    >
      <ArrowUpRight
        className="text-graphite transition-colors duration-300 group-hover:text-cream"
        size={20}
        weight="thin"
        aria-hidden
      />
      <span className="mt-2 max-w-[88px] font-body text-[9px] leading-tight tracking-[0.14em] text-graphite uppercase transition-colors duration-300 group-hover:text-cream md:text-[10px]">
        {label}
      </span>
    </Link>
  );
}
