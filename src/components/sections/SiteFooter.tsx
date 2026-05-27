import { LogoAnimated } from "@/components/ui/LogoAnimated";
import { MagnifyingGlass, Phone, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import {
  FOOTER_BOTTOM_LINKS,
  FOOTER_CONTACT,
  FOOTER_COPYRIGHT,
  FOOTER_DISCLAIMER,
  FOOTER_LEGAL,
  FOOTER_LICENSES,
  FOOTER_MEDICAL_NOTE,
  FOOTER_NAV_COLUMNS,
  FOOTER_SOCIALS,
} from "./footer/constants";

export default function SiteFooter() {
  return (
    <footer className="relative bg-transparent pb-8 pt-6 md:pb-10 md:pt-8">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10 lg:px-14">
        <div className="flex items-start gap-2 rounded-lg border border-[var(--line)] bg-[var(--teal-20)] px-4 py-3">
          <WarningCircle size={18} weight="duotone" className="mt-0.5 shrink-0 text-teal" aria-hidden />
          <p className="font-body text-xs leading-relaxed text-graphite md:text-sm">{FOOTER_DISCLAIMER}</p>
        </div>

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {FOOTER_SOCIALS.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-[var(--line)] px-3 font-body text-xs text-graphite transition-colors hover:border-teal hover:text-teal"
              >
                {social.label}
              </Link>
            ))}
          </div>
          <label className="relative block w-full max-w-md">
            <span className="sr-only">Поиск по сайту</span>
            <MagnifyingGlass
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray"
              aria-hidden
            />
            <input
              type="search"
              placeholder="Поиск"
              className="w-full rounded-full border border-[var(--line)] bg-cream py-2.5 pl-11 pr-4 font-body text-sm text-graphite outline-none transition-colors focus-visible:border-teal"
            />
          </label>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 lg:grid-cols-4">
          {FOOTER_NAV_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="font-body text-sm font-medium text-graphite">{column.title}</h3>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="font-body text-xs leading-relaxed text-gray transition-colors hover:text-teal md:text-sm"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center font-body text-[10px] uppercase tracking-[0.35em] text-gray md:text-[11px]">
          {FOOTER_MEDICAL_NOTE}
        </p>

        <div className="mt-8 grid gap-8 border-t border-[var(--line)] pt-8 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl text-graphite">Контактная информация</h3>
            <div className="mt-4 space-y-2">
              {FOOTER_CONTACT.phones.map((phone) => (
                <a
                  key={phone.display}
                  href={phone.href}
                  className="flex items-center gap-2 font-body text-base text-teal transition-colors hover:text-graphite md:text-lg"
                >
                  <Phone size={18} weight="duotone" aria-hidden />
                  {phone.display}
                </a>
              ))}
            </div>
            <div className="mt-3 font-body text-sm">
              <Link href={FOOTER_CONTACT.telegram.href} className="text-teal hover:text-graphite">
                {FOOTER_CONTACT.telegram.label}
              </Link>
            </div>
            <ul className="mt-5 space-y-4">
              {FOOTER_CONTACT.locations.map((location) => (
                <li key={location.title}>
                  <p className="font-body text-sm font-medium text-graphite">{location.title}</p>
                  <p className="mt-1 font-body text-sm text-gray">{location.address}</p>
                  <p className="mt-1 font-body text-xs text-gray">{location.hours}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-2xl text-graphite">Правовая информация</h3>
            <p className="mt-4 font-body text-xs leading-relaxed text-gray md:text-sm">
              {FOOTER_LEGAL.text}
            </p>
            <ul className="mt-4 space-y-2">
              {FOOTER_LEGAL.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="font-body text-sm text-teal hover:text-graphite">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <p className="font-body text-sm font-medium text-graphite">Лицензия</p>
              <div className="mt-3 flex gap-3">
                {FOOTER_LICENSES.map((license) => (
                  <div
                    key={license.src}
                    className="relative h-20 w-14 overflow-hidden rounded border border-[var(--line)] bg-silver/10"
                  >
                    <Image
                      src={license.src}
                      alt={license.alt}
                      fill
                      sizes="56px"
                      className="object-cover object-top"
                    />
                  </div>
                ))}
              </div>
              <p className="mt-2 font-body text-xs text-gray">{FOOTER_LEGAL.license}</p>
            </div>

            <div className="mt-5">
              <p className="font-body text-sm font-medium text-graphite">Принимаем к оплате</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {FOOTER_LEGAL.payments.map((payment) => (
                  <span
                    key={payment}
                    className="rounded-md border border-[var(--line)] px-2.5 py-1 font-body text-xs text-graphite"
                  >
                    {payment}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--line)] pt-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <LogoAnimated width={120} showText={false} play={false} fill="var(--graphite)" />
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {FOOTER_BOTTOM_LINKS.map((label) => (
                <li key={label}>
                  <Link
                    href="#"
                    className="font-body text-xs text-gray transition-colors hover:text-teal md:text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 font-body text-xs text-gray">{FOOTER_COPYRIGHT}</p>
        </div>
      </div>
    </footer>
  );
}
