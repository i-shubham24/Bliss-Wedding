import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import { SITE_URL } from "@/lib/site-url";
import { getWedding, weddings, type GalleryTile, type Wedding } from "@/content/weddings";
import { FilmButton } from "@/components/FilmButton";
import { ArrowDown, ArrowRight, ArrowUpRight, Play } from "@/components/icons";
import { Closing } from "@/sections/home/Closing";

// Same shape as PageProps<"/weddings/[slug]">, spelled out so it type-checks before Next regenerates route types
type Props = { params: Promise<{ slug: string }> };

// Every page here is prebuilt and the whole page depends on its slug, so a click waits a
// moment for the finished page rather than flashing a placeholder first.
export const instant = false;

export function generateStaticParams() {
  return weddings.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const w = getWedding(slug);
  if (!w) return {};
  const title = `${w.couple}'s wedding`;
  return {
    title,
    description: w.description,
    alternates: { canonical: `/weddings/${w.slug}` },
    openGraph: {
      title: `${title} | The Bliss`,
      description: w.description,
      type: "article",
      locale: "en_IN",
      images: [{ url: w.cover.src, alt: w.cover.alt }],
    },
  };
}

function eventJsonLd(w: Wedding) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: w.event.name,
    description: w.description,
    url: `${SITE_URL}/weddings/${w.slug}`,
    image: [`${SITE_URL}${w.cover.src}`],
    ...(w.event.startDate && { startDate: w.event.startDate }),
    ...(w.event.city && {
      location: {
        "@type": "Place",
        name: w.event.city,
        address: { "@type": "PostalAddress", addressLocality: w.event.city, addressRegion: "Punjab", addressCountry: "IN" },
      },
    }),
    organizer: {
      "@type": "Organization",
      name: site.legalName,
      alternateName: "The Bliss Wedding Company",
      url: `${SITE_URL}/`,
      telephone: "+917888854618",
      email: site.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "30, Race Course Road, Shastri Nagar, White Avenue",
        addressLocality: "Amritsar",
        addressRegion: "Punjab",
        postalCode: "143001",
        addressCountry: "IN",
      },
      sameAs: [site.social.instagram, site.social.youtube],
    },
  };
}

