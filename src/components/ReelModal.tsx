"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getLenis, REEL_EVENT, type ReelRequest } from "@/lib/site-events";
import { site } from "@/content/site";
import { Close, YouTube } from "./icons";

// One shared player for every reel on the page. The iframe only loads on open.
export function ReelModal() {
  const [reel, setReel] = useState<ReelRequest | null>(null);

  useEffect(() => {
    const onOpen = (e: Event) => setReel((e as CustomEvent<ReelRequest>).detail);
    window.addEventListener(REEL_EVENT, onOpen);
    return () => window.removeEventListener(REEL_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!reel) return;
    getLenis()?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setReel(null);
    window.addEventListener("keydown", onKey);
    return () => {
      getLenis()?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [reel]);

  return (
    <AnimatePresence>
      {reel && (
        <motion.div
          data-dark
          role="dialog"
          aria-modal="true"
          aria-label={reel.title}
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center gap-5 bg-ink/95 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setReel(null)}
        >
          <motion.div
            className="relative overflow-hidden rounded-[4px] bg-black shadow-2xl"
            style={{ width: "min(calc(100vw - 32px), calc((100svh - 140px) * 9 / 16))", aspectRatio: "9 / 16" }}
            initial={{ y: 60, scale: 0.94 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${reel.id}?autoplay=1&rel=0&playsinline=1&modestbranding=1`}
              title={reel.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="h-full w-full"
            />
          </motion.div>
          <div className="flex items-center gap-6 text-ground" onClick={(e) => e.stopPropagation()}>
            <p className="max-w-[40ch] text-[15px] text-ground/85">{reel.title}</p>
            <a href={site.social.youtube} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[15px] text-ground/75 hover:text-ground">
              <YouTube /> Channel
            </a>
          </div>
          <button
            type="button"
            onClick={() => setReel(null)}
            className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-ground text-ink transition-transform hover:rotate-90"
            aria-label="Close video"
          >
            <Close />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
