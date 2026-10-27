"use client";

// Decides, once per visit, how the hero chooda is drawn:
// "full"   real 3D with lacquer clearcoat
// "lite"   real 3D with plain lacquer and a lower pixel ratio, for modest devices
// "poster" the still render only: no WebGL, software rendering, or data saver on.
// Software WebGL (SwiftShader, llvmpipe) takes seconds to compile the shaders and blocks the page.
export type SceneMode = "full" | "lite" | "poster";

const KEY = "bliss-scene";

export function sceneMode(): SceneMode {
  try {
    const saved = sessionStorage.getItem(KEY);
    if (saved === "full" || saved === "lite" || saved === "poster") return saved;
  } catch {}
  const mode = detect();
  try {
    sessionStorage.setItem(KEY, mode);
  } catch {}
  return mode;
}

function detect(): SceneMode {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return "poster";
  let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;
  try {
    const canvas = document.createElement("canvas");
    // Asks for hardware only: browsers return null when they would fall back to software
    gl =
      canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true }) ||
      canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true });
  } catch {}
  if (!gl) return "poster";
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const renderer = String(info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER));
  gl.getExtension("WEBGL_lose_context")?.loseContext();
  if (/swiftshader|llvmpipe|softpipe|software|basic render/i.test(renderer)) return "poster";
  const memory = nav.deviceMemory ?? 8;
  const cores = nav.hardwareConcurrency ?? 8;
  if (memory < 2 || cores <= 2) return "poster";
  if (memory <= 4 || cores <= 4) return "lite";
  return "full";
}
