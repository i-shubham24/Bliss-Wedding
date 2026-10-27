"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { anchorPosition, getLenis, scrollToTarget, setLenis } from "@/lib/site-events";

export function SmoothScroll() {
  const pathname = usePathname();
  const first = useRef(true);

  // Arriving on a page: a link like "/#story" lands once the page's scroll scenes are
  // measured (some anchors sit at the end of a pinned scene); otherwise a new page starts
  // at the top. A reload keeps the browser's own scroll position.
  useEffect(() => {
    const hash = window.location.hash;
    const initial = first.current;
    first.current = false;
    if (!hash || hash === "#top") {
      if (!initial) getLenis()?.scrollTo(0, { immediate: true, force: true });
      return;
    }
    const id = window.setTimeout(() => {
      ScrollTrigger.refresh();
      const target = anchorPosition(hash) ?? document.querySelector<HTMLElement>(hash);
      if (target === null || target === undefined) return;
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(target, { immediate: true, force: true });
      else if (typeof target === "number") window.scrollTo(0, target);
      else target.scrollIntoView();
    }, 400);
    return () => window.clearTimeout(id);
  }, [pathname]);

  useEffect(() => {
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    if (!prefersReducedMotion()) {
      lenis = new Lenis({ lerp: 0.09, touchMultiplier: 1.3 });
      const instance = lenis;
      instance.on("scroll", ScrollTrigger.update);
      tick = (time) => instance.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(instance);
      if (document.documentElement.dataset.loaded !== "1") instance.stop();
    }

    // In-page anchors glide instead of jumping
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = link?.getAttribute("href");
      if (!hash || hash.length < 2) return;
      // The top is always 0, and some anchors land at the end of a pinned scene
      const position = hash === "#top" ? 0 : anchorPosition(hash);
      const target = position ?? document.querySelector<HTMLElement>(hash);
      if (target === null || target === undefined) return;
      e.preventDefault();
      scrollToTarget(target);
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    // Pinned sections must be measured top-down, and again whenever the page height changes
    // (fonts landing, late images, hot reloads); otherwise a pin can start late or let go early.
    ScrollTrigger.config({ ignoreMobileResize: true });
    let settle: number | undefined;
    let lastHeight = 0;
    const remeasure = () => {
      window.clearTimeout(settle);
      settle = window.setTimeout(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      }, 500);
    };
    const ro = new ResizeObserver(([entry]) => {
      const h = Math.round(entry.contentRect.height);
      if (Math.abs(h - lastHeight) < 40) return;
      lastHeight = h;
      remeasure();
    });
    ro.observe(document.body);
    document.fonts?.ready.then(remeasure);
    window.addEventListener("load", remeasure);

    return () => {
      ro.disconnect();
      window.clearTimeout(settle);
      window.removeEventListener("load", remeasure);
      document.removeEventListener("click", onClick);
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
