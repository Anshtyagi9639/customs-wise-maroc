"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Background video. Shows only the poster when the visitor prefers reduced
 * motion or has Data Saver on; otherwise loads the video after first paint.
 * Phones get the 720p file when `src` follows the "<name>-1080.mp4" convention.
 */
export function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    // Deferred so the poster paints first (and the effect does not set state synchronously)
    const t = window.setTimeout(() => setPlay(!reduced && !saveData), 0);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (play) ref.current?.play().catch(() => undefined); // autoplay blocked → poster stays
  }, [play]);

  const mobileSrc = src.replace(/-1080(\.\w+)$/, "-720$1");
  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
    >
      {play && (
        <>
          <source src={mobileSrc} media="(max-width: 767px)" />
          <source src={src} />
        </>
      )}
    </video>
  );
}
