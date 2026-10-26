# The Bliss: QA results and improvement plan

Date: 26 Oct 2026. Scope: the Next.js home page in this repo. The plan is a proposal; nothing in it is built yet.

---

## 1. QA results

**Setup:** a headless Chrome suite (68 checks) against the production build.
- Screens: desktop at 1536 x 712 (the client's laptop at 125% scaling), phone at 390 x 844 with touch, and the 384 x 506 DevTools size.
- Also tested: reduced motion and keyboard use.

**Result: 66 of 68 pass.** The two remaining are not site bugs:
- The loader takes about 9 s in headless Chrome. That includes 3.5 s of software shader compiling, which a real GPU does in a fraction of a second.
- Two requests fail inside YouTube's own player (a channel avatar and a font). They are cancelled when the player closes.

**What passes:**
- **Every film trigger** (hero link, story, diary tile, ceremony link, highlight circle, reel card, testimonial) opens the player. Escape, the close button and a click outside all close it.
- **The diary tiles without a film** open the Instagram post.
- **All five nav links and "Back to the top"** land in the right place, including the end of the red-circle fly-through.
- **The ceremonies strip** pins and travels its full length, with the colour changing along the way.
- **The services and FAQ accordions** start closed and open one row at a time.
- **The review dots** switch the Google quote.
- **The destinations** switch both picture and text.
- **Plan form:**
  - Functions hide for corporate events and return for weddings.
  - The summary follows every choice.
  - An empty submit flags both fields and focuses the first.
  - A valid submit opens WhatsApp with the whole plan.
- **Floating WhatsApp button:** hidden on the hero and the close, shown in between.
- **Nav colour:** switches between ink and white with the ground under it.
- **Phone:** text, then rings, then "Bliss"; the ring fly-through and red circle; the menu opens, links scroll and the menu closes; no sideways scroll; process steps no longer overlap.
- **Short 384 x 506 screen:** the headline clears the nav.
- **Reduced motion:** no loader, no pins, all content and the story headline visible.
- **Keyboard:** the first Tab lands on "Skip to content".
- **Page-wide checks:** no broken images, no dead in-page links, external links open safely, phone, email and WhatsApp links are correct, every control has a name, one h1, no duplicate ids.

**Bugs found and fixed in this pass:**

| Bug | Fix |
|---|---|
| "Back to the top" and the logo landed at the end of the hero pin, not the top | `#top` always scrolls to 0 |
| "Story" link landed in the wrong place | Anchors can now target the end of a pinned scene |
| Phone menu links closed the menu but did not scroll | Smooth scroll is forced past the menu's pause |
| A chosen review quote flipped back within seconds | The rotation timer restarts after every change |
| Reduced motion on desktop showed no story headline | Conflicting rules fixed |
| The menu button pointed at a menu that is not there when closed | `aria-controls` only while open |
| Ceremonies strip could release early after late layout changes | Pins are measured top-down and again when the height changes |
| Loader stuttered | It waits for the 3D shaders to compile, then plays. The cover circle scales instead of repainting. It is about a second shorter. Measured: 0 slow frames, worst frame 17 ms |
| White labels on red failed contrast | Full white on red |
| Review dots were too small to tap | 24 px target |
| "Call us" button's spoken name did not match its text | Name now contains the visible words |
| Some images repeated their own captions to screen readers | Those images are marked decorative |
| Logo and thumbnails were heavier than needed | WebP logo at 96 and 320 px; a 240 px size for thumbnails |

**Lighthouse (production, before the fixes above):**

| | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Phone | 41 | 93 | 100 | 100 |
| Desktop | 56 | 93 | 100 | 100 |

Load is fast (desktop LCP 1.4 s, CLS about 0). The low performance score is almost entirely main-thread blocking: about 4.5 s on desktop and 14 s on a throttled phone. Two causes:
- **Start-up animation setup:** about 40 scroll animations and the text splitting, all built at once.
- **The 3D chooda:** lacquer materials are expensive to compile and to render, especially without a GPU.

---

## 2. Improvement plan

Priorities: **P0** before the client demo or launch, **P1** in the build phase, **P2** later.

### P0. Speed (target: Lighthouse phone 80+, desktop 90+)

1. **A poster for the chooda.**
   - Show a still render (transparent WebP, phone and desktop crops) at first paint.
   - Start the live 3D on the first scroll, touch or pointer move, or when the browser is idle.
   - The swap is invisible because the poster is the scene's first frame.
2. **A lighter material on weaker devices.** Use standard material instead of clearcoat lacquer when `deviceMemory` is 4 or less, `hardwareConcurrency` is 4 or less, or the first frames run slow. Cap the pixel ratio at 1 on phones.
3. **Build scroll animations only when needed.**
   - Use `ScrollTrigger.batch` for the many "rise in" entrances.
   - Create each section's triggers only as it comes within one screen.
   - Replace the hero's SplitText with a CSS line reveal.
4. **Ship less JavaScript.**
   - Server Components: Signature, Process, Destinations and the footer are mostly static.
   - Interactive parts become small client islands: accordions, reel rail, plan form, player.
   - Lighthouse estimates 200 KB of unused JS.
5. **Images.** AVIF with a WebP fallback, blur placeholders, `priority` for the first screen, and a correct `sizes` on every grid (Lighthouse found 170 to 940 KB of oversized images).

### P0. Content and trust (needs the client)

- **Confirm or replace:** the 600+ weddings figure, the 1935 story and the generation count, and written OK for Abhishek Sharma's name and photo. Also which people are Komal Sharma and Lovish Oberoi in the family photo, so they can be named.
- **Real portraits** of Ginni Grover and Jaskirat Singh, plus 10 to 20 professional photos and two or three full films in landscape. Reels covers carry Instagram text and phone framing, which limits big hero use.
- **Verbatim reviews** with permission (names, photos), and the vector logo.

### P1. Design moves from the references, adapted to our system

| Reference | Idea | Our version |
|---|---|---|
| Wedify (full-bleed photo, giant wordmark, script names on the image, curved edge) | Cinematic hero option | A/B a muted loop of the client's best wedding film behind the chooda, with the couple's names set over it. A curved bottom edge on the hero that echoes the bangle |
| Wedify (rotating "Specialize in" badge) | Small circular brand mark | A slow-spinning ring reading "Since 1935, four generations, Amritsar", only by the hero button, only on desktop |
| Peno Lab (polaroids, filmstrip, year markers, tilted-print collage CTA) | Warmth and recency | A horizontal "Moments" filmstrip under the story that drifts with scroll speed. Year tags (2025, 2026) on diary tiles. A collage of three tilted real prints in the closing section |
| Recent Works bento (arches, category and year, arrow buttons) | Filterable portfolio | Filter chips (All, Weddings, Mehndi, Haldi, Sufi, Showers) above the diary bento, with tiles re-flowing smoothly |
| BV Luxury Italy (press strip, testimonial cards, destination strips) | Proof and places | A "Celebrity approved" strip (Abhishek Sharma's family, Amrita Kaur, the MLA and Mayor functions) that becomes a press strip as coverage arrives. A photo strip per destination |
| Knurl Gym (page transitions, detail pages, live status) | Multi-page polish | The red bangle-circle wipe as the route transition between pages. Case-study and ceremony pages. The live "open now" line, already in the footer, reused in the nav on mobile |

### P1. Pages and features

- **Wedding case studies** (`/weddings/komal-sharma`, `/weddings/amrita-kaur` …): story, gallery, film, credits, vendors.
- **Ceremony pages** (`/ceremonies/haldi` …): looks, what is included, films, FAQs. They also carry local SEO ("Haldi decor in Amritsar").
- **A real enquiry pipeline:** Server Action to email (Resend), a Google Sheet or CRM row, then WhatsApp. Add spam protection and a thank-you state that analytics can track.
- **"Is my date free?"** A date picker that pre-fills the WhatsApp message. It can show the busy season.
- **Budget guide:** guests times functions gives an indicative range, once the client shares pricing bands.
- **Live Instagram:** the diary grid pulls the latest posts through the Instagram Graph API with the client's token.
- **Languages:** an English, Punjabi (Gurmukhi) and Hindi toggle for headings and key copy.

### P2. Quality and launch

- **Accessibility:**
  - Focus styles inside the reel rail and bento.
  - Announce the plan summary politely only after typing stops.
  - Captions or transcripts for the testimonial films.
- **Real devices:** iPhone Safari (pins and `svh`), a low-end Android (3D fallback), Windows at 125% and 150% scaling, and a 4K screen.
- **Monitoring:** Vercel Analytics and Speed Insights, GA4 and Meta Pixel lead events, Search Console, and the domain linked from the Google Business Profile.
- **Content:** a CMS (Sanity) so the team can add weddings, films and reviews without a developer.
