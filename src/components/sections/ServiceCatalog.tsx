"use client";

import { ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  SERVICE_CATALOG_CATEGORIES,
  SERVICE_CATALOG_SUBTITLE,
  SERVICE_CATALOG_TITLE,
  type ServiceCatalogItem,
} from "./service-catalog/constants";

function ServiceCatalogRow({ item }: { item: ServiceCatalogItem }) {
  return (
    <Link
      href={item.href ?? "#"}
      className={cn(
        "group -mx-4 block w-[calc(100%+2rem)] px-4 md:-mx-5 md:w-[calc(100%+2.5rem)] md:px-5",
        "flex items-center justify-between gap-4 border-b border-[var(--line)] py-3.5 transition-colors duration-200 last:border-b-0",
        "hover:bg-silver/20",
        item.indent && "pl-5 md:pl-6",
      )}
    >
      <span className="min-w-0 font-body text-sm leading-snug text-graphite md:text-[15px]">
        {item.title}
      </span>
      <span className="flex shrink-0 items-center gap-2">
        {item.price ? (
          <span className="rounded-full bg-silver/25 px-3 py-1 font-body text-xs text-graphite whitespace-nowrap">
            {item.price}
          </span>
        ) : null}
        <ArrowRight
          className="text-gray transition-colors duration-200 group-hover:text-teal"
          size={16}
          weight="regular"
          aria-hidden
        />
      </span>
    </Link>
  );
}

export default function ServiceCatalog() {
  return (
    <section
      id="services"
      className="bg-cream py-20 md:py-24 lg:py-28"
      aria-labelledby="services-title"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10 lg:px-14">
        <header>
          <h2
            id="services-title"
            className="font-display text-display-sm text-graphite md:text-[clamp(30px,3.4vw,44px)] md:leading-[1.15]"
          >
            {SERVICE_CATALOG_TITLE}
          </h2>
          <p className="mt-4 font-body text-sm text-gray md:text-base">
            {SERVICE_CATALOG_SUBTITLE}
          </p>
        </header>

        <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 md:gap-6">
          {SERVICE_CATALOG_CATEGORIES.map((category) => (
            <article
              key={category.id}
              className="overflow-hidden rounded-2xl border border-[var(--line)] md:rounded-3xl"
            >
              <div className="bg-teal px-5 py-3.5 md:px-6 md:py-4">
                <h3 className="font-body text-sm font-medium text-cream md:text-base">
                  {category.title}
                </h3>
              </div>
              <div className="bg-cream px-4 md:px-5">
                {category.items.map((item) => (
                  <ServiceCatalogRow key={`${category.id}-${item.title}`} item={item} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
