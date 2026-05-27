"use client";

import { useEffect, useRef } from "react";
import {
  WHY_US_CLINIC_VIDEO,
  WHY_US_TITLE,
} from "./why-us/constants";

export default function WhyUs() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      video.pause();
      return;
    }

    video.muted = true;
    video.playsInline = true;

    const play = () => {
      void video.play().catch(() => {});
    };

    if (video.readyState >= 2) play();
    else video.addEventListener("loadeddata", play, { once: true });

    return () => {
      video.removeEventListener("loadeddata", play);
    };
  }, []);

  return (
    <section
      id="why-us"
      className="bg-cream pb-20 md:pb-24 lg:pb-28"
      aria-labelledby="why-us-title"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10 lg:px-14">
        <h2
          id="why-us-title"
          className="max-w-3xl font-display text-display-sm text-graphite md:text-[clamp(28px,3vw,40px)] md:leading-[1.15]"
        >
          {WHY_US_TITLE}
        </h2>

        <div className="mt-10 overflow-hidden rounded-2xl bg-black/5 md:mt-12 md:rounded-3xl">
          <video
            ref={videoRef}
            className="aspect-video w-full object-cover"
            controls
            playsInline
            muted
            loop
            preload="metadata"
            aria-label="Видео из клиники ЦМПП «Здравница»"
          >
            <source src={WHY_US_CLINIC_VIDEO} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
