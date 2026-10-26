"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { onReady, openReel, registerAnchor } from "@/lib/site-events";
import { hero, insta, legacy, P, photo } from "@/content/site";
import { Play } from "@/components/icons";

const ChoodaCanvas = dynamic(() => import("@/three/Chooda"), { ssr: false });

// Desktop: one screen, copy on the left, the chooda over the BLISS wordmark on the right.
// Phones and tablets: a scrolling section, copy first, then the chooda, then the wordmark.
// On every device the hero pins while the chooda turns to face you, fans into a tunnel and
// the camera flies through it as a red circle opens onto the story.
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);
  const watchFilm = () => openReel(hero.film);

  useGSAP(
    (_ctx, contextSafe) => {
      const el = root.current!;
      if (prefersReducedMotion()) {
        setReady(true);
        return;
      }
      // No clipping masks: they cut descenders and letter edges
      const title = SplitText.create("[data-hero-title]", { type: "lines" });
      const word = SplitText.create("[data-wordmark]", { type: "chars" });

      gsap.set(title.lines, { y: 50, autoAlpha: 0 });
      gsap.set(word.chars, { yPercent: 40, autoAlpha: 0 });
      gsap.set("[data-hero-fade]", { autoAlpha: 0, y: 24 });
      gsap.set("[data-stage]", { autoAlpha: 0, scale: 0.92 });
      gsap.set("[data-print]", { autoAlpha: 0, y: 50, rotation: -8 });

      // contextSafe keeps the intro inside this component's context, whoever fires the signal
      const play = contextSafe!(() => {
        setReady(true);
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .to(title.lines, { y: 0, autoAlpha: 1, duration: 1.3, stagger: 0.1 }, 0.1)
          .to("[data-hero-fade]", { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.08 }, 0.35)
          .to("[data-stage]", { autoAlpha: 1, scale: 1, duration: 2 }, 0.2)
          .to(word.chars, { yPercent: 0, autoAlpha: 1, duration: 1.6, stagger: 0.07 }, 0.3)
          .to("[data-print]", { autoAlpha: 1, y: 0, rotation: -3, duration: 1.5 }, 0.7);
      });
      const off = onReady(play);

      const portal = el.querySelector<HTMLElement>("[data-portal]")!;
      const stage = el.querySelector<HTMLElement>("[data-stage]")!;

      // The shared second half of the fly-through: the red circle opens and the story arrives
      const reveal = (tl: gsap.core.Timeline, circle: (r: number) => string, radius: () => number) =>
        tl
          .fromTo(portal, { clipPath: () => circle(0) }, { clipPath: () => circle(radius()), ease: "power2.in", duration: 0.34 }, 0.5)
          .from("[data-portal-title]", { y: 60, autoAlpha: 0, ease: "power3.out", duration: 0.16 }, 0.8)
          .from("[data-portal-line]", { y: 40, autoAlpha: 0, ease: "power3.out", duration: 0.14 }, 0.86);

      const pinVars = {
        trigger: el,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        refreshPriority: 2,
        invalidateOnRefresh: true,
        onUpdate: (self: ScrollTrigger) => el.toggleAttribute("data-dark", self.progress > 0.6),
        onLeave: () => setInView(false),
        onEnterBack: () => setInView(true),
      };

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap.set(portal, { top: 0 });
        const tl = gsap
          .timeline({ scrollTrigger: { ...pinVars, start: "top top", end: "+=150%" } })
          .to(progress, { current: 1, ease: "none", duration: 1 }, 0)
          .to("[data-hero-copy]", { yPercent: -14, autoAlpha: 0, ease: "power2.in", duration: 0.3 }, 0)
          .to("[data-print]", { y: 200, x: -60, rotation: -14, autoAlpha: 0, ease: "power2.in", duration: 0.3 }, 0)
          .to("[data-wordmark-wrap]", { scale: 1.15, autoAlpha: 0, ease: "power2.in", duration: 0.45 }, 0.05)
          .from("[data-portal-img]", { y: 80, autoAlpha: 0, ease: "power3.out", duration: 0.18 }, 0.82);
        reveal(tl, (r) => `circle(${r}px at 50% 50%)`, () => Math.hypot(window.innerWidth, window.innerHeight) * 0.62);
        return registerAnchor("#story", () => tl.scrollTrigger!.end);
      });

      // Smaller screens: the hero is taller than the screen, so it pins once the chooda is
      // centred (or the hero's end reaches the bottom, whichever comes first). The red circle
      // grows from the chooda's centre and fills everything from that screen to the hero's end.
      mm.add("(max-width: 1023px)", () => {
        const geo = () => {
          const heroTop = el.getBoundingClientRect().top + window.scrollY;
          const r = stage.getBoundingClientRect();
          const mid = r.top + window.scrollY + r.height / 2;
          const vh = window.innerHeight;
          const start = Math.max(heroTop, Math.min(mid - vh / 2, heroTop + el.offsetHeight - vh));
          return { start, top: start - heroTop, cy: mid - start };
        };
        let g = geo();
        const tl = gsap
          .timeline({
            scrollTrigger: {
              ...pinVars,
              start: () => (g = geo()).start,
              end: () => g.start + window.innerHeight * 1.3,
              onRefresh: () => gsap.set(portal, { top: g.top }),
            },
          })
          .to(progress, { current: 1, ease: "none", duration: 1 }, 0)
          .to("[data-hero-copy]", { y: -60, autoAlpha: 0, ease: "power2.in", duration: 0.3 }, 0)
          .to("[data-wordmark-wrap]", { y: 60, autoAlpha: 0, ease: "power2.in", duration: 0.35 }, 0.05);
        reveal(tl, (r) => `circle(${r}px at 50% ${g.cy}px)`, () => Math.hypot(window.innerWidth, Math.max(g.cy, portal.offsetHeight - g.cy)) * 1.05);
        return registerAnchor("#story", () => tl.scrollTrigger!.end);
      });

      return () => {
        off();
        mm.revert();
      };
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative flex flex-col overflow-hidden bg-ground pb-12 lg:block lg:h-[100svh] lg:min-h-[640px] lg:pb-0"
    >
      <div
        data-hero-copy
        className="container-x relative z-20 order-1 pt-[clamp(104px,16svh,140px)] lg:flex lg:h-full lg:flex-col lg:justify-center lg:pt-[8svh]"
      >
        <h1 data-hero-title className="display max-w-[17ch] pb-[0.08em] text-[clamp(38px,7.4vw,64px)] text-ink lg:text-[clamp(40px,4.9vw,84px)]">
          {hero.title}
        </h1>
        <p data-hero-fade className="mt-6 max-w-[40ch] text-[17px] leading-[1.55] text-ink lg:mt-8 lg:text-[19px]">
          {hero.intro}
        </p>
        <div data-hero-fade className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5 lg:mt-10">
          <a href="#plan" className="btn btn-red">
            Plan your wedding
          </a>
          <button
            type="button"
            data-cursor="Play"
            onClick={watchFilm}
            className="link-u inline-flex items-center gap-2 text-[16px] font-medium text-ink lg:[@media(min-height:820px)]:hidden"
          >
            <Play /> Watch Komal Sharma&apos;s wedding
          </button>
        </div>
      </div>

      {/* The chooda: a square stage on small screens (its canvas spreads to the full screen
          around it, so the fly-through is never clipped), the whole hero on desktop */}
      <div
        data-stage
        className="relative z-10 order-2 mx-auto mt-6 aspect-square w-[min(100%,26rem)] lg:absolute lg:inset-0 lg:mt-0 lg:aspect-auto lg:w-auto"
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[100svh] w-[100vw] -translate-x-1/2 -translate-y-1/2 lg:inset-0 lg:h-full lg:w-full lg:translate-none">
          <ChoodaCanvas progress={progress} active={ready && inView} eventSource={root} />
        </div>
      </div>

      {/* Wordmark sits inside the same container as the copy, so every edge lines up */}
      <div aria-hidden className="pointer-events-none relative z-0 order-3 -mt-[20vw] sm:-mt-[14vw] lg:absolute lg:inset-x-0 lg:bottom-[2svh] lg:mt-0">
        <div className="container-x flex justify-center sm:justify-end">
          <div data-wordmark-wrap className="origin-bottom-right select-none text-bliss">
            <span data-wordmark className="block whitespace-nowrap text-[34vw] font-light leading-[0.8] tracking-[-0.06em] sm:text-[26vw] lg:text-[min(24vw,23rem)]">
              Bliss
            </span>
          </div>
        </div>
      </div>

      {/* A print of the headline wedding, which plays its film. Desktop, and only where there is room. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[5svh] z-20 hidden lg:[@media(min-height:820px)]:block">
        <div className="container-x">
          <button type="button" data-print data-cursor="Play" onClick={watchFilm} className="group pointer-events-auto flex items-end gap-5 text-left">
            <span className="relative block aspect-square w-[150px] overflow-hidden">
              <Image
                src={insta("DSFzbemk84V")}
                alt="Cricketer Abhishek Sharma, whose sister Komal Sharma's wedding The Bliss planned"
                fill
                sizes="150px"
                className="object-cover object-[50%_70%] transition-transform duration-[1.2s] ease-[var(--ease-expo)] group-hover:scale-105"
              />
              <span className="absolute left-2.5 top-2.5 grid h-9 w-9 place-items-center rounded-full bg-ground text-bliss">
                <Play />
              </span>
            </span>
            <span className="pb-1 text-[16px] leading-snug">
              <span className="block font-medium">Komal Sharma&apos;s wedding</span>
              <span className="block text-muted">Sister of cricketer Abhishek Sharma</span>
              <span className="mt-1 block text-bliss">Watch the film</span>
            </span>
          </button>
        </div>
      </div>

      {/* The red circle opens onto the first screen of the story. Desktop: the whole hero.
          Smaller screens: from the pinned screen down to the hero's end (top set by script). */}
      <div
        data-portal
        className="pointer-events-none absolute inset-x-0 bottom-0 top-0 z-30 bg-bliss text-ground motion-reduce:hidden"
        style={{ clipPath: "circle(0px at 50% 50%)" }}
      >
        <div className="container-x grid content-start gap-10 pt-[112px] lg:h-full lg:grid-cols-12 lg:content-center lg:items-center lg:pt-[8vh]">
          <div className="lg:col-span-7">
            <h2 id="story-title" data-portal-title className="display pb-[0.08em] text-[clamp(46px,6.1vw,95px)]">
              {legacy.title}
            </h2>
            <p data-portal-line className="mt-8 max-w-[30ch] text-[clamp(21px,2.2vw,32px)] font-light leading-[1.3] lg:mt-10">
              {legacy.statement}
            </p>
          </div>
          <figure data-portal-img className="hidden w-[min(100%,calc(62svh*0.8))] lg:col-span-4 lg:col-start-8 lg:block">
            <div className="arch relative aspect-[4/5] w-full overflow-hidden">
              <Image src={photo(P.goldenTemple)} alt="The Golden Temple in Amritsar, lit up at night" fill sizes="30vw" className="object-cover" />
            </div>
            <figcaption className="mt-4 text-[16px]">The Golden Temple, a short drive from our Race Course Road studio.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
