"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const CLIPS = [
  {
    mp4: "/video/hero/hero-1.mp4",
    webm: "/video/hero/hero-1.webm",
    poster: "/video/hero/hero-1-poster.jpg",
  },
  {
    mp4: "/video/hero/hero-2.mp4",
    webm: "/video/hero/hero-2.webm",
  },
] as const;

const PLAYBACK_RATE = 0.85;
const CROSSFADE_SEC = 1.2;
const MAX_BLUR_PX = 18;

type HeroBackgroundVideoProps = {
  className?: string;
};

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function prepareVideo(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.playbackRate = PLAYBACK_RATE;
}

function tryPlay(video: HTMLVideoElement | null) {
  if (!video) return;
  prepareVideo(video);
  void video.play().catch(() => {});
}

function VideoSources({ clip }: { clip: (typeof CLIPS)[number] }) {
  return (
    <>
      <source src={clip.webm} type="video/webm" />
      <source src={clip.mp4} type="video/mp4" />
    </>
  );
}

function HeroVideoGradient() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-black/25 via-black/10 to-black/30"
      aria-hidden
    />
  );
}

/** Один ролик + loop — надёжнее на iOS/Android и меньше трафика */
function HeroBackgroundVideoMobile({ className }: HeroBackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const root = containerRef.current;
    if (!video) return;

    prepareVideo(video);
    tryPlay(video);

    const onReady = () => tryPlay(video);
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);

    const io =
      root &&
      new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) tryPlay(video);
          else video.pause();
        },
        { threshold: 0.15 },
      );

    if (io && root) io.observe(root);

    const onFirstTouch = () => tryPlay(video);
    document.addEventListener("touchstart", onFirstTouch, { once: true, passive: true });

    return () => {
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      io?.disconnect();
      document.removeEventListener("touchstart", onFirstTouch);
    };
  }, []);

  return (
    <div ref={containerRef} className={cn("absolute inset-0 overflow-hidden bg-black", className)}>
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        poster={CLIPS[0].poster}
      >
        <VideoSources clip={CLIPS[0]} />
      </video>
      <HeroVideoGradient />
    </div>
  );
}

