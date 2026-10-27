// Where the chooda sits at the start of the hero, shared by the 3D scene and its still poster
// so the two line up exactly when one hands over to the other.

export const CAMERA_Z = 6.2;
export const FOV = 32;
// The bangle stack is about this many world units across at scale 1
export const CHOODA_SIZE = 2.2;

const FRAME_H = 2 * CAMERA_Z * Math.tan(((FOV / 2) * Math.PI) / 180);

export function placement(width: number, height: number) {
  // Below 1024px the canvas is its own square stage under the copy, so the stack sits centred in it
  const mobile = width < 1024;
  const aspect = width / height;
  const frameW = FRAME_H * aspect;
  // On small screens the canvas is the full screen around a square stage of up to 26rem
  const stagePx = Math.min(width - 32, 416);
  // Wide, short screens (laptops at 125% scaling) get a smaller stack so it clears the nav
  // and sits over the wordmark rather than on it
  const baseScale = mobile ? (0.82 * stagePx * (FRAME_H / height)) / CHOODA_SIZE : Math.min(0.92, Math.max(0.6, 1.45 / aspect));
  // Desktop: in the right half, lifted so it only kisses the top of the BLISS wordmark
  const centreFromTop = mobile ? 0.5 : 0.155 + 0.337 * baseScale;
  const baseX = mobile ? 0 : frameW * 0.232;
  const baseY = (0.5 - centreFromTop) * FRAME_H;
  const pxPerUnit = height / FRAME_H;
  return {
    mobile,
    baseScale,
    baseX,
    baseY,
    frameW,
    frameH: FRAME_H,
    // The same placement in canvas pixels: the stack's centre and its size across
    originX: width / 2 + baseX * pxPerUnit,
    originY: centreFromTop * height,
    sizePx: CHOODA_SIZE * baseScale * pxPerUnit,
  };
}
