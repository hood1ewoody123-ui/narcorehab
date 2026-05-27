import { ArrowUpRight } from "@phosphor-icons/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { DoctorSlot } from "./constants";

type DoctorsSeeAllCircleProps = {
  slot: DoctorSlot;
  href: string;
  label: string;
};

export function DoctorsSeeAllCircle({
  slot,
  href,
  label,
}: DoctorsSeeAllCircleProps) {
  const { size } = slot;

  return (
    <Link
      href={href}
      className={cn(
        "absolute flex flex-col items-center justify-center rounded-full",
        "border border-graphite/25 bg-cream text-center",
        "transition-colors duration-300 hover:border-graphite hover:bg-graphite",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal",
        "group",
      )}
      style={{
        top: slot.top,
        left: slot.left,
        width: size,
        height: size,
      }}
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
