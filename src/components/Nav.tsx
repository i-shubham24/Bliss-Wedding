"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { getLenis } from "@/lib/site-events";
import { SectionLink, useSiteHref } from "@/lib/site-links";
import { usePresence } from "@/lib/use-presence";
import { nav, site } from "@/content/site";
import { ArrowUpRight, Close, Instagram, WhatsApp, YouTube } from "./icons";

export function Nav() {
  const header = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const brand = useRef<HTMLAnchorElement>(null);
  const links = useRef<HTMLElement>(null);
  const actions = useRef<HTMLDivElement>(null);
  const [tone, setTone] = useState({ brand: false, links: false, actions: false });
  const pathname = usePathname();
  const menu = usePresence(open, 800);
  const to = useSiteHref();
  const home = pathname === "/";

  // Each part of the bar reads the ground directly under it: red, wine and ink grounds
  // carry data-dark, and the nearest marked ground wins, so a white card inside the dark
  // footer reads as light. An IntersectionObserver keeps the short list of grounds crossing
  // the bar's strip, so each scroll frame only measures those few (no hit-testing the page).
  useEffect(() => {
    let frame = 0;
    const strip = new Set<Element>();
    const skip = (el: Element) => !!header.current?.contains(el) || !!el.closest("#mobile-menu, [role='dialog']");

    const darkAt = (el: HTMLElement | null) => {
      if (!el || !el.offsetWidth) return false;
      const z = el.getBoundingClientRect();
      const x = z.left + z.width / 2;
      const y = z.top + z.height / 2;
      let ground: Element | null = null;
      for (const c of strip) {
        const r = c.getBoundingClientRect();
        if (x < r.left || x > r.right || y < r.top || y > r.bottom) continue;
        // the innermost ground under the point wins
        if (!ground || ground.contains(c)) ground = c;
      }
      return !!ground?.closest("[data-dark], [data-light]")?.hasAttribute("data-dark");
    };
    const check = () => {
      frame = 0;
      const next = { brand: darkAt(brand.current), links: darkAt(links.current), actions: darkAt(actions.current) };
      setTone((prev) => (prev.brand === next.brand && prev.links === next.links && prev.actions === next.actions ? prev : next));
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    // The strip is the top tenth of the screen, where the bar sits
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? strip.add(e.target) : strip.delete(e.target)));
        queue();
      },
      { rootMargin: "0px 0px -90% 0px" },
    );
    // Sections are watched as well as marked grounds: the hero turns dark mid-scroll
    document.querySelectorAll("main section, footer, [data-dark], [data-light]").forEach((el) => !skip(el) && io.observe(el));

    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, [pathname]);

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
          <SectionLink
            ref={brand}
            data-dark={darkAttr(tone.brand)}
            hash={home ? "#top" : ""}
            className={`flex items-center gap-3 transition-colors duration-500 ${ink(tone.brand)}`}
            aria-label={home ? "The Bliss, back to top" : "The Bliss, home"}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bliss-logo-96.webp" alt="" width={44} height={44} className="h-10 w-10 rounded-full lg:h-11 lg:w-11" />
            <span className="text-[19px] font-medium tracking-[-0.01em]">The Bliss</span>
          </SectionLink>

          <nav ref={links} data-dark={darkAttr(tone.links)} aria-label="Main" className={`hidden items-center gap-9 text-[14px] tracking-wide transition-colors duration-500 lg:flex ${ink(tone.links)}`}>
            {nav.map((item) => (
              <SectionLink key={item.href} hash={item.href} className="link-u py-1">
                {item.label}
              </SectionLink>
            ))}
          </nav>

          <div ref={actions} data-dark={darkAttr(tone.actions)} className={`flex items-center gap-2 transition-colors duration-500 ${ink(tone.actions)}`}>
            <SectionLink hash="#plan" className={`btn ${tone.actions && !open ? "btn-white" : "btn-red"} hidden !h-11 !px-5 sm:inline-flex`}>
              Plan your wedding
            </SectionLink>
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

      {menu.mounted && (
          <div
            id="mobile-menu"
            data-dark
            data-open={menu.shown ? "" : undefined}
            className="mobile-menu fixed inset-0 z-[55] flex flex-col bg-bliss px-[var(--gutter)] pb-10 pt-28 text-ground lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {[...nav, { label: "Plan your wedding", href: "#plan" }].map((item, i) => (
                <a
                  key={item.href}
                  href={to(item.href)}
                  onClick={() => setOpen(false)}
                  style={{ "--i": i } as React.CSSProperties}
                  className="menu-link display flex items-center justify-between py-3 text-[44px]"
                >
                  {item.label}
                  <ArrowUpRight />
                </a>
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
          </div>
        )}
    </>
  );
}
