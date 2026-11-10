"use client";

import { useEffect, useRef } from "react";

const SOURCE = "https://d2ol7oe51mr4n9.cloudfront.net/user_3HXPUeIJkrFmhZmC3l4vOeEeAUl/ef243cce-b7da-438b-b34f-87db237b43c1.mp4";

/**
 * Slow cinematic scroll scrubbing:
 * the hero spans several viewports; a short scroll advances only a small
 * fraction of the original film. The user can also reverse the timeline.
 */
export default function HeroScrollVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const chapter = document.getElementById("hero-film");
    if (!video || !chapter) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let target = 0;
    let ready = false;

    video.pause();
    video.muted = true;

    const updateTarget = () => {
      const rect = chapter.getBoundingClientRect();
      const viewport = window.innerHeight;
      const distance = Math.max(1, rect.height - viewport);
      const progress = Math.max(0, Math.min(1, -rect.top / distance));
      if (indicatorRef.current) indicatorRef.current.style.transform = "scaleX(" + progress + ")";
      if (!ready || reducedMotion.matches || !Number.isFinite(video.duration)) return;
      target = progress * Math.max(0, video.duration - .05);
      if (!raf) raf = window.requestAnimationFrame(advance);
    };

    const advance = () => {
      raf = 0;
      if (!ready || reducedMotion.matches || video.seeking) return;
      const delta = target - video.currentTime;
      if (Math.abs(delta) < .055) return;
      const amount = Math.max(-.24, Math.min(.24, delta * .22));
      try {
        video.currentTime = Math.max(0, Math.min(video.duration - .05, video.currentTime + amount));
      } catch {
        // Keep the fallback frame until the media is available.
      }
    };

    const onReady = () => {
      ready = true;
      updateTarget();
    };
    const onSeeked = () => {
      if (!raf && Math.abs(target - video.currentTime) > .055) {
        raf = window.requestAnimationFrame(advance);
      }
    };
    const onMotionChange = () => {
      video.pause();
      updateTarget();
    };

    video.addEventListener("loadedmetadata", onReady);
    video.addEventListener("canplay", onReady);
    video.addEventListener("seeked", onSeeked);
    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget, { passive: true });
    reducedMotion.addEventListener("change", onMotionChange);
    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) onReady();
    updateTarget();

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      video.removeEventListener("loadedmetadata", onReady);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", updateTarget);
      reducedMotion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        src={SOURCE}
        poster="/images/hero.jpg"
        aria-label="Etapele construcției unei case, animate prin derularea paginii"
        className="absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        controlsList="nodownload noplaybackrate nofullscreen"
      />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-[1px] left-0 z-20 h-[2px] w-full bg-white/20">
        <span ref={indicatorRef} className="block h-full w-full origin-left scale-x-0 bg-[#dcc39b]" />
      </div>
    </>
  );
}
