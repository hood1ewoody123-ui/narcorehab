import Image from "next/image";
import Link from "next/link";
import {
  PARTNER_LETTERS,
  PARTNERS_ALL_HREF,
  PARTNERS_ALL_LABEL,
  PARTNERS_TITLE,
} from "./partners/constants";

export default function PartnersCommunity() {
  return (
    <section id="partners" className="bg-cream py-20 md:py-24 lg:py-28" aria-labelledby="partners-title">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10 lg:px-14">
        <h2
          id="partners-title"
          className="font-display text-display-sm text-graphite md:text-[clamp(30px,3vw,40px)]"
        >
          {PARTNERS_TITLE}
        </h2>

        <div className="mt-8 flex flex-col items-center gap-8 md:flex-row md:items-end md:justify-between">
          <Link
            href={PARTNERS_ALL_HREF}
            className="rounded-xl border border-[var(--line)] px-6 py-3 font-body text-lg text-graphite transition-colors hover:border-teal hover:bg-teal hover:text-cream"
          >
            {PARTNERS_ALL_LABEL}
          </Link>

          <div className="relative mx-auto h-[520px] w-full max-w-[min(100%,360px)] md:mx-0 md:h-[340px] md:max-w-[820px]">
            {PARTNER_LETTERS.map((letter) => (
              <div
                key={letter.id}
                className={`absolute h-[220px] w-[min(44vw,172px)] overflow-hidden rounded-xl border border-[var(--line)] bg-cream p-2 shadow-[var(--shadow-md)] md:h-[240px] md:w-[178px] ${letter.className}`}
                style={{ transform: `rotate(${letter.rotate})` }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-lg border border-[var(--line)] bg-cream">
                  <Image
                    src={letter.imageSrc}
                    alt={letter.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 172px, 178px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
