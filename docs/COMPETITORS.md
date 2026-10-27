# The Bliss: competitor research and the plan it leads to

October 2026. We looked at wedding planners' own websites in Amritsar, across Punjab and the Chandigarh tricity, and at four of India's best-known planners as a benchmark. This is a plan only; nothing in it is built yet.

---

## 1. What we found

### Amritsar

Only **8 Amritsar planners or decorators have a working website** of their own. Most, including well-reviewed names, live only on WedMeGood, WeddingWire, Justdial and Instagram. Two more domains are dead or parked.

Speed and quality were measured on a phone, the same way for every site (Lighthouse, mobile, on this machine):

| Site | Built with | Speed | Accessibility | SEO | Main picture shows in | Strongest point | Weakest point |
|---|---|---|---|---|---|---|---|
| **The Bliss (our prototype)** | Next.js | 42 | **100** | **100** | 6.1 s | Real named weddings, films, ceremonies, Punjabi | Speed, one page only |
| Golden Sparrow Events | Custom | 41 | 90 | 92 | 4.1 s | Quote form in the hero, 24 service pages, FAQ, fresh blog | No real weddings, empty video block, 10 MB page |
| Hriday & Co. | WordPress | 45 | 93 | 92 | 8.3 s | "Since 1995", a public starting price (₹2.5 lakh), Google reviews widget | Three pages, uncaptioned gallery, 1-star reviews shown unanswered |
| Divine Weddings | WordPress | 31 | 95 | 92 | 11.5 s | 10 city pages, blog, video page, form with a Country field | Generic copy, buttons that go nowhere |
| Lemon Leaf Events | WordPress | 26 | 83 | 92 | 9.4 s | 22 client logos | Counters read "0+", placeholder email, mostly corporate |
| 1on1 Events | WordPress | 29 | 85 | 85 | 12.4 s | About 50 real photos | Theme demo pages, lorem ipsum, a fake "Emma Watson" review |
| Shiv Flower Decoration | Static HTML | 26 | 86 | 100 | 11.5 s | 61-photo portfolio | Shows a different brand name, empty counters |
| Laat Creations | WordPress | 26 | 95 | 100 | 14.4 s | Many narrow service pages | **Hacked: casino spam links in the page** |
| DJ Dash | WordPress | 26 | 93 | 85 | 10.1 s | Entrance themes | © 2022, contradicting "40 years" and "37 years" |

We checked the most striking findings by hand: the casino links on Laat Creations, the lorem ipsum and localhost links on 1on1 Events, and Hriday's price and review count.

### Punjab and the tricity

We checked 12 planners in Chandigarh, Mohali, Zirakpur, Ludhiana, Jalandhar and Patiala. No Bathinda planner has a site. The five strongest:

1. **Shaandaar Events** (Chandigarh): the best photography, an "As seen in" strip, named real weddings, a 19-question FAQ, and published planning fees from ₹6 lakh. It also writes the "Top 10 wedding planners in Amritsar" article that ranks for that search: it puts itself first and **The Bliss second**.
2. **Weddings by Tycoon** (Mohali): a live Google reviews widget, team bios, hotel partner logos, an NRI answer in the FAQ. Its own numbers contradict each other (200 and 350+ weddings).
3. **Guide Events** (Chandigarh): 26 blog posts on venues and costs and a visible 4.8 rating from 103 Google reviews, but no form and no WhatsApp.
4. **Decor By Pearls** (Mohali): the most modern build, with scroll animation, films, real weddings and a venue list with WhatsApp buttons. The copy reads machine-written and images repeat.
5. **Naz Wedding Planner** (Ludhiana): the only form that asks for a budget band, event date and the couple's names. Its counters read "0+".

The rest share the same problems: WordPress templates, "best wedding planner in [city]" headings, counters reading "0+", leftover demo text, and copyright years from 2018 to 2024.

Phone speed, measured the same way as the Amritsar table:

