import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Doctor } from "./constants";

type DoctorCircleProps = {
  doctor: Doctor;
  layout?: "absolute" | "grid";
};

export function DoctorCircle({ doctor, layout = "absolute" }: DoctorCircleProps) {
  const size = layout === "grid" ? Math.min(doctor.slot.size, 148) : doctor.slot.size;
  const isGrid = layout === "grid";

  return (
    <div
      className={
        isGrid
          ? "group mx-auto flex w-full min-w-0 max-w-[168px] flex-col items-center"
          : "group absolute flex flex-col items-center"
      }
      style={
        isGrid
          ? undefined
          : {
              top: doctor.slot.top,
              left: doctor.slot.left,
              width: size,
            }
      }
    >
      <button
        type="button"
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-cream",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal",
        )}
        style={{ width: size, height: size }}
        aria-label={`${doctor.name}, ${doctor.title}`}
      >
        <Image
          src={doctor.imageSrc}
          alt=""
          width={size}
          height={size}
          className={cn(
            "h-full w-full object-cover object-top",
            "transition-[filter] duration-300 ease-out-expo",
            "group-hover:grayscale group-focus-visible:grayscale",
          )}
          sizes={`${size}px`}
        />

        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center p-4 text-center",
            "bg-teal/85 opacity-0 transition-opacity duration-300 ease-out-expo",
            "group-hover:opacity-100 group-focus-visible:opacity-100",
          )}
          aria-hidden
        >
          <span
            className={cn(
              "font-body leading-snug text-cream",
              isGrid ? "px-2 text-[11px]" : "text-sm md:text-[15px]",
            )}
          >
            {doctor.name}
          </span>
        </span>
      </button>

      <p
        className={cn(
          "mt-3 text-center font-body text-xs leading-relaxed break-words text-gray",
          isGrid ? "w-full px-0.5 opacity-100" : "pointer-events-none w-max max-w-[240px]",
          !isGrid &&
            "opacity-0 transition-opacity duration-300 ease-out-expo group-hover:opacity-100 group-focus-within:opacity-100",
        )}
      >
        {doctor.title}
      </p>
    </div>
  );
}
