"use client";

import { PAINS_COLUMNS, PAINS_SUBTITLE, PAINS_TITLE } from "./constants";
import PainsLink from "./PainsLink";

type PainsContentProps = {
  linesScale: number;
};

export function PainsContent({ linesScale }: PainsContentProps) {
  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col px-6 pb-10 pt-4 md:px-10 md:pb-12 md:pt-6 lg:px-14">
      <header className="max-w-3xl">
        <h2 className="font-display text-display-md text-[#17191A]">
          {PAINS_TITLE}
        </h2>
        <p className="mt-4 font-body text-base leading-relaxed text-[#7E8788] md:text-lg">
          {PAINS_SUBTITLE}
        </p>
      </header>

      <div className="mt-14 md:mt-16">
        <div
          className="grid min-h-[320px] grid-cols-1 border-x border-[var(--line)] md:grid-cols-3"
          style={{
            transform: linesScale === 1 ? undefined : `scaleY(${linesScale})`,
            transformOrigin: "top center",
          }}
        >
          {PAINS_COLUMNS.map((column, index) => (
            <article
              key={column.title}
              className={`flex flex-col px-0 py-8 md:px-8 md:py-10 ${
                index > 0
                  ? "border-t border-[var(--line)] md:border-t-0 md:border-l"
                  : ""
              }`}
            >
              <h3 className="font-display text-display-sm text-[#17191A]">
                {column.title}
              </h3>

              <ul className="mt-6 flex flex-col gap-3">
                {column.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 font-body text-sm leading-relaxed text-[#7E8788]"
                  >
                    <span
                      className="mt-[0.55em] size-1 shrink-0 rounded-full bg-[#7E8788]/70"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <PainsLink href={column.href} className="mt-8">
                {column.cta}
              </PainsLink>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PainsContent;