| Site | City | Speed | Accessibility | SEO | Main picture shows in | Page size |
|---|---|---|---|---|---|---|
| Shaandaar Events | Chandigarh | 26 | 96 | 100 | 5.4 s | 17.9 MB |
| Weddings by Tycoon | Mohali | 28 | 86 | 92 | 15.0 s | 9.1 MB |
| Guide Events | Chandigarh | 31 | 85 | 100 | 6.5 s | 5.8 MB |
| The DEW Company | Chandigarh | 29 | 91 | 92 | 46.8 s | 27.1 MB |
| Decor By Pearls | Mohali | 29 | 90 | 100 | 7.5 s | 4.6 MB |
| Jai Hind Wedding Planner | Chandigarh | 25 | 67 | 82 | 62.7 s | 18.9 MB |
| Raindrop Events | Zirakpur | 25 | 82 | 92 | 18.9 s | 4.8 MB |
| Myra Events | Ludhiana | 27 | 71 | 82 | 23.2 s | 3.4 MB |
| Naz Wedding Planner | Ludhiana | 28 | 91 | 100 | 8.1 s | 8.2 MB |
| Vision Vivaah | Ludhiana | 20 | 63 | 83 | 42.6 s | 8.2 MB |
| GYB Events | Jalandhar | 17 | 84 | 92 | 90.5 s | 15.5 MB |
| Oneness Wedding Planner | Patiala | 14 | 80 | 85 | 101.2 s | 19.5 MB |
| The Wedding Design Company | Delhi (benchmark) | 42 | 96 | 100 | 7.6 s | 9.9 MB |
| Tamarind Global Weddings | Mumbai (benchmark) | 26 | 87 | 92 | 15.1 s | 62.1 MB |
| Devika Narain & Company | Mumbai (benchmark) | 25 | 84 | 92 | 14.9 s | 6.7 MB |
| Shaadi Squad | Mumbai (benchmark) | 32 | 96 | 85 | 9.3 s | 3.3 MB |

**No wedding planner we measured scores above 45.** Most pages weigh 3 to 27 MB; ours is 2.2 MB.

### The top of the Indian market (benchmark)

- **The Wedding Design Company** (Delhi) has a press archive of 25 features (Vogue, Tatler, Condé Nast Traveller) and an illustrated hero in place of stock photos.
- **Devika Narain & Company** (Mumbai) writes long case studies, around 850 words each, with every vendor credited.
- **Shaadi Squad** (Mumbai) lists 26 named weddings, celebrities included. That list is its whole pitch.
- **Tamarind Global Weddings** has a video hero, offices abroad and a WhatsApp button.

Even the top of the market handles enquiries badly: an email link, or three form fields.

### Patterns

**What almost everyone does:**
- A bought WordPress theme with 9 to 12 service cards.
- A flat photo grid with no couple, venue or ceremony named.
- English only, a phone number and a WhatsApp button.

**What nobody in Punjab does:**
- Real wedding stories with films. We found no embedded wedding film on any Amritsar site.
- Pages for each ceremony: Anand Karaj, Jaggo, Chooda, Maiyan, Milni.
- Content on Gurdwara and Anand Karaj logistics.
- A guide that names real Amritsar venues.
- A proper NRI planning page.
- A Punjabi or Hindi version.
- A date or season checker.
- Prices, except Hriday and Shaandaar.
- Proof that can be checked: numbers are blank, contradictory or unsourced.

**Who wins Amritsar searches today:** firms from outside the city. Shaandaar (Chandigarh) ranks for "top wedding planners in Amritsar". Velvet Knot (Hyderabad) publishes the "Amritsar wedding cost 2026" guide. Raindrop Events (Zirakpur) blogs about Amritsar. The useful Amritsar content is being written by people who are not in Amritsar.

---

## 2. Where our prototype stands

**Already ahead of every local site:**
- Named real weddings with films (Komal Sharma's, Amrita Kaur's).
- A recognisable name: Abhishek Sharma.
- Eight ceremonies with Gurmukhi names.
- A plan builder that writes the enquiry for the family.
- Real ratings from four platforms.
- Accessibility, best practices and SEO all at 100.
- No template leftovers.
- The deepest heritage claim in the market: 1935, against Hriday's 1995.

**Level, not ahead:**
- **Speed:** 42, the same as the best local sites (41 to 45). Not yet an advantage.
- **Reviews:** competitors embed live Google widgets; ours are typed numbers.

**Behind:**
- **Search reach:** we are one page. Competitors have 10 to 26 pages, and out-of-town firms own the Amritsar guides.
- **Prices:** we show only an FAQ line.
- **Enquiries:** the form does not ask for a date or budget, and nothing is saved before WhatsApp opens.

---

## 3. The plan, by impact

### 1. Own the Amritsar search (the biggest open gap)

- **Eight ceremony pages:** Anand Karaj, Jaggo, Chooda and Kaleere, Haldi and Maiyan, Mehndi, Sangeet and Sufi nights, Roka and Shagun, Reception. Each gets its meaning, what The Bliss sets up, real photos and the film, and FAQs.
  - Nobody in Punjab has these. They match how families actually search ("Jaggo decor Amritsar", "Anand Karaj set up").
