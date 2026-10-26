"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { legacy } from "@/content/site";
import { CountUp } from "@/components/CountUp";

// The story's headline, statement and picture open inside the hero's red circle; this
// section carries straight on with the family timeline and the numbers.
// With reduced motion there is no circle, so the headline is shown here instead.
export function Legacy() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-when]", {
        y: 40,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 1.2,
        scrollTrigger: { trigger: "[data-timeline]", start: "top 85%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} data-dark aria-label="Our story" className="relative bg-bliss text-ground">
      <span id="story" aria-hidden className="absolute left-0 top-0" />
      <div className="container-x pb-[16vh] pt-[6vh] motion-reduce:pt-[14vh]">
        <div className="hidden motion-reduce:block">
          <h2 className="display text-[clamp(48px,6.6vw,96px)]">{legacy.title}</h2>
          <p className="mb-20 mt-10 max-w-[28ch] text-[clamp(24px,2.4vw,34px)] font-light leading-[1.3]">{legacy.statement}</p>
        </div>

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <ol data-timeline className="grid content-start gap-10 lg:col-span-6">
            {legacy.timeline.map((t) => (
              <li key={t.when} data-when className="grid gap-2 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-8">
                <p className="display text-[clamp(34px,3.4vw,52px)]">{t.when}</p>
                <p className="max-w-[36ch] text-[17px] sm:pt-3">{t.text}</p>
              </li>
            ))}
          </ol>

          <div className="grid content-start gap-14 lg:col-span-5 lg:col-start-8">
            {/* The record, top right */}
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
              {legacy.counters.map((c) => (
                <div key={c.label} className="flex flex-col-reverse">
                  <dt className="mt-2 text-[16px]">{c.label}</dt>
                  <dd className="text-[clamp(48px,5vw,80px)] font-light leading-none tracking-[-0.04em] tabular-nums">
                    <CountUp value={c.value} duration={2200} />
                    {c.suffix}
                  </dd>
                </div>
              ))}
            </dl>

          </div>
        </div>
      </div>
    </section>
  );
}
