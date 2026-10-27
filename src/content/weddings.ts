// Case studies for the two signature weddings, built on the `stories` entries in site.ts.
// Every fact below is from The Bliss's own posts or from news coverage; anything we could
// not check is left off the page rather than guessed.
//
// FOR THE CLIENT TO CONFIRM
// Komal Sharma & Lovish Oberoi
// - Ceremony: site.ts calls it a traditional Sikh ceremony, but the news only says
//   "traditional" and Patrika says "saat phere". We left ceremony off the page. Which was it?
// - Venues for the Haldi and the wedding (not reported anywhere). Guest count.
// - The sunflower set is shown as the Haldi because the YouTube Short is tagged "Haldi" and
//   "Haldi decor". Correct?
// - Groom's spelling: Lovish (site.ts, Free Press Journal) or Lavish (Patrika, CricketTimes)?
// - City: four reports say Amritsar; Patrika says Ludhiana. Amritsar is used.
// - "Abhishek was with the family for the early functions": Patrika says the Haldi and
//   Mehndi. Please confirm.
// - Are you happy for the page to name Punjab CM Bhagwant Mann as a guest (The Tribune)?
// - Who is in the photo in Instagram post DWJyqzGk-hh? The alt text does not name anyone.
// - Any photographer, caterer or venue to credit.
// Amrita Kaur & Gurpal
// - Date, city and venue of the wedding (only the year, 2026, is shown; site.ts says
//   "Punjab", but nothing we found confirms the place). Gurpal's full name.
// - Is Food Bliss (@foodbliss.catering, collaborator on the Instagram post) The Bliss's
//   own catering arm or a partner? It is credited as "Food Bliss, with The Bliss".
// - Did The Bliss also do the Mehndi or other functions (the Short is tagged "mehndi")?
// - Is the stage photo in post DezB8LZTDjN from the wedding or from a concert?
//
// SOURCES (checked October 2026)
// - The Bliss on Instagram: /p/DSFzbemk84V (Dec 2025, "Honoured to plan & design the wedding
//   of cricketer Abhishek Sharma's sister", "A Bliss signature wedding"); /p/DWJyqzGk-hh
//   (Mar 2026, "From planning to decor, every detail was crafted with love"); /p/DezB8LZTDjN
//   (22 Oct 2026, with @foodbliss.catering: planning, décor and catering for Amrita Kaur).
// - The Bliss on YouTube: Short 5FieC0YimGs (10 Aug 2026, tagged Haldi, Komal Sharma,
//   Abhishek Sharma sister); Short mDM3ukOXPOY (24 Oct 2026, "Amrita and Gurpal's forever
//   begins", "trusted us for her Wedding Decor & Planning", #sikhwedding #anandkaraj).
// - Free Press Journal, 3 Oct 2025: Komal Sharma marries businessman Lovish Oberoi in
//   Amritsar; Abhishek on India A duty in Kanpur.
//   freepressjournal.in/sports/abhishek-sharmas-sister-komal-sharma-ties-knot-with-lovish-oberoi-in-amritsar-star-indian-batter-misses-wedding-due-to-match-commitment
// - The Tribune, 5 Oct 2025: CM Bhagwant Mann in Amritsar for the wedding of Abhishek
//   Sharma's sister, Friday. tribuneindia.com/news/amritsar/cm-mann-attends-cricketer-abhishek-sharmas-sisters-wedding
// - CricketTimes: wedding on Friday 3 October 2025 in Amritsar; Abhishek joined by video call.
//   crickettimes.com/?p=213150
// - Patrika, 4 Oct 2025: Abhishek at the Haldi and Mehndi, missed the wedding for an India A
//   match, video call. patrika.com/cricket-news/abhishek-sharma-sister-komal-sharma-wedding-know-why-indian-opner-did-not-attend-19996711

import { insta, reelCover, stories, type Story } from "./site";

export type WeddingImage = { src: string; alt: string };

export type GalleryTile =
  | ({ kind: "image" } & WeddingImage)
  | { kind: "words"; text: string; source: string }
  | { kind: "line"; pa: string; en: string; note: string };

export type Wedding = {
  slug: string;
  couple: string;
  eyebrow: string;
  headline: string;
  when: string;
  intro: string;
  description: string;
  badge?: string;
  cover: WeddingImage;
  facts: { label: string; value: string }[];
  sections: { title: string; body: string[] }[];
  gallery: GalleryTile[];
  film: { id: string; title: string };
  credits: { role: string; name: string; href?: string }[];
  // For the schema.org Event. Leave a field out when it is not confirmed.
  event: { name: string; startDate?: string; city?: string };
};

function story(slug: string): Story {
  const found = stories.find((s) => s.slug === slug);
  if (!found) throw new Error(`weddings.ts: no story "${slug}" in site.ts`);
  return found;
}

const komal = story("komal-lovish");
const amrita = story("amrita-gurpal");

