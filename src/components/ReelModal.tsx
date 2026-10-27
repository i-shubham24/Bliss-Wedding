"use client";

import { useEffect, useState } from "react";
import { getLenis, REEL_EVENT, type ReelRequest } from "@/lib/site-events";
import { usePresence } from "@/lib/use-presence";
import { site } from "@/content/site";
import { Close, YouTube } from "./icons";

// One shared player for every reel on the page. The iframe only loads on open, and is removed
// once the closing fade has finished, which stops the film.
export function ReelModal() {
  const [reel, setReel] = useState<ReelRequest | null>(null);
  const [open, setOpen] = useState(false);
  const player = usePresence(open, 450);

  useEffect(() => {
    const onOpen = (e: Event) => {
      setReel((e as CustomEvent<ReelRequest>).detail);
      setOpen(true);
    };
    window.addEventListener(REEL_EVENT, onOpen);
    return () => window.removeEventListener(REEL_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    getLenis()?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      getLenis()?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!player.mounted || !reel) return null;
  const close = () => setOpen(false);

  return (
    <div
      data-dark
      data-open={player.shown ? "" : undefined}
      role="dialog"
      aria-modal="true"
      aria-label={reel.title}
      className="reel-modal fixed inset-0 z-[120] flex flex-col items-center justify-center gap-5 bg-ink/95 p-4"
      onClick={close}
    >
      <div
        className="reel-card relative overflow-hidden rounded-[4px] bg-black shadow-2xl"
        style={{ width: "min(calc(100vw - 32px), calc((100svh - 140px) * 9 / 16))", aspectRatio: "9 / 16" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* The player is added a frame after the overlay, so the tap shows a response at once */}
        {player.shown && (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${reel.id}?autoplay=1&rel=0&playsinline=1&modestbranding=1&cc_load_policy=1`}
            title={reel.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="h-full w-full"
          />
        )}
      </div>
      <div className="flex items-center gap-6 text-ground" onClick={(e) => e.stopPropagation()}>
        <p className="max-w-[40ch] text-[15px] text-ground/85">{reel.title}</p>
        <a href={site.social.youtube} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[15px] text-ground/75 hover:text-ground">
          <YouTube /> Channel
        </a>
      </div>
      <button
        type="button"
        onClick={close}
        className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-ground text-ink transition-transform hover:rotate-90"
        aria-label="Close video"
      >
        <Close />
      </button>
    </div>
  );
}
