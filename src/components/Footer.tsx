"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { whatsappLink } from "@/lib/site-events";
import { hero, nav, site } from "@/content/site";
import { ArrowUpRight, Facebook, Instagram, WhatsApp, YouTube } from "./icons";
import { StudioStatus } from "./StudioStatus";

// The close is a wedding invitation from The Bliss family: the printed artefact every
// Punjabi wedding begins with, set under an Amritsar arch.
export function Footer() {
  const root = useRef<HTMLElement>(null);
  const card = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(card.current, {
        y: 120,
        rotation: -6,
        autoAlpha: 0,
        duration: 1.6,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
      gsap.from("[data-foot-col] > *", {
        y: 30,
        autoAlpha: 0,
        stagger: 0.05,
        duration: 1.1,
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });

      // The card leans toward the pointer, like a printed card turned in the hand
      if (!window.matchMedia("(pointer: fine)").matches) return;
      const el = card.current!;
      const rx = gsap.quickTo(el, "rotationX", { duration: 0.8, ease: "power3" });
      const ry = gsap.quickTo(el, "rotationY", { duration: 0.8, ease: "power3" });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 10);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
      };
      const reset = () => {
        rx(0);
        ry(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", reset);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", reset);
      };
    },
    { scope: root },
  );

  const follow = [
    { href: site.social.instagram, label: "Instagram", handle: "@thebliss.weddingcompany", Icon: Instagram },
    { href: site.social.instagramPlanning, label: "Planning team", handle: "@thebliss.weddingplanners", Icon: Instagram },
    { href: site.social.youtube, label: "YouTube", handle: "@theblissweddingcompany", Icon: YouTube },
    { href: site.social.facebook, label: "Facebook", handle: "The Bliss", Icon: Facebook },
  ];

  return (
    <footer ref={root} data-dark className="overflow-hidden bg-wine text-ground">
      <div className="container-x grid items-center gap-16 pb-14 pt-24 lg:grid-cols-12 lg:gap-10 lg:pt-28">
        <nav aria-label="Footer" data-foot-col className="order-2 flex flex-col gap-1 lg:order-1 lg:col-span-3">
          <p className="mb-3 text-[15px] text-ground/60">Explore</p>
          {[...nav, { label: "Plan a wedding", href: "#plan" }].map((item) => (
            <a key={item.href} href={item.href} className="display self-start py-1 text-[clamp(26px,2.2vw,34px)] transition-colors hover:text-blush">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="order-1 [perspective:1200px] lg:order-2 lg:col-span-6">
          <article
            ref={card}
            aria-label="Visit The Bliss"
            className="arch relative mx-auto w-full max-w-[500px] bg-bliss px-7 pb-9 pt-[clamp(120px,15vw,170px)] text-center text-ground [transform-style:preserve-3d] sm:px-12"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bliss-logo-320.webp" alt="The Bliss logo" width={84} height={84} className="absolute left-1/2 top-[clamp(40px,5vw,58px)] h-[clamp(64px,6vw,84px)] w-[clamp(64px,6vw,84px)] -translate-x-1/2 rounded-full ring-2 ring-[#f3cf8c] ring-offset-4 ring-offset-bliss" />
            <p lang="pa" className="font-gurmukhi text-[22px] text-[#f6d79b]">
              {hero.welcome}
            </p>
            <p className="mt-3 text-[15px]">With the blessings of four generations</p>
            <p className="display mt-2 text-[clamp(34px,3vw,46px)]">The Bliss family</p>
            <p className="mx-auto mt-3 max-w-[28ch] text-[17px]">requests the pleasure of your company at our studio</p>
            <address className="mt-6 text-[17px] font-medium not-italic leading-relaxed">
              {site.address.line1}, Shastri Nagar
              <br />
              White Avenue, Amritsar 143001
            </address>
            <p className="mt-3 text-[15px]">
              <StudioStatus />
            </p>
            <div className="mt-8 grid grid-cols-3 gap-2">
              {[
                { href: whatsappLink(site.whatsapp, "Hi The Bliss! We'd love to visit the studio."), label: "WhatsApp", external: true },
                { href: site.phoneHref, label: "Call" },
                { href: `mailto:${site.email}`, label: "Email" },
              ].map((b) => (
                <a
                  key={b.label}
                  href={b.href}
                  {...(b.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="grid h-12 place-items-center rounded-[2px] bg-ground text-[15px] font-medium text-bliss transition-colors hover:bg-wine hover:text-ground"
                >
                  {b.label}
                </a>
              ))}
            </div>
            <a href={site.address.maps} target="_blank" rel="noreferrer" className="link-u mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-[#f6d79b]">
              Find us on the map <ArrowUpRight />
            </a>
          </article>
        </div>

        <div data-foot-col className="order-3 flex flex-col gap-4 lg:col-span-3">
          <p className="text-[15px] text-ground/60">Follow the celebrations</p>
          {follow.map(({ href, label, handle, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" className="group flex items-center gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ground/10 transition-colors group-hover:bg-ground group-hover:text-wine">
                <Icon />
              </span>
              <span className="leading-tight">
                <span className="block font-medium">{label}</span>
                <span className="block text-[14px] text-ground/60">{handle}</span>
              </span>
            </a>
          ))}
          <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer" className="group flex items-center gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ground/10 transition-colors group-hover:bg-ground group-hover:text-wine">
              <WhatsApp />
            </span>
            <span className="leading-tight">
              <span className="block font-medium">WhatsApp</span>
              <span className="block text-[14px] text-ground/60">{site.phone}</span>
            </span>
          </a>
        </div>
      </div>

      <div className="container-x flex flex-col items-start gap-4 pb-8 text-[14px] text-ground/60 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 {site.legalName}, Amritsar. {site.tagline}</p>
        <a href="#top" className="group inline-flex items-center gap-3 text-ground">
          Back to the top
          <span className="grid h-10 w-10 place-items-center rounded-full bg-ground/10 transition-transform duration-500 group-hover:-translate-y-1">
            <ArrowUpRight className="-rotate-45" />
          </span>
        </a>
      </div>
    </footer>
  );
}
