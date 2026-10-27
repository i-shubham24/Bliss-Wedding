"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { openReel } from "@/lib/site-events";
import { diary, stories, type Diary, type Story } from "@/content/site";
import { ArrowRight, ArrowUpRight, Play } from "@/components/icons";

// Each signature wedding has its own case-study page
const CASE_STUDY: Record<string, string> = {
  "komal-lovish": "/weddings/komal-sharma-lovish-oberoi",
  "amrita-gurpal": "/weddings/amrita-kaur-gurpal",
};

function StoryBlock({ story, flip }: { story: Story; flip: boolean }) {
  const [main, second, third] = story.images;
  return (
    <article data-story className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10" aria-labelledby={`story-${story.slug}`}>
      <div data-dark className={`relative lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
        <button
          type="button"
          data-cursor="Play"
          onClick={() => openReel(story.film)}
          className="group relative block aspect-[4/5] w-[86%] overflow-hidden bg-blush sm:w-[78%] lg:w-[84%]"
        >
          <span data-story-img className="absolute inset-0 block">
            <Image src={main.src} alt={main.alt} fill sizes="(min-width: 1024px) 34vw, 80vw" className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-expo)] group-hover:scale-105" />
          </span>
          {story.badge && (
            <span className="absolute left-4 top-4 bg-bliss px-3 py-1.5 text-[14px] font-medium text-ground">{story.badge}</span>
          )}
          <span className="absolute bottom-4 left-4 flex items-center gap-3 bg-ground py-2 pl-2 pr-4 text-[15px] font-medium text-ink">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-bliss text-ground">
              <Play />
            </span>
            Watch the film
          </span>
        </button>
        {second && (
          <div data-story-second className="absolute -bottom-10 right-0 aspect-[4/5] w-[42%] overflow-hidden border-[6px] border-ground bg-blush sm:w-[38%]">
            <Image src={second.src} alt={second.alt} fill sizes="(min-width: 1024px) 16vw, 40vw" className="object-cover" />
          </div>
        )}
        {third && (
          <div data-story-second className="absolute -top-8 right-[4%] hidden aspect-square w-[30%] overflow-hidden border-[6px] border-ground bg-blush sm:block sm:w-[26%]">
            <Image src={third.src} alt={third.alt} fill sizes="(min-width: 1024px) 11vw, 26vw" className="object-cover object-[50%_60%]" />
          </div>
        )}
      </div>

      <div className={`lg:col-span-6 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>
        <p className="display text-[clamp(38px,4.4vw,68px)]">{story.couple}</p>
        <h3 id={`story-${story.slug}`} className="mt-4 max-w-[30ch] text-[clamp(19px,1.6vw,23px)] font-medium leading-snug">
          {story.headline}
        </h3>
        <p className="mt-2 text-[16px] text-muted">{story.when}</p>
        <div className="mt-7 max-w-[54ch] space-y-4 text-[17px]">
          {story.story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <dl className="mt-8 flex max-w-[54ch] flex-wrap gap-x-12 gap-y-4">
          {story.facts.map((f) => (
            <div key={f.label}>
              <dt className="text-[14px] text-muted">{f.label}</dt>
              <dd className="mt-1 text-[16px] font-medium">{f.value}</dd>
            </div>
          ))}
        </dl>
        {story.words && (
          <figure className="mt-8 max-w-[54ch] bg-blush px-6 py-5">
            <blockquote className="text-[17px] leading-relaxed">{story.words}</blockquote>
            <figcaption className="mt-2 text-[14px] text-muted">The Bliss, on Instagram</figcaption>
          </figure>
        )}
        {CASE_STUDY[story.slug] && (
          <Link href={CASE_STUDY[story.slug]} className="link-u mt-8 inline-flex items-center gap-2 text-[16px] font-medium text-bliss">
            Read the full story <ArrowRight />
          </Link>
        )}
      </div>
    </article>
  );
}

// Bento placement for the nine diary tiles: three rows of twelve columns, mixed widths,
// heights and the Amritsar arch so the mosaic never reads as a card grid.
const TILE = [
  "lg:col-span-5 lg:h-[600px] arch",
  "lg:col-span-4 lg:h-[600px]",
  "lg:col-span-3 lg:h-[600px]",
  "lg:col-span-3 lg:h-[480px]",
  "lg:col-span-5 lg:h-[480px]",
  "lg:col-span-4 lg:h-[480px] arch",
  "lg:col-span-4 lg:h-[520px]",
  "lg:col-span-4 lg:h-[520px] arch",
  "lg:col-span-4 lg:h-[520px]",
];

function DiaryTile({ item, i }: { item: Diary; i: number }) {
  const open = () => {
    if (item.reel) openReel({ id: item.reel, title: item.title });
    else if (item.link) window.open(item.link, "_blank", "noopener");
  };
  const place = TILE[i % TILE.length];
  return (
    <li data-diary className={`relative h-[460px] sm:h-[520px] ${place.replace(" arch", "")}`}>
      <button
        type="button"
        data-cursor={item.reel ? "Play" : "View"}
        onClick={open}
        className={`group relative block h-full w-full overflow-hidden bg-blush text-left text-ground ${place.includes("arch") ? "arch" : ""}`}
      >
        <Image
          src={item.img}
          alt=""
          fill
          sizes={`(min-width: 1024px) ${Math.round((Number(place.match(/lg:col-span-(\d+)/)?.[1] ?? 4) / 12) * 100)}vw, (min-width: 640px) 46vw, 92vw`}
          className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-expo)] group-hover:scale-105"
        />
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        <span className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-ground text-bliss transition-transform duration-500 group-hover:scale-110">
          {item.reel ? <Play /> : <ArrowUpRight />}
          <span className="sr-only">{item.reel ? "Watch the film" : "Open on Instagram"}</span>
        </span>
        <span className="absolute inset-x-0 bottom-0 block p-5 lg:p-6">
          <span className="display block text-[clamp(26px,2.2vw,36px)]">{item.title}</span>
          <span className="mt-1.5 block max-w-[34ch] text-[16px] text-ground/90">{item.line}</span>
        </span>
      </button>
    </li>
  );
}

