"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { openReel } from "@/lib/site-events";
import { highlights, reelCover, reels, site } from "@/content/site";
import { Instagram, Play, YouTube } from "@/components/icons";

export function Reels() {
  const root = useRef<HTMLElement>(null);
  const rail = useRef<HTMLUListElement>(null);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-highlight]", {
        scale: 0.6,
        autoAlpha: 0,
        stagger: 0.05,
        duration: 1,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: "[data-highlights]", start: "top 88%" },
      });
      gsap.from("[data-reel]", {
        y: 90,
        autoAlpha: 0,
        stagger: 0.06,
        duration: 1.3,
        scrollTrigger: { trigger: rail.current, start: "top 88%" },
      });
    },
    { scope: root },
  );

  // Mouse drag scrolls the rail; touch and trackpads scroll it natively
  const onDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    drag.current = { down: true, x: e.clientX, left: rail.current!.scrollLeft, moved: false };
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.down) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4) d.moved = true;
    rail.current!.scrollLeft = d.left - dx;
  };
  const onUp = () => {
    drag.current.down = false;
  };

  return (
    <section ref={root} data-dark id="films" aria-labelledby="films-title" className="overflow-hidden bg-wine py-[15vh] text-ground">
      <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-end">
        <h2 id="films-title" className="display text-[clamp(40px,5.3vw,84px)] lg:col-span-7">
          Straight from the wedding floor
        </h2>
        <div className="lg:col-span-4 lg:col-start-9">
          <p className="max-w-[38ch] text-[17px]">
            Filmed by our own team. Tap any circle or reel to watch.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3 font-medium">
            <a href={site.social.youtube} target="_blank" rel="noreferrer" className="link-u inline-flex items-center gap-2">
              <YouTube /> YouTube
            </a>
            <a href={site.social.instagram} target="_blank" rel="noreferrer" className="link-u inline-flex items-center gap-2">
              <Instagram /> Instagram, 34K
            </a>
          </div>
        </div>
      </div>

      <ul data-highlights aria-label="Highlights" className="no-scrollbar container-x mt-14 flex gap-5 overflow-x-auto pb-2 lg:mt-16 lg:gap-8">
        {highlights.map((h) => (
          <li key={h.label} data-highlight className="shrink-0">
            <button type="button" data-cursor="Play" onClick={() => openReel({ id: h.id, title: h.label })} className="group flex w-[88px] flex-col items-center gap-3 lg:w-[104px]">
              <span className="relative block h-[84px] w-[84px] rounded-full bg-bliss p-[3px] transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-105 lg:h-[100px] lg:w-[100px]">
                <span className="relative block h-full w-full overflow-hidden rounded-full border-[3px] border-wine">
                  <Image src={reelCover(h.id)} alt="" fill sizes="104px" className="object-cover" />
                </span>
              </span>
              <span className="text-center text-[14px] leading-tight">{h.label}</span>
            </button>
          </li>
        ))}
      </ul>

      <ul
        ref={rail}
        data-cursor="Drag"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] lg:mt-16 lg:snap-none lg:gap-5"
      >
        {reels.map((r) => (
          <li key={r.id} data-reel className="w-[62vw] shrink-0 snap-start sm:w-[250px] lg:w-[270px]">
            <button
              type="button"
              data-cursor="Play"
              onClick={() => {
                if (drag.current.moved) return;
                openReel({ id: r.id, title: r.title });
              }}
              className="group block w-full text-left"
            >
              <span className="relative block aspect-[9/16] overflow-hidden bg-ink">
                <Image
                  src={reelCover(r.id)}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 270px, (min-width: 640px) 250px, 62vw"
                  className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-expo)] group-hover:scale-[1.06]"
                  draggable={false}
                />
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-4 left-4 grid h-12 w-12 place-items-center rounded-full bg-ground text-bliss transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-110">
                  <Play />
                </span>
                {r.views && <span className="absolute bottom-5 right-4 text-[14px] font-medium">{r.views} views</span>}
              </span>
              <span className="mt-4 block text-[16px] leading-snug">{r.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
