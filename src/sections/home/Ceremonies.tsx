"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { openReel } from "@/lib/site-events";
import { ceremonies } from "@/content/site";
import { Play } from "@/components/icons";

// A small chooda that rolls along the bottom of the strip and takes each ceremony's colour
function RollingBangle() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" aria-hidden>
      <circle cx="32" cy="32" r="27" fill="none" stroke="currentColor" strokeWidth="7" />
      <circle cx="32" cy="32" r="27" fill="none" stroke="#d9a957" strokeWidth="2" strokeDasharray="1.5 6.5" />
      <circle cx="32" cy="32" r="19.5" fill="none" stroke="currentColor" strokeWidth="2.5" opacity=".55" />
    </svg>
  );
}

export function Ceremonies() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const track = section.querySelector<HTMLElement>("[data-track]")!;
      const roller = section.querySelector<HTMLElement>("[data-roller]")!;
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", section);
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const distance = () => track.scrollWidth - window.innerWidth;
        let current = -1;
        const setActive = (i: number) => {
          if (i === current) return;
          current = i;
          const c = ceremonies[Math.max(0, i)];
          gsap.to(section, { backgroundColor: c.tint, duration: 0.9, ease: "power2.out" });
          gsap.to(roller, { color: c.color, duration: 0.9, ease: "power2.out" });
        };
        setActive(0);

        const pan = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            refreshPriority: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // roll without slipping: rotation follows distance travelled over the radius
              const travel = (roller.parentElement!.clientWidth - roller.offsetWidth) * self.progress;
              gsap.set(roller, { x: travel, rotation: (travel / 32) * (180 / Math.PI) });
            },
          },
        });

        panels.forEach((panel, i) => {
          ScrollTrigger.create({
            trigger: panel,
            containerAnimation: pan,
            start: "left 55%",
            end: "right 55%",
            onToggle: (self) => self.isActive && setActive(i),
          });
          const img = panel.querySelector("[data-panel-img]");
          if (img) {
            gsap.fromTo(
              img,
              { xPercent: -6, scale: 1.12 },
              { xPercent: 6, scale: 1.12, ease: "none", scrollTrigger: { trigger: panel, containerAnimation: pan, start: "left right", end: "right left", scrub: true } },
            );
          }
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="ceremonies"
      aria-labelledby="ceremonies-title"
      className="relative overflow-hidden lg:h-[100svh]"
      style={{ backgroundColor: ceremonies[0].tint }}
    >
      <div data-track className="flex flex-col lg:h-full lg:w-max lg:flex-row">
        <div className="container-x flex shrink-0 flex-col justify-center bg-ground py-[14vh] lg:w-[46vw] lg:bg-transparent lg:py-0 lg:pr-[6vw]">
          <p lang="pa" className="font-gurmukhi text-[clamp(53px,5.7vw,91px)] leading-none text-bliss">ਰਸਮਾਂ</p>
          <h2 id="ceremonies-title" className="display mt-8 text-[clamp(42px,5.3vw,84px)]">
            Every ceremony, one family running it
          </h2>
          <p className="mt-8 max-w-[38ch] text-[17px]">
            A Punjabi wedding is a week of ceremonies, each with its own colour and mood. We plan and run every one.
          </p>
        </div>

        {ceremonies.map((c) => (
          <article
            key={c.slug}
            data-panel
            aria-labelledby={`c-${c.slug}`}
            className="grid shrink-0 items-center gap-10 px-[var(--gutter)] py-[12vh] lg:h-full lg:w-[78vw] lg:grid-cols-[1fr_1.05fr] lg:gap-[5vw] lg:py-0 lg:!bg-transparent"
            style={{ backgroundColor: c.tint }}
          >
            <div className="order-2 lg:order-1">
              <p lang="pa" className="font-gurmukhi text-[clamp(42px,4.8vw,80px)] leading-[1.1]" style={{ color: c.deep }}>
                {c.pa}
              </p>
              <h3 id={`c-${c.slug}`} className="display mt-4 text-[clamp(38px,4.2vw,68px)]">
                {c.name}
              </h3>
              <p className="mt-3 text-[17px] text-muted">{c.aka}</p>
              <p className="mt-7 max-w-[42ch] text-[17px]">{c.copy}</p>
              <ul className="mt-6 grid max-w-[44ch] grid-cols-2 gap-x-6 gap-y-1.5 text-[16px]">
                {c.bring.map((b) => (
                  <li key={b} className="flex gap-2.5">
                    <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: c.color }} />
                    {b}
                  </li>
                ))}
              </ul>
              {c.reel && (
                <button
                  type="button"
                  data-cursor="Play"
                  onClick={() => openReel({ id: c.reel!.id, title: c.reel!.title })}
                  className="link-u mt-9 inline-flex items-center gap-2 text-[16px] font-medium"
                  style={{ color: c.deep }}
                >
                  <Play /> Watch: {c.reel.title}
                </button>
              )}
            </div>
            <div className="arch relative order-1 h-[46svh] overflow-hidden lg:order-2 lg:h-[76svh]">
              <div data-panel-img className="absolute inset-0">
                <Image src={c.img} alt={`${c.name} at a Punjabi wedding`} loading="eager" fill sizes="(min-width: 1024px) 40vw, 92vw" className="object-cover" />
              </div>
            </div>
          </article>
        ))}
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-x-[var(--gutter)] bottom-6 hidden lg:block">
        <div data-roller className="w-16" style={{ color: ceremonies[0].color }}>
          <RollingBangle />
        </div>
      </div>
    </section>
  );
}
