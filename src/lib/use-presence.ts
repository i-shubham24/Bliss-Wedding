"use client";

import { useEffect, useState } from "react";

// Mount-and-animate for overlays without an animation library. `mounted` stays true through the
// exit so a CSS transition can play out; `shown` turns on a frame after mounting so the enter
// transition has a starting point. Style the open state with [data-open].
export function usePresence(open: boolean, exitMs: number) {
  const [lingering, setLingering] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setShown(true);
          setLingering(true);
        }),
      );
      return () => cancelAnimationFrame(id);
    }
    const id = requestAnimationFrame(() => setShown(false));
    const t = window.setTimeout(() => setLingering(false), exitMs);
    return () => {
      cancelAnimationFrame(id);
      window.clearTimeout(t);
    };
  }, [open, exitMs]);

  return { mounted: open || lingering, shown: open && shown };
}
