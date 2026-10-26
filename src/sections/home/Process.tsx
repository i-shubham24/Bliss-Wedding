"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { reelCover, steps } from "@/content/site";

export function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-step]", {
        y: 40,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 1.2,
        scrollTrigger: { trigger: "[data-steps]", start: "top 80%" },
      });
      gsap.fromTo(
        "[data-process-img] img",
        { scale: 1.15 },
        { scale: 1, ease: "none", scrollTrigger: { trigger: "[data-process-img]", start: "top bottom", end: "bottom top", scrub: true } },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="process-title" className="bg-stone py-[16vh]">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2 id="process-title" className="display text-[clamp(42px,5.1vw,80px)]">
            From the first chai to the last doli
          </h2>
          <div data-process-img className="relative mt-12 hidden aspect-[4/5] overflow-hidden lg:block">
            <Image src={reelCover("w32ZYv1kYq8")} alt="The Bliss team on the ground at a wedding" fill sizes="36vw" className="object-cover" />
          </div>
        </div>

        <ol data-steps className="grid content-start gap-x-10 gap-y-16 sm:grid-cols-2 lg:col-span-6 lg:col-start-7 lg:pt-[18vh]">
          {steps.map((s, i) => (
            <li key={s.title} data-step className={i % 2 === 1 ? "sm:translate-y-24" : ""}>
              <h3 className="display text-[clamp(29px,2.5vw,38px)]">{s.title}</h3>
              <p className="mt-5 max-w-[34ch] text-[17px]">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
