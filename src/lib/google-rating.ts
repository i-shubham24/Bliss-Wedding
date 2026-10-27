import { cacheLife } from "next/cache";

export type LiveRating = { score: string; count: string };

type PlaceResponse = { rating?: number; userRatingCount?: number };

// The Bliss's current Google rating from the Places API (New), fetched at most once an hour.
// Needs GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID. Without them, or on any error, this returns null
// and the Reviews section shows the numbers in src/content/site.ts.
export async function getGoogleRating(): Promise<LiveRating | null> {
  "use cache";
  cacheLife("hours");

  const key = process.env.GOOGLE_PLACES_API_KEY;
  const id = process.env.GOOGLE_PLACE_ID;
  if (!key || !id) return null;

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(id)}`, {
      headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": "rating,userRatingCount" },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;

    const place = (await res.json()) as PlaceResponse;
    if (typeof place.rating !== "number" || typeof place.userRatingCount !== "number") return null;

    // Same shape as the Google entry in site.ts, so it can replace it as is
    return { score: place.rating.toFixed(1), count: `${place.userRatingCount} reviews` };
  } catch {
    return null;
  }
}
