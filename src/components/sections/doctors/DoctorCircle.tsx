import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Doctor } from "./constants";

type DoctorCircleProps = {
  doctor: Doctor;
};

export function DoctorCircle({ doctor }: DoctorCircleProps) {
  const { size } = doctor.slot;

  return (
    <div
      className="group absolute flex flex-col items-center"
      style={{
        top: doctor.slot.top,
        left: doctor.slot.left,
        width: size,
      }}
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
            "bg-graphite/80 opacity-0 transition-opacity duration-300 ease-out-expo",
            "group-hover:opacity-100 group-focus-visible:opacity-100",
          )}
          aria-hidden
        >
          <span className="font-body text-sm leading-snug text-cream md:text-[15px]">
            {doctor.name}
          </span>
        </span>
      </button>

      <p
        className={cn(
          "pointer-events-none mt-3 w-max max-w-[240px] text-center font-body text-xs leading-relaxed text-gray",
          "opacity-0 transition-opacity duration-300 ease-out-expo",
          "group-hover:opacity-100 group-focus-within:opacity-100",
        )}
        aria-hidden
      >
        {doctor.title}
      </p>
    </div>
  );
}
