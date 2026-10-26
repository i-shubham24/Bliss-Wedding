"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { destinations } from "@/content/site";

export function Destinations() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-place]", {
        x: -40,
        autoAlpha: 0,
        stagger: 0.06,
        duration: 1.1,
        scrollTrigger: { trigger: "[data-places]", start: "top 80%" },
      });
    },
    { scope: root },
  );

  const d = destinations[active];

  return (
    <section ref={root} data-dark aria-labelledby="places-title" className="bg-ink py-[16vh] text-ground">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h2 id="places-title" className="display text-[clamp(42px,5.7vw,87px)]">
            From Amritsar to anywhere
          </h2>
          <ul data-places className="mt-14">
            {destinations.map((place, i) => (
              <li key={place.place} data-place>
                <button
                  type="button"
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className={`group flex w-full flex-wrap items-baseline gap-x-5 py-2.5 text-left transition-opacity duration-500 ${
                    active === i ? "opacity-100" : "opacity-40 hover:opacity-80"
                  }`}
                >
                  <span className="display text-[clamp(32px,3.8vw,57px)]">{place.place}</span>
                  <span className="text-[17px] text-ground/75">{place.region}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div className="arch relative aspect-[4/5] overflow-hidden bg-wine">
              {destinations.map((place, i) => (
                <Image
                  key={place.place}
                  src={place.img}
                  alt={`${place.place}, ${place.region}`}
                  fill
                  sizes="(min-width: 1024px) 38vw, 92vw"
                  className={`object-cover transition-[opacity,transform] duration-[1.2s] ease-[var(--ease-expo)] ${
                    active === i ? "scale-100 opacity-100" : "scale-110 opacity-0"
                  }`}
                />
              ))}
            </div>
            <p aria-live="polite" className="mt-6 max-w-[40ch] text-[17px]">
              {d.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