- **An Amritsar venue guide** naming venues The Bliss has worked at, taken from its own posts: voco Amritsar, Maribella, Clubhouse Amritsar, Ranjit Vilas, 5 States Resort.
  - Include capacity, season and which ceremony each suits, with links to the weddings held there. No local site names venues.
- **"What a wedding costs in Amritsar, 2026 to 2027"**, written with The Bliss's own numbers. Today a Hyderabad firm owns this search.
- **An Anand Karaj and Gurdwara guide:** timings, what the family arranges, langar, dress, photography etiquette.
- **Destination pages only where The Bliss has really worked** (Chamba, Jammu, Goa and others), each with its wedding. Competitors' copy-paste city pages are a warning, not a model.
- **Punjabi (Gurmukhi) versions of the home and ceremony pages.** Nobody has them, so there is almost no competition for searches in Punjabi.
- **Technical:**
  - Structured data for the business, each service, FAQs and reviews.
  - A sitemap.
  - Link the site from the Google Business Profile.
  - Ask the "top 10" listicles to link the real site.

### 2. Real weddings as case studies (the benchmark move)

- One page per wedding, starting with Komal Sharma and Lovish Oberoi, and Amrita Kaur and Gurpal.
- Each page: the story, the film, a gallery captioned by ceremony, venue, guest count, the look, and credits for every vendor.
- Vendors share pages that credit them, which brings links and referrals.
- Add one wedding a month. A diary that grows is the strongest proof in this market, and nobody local has one.

### 3. Proof people can check

- A live Google rating (4.8 from 127 reviews today), plus WedMeGood, WeddingWire and Justdial, each linking to its source.
- A "Seen with" strip: Abhishek Sharma's family, Amrita Kaur, the civic functions. It becomes a press strip as coverage arrives.
- **Show the 1935 history with archive photos** of the family firm. It is the one claim no competitor can match.
- Counters only with numbers the client confirms. Rivals' "0+" counters show how fast a wrong number costs trust.

### 4. Price clarity

- A "What it costs" page with starting prices per service: planning, décor per function, catering per plate. Only two firms in Punjab publish prices, and families compare on it.
- A rough estimate in the plan builder: guests and functions give a range, so the WhatsApp message arrives already qualified.
- Needs the client's price bands.

### 5. Enquiries that qualify the family and are never lost

