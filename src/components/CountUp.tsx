"use client";

import { useEffect, useRef } from "react";

const format = (v: number, decimals: number) =>
  v.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

// Counts from zero to the value the first time it scrolls into view. The server renders
// the real number, so it reads correctly without script and with reduced motion.
export function CountUp({ value, decimals = 0, duration = 1800, className }: { value: number; decimals?: number; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    el.textContent = format(0, decimals);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          el.textContent = format(value * (1 - Math.pow(1 - p, 4)), decimals);
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, decimals, duration]);

  return (
    <span ref={ref} className={className}>
      {format(value, decimals)}
    </span>
  );
}
