import Image from "next/image";
import Link from "next/link";
import { reelCover, site, type Ceremony } from "@/content/site";
import type { CeremonyPage } from "@/content/ceremony-pages";
import { FilmButton } from "@/components/FilmButton";
import { ArrowRight, ArrowUpRight, Play, YouTube } from "@/components/icons";
import { shortName } from "./tone";

// One film card: a portrait Short with its title under it
function FilmCard({ id, title, sizes }: { id: string; title: string; sizes: string }) {
  return (
    <FilmButton id={id} title={title} className="group block w-full text-left">
      <span className="relative block aspect-[9/16] overflow-hidden bg-ink">
        <Image
          src={reelCover(id)}
          alt=""
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-expo)] group-hover:scale-[1.06]"
        />
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/60 to-transparent" />
        <span className="absolute bottom-4 left-4 grid h-12 w-12 place-items-center rounded-full bg-ground text-bliss transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-110">
          <Play />
        </span>
      </span>
      <span className="mt-4 block text-[16px] leading-snug">{title}</span>
    </FilmButton>
  );
}

// Five or more films run as a rail wider than the screen. Fewer would leave the row half
// empty, so they sit in a grid, and any columns left over hold the invitation to plan one.
const SPAN: Record<number, string> = { 1: "lg:col-span-4", 2: "lg:col-span-6", 3: "lg:col-span-9", 4: "lg:col-span-12" };

export function Films({ c, page }: { c: Ceremony; page: CeremonyPage }) {
  const name = shortName(c);
  const rail = page.films.length >= 5;
  const count = page.films.length;

  return (
    <section
      data-dark
      aria-labelledby="films-title"
      className="overflow-hidden py-[14vh] text-ground"
      style={{ backgroundColor: c.deep }}
    >
      <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-end">
        <h2 id="films-title" className="display text-[clamp(38px,4.4vw,68px)] lg:col-span-7">
          {name} films from our team
        </h2>
        <div className="lg:col-span-4 lg:col-start-9">
          <p className="max-w-[38ch] text-[17px]">Filmed by The Bliss at real functions. Tap any film to watch.</p>
          {rail && (
            <a href={site.social.youtube} target="_blank" rel="noreferrer" className="link-u mt-5 inline-flex items-center gap-2 font-medium">
              <YouTube /> More on our YouTube <ArrowUpRight />
            </a>
          )}
        </div>
      </div>

      {rail ? (
        <ul className="no-scrollbar mt-12 flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-4 overflow-x-auto px-[var(--gutter)] lg:mt-14 lg:gap-5">
          {page.films.map((f) => (
            <li key={f.id} data-rise className="w-[62vw] shrink-0 snap-start sm:w-[250px] lg:w-[270px]">
              <FilmCard id={f.id} title={f.title} sizes="(min-width: 1024px) 270px, (min-width: 640px) 250px, 62vw" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="container-x mt-12 grid gap-4 lg:mt-14 lg:grid-cols-12 lg:gap-5">
          <ul className={`grid grid-cols-2 gap-4 lg:gap-5 ${SPAN[count] ?? "lg:col-span-12"} ${count >= 3 ? "sm:grid-cols-3" : ""} ${count === 4 ? "lg:grid-cols-4" : ""}`}>
            {page.films.map((f) => (
              <li key={f.id} data-rise>
                <FilmCard id={f.id} title={f.title} sizes={`(min-width: 1024px) ${count >= 3 ? 24 : 22}vw, (min-width: 640px) ${count >= 3 ? 30 : 45}vw, 45vw`} />
              </li>
            ))}
          </ul>
          {count < 4 && (
            <div
              data-rise
              data-light
              className={`flex flex-col justify-between gap-10 p-7 text-ink sm:p-9 lg:p-10 ${count === 3 ? "lg:col-span-3" : count === 2 ? "lg:col-span-6" : "lg:col-span-8"}`}
              style={{ backgroundColor: c.tint }}
            >
              <p lang="pa" className="font-gurmukhi text-[clamp(44px,4.6vw,76px)] leading-[1.1]" style={{ color: c.deep }}>
                {c.pa}
              </p>
              <div>
                <h3 className="display text-[clamp(28px,2.6vw,42px)]">Tell us about your {name}</h3>
                <p className="mt-4 max-w-[34ch] text-[17px]">Send the date and how many guests. We reply with ideas, usually the same day.</p>
                <div className="mt-8 flex flex-col items-start gap-5">
                  <a href="#contact" className="btn btn-red">
                    Plan your {name} <ArrowRight />
                  </a>
                  <a href={site.social.youtube} target="_blank" rel="noreferrer" className="link-u inline-flex items-center gap-2 text-[16px] font-medium">
                    <YouTube /> More films on our YouTube <ArrowUpRight />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

// Two neighbouring ceremonies in the wedding week, and the way back to all eight
export function Siblings({ links }: { links: { label: string; c: Ceremony }[] }) {
  return (
    <nav aria-labelledby="more-title" className="bg-ground py-[12vh]">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="more-title" className="display text-[clamp(32px,3.4vw,53px)]">
            The rest of the wedding week
          </h2>
          <Link href="/#ceremonies" className="link-u inline-flex items-center gap-2 font-medium">
            See all eight ceremonies <ArrowRight />
          </Link>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:gap-5">
          {links.map(({ label, c }) => (
            <li key={c.slug} data-rise>
              <Link
                href={`/ceremonies/${c.slug}`}
                className="group grid h-full grid-cols-[1fr_auto] items-end gap-6 p-7 lg:p-10"
                style={{ backgroundColor: c.tint }}
              >
                <span>
                  <span className="block text-[15px] font-medium text-muted">{label}</span>
                  <span lang="pa" className="font-gurmukhi mt-6 block text-[clamp(34px,3.4vw,54px)] leading-[1.15]" style={{ color: c.deep }}>
                    {c.pa}
                  </span>
                  <span className="display mt-2 block text-[clamp(30px,3vw,48px)] transition-colors duration-300 group-hover:text-bliss">
                    {c.name}
                  </span>
                  <span className="mt-2 block text-[16px] text-muted">{c.aka}</span>
                </span>
                <span className="arch relative block h-[150px] w-[100px] overflow-hidden sm:h-[180px] sm:w-[120px] lg:h-[230px] lg:w-[155px]">
                  <Image
                    src={c.img}
                    alt=""
                    fill
                    sizes="155px"
                    className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-expo)] group-hover:scale-105"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