export const weddings: Wedding[] = [
  {
    slug: "komal-sharma-lovish-oberoi",
    couple: komal.couple,
    eyebrow: "A Bliss signature wedding",
    headline: komal.headline,
    when: komal.when,
    intro: "We planned the wedding and designed its décor, and our team ran it on the ground.",
    description:
      "How The Bliss planned and designed the Amritsar wedding of Komal Sharma, sister of cricketer Abhishek Sharma, and Lovish Oberoi on 3 October 2025.",
    badge: komal.badge,
    cover: {
      src: reelCover("5FieC0YimGs"),
      alt: "The sunflower arch we built for the Haldi at Komal Sharma's wedding, with bamboo lanterns and white tassels overhead",
    },
    facts: [
      { label: "Date", value: "3 October 2025" },
      { label: "Place", value: "Amritsar, Punjab" },
      { label: "What we did", value: "Planning and décor" },
    ],
    sections: [
      {
        title: "The brief",
        body: ["Komal Sharma is the sister of India opener Abhishek Sharma. She married businessman Lovish Oberoi in Amritsar."],
      },
      {
        title: "The look",
        body: [
          "For the Haldi, the entrance became a garden. A patterned runner led guests past white pillars of sunflowers, under bamboo lanterns and white tassels, to an arch of sunflowers, pink roses and white blooms backed by marigold strings.",
        ],
      },
      {
        title: "The day",
        body: [
          "Abhishek Sharma was with the family for the early functions, but on the wedding day, Friday 3 October 2025, he was in Kanpur playing for India A against Australia A, and joined his sister on a video call. Punjab Chief Minister Bhagwant Mann came to bless the newly-weds.",
        ],
      },
    ],
    gallery: [
      {
        kind: "image",
        src: insta("DSFzbemk84V"),
        alt: "Cricketer Abhishek Sharma in India colours, from our post on his sister's wedding",
      },
      { kind: "words", text: komal.words ?? "", source: "The Bliss, on Instagram" },
      {
        kind: "image",
        src: insta("DWJyqzGk-hh"),
        alt: "Our post from the wedding: The Bliss touch, approved by the best. It was an absolute honour to handle the wedding planning and décor for Abhishek Sharma's sister's wedding. Below, three people smile together on a terrace.",
      },
    ],
    film: komal.film,
    credits: [
      { role: "Wedding planning", name: "The Bliss" },
      { role: "Décor and design", name: "The Bliss" },
      { role: "Film", name: "The Bliss on YouTube", href: "https://www.youtube.com/shorts/5FieC0YimGs" },
    ],
    event: { name: "Wedding of Komal Sharma and Lovish Oberoi", startDate: "2025-10-03", city: "Amritsar" },
  },
  {
    slug: "amrita-kaur-gurpal",
    couple: amrita.couple,
    eyebrow: "An Anand Karaj",
    headline: amrita.headline,
    when: "2026",
    intro: "Amrita Kaur trusted us with the whole wedding: the planning, the décor and the food.",
    description: "How The Bliss planned, decorated and catered singer Amrita Kaur's Anand Karaj with Gurpal in 2026.",
    cover: {
      src: reelCover("mDM3ukOXPOY"),
      alt: "Gold drapes gathered into a canopy, with strings of white flowers and red roses, at Amrita and Gurpal's wedding",
    },
    facts: [
      { label: "Year", value: "2026" },
      { label: "Ceremony", value: "Anand Karaj" },
      { label: "What we did", value: "Planning, décor and catering" },
      { label: "Catering with", value: "Food Bliss" },
    ],
    sections: [
      {
        title: "The brief",
        body: ["Singer Amrita Kaur married Gurpal in 2026, in an Anand Karaj, the Sikh wedding of four laavan."],
      },
      {
        title: "The look",
        body: [
          "Gold and champagne drapes gathered into a canopy, with strings of white flowers falling from its centre, each finished with a cluster of deep red roses.",
        ],
      },
      {
        title: "The day",
        body: ["Our planners ran the day, and Food Bliss worked with us on the catering."],
      },
    ],
    gallery: [
      {
        kind: "image",
        src: insta("DezB8LZTDjN"),
        alt: "Singer Amrita Kaur singing on stage, from our post: Look who just got married? Wedding planner, The Bliss.",
      },
      {
        kind: "words",
        text: "Amrita and Gurpal's forever begins. Amrita Kaur trusted us for her wedding décor and planning, and we're truly honoured.",
        source: "The Bliss, on YouTube",
      },
      { kind: "line", pa: "ਦਿਲਾਂ ਨੂੰ ਦਿਲਾਂ ਦੇ ਰਾਹ", en: "Hearts find their way to hearts", note: "The line on our film of their wedding" },
    ],
    film: amrita.film,
    credits: [
      { role: "Wedding planning", name: "The Bliss" },
      { role: "Décor", name: "The Bliss" },
      { role: "Catering", name: "Food Bliss, with The Bliss", href: "https://www.instagram.com/foodbliss.catering/" },
      { role: "Film", name: "The Bliss on YouTube", href: "https://www.youtube.com/shorts/mDM3ukOXPOY" },
    ],
    event: { name: "Wedding of Amrita Kaur and Gurpal" },
  },
];

export const getWedding = (slug: string) => weddings.find((w) => w.slug === slug);