export function HeroBackgroundVideo({ className }: HeroBackgroundVideoProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([null, null]);
  const containerRef = useRef<HTMLDivElement>(null);
  const transitioningRef = useRef(false);
  const rafRef = useRef(0);

  const [topIndex, setTopIndex] = useState(0);
  const [blurPx, setBlurPx] = useState(0);
  const [topOpacity, setTopOpacity] = useState(1);
  const [bottomOpacity, setBottomOpacity] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const bottomIndex = topIndex === 0 ? 1 : 0;

  useEffect(() => {
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqMobile = window.matchMedia("(max-width: 767px)");

    const update = () => {
      setReducedMotion(mqMotion.matches);
      setIsMobile(mqMobile.matches);
    };

    update();
    mqMotion.addEventListener("change", update);
    mqMobile.addEventListener("change", update);

    return () => {
      mqMotion.removeEventListener("change", update);
      mqMobile.removeEventListener("change", update);
    };
  }, []);

  const completeTransition = useCallback((outgoingIndex: number) => {
    const outgoing = videoRefs.current[outgoingIndex];
    if (outgoing) {
      outgoing.pause();
      outgoing.currentTime = 0;
    }

    transitioningRef.current = false;
    setTopIndex(outgoingIndex === 0 ? 1 : 0);
    setBlurPx(0);
    setTopOpacity(1);
    setBottomOpacity(0);
  }, []);

  const startTransition = useCallback(() => {
    if (transitioningRef.current) return;
    transitioningRef.current = true;

    const outgoingIndex = topIndex;
    const incomingIndex = outgoingIndex === 0 ? 1 : 0;
    const incoming = videoRefs.current[incomingIndex];

    if (!incoming) {
      transitioningRef.current = false;
      return;
    }

    prepareVideo(incoming);
    incoming.currentTime = 0;
    tryPlay(incoming);

    const start = performance.now();
    const durationMs = CROSSFADE_SEC * 1000;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const blurPhase = t < 0.38 ? t / 0.38 : 1 - (t - 0.38) / 0.62;
      const underRaw = t < 0.18 ? 0 : (t - 0.18) / 0.82;
      const underPhase = smoothstep(Math.min(1, underRaw));
      const overPhase = 1 - underPhase;

      setBlurPx(blurPhase * MAX_BLUR_PX);
      setBottomOpacity(underPhase);
      setTopOpacity(overPhase);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        completeTransition(outgoingIndex);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [topIndex, completeTransition]);

  const handleTimeUpdate = useCallback(() => {
    if (transitioningRef.current || reducedMotion) return;
    const top = videoRefs.current[topIndex];
    if (!top || !Number.isFinite(top.duration)) return;

    const remaining = top.duration - top.currentTime;
    if (remaining <= CROSSFADE_SEC && remaining > 0.05) {
      startTransition();
    }
  }, [topIndex, startTransition, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || isMobile) return;

    const top = videoRefs.current[topIndex];
    if (!top) return;

    prepareVideo(top);

    top.addEventListener("timeupdate", handleTimeUpdate);
    top.addEventListener("ended", startTransition);

    const onReady = () => tryPlay(top);
    if (top.readyState >= 2) onReady();
    else {
      top.addEventListener("loadeddata", onReady, { once: true });
      top.addEventListener("canplay", onReady, { once: true });
    }

    const root = containerRef.current;
    const io =
      root &&
      new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) tryPlay(top);
        },
        { threshold: 0.1 },
      );
    if (io && root) io.observe(root);

    return () => {
      top.removeEventListener("timeupdate", handleTimeUpdate);
      top.removeEventListener("ended", startTransition);
      io?.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [topIndex, handleTimeUpdate, startTransition, reducedMotion, isMobile]);

  useEffect(() => {
    if (reducedMotion || isMobile) return;
    const bottom = videoRefs.current[bottomIndex];
    if (bottom && bottomOpacity === 0 && !transitioningRef.current) {
      bottom.pause();
      bottom.currentTime = 0;
    }
  }, [topIndex, bottomIndex, bottomOpacity, reducedMotion, isMobile]);

  if (isMobile && !reducedMotion) {
    return <HeroBackgroundVideoMobile className={className} />;
  }

  if (reducedMotion) {
    return (
      <div className={cn("absolute inset-0 overflow-hidden bg-black", className)}>
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
          poster={CLIPS[0].poster}
        >
          <VideoSources clip={CLIPS[0]} />
        </video>
        <HeroVideoGradient />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden bg-black", className)}
    >
      {CLIPS.map((clip, index) => {
        const isTop = index === topIndex;
        const isCrossfading = isTop && blurPx > 0;

        return (
          <div
            key={clip.mp4}
            className="absolute inset-0"
            style={{
              zIndex: isTop ? 10 : 0,
              opacity: isTop ? topOpacity : bottomOpacity,
            }}
            aria-hidden
          >
            <video
              ref={(el) => {
                videoRefs.current[index] = el;
                if (el) prepareVideo(el);
              }}
              className="h-full w-full object-cover"
              style={{
                filter: isCrossfading ? `blur(${blurPx}px)` : undefined,
                transform: isCrossfading ? "scale(1.03) translateZ(0)" : "translateZ(0)",
                willChange: isCrossfading ? "filter, transform" : undefined,
              }}
              autoPlay={isTop}
              muted
              playsInline
              preload={isTop ? "auto" : "none"}
              poster={index === 0 ? CLIPS[0].poster : undefined}
            >
              <VideoSources clip={clip} />
            </video>
          </div>
        );
      })}

      <HeroVideoGradient />
    </div>
  );
}

export default HeroBackgroundVideo;
