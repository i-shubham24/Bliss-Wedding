"use client";

// Unsplash resizes on the fly, so next/image asks it directly for each srcset width.
// The client's own pictures are pre-sized by scripts/resize-images.mjs into
// /img/<240|480|960>/<folder>/<name>.webp; pick the smallest that covers the request.
export default function blissImageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 70));
    return url.toString();
  }
  const local = src.match(/^\/(reels|insta)\/(.+)\.jpg$/);
  if (local) return `/img/${width <= 260 ? 240 : width <= 520 ? 480 : 960}/${local[1]}/${local[2]}.webp?w=${width}`;
  return src;
}
