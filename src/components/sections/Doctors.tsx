"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { DoctorCircle } from "./doctors/DoctorCircle";
import { DoctorsSeeAllCircle } from "./doctors/DoctorsSeeAllLink";
import {
  DOCTORS_CTA_SLOT,
  DOCTORS_SEE_ALL_HREF,
  DOCTORS_SEE_ALL_LABEL,
  DOCTORS_TABS,
  DOCTORS_TITLE,
  type DoctorGroup,
  getDoctorsByGroup,
} from "./doctors/constants";

export default function Doctors() {
  const [activeGroup, setActiveGroup] = useState<DoctorGroup>("clinic");
  const visibleDoctors = getDoctorsByGroup(activeGroup);

  return (
    <section
      id="doctors"
      className="bg-cream py-20 md:py-24 lg:py-28"
      aria-labelledby="doctors-title"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10 lg:px-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
          <h2
            id="doctors-title"
            className="max-w-xl font-display text-display-sm text-graphite md:text-[clamp(28px,3vw,40px)] md:leading-[1.15]"
          >
            {DOCTORS_TITLE}
          </h2>

          <div
            className="flex shrink-0 gap-2 rounded-full border border-[var(--line)] bg-cream p-1"
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
                  aria-controls="doctors-cluster"
                  id={`doctors-tab-${tab.id}`}
                  className={cn(
                    "rounded-full px-4 py-2 font-body text-xs transition-colors duration-300 md:px-5 md:text-sm",
                    isActive
                      ? "bg-graphite text-cream"
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

        <div className="mt-12 overflow-x-auto md:mt-16 md:overflow-visible">
          <div
            id="doctors-cluster"
            role="tabpanel"
            aria-labelledby={`doctors-tab-${activeGroup}`}
            className="relative mx-auto w-[1180px] max-w-none origin-top-left scale-[0.66] sm:scale-[0.8] md:max-w-[1180px] md:scale-100 md:origin-center"
            style={{ minHeight: 820 }}
          >
            {visibleDoctors.map((doctor) => (
              <DoctorCircle key={doctor.id} doctor={doctor} />
            ))}

            <DoctorsSeeAllCircle
              slot={DOCTORS_CTA_SLOT}
              href={DOCTORS_SEE_ALL_HREF}
              label={DOCTORS_SEE_ALL_LABEL}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
