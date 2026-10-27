"use client";

import { useId, useRef, useState } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { whatsappLink } from "@/lib/site-events";
import { hero, ratings, site } from "@/content/site";
import { ArrowUpRight, Phone, Star, WhatsApp } from "@/components/icons";

const google = ratings.find((r) => r.source === "Google");
const longDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

// "Is your date free?": the family picks a day and asks the studio on WhatsApp in one tap.
// The studio's address, hours and email live in the footer card just below, so not here.
function DateCheck() {
  const id = useId();
  const [date, setDate] = useState("");
  const [missing, setMissing] = useState(false);

  const ask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      setMissing(true);
      document.getElementById(`${id}-date`)?.focus();
      return;
    }
    window.open(whatsappLink(site.whatsapp, `Hi The Bliss! Is ${longDate(date)} free for our wedding?`), "_blank", "noopener");
  };

  return (
    <form onSubmit={ask} noValidate className="bg-ground/10 p-6 sm:p-7">
      <label htmlFor={`${id}-date`} className="display block text-[clamp(26px,2.2vw,32px)]">
        Is your date free?
      </label>
      <p className="mt-2 text-[16px]">Pick the day and ask us on WhatsApp.</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <input
          id={`${id}-date`}
          type="date"
          value={date}
          onFocus={(e) => (e.currentTarget.min ||= new Date().toLocaleDateString("en-CA"))}
          onChange={(e) => {
            setDate(e.target.value);
            setMissing(false);
          }}
          aria-invalid={missing}
          aria-describedby={missing ? `${id}-err` : undefined}
          className="h-12 min-w-0 flex-1 rounded-[2px] bg-ground px-4 text-[16px] text-ink outline-none focus-visible:outline-2 focus-visible:outline-ground"
        />
        <button type="submit" className="btn btn-white !h-12 !px-5">
          <WhatsApp /> Ask
        </button>
      </div>
      {missing && (
        <p id={`${id}-err`} className="mt-3 text-[15px] font-medium">
          Choose a date first.
        </p>
      )}
      <p className="mt-4 text-[15px]">October to March weddings book four to six months ahead.</p>
    </form>
  );
}

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
            . Send us your dates on WhatsApp, or call the studio.
          </p>
        </div>

        {/* The two actions first, top right, with the date check a step below */}
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
          <div data-visit className="mt-10 grid gap-6">
            <DateCheck />
            {google?.href && (
              <a href={google.href} target="_blank" rel="noreferrer" className="link-u inline-flex items-center gap-2 self-start text-[16px] font-medium">
                <Star width={16} height={16} /> Rated {google.score} by {parseInt(google.count, 10)} families on Google <ArrowUpRight />
              </a>
            )}
          </div>
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
