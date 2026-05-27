import Link from "next/link";

export default function PartnersCommunity() {
  return (
    <section id="partners" className="bg-cream py-20 md:py-24 lg:py-28" aria-labelledby="partners-title">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10 lg:px-14">
        <h2 id="partners-title" className="font-display text-display-sm text-graphite md:text-[clamp(30px,3vw,40px)]">
          Нам доверяют партнёры и сообщества
        </h2>

        <div className="mt-8 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <Link href="#" className="rounded-xl border border-graphite/35 px-6 py-3 font-body text-lg text-graphite transition-colors hover:bg-graphite hover:text-cream">
            Все письма (12)
          </Link>

          <div className="relative h-[280px] w-full max-w-[760px]">
            <div className="absolute left-[8%] top-[6%] h-[250px] w-[190px] rotate-[-6deg] rounded-xl border border-[var(--line)] bg-cream p-2 shadow-sm">
              <div className="h-full rounded-lg border border-dashed border-[var(--line)] bg-silver/20" />
            </div>
            <div className="absolute left-[34%] top-[0%] h-[260px] w-[200px] rotate-[2deg] rounded-xl border border-[var(--line)] bg-cream p-2 shadow-md">
              <div className="h-full rounded-lg border border-dashed border-[var(--line)] bg-silver/20" />
            </div>
            <div className="absolute left-[58%] top-[8%] h-[250px] w-[190px] rotate-[7deg] rounded-xl border border-[var(--line)] bg-cream p-2 shadow-sm">
              <div className="h-full rounded-lg border border-dashed border-[var(--line)] bg-silver/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
