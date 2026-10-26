"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { whatsappLink } from "@/lib/site-events";
import { hero, site } from "@/content/site";
import { ArrowUpRight, Phone, WhatsApp } from "@/components/icons";
import { StudioStatus } from "@/components/StudioStatus";

// The one deliberate theme switch: the page ends inside the logo's red field.
export function Closing() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-sign]",
        { clipPath: "inset(0% 100% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: {
            trigger: "[data-sign]",
            start: "top 95%",
            end: "bottom 75%",
            scrub: true,
          },
        },
      );
      gsap.from("[data-close-logo]", {
        scale: 0.4,
        rotation: -40,
        autoAlpha: 0,
        duration: 1.6,
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      gsap.from("[data-visit] > *", {
        y: 30,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 1.1,
        scrollTrigger: { trigger: "[data-visit]", start: "top 85%" },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="contact"
      data-dark
      aria-labelledby="closing-title"
      className="overflow-hidden bg-bliss text-ground"
    >
      <div className="container-x grid gap-14 pb-[6vh] pt-[16vh] lg:grid-cols-12 lg:items-start lg:gap-10">
        <div className="lg:col-span-7">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-close-logo
            src="/bliss-logo-320.webp"
            alt="The Bliss, Events and Dream Wedding Planner"
            width={140}
            height={140}
            className="h-24 w-24 rounded-full lg:h-[140px] lg:w-[140px]"
          />
          <h2
            id="closing-title"
            className="display mt-10 pb-[0.08em] text-[clamp(46px,6.1vw,87px)]"
          >
            Let&apos;s begin your forever
          </h2>
          <p className="mt-6 max-w-[38ch] text-[18px]">
            <span lang="pa" className="font-gurmukhi">
              {hero.welcome}
            </span>
            . Tell us your dates. We will take care of the rest.
          </p>
        </div>

        {/* The two actions first, top right, with the visiting details a step below */}
        <div className="lg:col-span-4 lg:col-start-9">
          <div className="grid grid-cols-2 gap-3">
            <a
              href={whatsappLink(
                site.whatsapp,
                "Hi The Bliss! We'd love to talk about our wedding.",
              )}
              target="_blank"
              rel="noreferrer"
              className="btn btn-white w-full !px-4"
            >
              <WhatsApp /> WhatsApp us
            </a>
            <a href={site.phoneHref} className="btn btn-white w-full !px-4" aria-label={`Call us on ${site.phone}`}>
              <Phone /> Call us
            </a>
          </div>
          <dl
            data-visit
            className="mt-14 grid gap-7 text-[17px] sm:grid-cols-2 lg:grid-cols-1"
          >
            <div>
              <dt className="text-[15px] font-medium">The studio</dt>
              <dd className="mt-1.5 leading-relaxed">
                {site.address.line1}, Shastri Nagar
                <br />
                White Avenue, Amritsar
              </dd>
            </div>
            <div>
              <dt className="text-[15px] font-medium">Hours</dt>
              <dd className="mt-1.5">
                <StudioStatus />
              </dd>
            </div>
            <div>
              <dt className="text-[15px] font-medium">Write to us</dt>
              <dd className="mt-1.5">
                <a href={`mailto:${site.email}`} className="link-u break-all">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Directions</dt>
              <dd>
                <a
                  href={site.address.maps}
                  target="_blank"
                  rel="noreferrer"
                  className="link-u inline-flex items-center gap-2 font-medium"
                >
                  Get directions <ArrowUpRight />
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <p
        data-sign
        aria-hidden
        className="select-none whitespace-nowrap pb-[1.5vw] text-center text-[18.5vw] font-light leading-[0.82] tracking-[-0.06em]"
      >
        The Bliss
      </p>
    </section>
  );
}
