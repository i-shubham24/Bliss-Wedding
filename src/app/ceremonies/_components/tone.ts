import type { Ceremony } from "@/content/site";

// Each hero sits on its ceremony's own colour. Text goes white or ink, whichever reads at
// WCAG AA on that colour; when neither does (Jaggo's orange), the hero uses the deeper shade.
const luminance = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [n >> 16, (n >> 8) & 255, n & 255].map((v) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrast = (a: number, b: number) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

const WHITE = 1;
const INK = luminance("#2b0e10");

export function heroTone(c: Ceremony): { ground: string; dark: boolean } {
  const l = luminance(c.color);
  if (contrast(l, WHITE) >= 4.5) return { ground: c.color, dark: true };
  if (contrast(l, INK) >= 4.5) return { ground: c.color, dark: false };
  return { ground: c.deep, dark: true };
}

// "Roka & Shagun" reads as "Roka" in running copy, "Sangeet & Sufi Night" as "Sangeet"
export const shortName = (c: Ceremony) => c.name.split(" & ")[0];