// The facts strip takes as many columns as it has facts
const FACT_COLS: Record<number, string> = { 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" };

// Three gallery tiles in a staggered row: a tall arch, a quote set lower, a framed square-ish tile
const TILE = [
  "h-[480px] sm:h-[540px] lg:col-span-4 lg:h-[560px] arch",
  "sm:col-span-2 sm:order-last lg:order-none lg:col-span-4 lg:col-start-5 lg:mt-28",
  "aspect-[4/5] lg:col-span-4 lg:col-start-9",
];
const TILE_SIZES = ["(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw", "", "(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"];

function Tile({ tile, i }: { tile: GalleryTile; i: number }) {
  const place = TILE[i % TILE.length];
  if (tile.kind === "image") {
    return (
      <li data-rise data-dark className={`relative overflow-hidden bg-blush ${place}`}>
        <Image src={tile.src} alt={tile.alt} fill sizes={TILE_SIZES[i % TILE.length] || "50vw"} className="object-cover" />
      </li>
    );
  }
  if (tile.kind === "words") {
    return (
      <li data-rise className={`bg-blush px-7 py-9 lg:px-10 lg:py-12 ${place}`}>
        <figure>
          <blockquote className="display text-[clamp(26px,2.3vw,36px)] leading-[1.18]">&ldquo;{tile.text}&rdquo;</blockquote>
          <figcaption className="mt-7 text-[15px] text-muted">{tile.source}</figcaption>
        </figure>
      </li>
    );
  }
  return (
    <li data-rise data-dark className={`flex flex-col justify-end bg-bliss p-7 text-ground lg:p-10 ${place}`}>
      <p lang="pa" className="font-gurmukhi text-[clamp(38px,3.6vw,58px)] leading-[1.2]">
        {tile.pa}
      </p>
      <p className="mt-4 text-[18px]">{tile.en}</p>
      <p className="mt-8 text-[15px]">{tile.note}</p>
    </li>
  );
}

export default async function WeddingPage({ params }: Props) {
  const { slug } = await params;
  const w = getWedding(slug);
  if (!w) notFound();
  const other = weddings.find((x) => x.slug !== w.slug);
  const [first, second] = w.couple.split(" & ");
  const ld = eventJsonLd(w);

  return (
    <>
      <section id="top" aria-labelledby="wedding-title" className="bg-ground pb-16 pt-[clamp(120px,18svh,170px)] lg:pb-20">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-6 lg:pb-4">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-x-2 text-[15px]">
                <li>
                  <Link href="/#weddings" className="link-u">
                    Weddings
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page">{w.couple}</li>
              </ol>
            </nav>
            <p className="mt-10 text-[15px] font-medium tracking-wide text-bliss lg:mt-14">{w.eyebrow}</p>
            <h1 id="wedding-title" className="display mt-4 text-[clamp(42px,5.8vw,90px)]">
              {first}
              {second && <span className="block">&amp; {second}</span>}
            </h1>
            <p className="mt-7 max-w-[32ch] text-[clamp(19px,1.6vw,23px)] font-medium leading-snug">{w.headline}</p>
            <p className="mt-2 text-[16px] text-muted">{w.when}</p>
            <p className="mt-7 max-w-[46ch] text-[17px]">{w.intro}</p>
            <a href="#contact" className="btn btn-red mt-10">
              Plan your wedding with us <ArrowDown />
            </a>
          </div>

          <div data-dark className="relative lg:col-span-5 lg:col-start-8">
            <FilmButton
              id={w.film.id}
              title={w.film.title}
              className="group arch relative block aspect-[4/5] w-full overflow-hidden bg-blush text-left"
            >
              <span className="absolute bottom-4 left-4 z-10 flex items-center gap-3 bg-ground py-2 pl-2 pr-4 text-[15px] font-medium text-ink">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-bliss text-ground">
                  <Play />
                </span>
                Watch the film
              </span>
              <Image
                src={w.cover.src}
                alt={w.cover.alt}
                fill
                preload
                sizes="(min-width: 1024px) 36vw, 92vw"
                className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-expo)] group-hover:scale-105"
              />
            </FilmButton>
            {w.badge && (
              <p className="absolute left-0 top-[34%] bg-bliss px-3 py-1.5 text-[14px] font-medium text-ground">{w.badge}</p>
            )}
          </div>
        </div>

        <div className="container-x mt-14 lg:mt-20">
          <dl className={`grid grid-cols-2 gap-x-8 gap-y-6 bg-stone px-6 py-7 sm:px-8 lg:px-10 lg:py-9 ${FACT_COLS[w.facts.length] ?? "lg:grid-cols-4"}`}>
            {w.facts.map((f) => (
              <div key={f.label}>
                <dt className="text-[14px] text-muted">{f.label}</dt>
                <dd className="mt-1.5 text-[17px] font-medium leading-snug">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* The parts of the story side by side on wide screens, so the text fills the page */}
      <section aria-label="The story" className="bg-ground pb-[12vh] pt-[9vh]">
        <div className="container-x grid gap-x-12 gap-y-12 lg:grid-cols-3 lg:gap-x-16">
          {w.sections.map((s) => (
            <div key={s.title} data-rise>
              <h2 className="text-[15px] font-medium tracking-wide text-bliss">{s.title}</h2>
              <div className="mt-4 max-w-[46ch] space-y-5 text-[clamp(19px,1.55vw,23px)] leading-[1.5]">
                {s.body.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="gallery-title" className="bg-ground pb-[14vh] pt-[4vh]">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="gallery-title" className="display text-[clamp(36px,3.8vw,60px)]">
              From the wedding
            </h2>
            <a href={site.social.instagram} target="_blank" rel="noreferrer" className="link-u inline-flex items-center gap-2 font-medium">
              More on our Instagram <ArrowUpRight />
            </a>
          </div>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:items-start">
            {w.gallery.map((t, i) => (
              <Tile key={t.kind === "image" ? t.src : t.kind} tile={t} i={i} />
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="credits-title" className="bg-ground py-[14vh]">
        <div className="container-x grid gap-20 lg:grid-cols-12 lg:gap-10">
          <div data-rise className="lg:col-span-5">
            <h2 id="credits-title" className="display text-[clamp(36px,3.8vw,60px)]">
              Credits
            </h2>
            <dl className="mt-10 space-y-5">
              {w.credits.map((c) => (
                <div key={c.role} className="grid grid-cols-[minmax(0,11rem)_1fr] gap-6">
                  <dt className="text-[15px] text-muted">{c.role}</dt>
                  <dd className="text-[17px] font-medium">
                    {c.href ? (
                      <a href={c.href} target="_blank" rel="noreferrer" className="link-u inline-flex items-center gap-1.5">
                        {c.name} <ArrowUpRight />
                      </a>
                    ) : (
                      c.name
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {other && (
            <nav data-rise aria-labelledby="more-title" className="lg:col-span-6 lg:col-start-7">
              <h2 id="more-title" className="display text-[clamp(36px,3.8vw,60px)]">
                More weddings
              </h2>
              <Link href={`/weddings/${other.slug}`} className="group mt-10 grid grid-cols-[minmax(0,0.8fr)_1fr] items-end gap-6 sm:gap-8">
                <span data-dark className="arch relative block aspect-[4/5] overflow-hidden bg-blush">
                  <Image
                    src={other.cover.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 20vw, 42vw"
                    className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-expo)] group-hover:scale-105"
                  />
                </span>
                <span className="block pb-1">
                  <span className="display block text-[clamp(28px,2.6vw,42px)]">{other.couple}</span>
                  <span className="mt-3 block text-[17px] text-muted">{other.headline}</span>
                  <span className="link-u mt-6 inline-flex items-center gap-2 font-medium group-hover:[background-size:100%_1px]">
                    Read their story <ArrowRight />
                  </span>
                </span>
              </Link>
              <Link href="/#weddings" className="link-u mt-12 inline-flex items-center gap-2 font-medium">
                <ArrowRight className="rotate-180" /> Back to all our weddings
              </Link>
            </nav>
          )}
        </div>
      </section>

      <Closing />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
    </>
  );
}