- **Add to the plan builder:** wedding date or month, budget band (Naz's best idea), bride and groom names, and for NRI families their country and time zone.
- **Save every enquiry** to email and a Google Sheet before WhatsApp opens. Today, a family that does not press send in WhatsApp is lost.
- Send an automatic "we got it, we reply the same day" message.
- **A quick enquiry under the hero on phones:** date, guests and a WhatsApp number, leading into the full builder. Golden Sparrow's hero form is the strongest pattern we saw locally.

### 6. An NRI planning page (nobody does this)

- How planning works from the USA, Canada, the UK and Australia: video venue walk-throughs, one WhatsApp group, hotel blocks, airport pickups, a guest help desk, and help with marriage registration paperwork.
- Use the existing "Home from New York" film and the New York testimonial.

### 7. A date checker

- "Is my date free?": the family picks a date, the site shows whether it is peak season and pre-fills WhatsApp.
- Later it can read the client's calendar. No competitor offers anything like it.

### 8. More films, and longer ones

- Add two or three full wedding films in landscape next to the Shorts. The reels rail stays.
- Show films first on phones. Films are our clearest lead over every local site.

### 9. Speed, upkeep and safety

- **Speed:** take it from 42 to 80+ with the work already planned in [IMPROVEMENTS.md](IMPROVEMENTS.md): a still image of the 3D chooda first, and lighter start-up work. That would make it the only fast wedding site in Punjab.
- **Upkeep:** a simple editor (CMS) so the team adds weddings themselves.
- **Safety:** uptime and security monitoring, and dependency updates. Laat Creations was hacked, 1on1 Events still shows demo text, and several sites stopped at 2018 to 2024. A looked-after site is part of the pitch to the client.

### 10. Design: keep our identity, borrow one thing

- **Keep** the chooda, the arch, the Bliss red and the Gurmukhi. No Punjab site has an identity of its own.
- **Borrow** from Shaandaar: full-bleed photography of a real couple. Our hero has none. Test a real wedding photo or film loop behind or beside the chooda, especially on phones.
- **Avoid** what everyone else does:
  - Gold-on-black luxury templates.
  - "Best wedding planner in [city]" headings.
  - Copy-paste city pages, fake or blank counters, stock photos, and ratings with no source.

---

## 4. Order of work

**Before launch:**
- Speed work.
- Saved enquiries with the new fields.
- Linked live ratings.
- The two wedding case studies.
- The eight ceremony pages.
- The price page, once the client gives price bands.

**First month after launch:**
- Venue guide, cost guide, Anand Karaj guide and NRI page.
- Punjabi version of the home and ceremony pages.
- CMS, structured data and sitemap.

**Ongoing:**
- One real wedding a month and one guide a quarter.
- Ask for a Google review after every wedding.
- Track enquiries by source (search, Instagram, WhatsApp) to see what works.

### Pre-launch list: status (27 October 2026)

**Built:**
- **Speed:**
  - The hero shows a still render of the chooda at once.
  - The live 3D loads behind it, compiles in the background and fades in. It uses pre-baked lighting (matcaps) instead of building reflections at load.
  - Devices without hardware graphics, or with data saver on, keep the still.
  - Main-thread blocking on a simulated phone fell from about 12 s to about 3.6 s.
- **Saved enquiries:**
  - New fields: exact date, budget band, the couple's names, the family's country and time zone, and an optional email.
  - The server saves each enquiry to a Google Sheet and email before WhatsApp opens. It needs the settings in `.env.example`; see [ENQUIRIES.md](ENQUIRIES.md).
- **Linked ratings:**
  - Each rating links to its Google, WedMeGood, WeddingWire or Justdial listing.
  - The Google rating updates itself hourly once `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACE_ID` (`ChIJOWsBKqBkGTkRrfW7zQ8YoZc`) are set.
- **Two wedding case studies:** `/weddings/komal-sharma-lovish-oberoi` and `/weddings/amrita-kaur-gurpal`.
- **Eight ceremony pages:** `/ceremonies/<slug>`, each with meaning, set-up, the day, FAQs, films and structured data.
- **Plumbing:**
  - Sitemap, robots and canonical links. Set `NEXT_PUBLIC_SITE_URL`.
  - Nav and footer links that work from every page, and a footer list of all ceremonies.
- **Two bugs fixed:** the phone check accepted letters, and the first FAQ opened by itself.

**QA and polish pass:**
- **Copy:** cut 38% on the ceremony pages, 34% on the case studies and 22% on the home page. Repeated lines and filler are gone.
- **Smoother scrolling:** the nav no longer hit-tests the page on every frame. On the home page, slow frames during scroll halved on desktop.
- **Less JavaScript:** the Framer Motion library is removed. The phone menu, film player and review quotes now animate with CSS.
- **Faster film opening:** the player appears at once and the film loads a frame later (232 ms to 176 ms).
- **Touch:** every link and button has a finger-sized hit area.
- **Anchors and links:** "Back to the top" works on every page, and no internal link is broken.
- **Last measurement:**
  - Lighthouse on a simulated phone (on this slow machine): home 44, wedding page 59, ceremony page 61.
  - Tests pass 119 of 120. The one failure is a page request the test cancels itself.

**Still to do:**
- The price page, once the client gives price bands.

## 5. What we need from the client

**Found while building, to confirm:**
- **Justdial count:** we show 124 ratings; recent search results show 65.
- **Komal Sharma's wedding:** was it a Sikh ceremony? The news says only "traditional", and one report says saat phere. The site no longer says Sikh.
- **The groom's name:** Lovish or Lavish?
- **Venues and guest counts** for both weddings.
- **CM Bhagwant Mann:** may the case study name him as a guest?
- **Amrita Kaur's wedding:** date, city and venue; Gurpal's surname.
- **Food Bliss:** The Bliss's own catering arm, or a partner?
- **Ceremony films:** two films are filed under a ceremony on our reading of the picture, not the title: sXkmPHJrUgI (Mehndi) and Ew7xP7DkwK8 (Jaggo).

**From the plan:**

- Price bands for planning, décor and catering.
- The venues they have worked at, with permission to name them.
- Written consent to name couples and credit vendors.
- Archive photos and the story of the family firm since 1935.
- Confirmed numbers: weddings, years, team size.
- Access to the Google Business Profile.
- Two or three landscape wedding films.

---

**Sources:** each site's own pages (fetched October 2026), WeddingWire India, WedMeGood, threebestrated.in, chdlife.com and shaandaarevents.com/top-10-wedding-planners-in-amritsar. The full URL list is in the research notes. Lighthouse runs used the same simulated phone for every site.
