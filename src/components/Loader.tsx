"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { getLenis, markReady, SCENE_READY_EVENT } from "@/lib/site-events";
import { site } from "@/content/site";

// First visit only: the logo, the years counting up from 1935, then the red field
// opens onto the hero. The sequence waits for the 3D scene to finish compiling (or a
// three-second timeout on slow devices) so nothing heavy runs on the main thread while it plays.
export function Loader() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      const html = document.documentElement;
      const finish = () => {
        try {
          sessionStorage.setItem("bliss-seen", "1");
        } catch {}
        getLenis()?.start();
        markReady();
      };

      if (html.dataset.skipLoader === "1" || prefersReducedMotion()) {
        finish();
        return;
      }

      const el = root.current!;
      const year = el.querySelector<HTMLElement>("[data-year]")!;
      const count = { y: site.founded };
      // The cover is drawn once at full size and scaled from a dot: compositor-only
      const dot = el.querySelector<HTMLElement>("[data-dot]")!;
      const dotStart = () => 110 / dot.offsetWidth;

      const play = contextSafe!(() => {
        el.classList.remove("loader-waiting");
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from("[data-line]", { yPercent: 110, stagger: 0.08, duration: 0.9 })
          .to(count, {
            y: 2026,
            duration: 1.25,
            ease: "power2.inOut",
            onUpdate: () => {
              year.textContent = String(Math.round(count.y));
            },
          }, "-=0.5")
          .to("[data-line]", { yPercent: -110, stagger: 0.05, duration: 0.5, ease: "power3.in" }, "+=0.1")
          .set(dot, { scale: dotStart, autoAlpha: 1 }, "<")
          .to("[data-logo]", { autoAlpha: 0, scale: 0.92, duration: 0.35, ease: "power2.in" }, "<")
          .to(dot, { scale: 1, duration: 0.85, ease: "expo.inOut" }, "-=0.2")
          .set(el, { backgroundColor: "var(--color-bliss)" })
          .add(finish, "-=0.1")
          .to(el, { yPercent: -100, duration: 0.95, ease: "expo.inOut" }, "-=0.05")
          .set(el, { display: "none" });
      });

      gsap.set(dot, { xPercent: -50, yPercent: -50, scale: 0, autoAlpha: 0 });
      let started = false;
      const start = () => {
        if (started) return;
        started = true;
        window.removeEventListener(SCENE_READY_EVENT, start);
        play();
      };
      window.addEventListener(SCENE_READY_EVENT, start, { once: true });
      const fallback = window.setTimeout(start, 3000);
      return () => {
        window.clearTimeout(fallback);
        window.removeEventListener(SCENE_READY_EVENT, start);
      };
    },
    { scope: root },
  );

  return (
    <div
      id="bliss-loader"
      ref={root}
      aria-hidden
      className="loader-waiting fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-ground"
    >
      <div
        data-dot
        className="pointer-events-none invisible absolute left-1/2 top-1/2 h-[150vmax] w-[150vmax] rounded-full bg-bliss will-change-transform"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img data-logo src="/bliss-logo-320.webp" alt="" width={120} height={120} className="loader-logo relative h-[120px] w-[120px] rounded-full" />
      <div className="absolute inset-x-0 bottom-[11vh] flex flex-col items-center gap-3 text-center">
        <div className="line-mask">
          <p data-line className="display tabular-nums text-[clamp(53px,8.5vw,114px)] text-ink">
            <span data-year>{site.founded}</span>
          </p>
        </div>
        <div className="line-mask">
          <p data-line className="text-[17px] text-muted">Four generations of celebrations</p>
        </div>
      </div>
    </div>
  );
}
