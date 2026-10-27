import Image from "next/image";
import Link from "next/link";
import type { Ceremony } from "@/content/site";
import type { CeremonyPage } from "@/content/ceremony-pages";
import { FilmButton } from "@/components/FilmButton";
import { ArrowDown, Play } from "@/components/icons";
import { heroTone, shortName } from "./tone";

export function Hero({ c, page }: { c: Ceremony; page: CeremonyPage }) {
  const { ground, dark } = heroTone(c);

  return (
    <section
      id="top"
      data-dark={dark ? "" : undefined}
      aria-labelledby="ceremony-title"
      className={`relative overflow-hidden pb-[11vh] pt-[clamp(120px,18svh,170px)] ${dark ? "text-ground" : "text-ink"}`}
      style={{ backgroundColor: ground }}
    >
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="lg:col-span-7">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 text-[15px]">
              <li>
                <Link href="/#ceremonies" className="link-u">
                  Ceremonies
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page">{c.name}</li>
            </ol>
          </nav>

          <p
            lang="pa"
            className={`font-gurmukhi mt-10 text-[clamp(60px,9vw,150px)] font-light leading-[1.12] lg:mt-14 ${dark ? "" : "text-wine"}`}
            style={dark ? { color: c.tint } : undefined}
          >
            {c.pa}
          </p>
          <h1 id="ceremony-title" className="display mt-3 text-[clamp(46px,6.2vw,100px)]">
            {c.name}
          </h1>
          <p className="mt-5 text-[clamp(18px,1.5vw,21px)] font-medium">{c.aka}</p>
          <p className="mt-6 max-w-[46ch] text-[clamp(17px,1.4vw,20px)]">{page.lede}</p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <a href="#contact" className={`btn ${dark ? "btn-white" : "btn-red"}`}>
              Plan your {shortName(c)} with us <ArrowDown />
            </a>
            {c.reel && (
              <FilmButton id={c.reel.id} title={c.reel.title} className="link-u inline-flex items-center gap-2 text-[16px] font-medium">
                <Play /> Watch: {c.reel.title}
              </FilmButton>
            )}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="arch relative mx-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden lg:max-w-none" style={{ backgroundColor: c.deep }}>
            <Image
              src={c.img}
              alt={page.heroAlt}
              fill
              preload
              sizes="(min-width: 1024px) 38vw, (min-width: 560px) 520px, 92vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
