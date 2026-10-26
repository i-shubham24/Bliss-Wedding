import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const ArrowRight = (p: P) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden {...base} {...p}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);

export const ArrowUpRight = (p: P) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden {...base} {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const ArrowDown = (p: P) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden {...base} {...p}>
    <path d="M12 4v16M6 14l6 6 6-6" />
  </svg>
);

export const Play = (p: P) => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden fill="currentColor" {...p}>
    <path d="M8 5.5v13a.6.6 0 0 0 .9.5l10.4-6.5a.6.6 0 0 0 0-1L8.9 5a.6.6 0 0 0-.9.5Z" />
  </svg>
);

export const Plus = (p: P) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Close = (p: P) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const Star = (p: P) => (
  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden fill="currentColor" {...p}>
    <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
  </svg>
);

export const WhatsApp = (p: P) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden fill="currentColor" {...p}>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
  </svg>
);

export const Phone = (p: P) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...base} {...p}>
    <path d="M5 4h3l1.6 4-2 1.2a11 11 0 0 0 7.2 7.2l1.2-2L20 16v3a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z" />
  </svg>
);

export const Instagram = (p: P) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r=".6" fill="currentColor" />
  </svg>
);

export const YouTube = (p: P) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...base} {...p}>
    <rect x="2.5" y="5" width="19" height="14" rx="4" />
    <path d="m10 9 5 3-5 3V9Z" fill="currentColor" />
  </svg>
);

export const Facebook = (p: P) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...base} {...p}>
    <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8Z" />
  </svg>
);

