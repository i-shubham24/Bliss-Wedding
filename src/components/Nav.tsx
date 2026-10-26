"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getLenis } from "@/lib/site-events";
import { nav, site } from "@/content/site";
import { ArrowUpRight, Close, Instagram, WhatsApp, YouTube } from "./icons";

export function Nav() {
  const header = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const brand = useRef<HTMLAnchorElement>(null);
  const links = useRef<HTMLElement>(null);
  const actions = useRef<HTMLDivElement>(null);
  const [tone, setTone] = useState({ brand: false, links: false, actions: false });

  // Each part of the bar reads the ground directly under it: red, wine and ink grounds
  // carry data-dark, and the nearest marked ground wins, so a white card inside the dark
  // footer reads as light.
  useEffect(() => {
    let frame = 0;
    const darkUnder = (el: HTMLElement | null) => {
      if (!el || !el.offsetWidth) return false;
      const r = el.getBoundingClientRect();
      const under = document
        .elementsFromPoint(r.left + r.width / 2, r.top + r.height / 2)
        .find((n) => !header.current?.contains(n) && !n.closest("#mobile-menu"));
      return !!under?.closest("[data-dark], [data-light]")?.hasAttribute("data-dark");
    };
    const check = () => {
      frame = 0;
      const next = { brand: darkUnder(brand.current), links: darkUnder(links.current), actions: darkUnder(actions.current) };
      setTone((prev) => (prev.brand === next.brand && prev.links === next.links && prev.actions === next.actions ? prev : next));
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop();
    else if (document.documentElement.dataset.loaded === "1") lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const ink = (dark: boolean) => (open || dark ? "text-ground" : "text-ink");
  const darkAttr = (dark: boolean) => (open || dark ? "" : undefined);

  return (
    <>
      <header
        ref={header}
        className="fixed inset-x-0 top-0 z-[60]"
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-6 lg:h-[84px]">
          <a ref={brand} data-dark={darkAttr(tone.brand)} href="#top" className={`flex items-center gap-3 transition-colors duration-500 ${ink(tone.brand)}`} aria-label="The Bliss, back to top">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bliss-logo-96.webp" alt="" width={44} height={44} className="h-10 w-10 rounded-full lg:h-11 lg:w-11" />
            <span className="text-[19px] font-medium tracking-[-0.01em]">The Bliss</span>
          </a>

          <nav ref={links} data-dark={darkAttr(tone.links)} aria-label="Main" className={`hidden items-center gap-9 text-[14px] tracking-wide transition-colors duration-500 lg:flex ${ink(tone.links)}`}>
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="link-u py-1">
                {item.label}
              </a>
            ))}
          </nav>

          <div ref={actions} data-dark={darkAttr(tone.actions)} className={`flex items-center gap-2 transition-colors duration-500 ${ink(tone.actions)}`}>
            <a href="#plan" className={`btn ${tone.actions && !open ? "btn-white" : "btn-red"} hidden !h-11 !px-5 sm:inline-flex`}>
              Plan your wedding
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={open ? "mobile-menu" : undefined}
              className="grid h-11 w-11 place-items-center lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              {open ? (
                <Close />
              ) : (
                <span aria-hidden className="flex w-6 flex-col gap-[6px]">
                  <span className="h-px w-full bg-current" />
                  <span className="h-px w-2/3 self-end bg-current" />
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            data-dark
            className="fixed inset-0 z-[55] flex flex-col bg-bliss px-[var(--gutter)] pb-10 pt-28 text-ground lg:hidden"
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {[...nav, { label: "Plan your wedding", href: "#plan" }].map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="display flex items-center justify-between py-3 text-[44px]"
                >
                  {item.label}
                  <ArrowUpRight />
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto flex items-end justify-between gap-6">
              <div className="text-[15px] leading-relaxed text-ground/80">
                <a href={site.phoneHref} className="block text-ground">{site.phone}</a>
                {site.address.line1}, Amritsar
              </div>
              <div className="flex gap-4">
                <a href={`https://wa.me/${site.whatsapp}`} aria-label="WhatsApp" target="_blank" rel="noreferrer"><WhatsApp /></a>
                <a href={site.social.instagram} aria-label="Instagram" target="_blank" rel="noreferrer"><Instagram /></a>
                <a href={site.social.youtube} aria-label="YouTube" target="_blank" rel="noreferrer"><YouTube /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
