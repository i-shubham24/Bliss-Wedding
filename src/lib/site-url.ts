// The public address of the site, for the sitemap, canonical links and social previews.
// Set NEXT_PUBLIC_SITE_URL once the domain is chosen.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
