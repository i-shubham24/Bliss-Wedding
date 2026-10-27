import { getGoogleRating } from "@/lib/google-rating";
import { Reviews } from "./Reviews";

// Reads the live Google rating on the server (cached for hours, so the page still prerenders)
// and hands it to the client section. Null means the site.ts numbers are shown.
export async function ReviewsSection() {
  const google = await getGoogleRating();
  return <Reviews google={google} />;
}
