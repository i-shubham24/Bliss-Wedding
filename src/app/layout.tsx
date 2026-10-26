import type { Metadata, Viewport } from "next";
import { Jost, Noto_Sans_Gurmukhi } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { site } from "@/content/site";
import { Loader } from "@/components/Loader";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ReelModal } from "@/components/ReelModal";
import { WhatsAppFab } from "@/components/WhatsAppFab";

const jost = Jost({ subsets: ["latin"], variable: "--font-jost", display: "swap" });
const punjabi = Noto_Sans_Gurmukhi({
  subsets: ["gurmukhi"],
  weight: ["300", "400", "500"],
  variable: "--font-punjabi",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "The Bliss | Wedding Planners and Decorators in Amritsar",
    template: "%s | The Bliss",
  },
  description:
    "A 91-year-old family firm, now in its fourth generation. The Bliss plans, designs, caters and runs Punjabi weddings in Amritsar, across Punjab and at destinations worldwide.",
  keywords: [
    "wedding planner in Amritsar",
    "wedding decorator in Amritsar",
    "destination wedding in Amritsar",
    "Anand Karaj decor",
    "Punjabi wedding planner",
    "The Bliss Wedding Company",
  ],
  openGraph: {
    title: "The Bliss | Wedding Planners and Decorators in Amritsar",
    description: "Four generations of Punjabi weddings. Planning, décor, catering and hospitality from Amritsar to anywhere.",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#d7262b",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.legalName,
  alternateName: "The Bliss Wedding Company",
  description: "Wedding planners and decorators in Amritsar, Punjab.",
  telephone: "+917888854618",
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "30, Race Course Road, near Adlakha Hospital, Shastri Nagar, White Avenue",
    addressLocality: "Amritsar",
    addressRegion: "Punjab",
    postalCode: "143001",
    addressCountry: "IN",
  },
  openingHours: "Mo-Su 10:00-19:00",
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "127" },
  sameAs: [site.social.instagram, site.social.youtube, site.social.facebook],
};

// Runs before first paint: repeat visitors in the same session skip the loader.
const skipLoader = `try{if(sessionStorage.getItem('bliss-seen')){var d=document.documentElement;d.dataset.skipLoader='1';d.dataset.loaded='1'}}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jost.variable} ${punjabi.variable} antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: skipLoader }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[200] bg-bliss px-5 py-3 text-ground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Loader />
        <SmoothScroll />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <ReelModal />
        <WhatsAppFab />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        <noscript>
          <style>{`#bliss-loader{display:none}body{overflow:auto!important}`}</style>
        </noscript>
      </body>
    </html>
  );
}
