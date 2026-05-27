import Image from "next/image";
import Link from "next/link";
import {
  CENTER_EVENTS,
  EVENTS_ALL_HREF,
  EVENTS_ALL_LABEL,
  EVENTS_TITLE,
} from "./events/constants";

export default function EventsExpertise() {
  return (
    <section id="events" className="bg-cream py-20 md:py-24 lg:py-28" aria-labelledby="events-title">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10 lg:px-14">
        <h2
          id="events-title"
          className="font-display text-display-sm text-graphite md:text-[clamp(30px,3.2vw,42px)] md:leading-[1.12]"
        >
          {EVENTS_TITLE}
        </h2>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {CENTER_EVENTS.map((event) => (
            <article
              key={event.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-cream shadow-[var(--shadow-sm)] md:rounded-3xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-silver/20">
                <Image
                  src={event.imageSrc}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div className="flex flex-1 flex-col p-5 md:p-6">
                <h3 className="font-body text-base font-medium leading-snug text-graphite md:text-lg">
                  {event.title}
                </h3>
                <p className="mt-3 line-clamp-3 font-body text-sm leading-relaxed text-gray">
                  {event.excerpt}
                </p>
                <Link
                  href={event.href}
                  className="mt-4 inline-flex font-body text-sm text-teal transition-colors hover:text-graphite"
                >
                  Читать далее ({event.readMinutes} мин.)
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center">
          <Link
            href={EVENTS_ALL_HREF}
            className="font-body text-base text-teal underline decoration-teal/50 underline-offset-4 transition-colors hover:text-graphite hover:decoration-graphite/40 md:text-lg"
          >
            {EVENTS_ALL_LABEL}
          </Link>
        </p>
      </div>
    </section>
  );
}
