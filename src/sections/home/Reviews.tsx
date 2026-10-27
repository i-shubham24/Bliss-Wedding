"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { openReel } from "@/lib/site-events";
import { googleLines, ratings, reelCover, testimonials } from "@/content/site";
import { ArrowUpRight, Play, Star } from "@/components/icons";
import type { LiveRating } from "@/lib/google-rating";

type Rating = { source: string; score: string; count: string; href?: string };

// Month the site.ts numbers were last checked against each listing
const checked = "October 2026";

export function Reviews({ google = null }: { google?: LiveRating | null }) {
  const [i, setI] = useState(0);

  const list: Rating[] = ratings.map((r) => (google && r.source === "Google" ? { ...r, ...google } : r));
  const total = list.reduce((n, r) => n + parseInt(r.count, 10), 0);

  // Restarts after every change, so a quote someone picks stays on screen for the full time
  useEffect(() => {
    const id = window.setTimeout(() => setI((v) => (v + 1) % googleLines.length), 7000);
    return () => window.clearTimeout(id);
  }, [i]);

  return (
    <section aria-labelledby="reviews-title" className="bg-ground py-[16vh]">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <h2 id="reviews-title" className="display text-[clamp(40px,4.8vw,76px)] lg:col-span-7">
            What families tell us
          </h2>
          <p className="max-w-[40ch] text-[17px] lg:col-span-4 lg:col-start-9">
            {total} families have rated us.
          </p>
        </div>

        <ul aria-label="Our ratings" className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 bg-blush px-6 py-10 sm:px-10 lg:grid-cols-4 lg:gap-x-10">
          {list.map((x) => {
            const body = (
              <>
                <span className="block text-[17px] font-medium">{x.source}</span>
                <span className="mt-2 flex items-start gap-2">
                  <span className="text-[clamp(56px,6vw,92px)] font-light leading-[0.9] tabular-nums tracking-[-0.04em]">{x.score}</span>
                  <Star className="mt-2 text-bliss" width={22} height={22} />
                </span>
                <span className="mt-3 block text-[16px] text-muted">{x.count}</span>
              </>
            );
            return (
              <li key={x.source}>
                {x.href ? (
                  <a
                    href={x.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`See our ${x.count} on ${x.source}, rated ${x.score} out of 5`}
                    className="group block"
                  >
                    {body}
                    <span className="link-u mt-4 inline-flex items-center gap-1.5 text-[15px] font-medium group-hover:[background-size:100%_1px]">
                      See reviews <ArrowUpRight width={16} height={16} />
                    </span>
                  </a>
                ) : (
                  body
                )}
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-[14px] text-muted">
          {google ? `Google rating checked hourly. Others as shown on each site, ${checked}.` : `Ratings as shown on each site, ${checked}.`}
        </p>

        <div className="mt-8 grid gap-5 lg:grid-cols-12">
          <figure data-dark className="flex flex-col justify-between bg-wine p-8 text-ground sm:p-10 lg:col-span-4">
            <p className="text-[16px] text-ground/75">From our Google reviews</p>
            <div className="my-8 min-h-[7.5em] text-[clamp(22px,1.9vw,28px)] font-light leading-[1.3] tracking-[-0.01em]">
              {/* keyed, so each new line plays the arrival animation */}
              <blockquote key={i} className="quote-in">
                {googleLines[i]}
              </blockquote>
            </div>
            <div className="flex items-center justify-between gap-4">
              <figcaption className="text-[15px] text-ground/75">Google review</figcaption>
              <div className="-mr-[15px] flex" role="tablist" aria-label="Google review lines">
                {googleLines.map((_, n) => (
                  <button
                    key={n}
                    type="button"
                    role="tab"
                    aria-selected={i === n}
                    aria-label={`Review ${n + 1}`}
                    onClick={() => setI(n)}
                    className={`h-10 w-10 rounded-full bg-clip-content p-[15px] transition-colors ${i === n ? "bg-ground" : "bg-ground/30 hover:bg-ground/60"}`}
                  />
                ))}
              </div>
            </div>
          </figure>

          <ul aria-label="Video testimonials" className="grid grid-cols-2 gap-5 sm:grid-cols-4 lg:col-span-8">
            {testimonials.slice(0, 4).map((t) => (
              <li key={t.id}>
                <button type="button" data-cursor="Play" onClick={() => openReel(t)} className="group block w-full text-left">
                  <span className="relative block aspect-[9/14] overflow-hidden bg-blush">
                    <Image src={reelCover(t.id)} alt="" fill sizes="(min-width: 1024px) 15vw, (min-width: 640px) 23vw, 45vw" className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-expo)] group-hover:scale-105" />
                    <span className="absolute bottom-3 left-3 grid h-10 w-10 place-items-center rounded-full bg-ground text-bliss transition-transform duration-500 group-hover:scale-110">
                      <Play />
                    </span>
                  </span>
                  <span className="mt-3 line-clamp-2 block min-h-[2.8em] text-[15px] leading-snug transition-colors group-hover:text-bliss">{t.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
