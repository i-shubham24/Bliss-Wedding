// Copy for the eight ceremony pages at /ceremonies/[slug]. Names, colours and covers come from
// `ceremonies` in site.ts; everything here is page-only. Films are The Bliss's own YouTube Shorts,
// chosen from docs/research-youtube-videos.tsv, with covers in public/reels.

export type CeremonyFilm = { id: string; title: string };

export type CeremonyPage = {
  metaTitle: string;
  metaDescription: string;
  serviceType: string;
  lede: string;
  // Alt text for the ceremony's cover from site.ts, shown in the hero
  heroAlt: string;
  about: string[];
  facts: { label: string; value: string }[];
  setupIntro: string;
  setup: { title: string; text: string }[];
  // The large picture beside "What we set up"; it opens its film
  feature: CeremonyFilm & { alt: string };
  day: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  films: CeremonyFilm[];
};

const bookAhead =
  "For weddings between October and February, book four to six months ahead.";

export const ceremonyPages: Record<string, CeremonyPage> = {
  roka: {
    metaTitle: "Roka and Shagun decor and planning in Amritsar",
    metaDescription:
      "Roka and Shagun ceremonies in Amritsar, planned by The Bliss: shagun trays, intimate floral décor, family dining and a photo corner for the day two families say yes.",
    serviceType: "Roka and Shagun ceremony planning and décor",
    lede: "A small, warm function where two families become one and take their first photo together.",
    heroAlt: "A bride and groom surrounded by family and flowers, from a wedding planned by The Bliss",
    about: [
      "Roka comes from the Punjabi word for stop: once it is done, both families stop looking and the match is settled.",
      "The families exchange shagun, gifts that bless the match: sweets, dry fruits, clothes and envelopes for the couple. Many add the chunni ceremony, where the groom's side drapes a chunni over the bride's head, and some exchange rings the same day.",
    ],
    facts: [
      { label: "When", value: "Soon after the match is agreed" },
      { label: "Where", value: "At home, a Gurdwara or a family meal" },
      { label: "Who", value: "Parents, grandparents and the closest family" },
    ],
    setupIntro: "Roka décor should feel like home, only dressed up.",
    setup: [
      {
        title: "Shagun trays",
        text: "Trays for the sweets, dry fruits, clothes and gifts, dressed in fresh flowers.",
      },
      {
        title: "Intimate décor",
        text: "Fresh florals and soft light sized for a living room or a small hall.",
      },
      {
        title: "Family dining",
        text: "Food from our own kitchen, served where both families can sit and talk.",
      },
      {
        title: "Photo corner",
        text: "A floral corner for the first photo of both families, the one that ends up framed at home.",
      },
    ],
    feature: {
      id: "ihKvwwFAQEw",
      title: "Dreamy engagement décor",
      alt: "A tall arrangement of white and pink flowers at an engagement set up by The Bliss",
    },
    day: [
      {
        title: "We plan the space",
        text: "We agree where the families sit, where the trays go and where the photo is taken.",
      },
      {
        title: "Décor goes up",
        text: "Flowers, lights and seating are ready before the first relative rings the bell.",
      },
      {
        title: "The families meet",
        text: "Shagun is exchanged, then the chunni or the rings, while our team keeps the trays moving.",
      },
      {
        title: "Lunch or dinner",
        text: "The meal is served, and we take everything down after the last guest leaves.",
      },
    ],
    faqs: [
      {
        q: "How long before the wedding is the roka held?",
        a: "There is no fixed rule. Some families hold it within days of agreeing the match, others a few months before the wedding.",
      },
      {
        q: "Can the roka and the engagement be on the same day?",
        a: "Yes, many families combine them. We plan the roka rituals first and the rings after, with engagement décor such as roses and pearls by day or chandeliers in the evening.",
      },
      {
        q: "What should the families wear?",
        a: "Festive but comfortable. If your family does the chunni ceremony, choose a bridal outfit that sits well under a chunni.",
      },
      {
        q: "How far ahead should we book The Bliss?",
        a: `A roka on its own can be planned in a few weeks. ${bookAhead}`,
      },
    ],
    films: [
      { id: "ihKvwwFAQEw", title: "Dreamy engagement décor" },
      { id: "Xrod88N5H04", title: "Engagement décor for a ring ceremony" },
      { id: "PNI-EjlgqJI", title: "A unique engagement celebration" },
    ],
  },

  haldi: {
    metaTitle: "Haldi decor and planning in Amritsar",
    metaDescription:
      "Haldi and Maiyan ceremonies in Amritsar by The Bliss: sunflower, marigold and Krishna-themed décor, haldi kits, swings and seating, and dhol on cue.",
    serviceType: "Haldi ceremony décor and planning",
    lede: "The day the family covers the bride or groom in haldi, and usually each other too.",
    heroAlt: "White tuberoses, a mirror and candles at a Haldi set up by The Bliss",
    about: [
      "In Punjabi homes the Haldi is called Maiyan or Vatna. The women of the family rub vatna, a paste of turmeric, gram flour and mustard oil, on the bride's or groom's face, arms and feet.",
      "Turmeric is said to cleanse, bring a glow and keep away the evil eye. The elders sing folk songs while it goes on, and somebody always ends up with more haldi than they planned for.",
    ],
    facts: [
      { label: "When", value: "A day or two before the wedding" },
      { label: "Where", value: "Separately, at each family's home or venue" },
      { label: "Wear", value: "Yellow, or clothes you do not mind staining" },
    ],
    setupIntro: "Our Haldis are built around colour, like Trimeet and Nishtha's at Clubhouse Amritsar.",
    setup: [
      {
        title: "Sunflower and marigold décor",
        text: "Marigold strings, sunflowers and yellow florals, with lavender for a softer palette.",
      },
      {
        title: "Themed Haldis",
        text: "Like our Krishna-themed Haldi with lotus flowers, or a theme of your own.",
      },
      {
        title: "Haldi kits",
        text: "Haldi laid out and ready, so every aunty and cousin gets a turn.",
      },
      {
        title: "Swings and seating",
        text: "A swing or a dressed seat for the bride or groom, and shaded seating for guests, like the umbrellas of our Haldi Hues set-up.",
      },
    ],
    feature: {
      id: "KQLpEQij4SI",
      title: "Haldi décor by The Bliss",
      alt: "Yellow lounge seating under white umbrellas at a garden Haldi set up by The Bliss",
    },
    day: [
      {
        title: "Set-up",
        text: "We build the décor and lay out the haldi before the family comes down.",
      },
      {
        title: "The family gathers",
        text: "The elders sit first, then the bride or groom is brought to the haldi seat.",
      },
      {
        title: "Haldi and vatna",
        text: "The women of the family apply the paste in turn as the songs begin.",
      },
      {
        title: "Dhol and dancing",
        text: "Once everyone has had a turn, the dhol picks up and the Haldi becomes a party.",
      },
    ],
    faqs: [
      {
        q: "When is the Haldi held?",
        a: "Usually a day or two before the wedding, in the morning or early afternoon. The bride's and the groom's families each hold their own.",
      },
      {
        q: "Can you design a themed Haldi?",
        a: "Yes. Share your idea and we will make a moodboard for you to approve before anything is ordered.",
      },
      {
        q: "How far ahead should we book?",
        a: `${bookAhead} A Haldi on its own can be planned in a few weeks.`,
      },
    ],
    films: [
      { id: "gTVCSkNGHnQ", title: "Beauty of Haldi" },
      { id: "ddY_y9oNh-w", title: "A Krishna-themed Haldi" },
      { id: "HYsjJ5zGIFg", title: "Yellow Haldi décor" },
      { id: "KQLpEQij4SI", title: "Haldi décor by The Bliss" },
      { id: "b9rul3hn_90", title: "When your Haldi looked like this" },
      { id: "04Ai91QPy8w", title: "Yellow vibes, festive highs" },
    ],
  },

  mehndi: {
    metaTitle: "Mehndi decor and planning in Amritsar",
    metaDescription:
      "Mehndi functions in Amritsar by The Bliss: themed décor like our Leopard Club Mehndi at Maribella, live mehndi artists, lounge seating, live counters and music.",
    serviceType: "Mehndi ceremony décor and planning",
    lede: "A long afternoon or evening where the bride sits still and everyone else dances.",
    heroAlt: "A foliage wall with rattan chairs and pink cushions at a Mehndi seating corner by The Bliss",
    about: [
      "At the Mehndi, henna is drawn on the bride's hands and feet in fine patterns, and the women of the family have theirs done too. The groom's initials are often hidden in her design for him to find later.",
      "The old saying goes that the darker her mehndi, the more her mother-in-law will love her. Because the bride cannot move much while it dries, the party comes to her.",
    ],
    facts: [
      { label: "When", value: "A day or two before the wedding" },
      { label: "Who", value: "The bride, her family and her friends" },
      { label: "Wear", value: "Bright colours, often green" },
    ],
    setupIntro: "Every Mehndi starts with a theme, and the bride always gets the best seat.",
    setup: [
      {
        title: "Themed décor",
        text: "Full themes like The Leopard Club at Maribella, Amritsar, or a garden Mehndi with a foliage wall and rattan chairs.",
      },
      {
        title: "Mehndi artists",
        text: "Live mehndi artists for the bride and the guests, booked and scheduled by us.",
      },
      {
        title: "Lounge seating",
        text: "Low seating, cushions and swings where the bride can sit while her mehndi dries.",
      },
      {
        title: "Music for every aunty",
        text: "A DJ, dhol or live singers, with the old wedding songs for the elders.",
      },
    ],
    feature: {
      id: "sXkmPHJrUgI",
      title: "Apne hi rang mein mujhko rang de",
      alt: "A bride in green with mehndi on her hands and flower jewellery, laughing with family at her Mehndi",
    },
    day: [
      {
        title: "Artists in place",
        text: "The décor is ready and the artists are seated before guests arrive.",
      },
      {
        title: "The bride's mehndi",
        text: "Her design takes the longest, so it starts first.",
      },
      {
        title: "Guests take turns",
        text: "Family and friends sit with the artists while the counters open.",
      },
      {
        title: "Songs and dancing",
        text: "Once the bride's hands are done, the music takes over.",
      },
    ],
    faqs: [
      {
        q: "How long does the bride's mehndi take?",
        a: "A full bridal design on hands and feet takes several hours, depending on the design and the artist.",
      },
      {
        q: "Can the Mehndi share a day with another function?",
        a: "Yes. Many families hold the Mehndi in the afternoon and the Sangeet or the Jaggo at night, and we plan both.",
      },
      {
        q: "How far ahead should we book?",
        a: `${bookAhead} Good mehndi artists fill up fast in the season.`,
      },
    ],
    films: [
      { id: "8vAduTqpvPQ", title: "Mehndi décor" },
      { id: "sXkmPHJrUgI", title: "Apne hi rang mein mujhko rang de" },
    ],
  },

  jaggo: {
    metaTitle: "Jaggo night decor and planning in Amritsar",
    metaDescription:
      "Jaggo nights in Amritsar by The Bliss: lamp-lit pots, lantern lanes, heritage props, folk performers, dhol and boliyan, like our Noor Zora Jaggo night.",
    serviceType: "Jaggo night planning and décor",
    lede: "Lamps on the pot and the whole family dancing through the lanes.",
    heroAlt: "Family in Punjabi suits and phulkari dupattas at the Noor Zora Jaggo night",
    about: [
      "Jaggo means wake up. On a night just before the wedding, the maternal side of the family, the naanke, leads a procession of song and dance through the neighbourhood to tell everyone a wedding is coming.",
      "A maternal aunt carries the jaggo on her head: a brass or copper pot ringed with lit clay lamps. The group stops at the homes of relatives and neighbours to sing boliyan, dance and be welcomed with sweets.",
    ],
    facts: [
      { label: "When", value: "Late at night, a day or two before the wedding" },
      { label: "Who leads", value: "The maternal family, the naanke" },
      { label: "Wear", value: "Punjabi suits, phulkari and shoes you can dance in" },
    ],
    setupIntro: "A Jaggo needs a path to dance along and light to dance by. We build both.",
    setup: [
      {
        title: "Heritage props",
        text: "Decorated jaggo pots, phulkari and Punjabi details, as in our Noor Zora Jaggo.",
      },
      {
        title: "Lantern lanes",
        text: "Lanterns and lamps along the route, for the procession and for the photos.",
      },
      {
        title: "Folk performers",
        text: "Folk singers who know the boliyan and can lead the giddha when the family runs out of verses.",
      },
      {
        title: "Dhol and boliyan",
        text: "Dhol players who walk with the procession, and room at the end for a boliyan battle between the two sides.",
      },
    ],
    feature: {
      id: "Ew7xP7DkwK8",
      title: "A boliyan battle between the bride's and the groom's sides",
      alt: "Women in red and pink singing boliyan under a chandelier at a night function planned by The Bliss",
    },
    day: [
      {
        title: "The lamps are lit",
        text: "After dinner the jaggo pot is lit and the maternal aunt lifts it onto her head.",
      },
      {
        title: "The procession sets off",
        text: "Dhol in front, the family singing boliyan behind and our crew walking alongside.",
      },
      {
        title: "Stops along the way",
        text: "The group stops at relatives' homes, or around the venue, to dance and be welcomed.",
      },
      {
        title: "Giddha and bhangra",
        text: "At the end of the route the circle forms, and the dancing goes on late into the night.",
      },
    ],
    faqs: [
      {
        q: "When is the Jaggo held?",
        a: "Late at night, one or two nights before the wedding. It often follows the Maiyan or the Mehndi on the same day.",
      },
      {
        q: "Can we hold a Jaggo at a hotel or farmhouse?",
        a: "Yes. We plan a route around the venue with lantern lanes and stops, within the venue's rules on open flames and late music.",
      },
      {
        q: "How far ahead should we book?",
        a: `${bookAhead} Folk performers and dhol players are busy in the season.`,
      },
    ],
    films: [
      { id: "5iZPWPjAnDs", title: "Noor Zora, a Jaggo night" },
      { id: "Ew7xP7DkwK8", title: "A boliyan battle between the bride's and the groom's sides" },
    ],
  },

  sangeet: {
    metaTitle: "Sangeet and Sufi night decor and planning in Amritsar",
    metaDescription:
      "Sangeet and Sufi nights in Amritsar by The Bliss: stage and lighting, artists and DJ, choreography and sound, from the Ali Brothers live to our Sufi night at Clubhouse Gardens.",
    serviceType: "Sangeet and Sufi night planning and décor",
    lede: "Every sangeet we plan starts with a moodboard and ends on the dance floor.",
    heroAlt: "A Sufi night lounge under string lights and chandeliers, decorated by The Bliss",
    about: [
      "Sangeet means singing together. It began as an evening of folk songs, dholki and giddha for the women of the family, and today both families and all their friends join in.",
      "Many families add a Sufi night, or hold one instead: an evening of Sufi music and qawwali with live singers, where the crowd listens first and dances later.",
    ],
    facts: [
      { label: "When", value: "An evening a day or two before the wedding" },
      { label: "Who", value: "Both families and their friends" },
      { label: "Wear", value: "Your most festive outfit of the week" },
    ],
    setupIntro:
      "From the Ali Brothers live to our red-draped Sufi night at Clubhouse Gardens, we design the room around the music.",
    setup: [
      {
        title: "Stage and lighting",
        text: "A stage lit for dancing and photographs, like the red drapes, chandeliers and candle-lit trees of our Sufi nights.",
      },
      {
        title: "Artists and DJ",
        text: "Live singers, Sufi artists and DJs, booked and managed by us.",
      },
      {
        title: "Choreography",
        text: "Choreography for the family, so every performance is rehearsed.",
      },
      {
        title: "The couple's entry",
        text: "A planned entry for the two of you, like the Sufi entry in our films.",
      },
    ],
    feature: {
      id: "dyT6jQiPr3Q",
      title: "Sufi night décor at Clubhouse Gardens",
      alt: "Deep red drapes and crystal chandeliers at a Sufi night The Bliss designed at Clubhouse Gardens",
    },
    day: [
      {
        title: "Sound check",
        text: "Artists and sound are checked in the afternoon while the décor is finished.",
      },
      {
        title: "Your entry",
        text: "Guests arrive, and the two of you walk in to the entry we planned together.",
      },
      {
        title: "Family performances",
        text: "Performances run to a set order, with our team cueing each one.",
      },
      {
        title: "Live music, then the floor",
        text: "The artists or the DJ take over, as late as the venue allows.",
      },
    ],
    faqs: [
      {
        q: "How early should we start on the family dances?",
        a: "Give choreography a few weeks, and more for big group dances.",
      },
      {
        q: "Can you book Sufi singers and other artists?",
        a: "Yes. Tell us who you would love to hear and we will check their dates.",
      },
      {
        q: "How far ahead should we book?",
        a: `${bookAhead} Popular artists get booked early, so share your wish list as soon as you have dates.`,
      },
    ],
    films: [
      { id: "i3wfsnt37SM", title: "The Ali Brothers live at a Sufi night" },
      { id: "dyT6jQiPr3Q", title: "Sufi night décor at Clubhouse Gardens" },
      { id: "WuyRfpRnGi4", title: "Sufi night décor by The Bliss" },
      { id: "xVevLfMLZqw", title: "Mehfil-e-Sufi" },
      { id: "VB4R2x-S7SI", title: "The Sufi entry we dreamt about" },
      { id: "QIqQe-IC2r4", title: "Sangeet décor moodboard" },
    ],
  },

  chooda: {
    metaTitle: "Chooda and Kaleere ceremony decor in Amritsar",
    metaDescription:
      "Chooda and Kaleere ceremonies in Amritsar by The Bliss: bangle ceremony décor, bridal entry, ritual set-up and candid corners, like Kirat's butterfly garden at voco Amritsar.",
    serviceType: "Chooda and Kaleere ceremony décor and planning",
    lede: "Her mama brings the red bangles, and her sisters tie on the kaleere.",
    heroAlt: "The butterfly garden welcome The Bliss designed for Kirat's bangle ceremony at voco Amritsar",
    about: [
      "The chooda is a set of red and ivory bangles from the bride's maternal uncle, her mama. It is washed in milk and water with rose petals, then her mama and mami slide it onto her wrists, often while she keeps her eyes closed.",
      "Her sisters, cousins and friends then tie on kaleere, golden umbrella-shaped ornaments that chime as she moves. Later she shakes them over the heads of unmarried girls, and if a piece falls on one of them, she is said to be the next to marry.",
    ],
    facts: [
      { label: "When", value: "The wedding morning, or the evening before" },
      { label: "Who", value: "The bride's mama and mami, then her sisters and friends" },
      { label: "Where", value: "At the bride's home or venue" },
    ],
    setupIntro: "The chooda gets a set of its own, even on a morning that is already full.",
    setup: [
      {
        title: "Bangle ceremony décor",
        text: "From fresh florals to a full theme, like the butterfly garden we created for Kirat at voco Amritsar.",
      },
      {
        title: "Bridal entry",
        text: "A walk-in for the bride, timed so the photographers are ready for it.",
      },
      {
        title: "Ritual set-up",
        text: "A seat for the bride, the bowl for washing the chooda and room for the women of the family.",
      },
      {
        title: "The kaleera moment",
        text: "Room for the kaleera ritual with the unmarried girls, and spots for candid photos of every reaction.",
      },
    ],
    feature: {
      id: "HUv-5NOVPVo",
      title: "One kaleera moment, so many different reactions",
      alt: "A bride in red with her chooda and kaleere, surrounded by family at her kaleera ceremony",
    },
    day: [
      {
        title: "Early set-up",
        text: "We set up early, since the chooda often begins the wedding day.",
      },
      {
        title: "Mama and mami",
        text: "Her maternal uncle and aunt put the chooda on, with the family close around her.",
      },
      {
        title: "Kaleere",
        text: "Sisters, cousins and friends tie the kaleere to her bangles.",
      },
      {
        title: "On to the wedding",
        text: "We keep the morning on time, so the bride can get ready for the Anand Karaj or the pheras.",
      },
    ],
    faqs: [
      {
        q: "When is the chooda ceremony held?",
        a: "Usually on the wedding morning, a few hours before the Anand Karaj or the pheras. Some families hold it the evening before so the morning is less rushed.",
      },
      {
        q: "How long does a bride wear her chooda?",
        a: "Customs differ by family. Traditionally a bride wore it for up to a year, and today most wear it for around forty days.",
      },
      {
        q: "What should the bride wear for the chooda?",
        a: "Something simple that leaves her wrists free. Many brides choose a light outfit and change for the wedding afterwards.",
      },
    ],
    films: [
      { id: "BhEG_akVTu0", title: "A fairytale garden lit by butterflies" },
      { id: "HUv-5NOVPVo", title: "One kaleera moment, so many different reactions" },
    ],
  },

  "anand-karaj": {
    metaTitle: "Anand Karaj set up and planning in Amritsar",
    metaDescription:
      "Anand Karaj set-ups in Amritsar by The Bliss, from open grounds to Ranjit Vilas: Akhand Path arrangements at home, guest flow and langar, coordinated calmly with your Gurdwara.",
    serviceType: "Anand Karaj set-up and Gurdwara coordination",
    lede: "The Sikh wedding, in the presence of Guru Granth Sahib Ji, planned with the care it asks for.",
    heroAlt: "A floral canopy under a blue sky at an Anand Karaj set up by The Bliss",
    about: [
      "Anand Karaj means blissful union. The families sit together in the sangat, the Ardas is offered, and the bride's father places one end of the groom's palla, his scarf, in her hand.",
      "At its heart are the four laavan, hymns composed by Guru Ram Das Ji on Ang 773 and 774 of Guru Granth Sahib Ji. Each laav is read and then sung by the ragis while the couple walks clockwise around Guru Granth Sahib Ji, joined by the palla.",
    ],
    facts: [
      { label: "When", value: "Usually the morning of the wedding day" },
      { label: "Where", value: "A Gurdwara, or a place agreed with your Gurdwara" },
      { label: "Wear", value: "Modest clothes, heads covered, shoes off" },
    ],
    setupIntro:
      "From open grounds to Ranjit Vilas, we take care of the arrangements so your family's attention stays on the laavan.",
    setup: [
      {
        title: "Anand Karaj set-up",
        text: "Floral canopies, chandeliers and fresh flowers, planned with your Gurdwara so everything near Guru Granth Sahib Ji is done with respect.",
      },
      {
        title: "Akhand Path arrangements",
        text: "Décor, seating and hospitality for an Akhand Path, Sukhmani Sahib Path or kirtan at home.",
      },
      {
        title: "Guest flow",
        text: "Arrivals, the Milni, shoes, seating and the bride's walk-in, planned so the ceremony starts on time.",
      },
      {
        title: "Langar coordination",
        text: "Langar worked out with the Gurdwara, or a meal at your venue from our catering team.",
      },
    ],
    feature: {
      id: "8Sx8MKUK0Uo",
      title: "Anand Karaj décor under a floral canopy",
      alt: "A floral canopy with a crystal chandelier, set up by The Bliss for an Anand Karaj",
    },
    day: [
      {
        title: "The Milni",
        text: "After an Ardas, the two families meet at the entrance and the senior relatives exchange garlands.",
      },
      {
        title: "Into the darbar",
        text: "Guests cover their heads, leave their shoes and sit with the sangat.",
      },
      {
        title: "The four laavan",
        text: "Each laav is read and sung as the couple completes each round.",
      },
      {
        title: "Karah Prashad and langar",
        text: "Anand Sahib, the Ardas and the Hukamnama close the ceremony, then Karah Prashad is shared before langar.",
      },
    ],
    faqs: [
      {
        q: "What time is the Anand Karaj held?",
        a: "Traditionally in the morning. Your Gurdwara will confirm the time, and we plan the rest of the day around it.",
      },
      {
        q: "How do you coordinate with the Gurdwara?",
        a: "Once your family has fixed the date with the Gurdwara, we handle the timings, décor, the Milni, seating and langar, all within the Gurdwara's maryada.",
      },
      {
        q: "What should guests wear to an Anand Karaj?",
        a: "Modest clothes and a head covering for everyone, men and women. Guests sit on the floor, and alcohol and tobacco are not allowed.",
      },
      {
        q: "Can you arrange an Akhand Path at home before the wedding?",
        a: "Yes. An Akhand Path is an unbroken reading of Guru Granth Sahib Ji over about two days, and we plan décor, seating and hospitality for the sangat throughout.",
      },
    ],
    films: [
      { id: "tV72Lhqt37s", title: "Satnam Waheguru, an Anand Karaj set-up by The Bliss" },
      { id: "8Sx8MKUK0Uo", title: "Anand Karaj décor under a floral canopy" },
      { id: "NppL64JiPa0", title: "Anand Karaj, a Sikh wedding" },
      { id: "QsdfCqUsstg", title: "Anand Karaj décor" },
      { id: "hHIzT9IPI9A", title: "The bride at her Anand Karaj" },
      { id: "1x3N5LurFfc", title: "Akhand Sahib Path" },
    ],
  },

  reception: {
    metaTitle: "Reception and cocktail party decor in Amritsar",
    metaDescription:
      "Wedding receptions and cocktail nights in Amritsar by The Bliss: stage and entry, bar and menus, lighting design, DJ and band, white and gold evenings and chandeliers.",
    serviceType: "Wedding reception and cocktail party planning and décor",
    lede: "After a week of rituals, the nights that are simply a party.",
    heroAlt: "Hanging white florals and candles in luxury wedding décor by The Bliss",
    about: [
      "The reception is the first party the couple attends as husband and wife. In many Punjabi families the groom's side hosts it after the wedding to introduce the bride to their wider circle, and others hold one with the bride's family.",
      "The cocktail party is its younger cousin: a night for the couple, their friends and the cousins, often before the wedding, with music, a bar and very little ceremony.",
    ],
    facts: [
      { label: "When", value: "Reception after the wedding, cocktails often before" },
      { label: "Who", value: "Both families, friends and the wider circle" },
      { label: "Wear", value: "Evening wear, from lehengas and gowns to tuxedos" },
    ],
    setupIntro: "White and gold evenings, chandeliers and cocktail nights at 5 States Resort.",
    setup: [
      {
        title: "Stage and entry",
        text: "A stage for the couple and a planned entry, like the couple reveal in our films.",
      },
      {
        title: "Bar and menus",
        text: "Bar and mocktail counters, live food stations and Punjabi, Indian and continental menus.",
      },
      {
        title: "Lighting design",
        text: "Chandeliers, candlelight and hanging florals for a white and gold evening, or club lighting for the after party.",
      },
      {
        title: "DJ and band",
        text: "A DJ, a live band or both, and an after-party crew like the Bang Dudes in our films.",
      },
    ],
    feature: {
      id: "p0loARhr2ZU",
      title: "That perfect couple reveal",
      alt: "A couple in evening wear making their entry at a reception planned by The Bliss",
    },
    day: [
      {
        title: "Final checks",
        text: "Lights, sound and the bar are checked before the doors open.",
      },
      {
        title: "Guests arrive",
        text: "Welcome drinks and starters while the families greet their guests.",
      },
      {
        title: "The entry",
        text: "The couple makes their entry and takes the stage as dinner opens.",
      },
      {
        title: "The dance floor",
        text: "The DJ or the band takes over, as late as the venue allows.",
      },
    ],
    faqs: [
      {
        q: "Should the reception be on the wedding day?",
        a: "Both work. A same-day reception keeps guests in one place, and one a day or two later gives the families a breather.",
      },
      {
        q: "Can the cocktail night and the reception be at different venues?",
        a: "Yes. Each night gets its own design, and our crew runs both.",
      },
      {
        q: "How far ahead should we book?",
        a: `${bookAhead} A cocktail night on its own can be planned in a few weeks.`,
      },
    ],
    films: [
      { id: "DZPSa6oHG0g", title: "Luxury wedding décor by The Bliss" },
      { id: "p0loARhr2ZU", title: "That perfect couple reveal" },
      { id: "fkW8v1KOHXc", title: "After-party scenes with the Bang Dudes" },
    ],
  },
};

export function getCeremonyPage(slug: string): CeremonyPage | undefined {
  return Object.hasOwn(ceremonyPages, slug) ? ceremonyPages[slug] : undefined;
}
