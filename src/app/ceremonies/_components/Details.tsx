import Image from "next/image";
import type { CSSProperties } from "react";
import { reelCover, type Ceremony } from "@/content/site";
import type { CeremonyPage } from "@/content/ceremony-pages";
import { FilmButton } from "@/components/FilmButton";
import { Play } from "@/components/icons";
import { shortName } from "./tone";

export function About({ c, page }: { c: Ceremony; page: CeremonyPage }) {
  return (
    <section aria-labelledby="about-title" className="bg-ground py-[14vh]">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <h2 id="about-title" className="display text-[clamp(38px,4.4vw,68px)] lg:col-span-5">
          What the {shortName(c)} means
        </h2>
        <div className="lg:col-span-6 lg:col-start-7">
          <div className="max-w-[58ch] space-y-5 text-[18px] leading-relaxed">
            {page.about.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
          <dl className="mt-12 grid max-w-[58ch] gap-x-8 gap-y-6 sm:grid-cols-3">
            {page.facts.map((f) => (
              <div key={f.label}>
                <dt className="text-[14px] font-medium" style={{ color: c.deep }}>
                  {f.label}
                </dt>
                <dd className="mt-1.5 text-[16px] leading-snug">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

// Bento: the feature film in an arch on one side, the set-up tiles on the other. The first tile
// sits on the ceremony's deep colour and spans the row; a lone last tile spans it too.
export function Setup({ c, page }: { c: Ceremony; page: CeremonyPage }) {
  const { feature, setup } = page;
  const rest = setup.length - 1;

  return (
    <section aria-labelledby="setup-title" className="py-[14vh]" style={{ backgroundColor: c.tint }}>
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 id="setup-title" className="display text-[clamp(38px,4.4vw,68px)] lg:col-span-7">
            What we set up for your {shortName(c)}
          </h2>
          <p className="max-w-[42ch] text-[17px] lg:col-span-4 lg:col-start-9">{page.setupIntro}</p>
        </div>

        <div className="mt-14 grid gap-4 lg:mt-16 lg:grid-cols-12 lg:gap-5">
          <div data-dark className="lg:col-span-5">
            <FilmButton
              id={feature.id}
              title={feature.title}
              className="group arch relative block h-[min(130vw,620px)] w-full overflow-hidden lg:h-full lg:min-h-[640px]"
            >
              <Image
                src={reelCover(feature.id)}
                alt={feature.alt}
                fill
                sizes="(min-width: 1024px) 38vw, 92vw"
                className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-expo)] group-hover:scale-105"
              />
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-5 left-5 flex max-w-[calc(100%-2.5rem)] items-center gap-3 bg-ground py-2 pl-2 pr-4 text-left text-[15px] font-medium leading-snug text-ink">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-bliss text-ground">
                  <Play />
                </span>
                Watch: {feature.title}
              </span>
            </FilmButton>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:gap-5">
            {setup.map((s, i) => {
              const lead = i === 0;
              const wide = lead || (i === setup.length - 1 && rest % 2 === 1);
              return (
                <li
                  key={s.title}
                  data-rise
                  data-dark={lead ? "" : undefined}
                  className={`flex flex-col justify-end p-7 lg:p-9 ${wide ? "sm:col-span-2" : ""} ${lead ? "min-h-[240px] text-ground" : "bg-ground"}`}
                  style={lead ? { backgroundColor: c.deep } : undefined}
                >
                  <h3 className={lead ? "display text-[clamp(30px,2.8vw,44px)]" : "text-[clamp(20px,1.6vw,24px)] font-medium leading-snug"}>
                    {s.title}
                  </h3>
                  <p className={`mt-3 max-w-[46ch] text-[17px] ${lead ? "text-[18px]" : ""}`}>{s.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

// The day as a gentle staircase: each step sits a little further in, so the order reads
// without rules or boxes between the steps.
export function Day({ c, page }: { c: Ceremony; page: CeremonyPage }) {
  return (
    <section aria-labelledby="day-title" className="bg-ground py-[14vh]">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <h2 id="day-title" className="display text-[clamp(38px,4.4vw,68px)]">
              How it runs on the day
            </h2>
            <p className="mt-6 max-w-[36ch] text-[17px]">
              This is the usual order. We shape it around your family.
            </p>
          </div>
        </div>
        <ol className="space-y-10 lg:col-span-7 lg:col-start-6 lg:space-y-12">
          {page.day.map((d, i) => (
            <li
              key={d.title}
              data-rise
              className="grid grid-cols-[56px_1fr] gap-5 lg:ml-[calc(var(--step)*6%)] lg:grid-cols-[88px_1fr] lg:gap-6"
              style={{ "--step": i } as CSSProperties}
            >
              <span aria-hidden className="display text-[clamp(44px,4.4vw,68px)] leading-[0.9]" style={{ color: c.deep }}>
                {i + 1}
              </span>
              <div>
                <h3 className="text-[clamp(20px,1.6vw,24px)] font-medium leading-snug">{d.title}</h3>
                <p className="mt-2 max-w-[48ch] text-[17px]">{d.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
