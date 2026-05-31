"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { DoctorCard } from "./doctors/DoctorCard";
import {
  DOCTORS_SEE_ALL_HREF,
  DOCTORS_SEE_ALL_LABEL,
  DOCTORS_TABS,
  DOCTORS_TITLE,
  DOCTORS_SUBTITLE,
  type DoctorGroup,
  getDoctorsByGroup,
} from "./doctors/constants";

export default function Doctors() {
  const [activeGroup, setActiveGroup] = useState<DoctorGroup>("clinic");
  const visibleDoctors = getDoctorsByGroup(activeGroup);

  return (
    <section
      id="specialists"
      className="bg-cream py-20 md:py-24 lg:py-28"
      aria-labelledby="doctors-title"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10 lg:px-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <p className="text-section-label">Команда</p>
            <h2
              id="doctors-title"
              className="mt-3 font-display text-display-sm text-graphite md:text-display-md"
            >
              {DOCTORS_TITLE}
            </h2>
            <p className="mt-4 text-section-body">{DOCTORS_SUBTITLE}</p>
          </div>

          <div
            className="inline-flex w-fit max-w-full shrink-0 gap-1 self-start rounded-full border border-[var(--line)] bg-white p-1 shadow-[var(--shadow-sm)]"
            role="tablist"
            aria-label="Категория специалистов"
          >
            {DOCTORS_TABS.map((tab) => {
              const isActive = activeGroup === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="doctors-grid"
                  id={`doctors-tab-${tab.id}`}
                  className={cn(
                    "whitespace-nowrap rounded-full px-4 py-2.5 font-body text-body-sm font-medium transition-colors duration-300 md:px-6",
                    isActive
                      ? "bg-teal text-cream"
                      : "text-gray hover:text-graphite",
                  )}
                  onClick={() => setActiveGroup(tab.id)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          id="doctors-grid"
          role="tabpanel"
          aria-labelledby={`doctors-tab-${activeGroup}`}
          className="mt-12 md:mt-14"
        >
          <ul className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {visibleDoctors.map((doctor) => (
              <li key={doctor.id}>
                <DoctorCard doctor={doctor} />
              </li>
            ))}
          </ul>

          <div className="mt-12 flex justify-center md:mt-14">
            <Link
              href={DOCTORS_SEE_ALL_HREF}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border border-graphite/20 bg-white px-6 py-3.5",
                "font-body text-body-md font-medium text-graphite",
                "transition-colors duration-300 hover:border-teal hover:bg-teal hover:text-cream",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal",
              )}
            >
              {DOCTORS_SEE_ALL_LABEL}
              <ArrowUpRight size={18} weight="bold" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
