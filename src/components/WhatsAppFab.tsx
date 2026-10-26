"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { whatsappLink } from "@/lib/site-events";
import { site } from "@/content/site";
import { WhatsApp } from "./icons";

export function WhatsAppFab() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Shown after the hero, hidden again once the closing section (with its own buttons) arrives
    const st = ScrollTrigger.create({
      start: () => window.innerHeight * 1.2,
      endTrigger: "#contact",
      end: "top bottom",
      onToggle: (self) => setShow(self.isActive),
    });
    return () => st.kill();
  }, []);

  return (
    <a
      href={whatsappLink(site.whatsapp, "Hi The Bliss! We'd love to talk about our wedding.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with The Bliss on WhatsApp"
      className={`group fixed bottom-5 right-5 z-[70] flex h-14 items-center gap-0 overflow-hidden rounded-[2px] bg-bliss pl-4 pr-4 text-ground shadow-[0_12px_40px_-12px_rgba(167,22,28,0.8)] transition-all duration-700 ease-[var(--ease-expo)] hover:gap-3 hover:pr-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
      }`}
    >
      <WhatsApp width={24} height={24} />
      <span className="text-[15px] font-medium max-w-0 overflow-hidden whitespace-nowrap transition-[max-width] duration-700 ease-[var(--ease-expo)] group-hover:max-w-[160px]">
        Chat with us
      </span>
    </a>
  );
}
