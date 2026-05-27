import { SITE_PHONE_MAIN } from "@/components/sections/hero/constants";
import { CONTACT_FORM_TELEGRAM_HREF } from "@/components/sections/contact-form/constants";
import Link from "next/link";

export default function ContactRow() {
  return (
    <section
      id="contact-row"
      className="bg-cream pb-8 md:pb-10"
      aria-labelledby="contact-row-title"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10 lg:px-14 lg:pr-[min(22vw,220px)]">
        <div className="rounded-2xl border border-[var(--line)] bg-cream px-5 py-5 shadow-[var(--shadow-sm)] md:rounded-3xl md:px-7 md:py-6">
          <p
            id="contact-row-title"
            className="font-body text-[11px] uppercase tracking-[0.14em] text-gray"
          >
            Контакт
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-body">
            <a
              href={`tel:${SITE_PHONE_MAIN}`}
              className="text-[clamp(22px,2.4vw,28px)] font-medium text-teal transition-colors hover:text-graphite"
            >
              8 800 300-61-03
            </a>
            <span className="text-gray" aria-hidden>
              ·
            </span>
            <Link
              href={CONTACT_FORM_TELEGRAM_HREF}
              className="text-[clamp(18px,2vw,24px)] font-medium text-teal transition-colors hover:text-graphite"
            >
              Написать в Telegram
            </Link>
          </div>
          <p className="mt-2 font-body text-sm text-gray">
            Без «звоните срочно» — спокойный доступ к контакту
          </p>
        </div>
      </div>
    </section>
  );
}
