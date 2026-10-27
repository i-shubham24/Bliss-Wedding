import type { MetadataRoute } from "next";
import { ceremonies } from "@/content/site";
import { SITE_URL } from "@/lib/site-url";

const WEDDINGS = ["komal-sharma-lovish-oberoi", "amrita-kaur-gurpal"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    ...WEDDINGS.map((slug) => ({ url: `${SITE_URL}/weddings/${slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...ceremonies.map((c) => ({ url: `${SITE_URL}/ceremonies/${c.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
