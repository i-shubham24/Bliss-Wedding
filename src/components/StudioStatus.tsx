"use client";

import { useEffect, useState } from "react";

// Live line for the studio hours (10 am to 7 pm, every day, India time).
// Rendered after mount so the server and the visitor's clock never disagree.
export function StudioStatus({ className = "" }: { className?: string }) {
  const [line, setLine] = useState<{ open: boolean; text: string } | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const h = now.getHours() + now.getMinutes() / 60;
      const open = h >= 10 && h < 19;
      setLine(
        open
          ? { open, text: `Open now, until 7 pm` }
          : { open, text: h < 10 ? "Closed now, opens at 10 am" : "Closed now, opens tomorrow at 10 am" },
      );
    };
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={`inline-flex items-center gap-2 ${className}`} aria-live="polite">
      <span aria-hidden className={`h-2 w-2 rounded-full ${line?.open ? "bg-[#3fbf6a]" : "bg-current opacity-50"}`} />
      {line ? line.text : "Open every day, 10 am to 7 pm"}
    </span>
  );
}
