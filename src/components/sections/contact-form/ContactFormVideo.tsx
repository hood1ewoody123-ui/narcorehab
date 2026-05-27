"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import {
  CONTACT_FORM_VIDEO_MP4,
  CONTACT_FORM_VIDEO_WEBM,
} from "./constants";

type ContactFormVideoProps = {
  className?: string;
};

export function ContactFormVideo({ className }: ContactFormVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.loop = true;

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
    <div
      className={cn(
        "relative w-full overflow-hidden bg-cream",
        "rounded-t-md max-md:rounded-b-[min(68vw,300px)] md:rounded-t-lg md:rounded-b-[clamp(140px,30vw,320px)]",
        className,
      )}
    >
      <video
        ref={videoRef}
        className="aspect-[9/16] w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      >
        <source src={CONTACT_FORM_VIDEO_WEBM} type="video/webm" />
        <source src={CONTACT_FORM_VIDEO_MP4} type="video/mp4" />
      </video>
    </div>
  );
}
