import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Doctor } from "./constants";

type DoctorCardProps = {
  doctor: Doctor;
  className?: string;
};

export function DoctorCard({ doctor, className }: DoctorCardProps) {
  const [surname, ...rest] = doctor.name.split(" ");
  const givenNames = rest.join(" ");

  return (
    <article
      className={cn(
        "group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-white",
        "shadow-[var(--shadow-sm)] transition-shadow duration-300 hover:shadow-[var(--shadow-md)]",
        className,
      )}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-cream">
        <Image
          src={doctor.imageSrc}
          alt=""
          fill
          className="object-cover object-top transition-transform duration-500 ease-out-expo group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 280px"
        />
      </div>

      <div className="flex flex-1 flex-col px-4 py-5 md:px-5 md:py-6">
        <h3 className="font-body text-lg font-medium leading-snug text-graphite md:text-xl">
          <span className="block">{surname}</span>
          {givenNames ? (
            <span className="mt-0.5 block font-normal text-graphite/90">{givenNames}</span>
          ) : null}
        </h3>
        <p className="mt-3 text-section-muted line-clamp-3">{doctor.title}</p>
      </div>
    </article>
  );
}
