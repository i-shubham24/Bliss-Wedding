// All client copy and media lives here, so the client team can review one file.
// Pictures in /public/reels are covers of The Bliss's own YouTube Shorts and pictures in
// /public/insta are from @thebliss.weddingcompany. Unsplash photos remain only where
// The Bliss has no picture of its own yet (food, Goa, Jaipur, Jammu).

export const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=70`;
export const reelCover = (id: string) => `/reels/${id}.jpg`;
export const insta = (code: string) => `/insta/${code}.jpg`;

export const P = {
  goldenTemple: "photo-1623059508779-2542c6e83753",
  thali: "photo-1565556250026-9ba22083e3e0",
  beachArch: "photo-1744805624890-9931ebb50428",
  jalMahal: "photo-1661924326425-c14a6426d989",
  lakeCouple: "photo-1612883809638-9314edb33efb",
} as const;

export const site = {
  name: "The Bliss",
  legalName: "THE BLISS® Events & Dream Wedding Planner",
  tagline: "Creating moments. Designing dreams. Celebrating love.",
  founded: 1935,
  phone: "+91 78888 54618",
  phoneHref: "tel:+917888854618",
  whatsapp: "917888854618",
  email: "hellothebliss@gmail.com",
  address: {
    line1: "30, Race Course Road",
    line2: "Near Adlakha Hospital, Shastri Nagar",
    city: "White Avenue, Amritsar, Punjab 143001",
    maps: "https://www.google.com/maps/search/?api=1&query=THE+BLISS+Events+%26+Wedding+Planner+30+Race+Course+Road+Amritsar",
  },
  hours: "Open every day, 10 am to 7 pm",
  social: {
    instagram: "https://www.instagram.com/thebliss.weddingcompany/",
    instagramPlanning: "https://www.instagram.com/thebliss.weddingplanners/",
    youtube: "https://www.youtube.com/@theblissweddingcompany",
    facebook: "https://www.facebook.com/p/The-Bliss-A-complete-wedding-company-61576910285623",
  },
  founders: "Ginni Grover & Jaskirat Singh",
};

export const nav = [
  { label: "Story", href: "#story" },
  { label: "Weddings", href: "#weddings" },
  { label: "Ceremonies", href: "#ceremonies" },
  { label: "Services", href: "#services" },
  { label: "Films", href: "#films" },
];

export const hero = {
  welcome: "ਜੀ ਆਇਆਂ ਨੂੰ",
  title: "Four generations of Punjabi weddings",
  intro:
    "We plan, design, cater and run every function of your wedding, from our studio in Amritsar.",
  film: { id: "5FieC0YimGs", title: "Komal Sharma and Lovish Oberoi's wedding, planned and designed by The Bliss" },
};

export const legacy = {
  title: "Since 1935, in Amritsar",
  statement:
    "A 91-year-old family firm, rebranded as The Bliss by its fourth generation. We plan every wedding the way we would plan our own.",
  timeline: [
    { when: "1935", text: "A family firm opens in Amritsar." },
    { when: "Four generations", text: "The craft and the care, handed down." },
    { when: "Today", text: "Ginni Grover and Jaskirat Singh lead The Bliss, with a planning team and an in-house décor studio." },
  ],
  // Counters shown top right of the story. 600+ is the owner's own figure (WeddingBazaar); confirm before launch.
  counters: [
    { value: 91, suffix: "", label: "years in Amritsar" },
    { value: 600, suffix: "+", label: "weddings and events" },
    { value: 285, suffix: "", label: "family reviews" },
    { value: 34, suffix: "K", label: "on Instagram" },
  ],
};

export type Story = {
  slug: string;
  couple: string;
  headline: string;
  when: string;
  story: string[];
  facts: { label: string; value: string }[];
  words?: string;
  badge?: string;
  images: { src: string; alt: string }[];
  film: { id: string; title: string };
};

// The two weddings The Bliss itself leads with on Instagram
export const stories: Story[] = [
  {
    slug: "komal-lovish",
    couple: "Komal Sharma & Lovish Oberoi",
    headline: "The wedding of cricketer Abhishek Sharma's sister",
    when: "Amritsar, 3 October 2025",
    story: [
      "When Komal Sharma, sister of India opener Abhishek Sharma, married Lovish Oberoi in a traditional Sikh ceremony, the family trusted The Bliss with the planning and the décor.",
      "Guests walked in through an entrance lined with sunflowers, and our team ran every function so the family could simply enjoy it.",
    ],
    facts: [
      { label: "Ceremony", value: "Sikh wedding in Amritsar" },
      { label: "What we did", value: "Planning and décor" },
      { label: "Date", value: "3 October 2025" },
    ],
    words: "Honoured to plan and design the wedding of cricketer Abhishek Sharma's sister. A Bliss signature wedding.",
    badge: "Cricketer Abhishek Sharma",
    images: [
      { src: insta("DSFzbemk84V"), alt: "Cricketer Abhishek Sharma in India colours, from The Bliss's post on his sister's wedding" },
      { src: reelCover("5FieC0YimGs"), alt: "The sunflower entrance The Bliss designed for Komal Sharma's wedding" },
      { src: insta("DWJyqzGk-hh"), alt: "The family at Komal Sharma's wedding, from The Bliss's post" },
    ],
    film: { id: "5FieC0YimGs", title: "Komal Sharma's wedding, sister of Abhishek Sharma" },
  },
  {
    slug: "amrita-gurpal",
    couple: "Amrita Kaur & Gurpal",
    headline: "Singer Amrita Kaur's wedding, the one everyone talked about",
    when: "Punjab, 2026",
    story: [
      "For singer Amrita Kaur and Gurpal, we handled the planning, the décor and the catering.",
      "Gold drapes and red roses framed the couple, with ਦਿਲਾਂ ਨੂੰ ਦਿਲਾਂ ਦੇ ਰਾਹ (hearts find their way to hearts) written into the day.",
    ],
    facts: [
      { label: "Ceremony", value: "Punjabi wedding" },
      { label: "What we did", value: "Planning, décor and catering" },
      { label: "Look", value: "Gold drapes, red roses" },
    ],
    images: [
      { src: reelCover("mDM3ukOXPOY"), alt: "Red roses and gold drapes at Amrita and Gurpal's wedding" },
      { src: insta("DezB8LZTDjN"), alt: "Amrita Kaur singing at her wedding celebration" },
    ],
    film: { id: "mDM3ukOXPOY", title: "Singer Amrita Kaur's wedding celebration" },
  },
];

export type Diary = { title: string; line: string; img: string; reel?: string; link?: string };

// More real celebrations, each from The Bliss's own posts and films
export const diary: Diary[] = [
  { title: "Kirat's butterfly garden", line: "Bangle ceremony at voco Amritsar", img: insta("DeweB5cTWRG"), reel: "BhEG_akVTu0" },
  { title: "The Leopard Club", line: "A wild, themed Mehndi at Maribella, Amritsar", img: insta("DehZ1UPEyiM"), link: "https://www.instagram.com/p/DehZ1UPEyiM/" },
  { title: "Ali Brothers, live", line: "A Sufi night the family still sings about", img: reelCover("i3wfsnt37SM"), reel: "i3wfsnt37SM" },
  { title: "Noor Zora", line: "A Jaggo night of Punjabi heritage", img: reelCover("5iZPWPjAnDs"), reel: "5iZPWPjAnDs" },
  { title: "Akhand Path Sahib", line: "A beginning at home, under Waheguru ji's grace", img: insta("Dd86mrPE4Qj"), reel: "1x3N5LurFfc" },
  { title: "Shreenath ji mandap", line: "A Krishna-themed wedding mandap", img: reelCover("VGrbu6pD4I4"), reel: "VGrbu6pD4I4" },
  { title: "Home from New York", line: "An NRI family's wedding in Amritsar", img: reelCover("5EkS-MUSrno"), reel: "5EkS-MUSrno" },
  { title: "A Bridgerton bridal shower", line: "For the bestie, before she became a wifey", img: insta("DeRjOq6zL3O"), link: "https://www.instagram.com/p/DeRjOq6zL3O/" },
  { title: "White and gold", line: "Candlelight, lamps and soft florals as the evening set in", img: insta("DdowF8sE0Rv"), link: "https://www.instagram.com/p/DdowF8sE0Rv/" },
];

export type Ceremony = {
  slug: string;
  name: string;
  pa: string;
  aka: string;
  color: string;
  deep: string;
  tint: string;
  copy: string;
  bring: string[];
  img: string;
  reel?: { id: string; title: string };
};

export const ceremonies: Ceremony[] = [
  {
    slug: "roka",
    name: "Roka & Shagun",
    pa: "ਰੋਕਾ ਤੇ ਸ਼ਗਨ",
    aka: "The families say yes",
    color: "#C2456A",
    deep: "#9E2F52",
    tint: "#F8E4E8",
    copy: "The first yes. Shagun trays, a floral corner for the first family photo and food the elders will remember.",
    bring: ["Shagun trays", "Intimate décor", "Family dining", "Photo corner"],
    img: reelCover("s5A1YW8UGww"),
    reel: { id: "s5A1YW8UGww", title: "What winning in life looks like" },
  },
  {
    slug: "haldi",
    name: "Haldi",
    pa: "ਹਲਦੀ",
    aka: "Maiyan and vatna",
    color: "#EFA11B",
    deep: "#A86400",
    tint: "#FDF0D6",
    copy: "Sunflower, marigold and lavender Haldis, like Trimeet and Nishtha's at Clubhouse Amritsar. Yellow everywhere, stress nowhere.",
    bring: ["Sunflower and marigold décor", "Haldi kits", "Swings and seating", "Dhol on cue"],
    img: reelCover("gTVCSkNGHnQ"),
    reel: { id: "gTVCSkNGHnQ", title: "Beauty of Haldi" },
  },
  {
    slug: "mehndi",
    name: "Mehndi",
    pa: "ਮਹਿੰਦੀ",
    aka: "Henna, songs and swings",
    color: "#5E7B2F",
    deep: "#46601F",
    tint: "#E9EFDD",
    copy: "From our Leopard Club Mehndi at Maribella to garden afternoons, with live mehndi artists and music for every aunty.",
    bring: ["Themed décor", "Mehndi artists", "Lounge seating", "Live counters"],
    img: insta("DehZ1UPEyiM"),
    reel: { id: "fZAcB4YCMFo", title: "A Mehndi function by The Bliss" },
  },
  {
    slug: "jaggo",
    name: "Jaggo",
    pa: "ਜਾਗੋ",
    aka: "The night the house stays awake",
    color: "#C4621D",
    deep: "#9A4710",
    tint: "#F8E6D8",
    copy: "Lamp-lit pots, folk songs and the whole family dancing through the night, like our Noor Zora Jaggo.",
    bring: ["Heritage props", "Lantern lanes", "Folk performers", "Dhol and boliyan"],
    img: reelCover("5iZPWPjAnDs"),
    reel: { id: "5iZPWPjAnDs", title: "Noor Zora, a Jaggo night" },
  },
  {
    slug: "sangeet",
    name: "Sangeet & Sufi Night",
    pa: "ਸੰਗੀਤ",
    aka: "Music for the soul",
    color: "#2D2F6A",
    deep: "#2D2F6A",
    tint: "#E3E3F1",
    copy: "From the Ali Brothers live to a Sufi night at Clubhouse Gardens. Every sangeet starts with a moodboard and ends on the dance floor.",
    bring: ["Stage and lighting", "Artists and DJ", "Choreography", "Sound"],
    img: reelCover("WuyRfpRnGi4"),
    reel: { id: "i3wfsnt37SM", title: "The Ali Brothers live at a Sufi night" },
  },
  {
    slug: "chooda",
    name: "Chooda & Kaleere",
    pa: "ਚੂੜਾ ਤੇ ਕਲੀਰੇ",
    aka: "Where every bride begins",
    color: "#D7262B",
    deep: "#B51D22",
    tint: "#FBE2E1",
    copy: "Kirat's bangle ceremony at voco Amritsar became a garden of butterflies. The chooda moment gets a set of its own.",
    bring: ["Bangle ceremony décor", "Bridal entry", "Ritual set-up", "Candid corners"],
    img: reelCover("BhEG_akVTu0"),
    reel: { id: "BhEG_akVTu0", title: "A fairytale garden lit by butterflies" },
  },
  {
    slug: "anand-karaj",
    name: "Anand Karaj",
    pa: "ਅਨੰਦ ਕਾਰਜ",
    aka: "Four laavan, one blessing",
    color: "#B8893E",
    deep: "#80601F",
    tint: "#F5EBD9",
    copy: "Akhand Path at home, Anand Karaj set-ups from open grounds to Ranjit Vilas, and calm coordination with the Gurdwara.",
    bring: ["Anand Karaj set-up", "Akhand Path arrangements", "Guest flow", "Langar coordination"],
    img: reelCover("tV72Lhqt37s"),
    reel: { id: "tV72Lhqt37s", title: "Our Anand Karaj set-up" },
  },
  {
    slug: "reception",
    name: "Reception & Cocktails",
    pa: "ਜਸ਼ਨ",
    aka: "The grand finale",
    color: "#1F1414",
    deep: "#1F1414",
    tint: "#EDE6E2",
    copy: "White and gold evenings, chandeliers, cocktail nights at 5 States Resort and a stage for the grand entry.",
    bring: ["Stage and entry", "Bar and menus", "Lighting design", "DJ and band"],
    img: reelCover("DZPSa6oHG0g"),
    reel: { id: "DZPSa6oHG0g", title: "Luxury wedding décor by The Bliss" },
  },
];

export const services = [
  {
    title: "Wedding planning & on-site management",
    line: "One team, one timeline, one phone number for every vendor.",
    points: ["Budgets and timelines", "Vendor sourcing and negotiation", "Event flow and run-sheets", "Help desk at every function"],
    img: reelCover("3T18KgE4Ntk"),
  },
  {
    title: "Décor & design",
    line: "Our own décor studio builds stages, mandaps, entrances and full themes.",
    points: ["Concepts and moodboards", "Stage, mandap and Anand Karaj set-ups", "Fresh florals and lighting", "Themed décor"],
    img: reelCover("DZPSa6oHG0g"),
  },
  {
    title: "Catering & bar",
    line: "Punjabi, Indian and continental menus with live counters.",
    points: ["Custom menus and tastings", "Live food stations", "Bar and mocktail counters", "Service staff"],
    img: photo(P.thali),
  },
  {
    title: "Music & entertainment",
    line: "DJs, dhol, live singers, Sufi nights and sangeet choreography.",
    points: ["DJ and sound", "Artists and Sufi nights", "Sangeet choreography", "Baraat band and dhol"],
    img: reelCover("Ew7xP7DkwK8"),
  },
  {
    title: "Photography & films",
    line: "Our team films the reels on this page and manages your photographers.",
    points: ["Photographer matching", "Shot lists and timelines", "Candid and cinematic films", "Reels for the couple"],
    img: reelCover("ica1cBZaLDM"),
  },
  {
    title: "Hospitality & guest logistics",
    line: "Hotels, transfers and welcome desks, including for NRI families.",
    points: ["Hotel blocks", "Airport and guest transfers", "Welcome hampers", "Guest help desk"],
    img: reelCover("PZ4grH-7gp8"),
  },
  {
    title: "Invites, signage & keepsakes",
    line: "Invitations, signage, wishing trees, trousseau packing and return gifts.",
    points: ["Invitations and e-invites", "Signage and stationery", "Wishing trees", "Trousseau and gifting"],
    img: reelCover("T8PUriYODt8"),
  },
  {
    title: "Destination weddings",
    line: "Goa, Chamba, Jammu, across Punjab, and home to Amritsar.",
    points: ["Venue scouting", "Travel and stays", "Local permissions", "Full on-ground team"],
    img: reelCover("9anuqXx53Mc"),
  },
  {
    title: "Bridal showers, parties & corporate",
    line: "Bridal showers, bachelorettes, birthdays and corporate days.",
    points: ["Bridal showers and bachelorettes", "Birthdays and anniversaries", "Conferences", "Employee fun days"],
    img: insta("DeRjOq6zL3O"),
  },
];

export type Reel = { id: string; title: string; views?: string };

export const reels: Reel[] = [
  { id: "5FieC0YimGs", title: "Komal Sharma's wedding, sister of Abhishek Sharma" },
  { id: "mDM3ukOXPOY", title: "Singer Amrita Kaur's wedding", views: "1.9K" },
  { id: "ica1cBZaLDM", title: "Which colour is the bride wearing?", views: "230K" },
  { id: "BhEG_akVTu0", title: "A fairytale garden lit by butterflies", views: "1.2K" },
  { id: "i3wfsnt37SM", title: "The Ali Brothers live at a Sufi night", views: "1.4K" },
  { id: "5iZPWPjAnDs", title: "Noor Zora, a Jaggo night", views: "2.4K" },
  { id: "s5A1YW8UGww", title: "What winning in life looks like", views: "34K" },
  { id: "tV72Lhqt37s", title: "Our Anand Karaj set-up" },
  { id: "9anuqXx53Mc", title: "Punjabi aa gaye oye", views: "17K" },
  { id: "CbJxorbe4ZU", title: "I wanted a wedding for Instagram", views: "21K" },
  { id: "ssTsAZEuYNs", title: "We are not crying, you are", views: "14K" },
  { id: "VGrbu6pD4I4", title: "Shreenath ji wedding mandap" },
  { id: "QIqQe-IC2r4", title: "Sangeet décor moodboard", views: "2K" },
  { id: "w32ZYv1kYq8", title: "Not just a wedding planner, a perfectionist", views: "1.5K" },
];

// The circles at the top of The Bliss's Instagram profile, each opening a real film
export const highlights = [
  { label: "Celeb approved", id: "H5u4Laf78zg" },
  { label: "Abhishek Sharma", id: "5FieC0YimGs" },
  { label: "Amrita & Gurpal", id: "mDM3ukOXPOY" },
  { label: "Happy clients", id: "4ncTs2vRgJk" },
  { label: "Anand Karaj", id: "tV72Lhqt37s" },
  { label: "Haldi", id: "gTVCSkNGHnQ" },
  { label: "Sufi", id: "WuyRfpRnGi4" },
];

export const steps = [
  {
    title: "Chai & a conversation",
    text: "We meet at our studio or on a video call and map out your functions, guests and budget.",
  },
  {
    title: "Moodboards & mock-ups",
    text: "We design every function, from colours to lighting, and you approve it before a single flower is ordered.",
  },
  {
    title: "One team, every vendor",
    text: "Venues, caterers, DJs, photographers and transport. We manage them all, so you only deal with us.",
  },
  {
    title: "You celebrate. We run the show.",
    text: "Our crew runs every function, so your family gets to be guests at its own wedding.",
  },
];

export const ratings = [
  { source: "Google", score: "4.8", count: "127 reviews" },
  { source: "WedMeGood", score: "4.9", count: "19 reviews" },
  { source: "WeddingWire", score: "5.0", count: "15 reviews" },
  { source: "Justdial", score: "5.0", count: "124 ratings" },
];

// Video testimonials from The Bliss's own channel
export const testimonials = [
  { id: "yN9BLNBpstQ", title: "Client words we will always treasure: the bride's mother" },
  { id: "5EkS-MUSrno", title: "Happy clients from New York, USA" },
  { id: "NaZGVjzzREI", title: "The most important review: Massi approved" },
  { id: "4ncTs2vRgJk", title: "Happy clients of The Bliss" },
  { id: "MUXL1_8tX_U", title: "Happy clients of The Bliss" },
  { id: "DhKkh10TYLI", title: "Happy clients of The Bliss" },
];

// Short lines from public Google reviews, shown as written
export const googleLines = [
  "The decorations, arrangements, and overall execution were absolutely amazing.",
  "Food and Decor, beyond our expectations, ultimate quality & service.",
];

export const destinations = [
  { place: "Amritsar", region: "Home, Punjab", img: photo(P.goldenTemple), text: "Our home city. We know every venue and every vendor." },
  { place: "Jalandhar & Beas", region: "Punjab", img: reelCover("CbJxorbe4ZU"), text: "An easy drive from our studio, with our full crew on the ground." },
  { place: "Chamba", region: "Himachal Pradesh", img: reelCover("9anuqXx53Mc"), text: "Mountain weddings, planned down to the last shuttle." },
  { place: "Jammu", region: "Jammu & Kashmir", img: photo(P.lakeCouple), text: "Travel, stays and local permissions, all handled." },
  { place: "Jaipur", region: "Rajasthan", img: photo(P.jalMahal), text: "Palaces and courtyards for the full royal welcome." },
  { place: "Goa", region: "The coast", img: photo(P.beachArch), text: "Sunset pheras by the sea, run by our Amritsar team." },
  { place: "New York & beyond", region: "NRI families", img: reelCover("iTBusqAH6IE"), text: "Planning from abroad? We are your family's team in Punjab." },
];

export const planOptions = {
  occasions: ["Wedding", "Destination wedding", "Pre-wedding functions", "Bridal shower or party", "Corporate or social"],
  functions: ["Roka", "Akhand Path", "Haldi", "Mehndi", "Jaggo", "Sangeet / Sufi", "Chooda", "Anand Karaj", "Reception"],
  cities: ["Amritsar", "Elsewhere in Punjab", "Destination", "Not sure yet"],
};

export const faqs = [
  {
    q: "Do you plan the whole wedding, or only décor?",
    a: "Both. Most families give us everything, but you can also book just our décor, or bring your own decorator.",
  },
  {
    q: "What does wedding planning with The Bliss cost?",
    a: "Planning usually starts around ₹1.5 lakh for a three-day wedding. Décor and catering are quoted per function.",
  },
  {
    q: "Do you handle destination weddings and NRI families?",
    a: "Yes. We plan in Goa, Chamba, Jammu and across Punjab, and for families in the USA, Canada and the UK over video calls.",
  },
  {
    q: "Can you manage the Anand Karaj and Akhand Path arrangements?",
    a: "Yes. We coordinate with the Gurdwara and handle the set-up, guests and hospitality with care.",
  },
  {
    q: "How early should we book?",
    a: "For October to February weddings, book four to six months ahead. Smaller functions can be done in a few weeks.",
  },
  {
    q: "Where is your studio?",
    a: "30, Race Course Road, Shastri Nagar, Amritsar. Open every day, 10 am to 7 pm.",
  },
];
