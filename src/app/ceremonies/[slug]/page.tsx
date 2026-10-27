import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ceremonies, site } from "@/content/site";
import { getCeremonyPage } from "@/content/ceremony-pages";
import { Closing } from "@/sections/home/Closing";
import { Hero } from "../_components/Hero";
import { About, Day, Setup } from "../_components/Details";
import { Faqs } from "../_components/Faqs";
import { Films, Siblings } from "../_components/Films";

// Every page here is prebuilt and the whole page depends on its slug, so a click waits a
// moment for the finished page rather than flashing a placeholder first.
export const instant = false;

export async function generateStaticParams() {
  return ceremonies.map((c) => ({ slug: c.slug }));
}

function findCeremony(slug: string) {
  const i = ceremonies.findIndex((c) => c.slug === slug);
  const page = getCeremonyPage(slug);
  if (i < 0 || !page) return null;
  const prev = ceremonies[i - 1];
  const next = ceremonies[i + 1];
  // Always two neighbours, so the row is never half empty: the first ceremony shows the two
  // that follow it, the last shows the two before it
  const neighbours =
    prev && next
      ? [{ label: "Previous ceremony", c: prev }, { label: "Next ceremony", c: next }]
      : prev
        ? [{ label: "Earlier in the week", c: ceremonies[i - 2] }, { label: "Previous ceremony", c: prev }]
        : [{ label: "Next ceremony", c: next }, { label: "After that", c: ceremonies[i + 2] }];
  return { c: ceremonies[i], page, neighbours };
}

export async function generateMetadata({ params }: PageProps<"/ceremonies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const found = findCeremony(slug);
  if (!found) return {};
  const { c, page } = found;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    openGraph: {
      title: `${page.metaTitle} | The Bliss`,
      description: page.metaDescription,
      type: "website",
      locale: "en_IN",
      siteName: "The Bliss",
      images: [{ url: c.img, alt: page.heroAlt }],
    },
  };
}

const ld = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");

export default async function CeremonyRoute({ params }: PageProps<"/ceremonies/[slug]">) {
  const { slug } = await params;
  const found = findCeremony(slug);
  if (!found) notFound();
  const { c, page, neighbours } = found;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.metaTitle,
    serviceType: page.serviceType,
    description: page.metaDescription,
    areaServed: { "@type": "City", name: "Amritsar" },
    provider: {
      "@type": "LocalBusiness",
      name: site.legalName,
      alternateName: "The Bliss Wedding Company",
      telephone: site.phoneHref.replace("tel:", ""),
      email: site.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "30, Race Course Road, near Adlakha Hospital, Shastri Nagar, White Avenue",
        addressLocality: "Amritsar",
        addressRegion: "Punjab",
        postalCode: "143001",
        addressCountry: "IN",
      },
      sameAs: [site.social.instagram, site.social.youtube, site.social.facebook],
    },
  };

  return (
    <>
      <Hero c={c} page={page} />
      <About c={c} page={page} />
      <Setup c={c} page={page} />
      <Day c={c} page={page} />
      <Faqs c={c} page={page} />
      <Films c={c} page={page} />
      <Siblings links={neighbours} />
      <Closing />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(serviceLd) }} />
    </>
  );
}
