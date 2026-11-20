"use client";

import { useEffect, useState } from "react";

/**
 * Sticky header wrapper: slides up when scrolling down, comes back when
 * scrolling up. Stays visible near the top and whenever focus is inside it.
 */
export function NavShell({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (Math.abs(y - last) > 6) {
          setHidden(y > last && y > 160);
          last = y;
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-hidden={hidden || undefined}
      className="sticky top-0 z-40 shadow-sm transition-transform duration-300 data-[hidden]:-translate-y-full focus-within:translate-y-0"
    >
      {children}
    </header>
  );
}
