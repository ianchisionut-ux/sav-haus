"use client";

import { useEffect, useRef, useState } from "react";

const SOURCE = "https://d2ol7oe51mr4n9.cloudfront.net/user_3HXPUeIJkrFmhZmC3l4vOeEeAUl/ef243cce-b7da-438b-b34f-87db237b43c1.mp4";

/**
 * Scroll-controlled cinematic video; the video is framed separately on
 * portrait screens so the architecture stays visible without cropping.
 * No image poster: the legacy hero image can never flash on initial load.
 */
export default function HeroScrollVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const [firstFrameReady, setFirstFrameReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const chapter = document.getElementById("hero-film");
    if (!video || !chapter) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");
    let frameId = 0;
    let target = 0;
    let metadataReady = false;
    let primed = false;

    video.muted = true;

    const advance = () => {
      frameId = 0;
      if (!metadataReady || reducedMotion.matches || video.seeking) return;

      const delta = target - video.currentTime;
      if (Math.abs(delta) < 0.055) return;

      const step = Math.max(-0.24, Math.min(0.24, delta * 0.22));
      try {
        video.currentTime = Math.max(0, Math.min(video.duration - 0.05, video.currentTime + step));
      } catch {
        // Remain on the current frame if the browser has not buffered it.
      }
    };

    const schedule = () => {
      if (!frameId) frameId = window.requestAnimationFrame(advance);
    };

    const onScroll = () => {
      const rect = chapter.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / distance));
      if (indicatorRef.current) {
        indicatorRef.current.style.transform = "scaleX(" + progress + ")";
      }
      if (!metadataReady || reducedMotion.matches) return;
      target = progress * Math.max(0, video.duration - 0.05);
      schedule();
    };

    const onFirstFrame = () => {
      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        setFirstFrameReady(true);
      }
    };

    const onReady = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      metadataReady = true;
      video.pause();
      onFirstFrame();
      onScroll();
    };

    const onSeeked = () => {
      onFirstFrame();
      if (Math.abs(target - video.currentTime) > 0.055) schedule();
    };

    // Mobile Safari sometimes refuses to decode frames of a paused movie.
    // Starting a muted inline video once allows scrubbing to initialize.
    const primeMobile = () => {
      if (!mobile.matches || primed || reducedMotion.matches) return;
      primed = true;
      const attempt = video.play();
      if (attempt) {
        void attempt.then(() => {
          video.pause();
          onFirstFrame();
          onScroll();
        }).catch(() => {
          // Some data-saving modes block autoplay; keep the navy fallback.
          onFirstFrame();
        });
      }
    };

    video.addEventListener("loadedmetadata", onReady);
    video.addEventListener("loadeddata", onFirstFrame);
    video.addEventListener("canplay", onReady);
    video.addEventListener("seeked", onSeeked);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) onReady();
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) onFirstFrame();
    primeMobile();
    onScroll();

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      video.removeEventListener("loadedmetadata", onReady);
      video.removeEventListener("loadeddata", onFirstFrame);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[43%] overflow-hidden bg-[#081923] md:inset-0 md:h-full">
        <video
          ref={videoRef}
          src={SOURCE}
          aria-label="Etapele construcției unei case, animate la derularea paginii"
          className={"h-full w-full object-contain object-center transition-opacity duration-300 md:object-cover " + (firstFrameReady ? "opacity-100" : "opacity-0")}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          controlsList="nodownload noplaybackrate nofullscreen"
        />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute bottom-[1px] left-0 z-20 h-[2px] w-full bg-white/20">
        <span ref={indicatorRef} className="block h-full w-full origin-left scale-x-0 bg-[#F9982D]" />
      </div>
    </>
  );
}