export function Signature() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>("[data-story]").forEach((s) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: s, start: "top 78%" } });
        tl.from(s.querySelector("[data-story-img]"), { scale: 1.25, duration: 1.8 })
          .fromTo(s.querySelector("button"), { clipPath: "inset(14% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4 }, 0)
          .from(s.querySelector("[data-story-second]"), { y: 80, autoAlpha: 0, duration: 1.4 }, 0.3);
      });
      // One watcher for all nine tiles: tiles that arrive together rise together
      gsap.set("[data-diary]", { y: 60, autoAlpha: 0 });
      ScrollTrigger.batch("[data-diary]", {
        start: "top 92%",
        once: true,
        onEnter: (tiles) => gsap.to(tiles, { y: 0, autoAlpha: 1, duration: 1.2, stagger: 0.08 }),
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="weddings" aria-labelledby="weddings-title" className="bg-ground py-[16vh]">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 id="weddings-title" className="display text-[clamp(40px,5.3vw,84px)] lg:col-span-7">
            Weddings people still talk about
          </h2>
          <p className="max-w-[40ch] text-[17px] lg:col-span-4 lg:col-start-9">
            Two weddings we are proud of, and more from our diary.
          </p>
        </div>

        <div className="mt-20 space-y-28 lg:mt-24 lg:space-y-36">
          {stories.map((s, i) => (
            <StoryBlock key={s.slug} story={s} flip={i % 2 === 1} />
          ))}
        </div>

        <div className="mt-32 lg:mt-40">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h3 className="display text-[clamp(32px,3.4vw,53px)]">More from our wedding diary</h3>
            <a href="https://www.instagram.com/thebliss.weddingcompany/" target="_blank" rel="noreferrer" className="link-u inline-flex items-center gap-2 font-medium">
              Follow along on Instagram <ArrowUpRight />
            </a>
          </div>
          <ul data-dark className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
            {diary.map((d, i) => (
              <DiaryTile key={d.title} item={d} i={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
