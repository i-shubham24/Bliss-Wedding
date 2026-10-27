// Still renders of the chooda's first frame, captured from the 3D scene itself.
// Sizes and offsets are in units of placement().sizePx, measured from the stack's centre,
// so the poster lands exactly where the 3D stack will appear.
// Re-capture after changing the scene, materials or placement.
export const POSTER = {
  desktop: {
    srcSet: "/chooda/poster-desktop-700.webp 700w, /chooda/poster-desktop.webp 1140w",
    w: 1.1295,
    h: 1.1027,
    dx: 0.0157,
    dy: 0.0136,
  },
  phone: {
    srcSet: "/chooda/poster-phone-760.webp 760w, /chooda/poster-phone.webp 1122w",
    w: 1.0964,
    h: 1.0993,
    dx: 0.0059,
    // captured at the top of the stack's gentle float; centred on its average height
    dy: -0.006,
  },
} as const;
