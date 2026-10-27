"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import { CAMERA_Z, FOV, placement } from "./placement";

// The signature object: a Punjabi bride's chooda. Red and ivory bangles with gold bands,
// revolved from a rounded profile. Scroll progress (0 to 1) turns the stack to face the
// visitor, fans the bangles into a tunnel and flies the camera through it.

type Band = { width: number; depth: number; kind: "red" | "ivory" | "gold"; studs?: boolean };

const SET: Band[] = [
  { width: 0.15, depth: 0.078, kind: "red" },
  { width: 0.15, depth: 0.078, kind: "red", studs: true },
  { width: 0.05, depth: 0.06, kind: "gold" },
  { width: 0.15, depth: 0.078, kind: "ivory" },
  { width: 0.15, depth: 0.078, kind: "red" },
  { width: 0.05, depth: 0.06, kind: "gold" },
  { width: 0.15, depth: 0.078, kind: "red", studs: true },
  { width: 0.15, depth: 0.078, kind: "ivory" },
  { width: 0.15, depth: 0.078, kind: "red" },
];
const GAP = 0.018;
const STUDS = 36;

// Each band's centre along the stack axis, with the stack centred on the origin
const OFFSETS: number[] = (() => {
  const total = SET.reduce((s, b) => s + b.width, 0) + GAP * (SET.length - 1);
  const out: number[] = [];
  let y = -total / 2;
  for (const b of SET) {
    out.push(y + b.width / 2);
    y += b.width + GAP;
  }
  return out;
})();

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const { lerp, damp } = THREE.MathUtils;

function bandGeometry(radius: number, width: number, depth: number, segments: number) {
  const r = Math.min(width, depth) * 0.45;
  const inner = radius - depth / 2;
  const outer = radius + depth / 2;
  const h = width / 2;
  const pts: THREE.Vector2[] = [];
  const corner = (cx: number, cy: number, from: number) => {
    for (let i = 0; i <= 6; i++) {
      const a = from + (i / 6) * (Math.PI / 2);
      pts.push(new THREE.Vector2(cx + Math.cos(a) * r, cy + Math.sin(a) * r));
    }
  };
  corner(outer - r, -h + r, -Math.PI / 2);
  corner(outer - r, h - r, 0);
  corner(inner + r, h - r, Math.PI / 2);
  corner(inner + r, -h + r, Math.PI);
  pts.push(pts[0].clone());
  return new THREE.LatheGeometry(pts, segments);
}

function Studs({ depth, material, lite }: { depth: number; material: THREE.Material; lite: boolean }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const geo = useMemo(() => (lite ? new THREE.SphereGeometry(0.021, 8, 6) : new THREE.SphereGeometry(0.021, 10, 8)), [lite]);
  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    const radius = 1 + depth / 2 + 0.004;
    for (let i = 0; i < STUDS; i++) {
      const a = (i / STUDS) * Math.PI * 2;
      m.makeTranslation(Math.cos(a) * radius, 0, Math.sin(a) * radius);
      ref.current!.setMatrixAt(i, m);
    }
    ref.current!.instanceMatrix.needsUpdate = true;
  }, [depth, geo]);
  return <instancedMesh ref={ref} args={[geo, material, STUDS]} />;
}

const MATCAPS = ["red", "ivory", "gold", "pearl"].map((m) => `/chooda/matcap-${m}.webp`);

// lite: fewer segments and a lower pixel ratio, for modest phones and laptops
function Bangles({ progress, lite }: { progress: RefObject<number>; lite: boolean }) {
  const tilt = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const bands = useRef<(THREE.Group | null)[]>([]);
  const { size } = useThree();

  // Each material is a matcap: a sphere of that lacquer, gold or pearl rendered once under the
  // studio lights and reflections (public/chooda/matcap-*.webp). It looks the same as the full
  // lighting from this fixed camera, at a fraction of the cost: no reflection maps to build.
  const caps = useLoader(THREE.TextureLoader, MATCAPS);
  const mats = useMemo(() => {
    const [red, ivory, gold, pearl] = caps.map((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      // the captures are already tone-mapped, so they are shown as they are
      return new THREE.MeshMatcapMaterial({ matcap: t, side: THREE.DoubleSide, toneMapped: false });
    });
    return { red, ivory, gold, pearl };
  }, [caps]);

  const geos = useMemo(() => SET.map((b) => bandGeometry(1, b.width, b.depth, lite ? 72 : 112)), [lite]);

  useFrame((state, dt) => {
    const p = progress.current ?? 0;
    const t = state.clock.elapsedTime;
    const face = smooth(0, 0.5, p);
    const spread = smooth(0.08, 0.72, p);
    const fly = smooth(0.3, 1, p);
    const g = tilt.current!;
    const { mobile, baseScale, baseX, baseY } = placement(size.width, size.height);
    const loose = 1 - face;

    g.rotation.x = damp(g.rotation.x, lerp(1.06, Math.PI / 2, face) - state.pointer.y * 0.2 * loose, 5, dt);
    g.rotation.z = damp(g.rotation.z, lerp(-0.44, 0, face) + state.pointer.x * 0.24 * loose, 5, dt);
    g.position.x = lerp(baseX, 0, face);
    g.position.y = lerp(baseY + Math.sin(t * 0.8) * 0.045, 0, face);
    g.scale.setScalar(baseScale * lerp(1, mobile ? 1.5 : 1.12, face));

    spin.current!.rotation.y += dt * (0.22 + spread * 0.5);
    bands.current.forEach((band, i) => {
      if (band) band.position.y = OFFSETS[i] * (1 + spread * 6);
    });
    state.camera.position.z = lerp(CAMERA_Z, -4.5, fly);
  });

  return (
    <group ref={tilt}>
      <group ref={spin}>
        {SET.map((b, i) => (
          <group
            key={i}
            ref={(el) => {
              bands.current[i] = el;
            }}
            position-y={OFFSETS[i]}
          >
            <mesh geometry={geos[i]} material={mats[b.kind]} />
            {b.studs && <Studs depth={b.depth} material={mats.pearl} lite={lite} />}
          </group>
        ))}
      </group>
    </group>
  );
}

// Every shader is compiled in the background before the first frame. KHR_parallel_shader_compile
// lets the browser build them off the main thread, so the page never freezes.
function Warmup({ onCompiled }: { onCompiled: () => void }) {
  const { gl, camera, invalidate, get } = useThree();
  useEffect(() => {
    let cancelled = false;
    gl.compileAsync(get().scene, camera).then(() => {
      if (cancelled) return;
      onCompiled();
      requestAnimationFrame(() => invalidate());
    });
    return () => {
      cancelled = true;
    };
  }, [gl, camera, invalidate, get, onCompiled]);
  return null;
}

// Calls back once, after the first real frame has been drawn
function FirstFrame({ onLive }: { onLive: () => void }) {
  const done = useRef(false);
  useFrame(() => {
    if (done.current) return;
    done.current = true;
    requestAnimationFrame(onLive);
  });
  return null;
}

// Only loaded on devices that can render it well (see ./capability); everyone else keeps the poster.
// onLive fires once the first real frame is on screen, so the poster can fade out under it.
export default function ChoodaCanvas({
  progress,
  active,
  lite,
  eventSource,
  onLive,
}: {
  progress: RefObject<number>;
  active: boolean;
  lite: boolean;
  eventSource: RefObject<HTMLElement | null>;
  onLive: () => void;
}) {
  const [compiled, setCompiled] = useState(false);
  const onCompiled = useMemo(() => () => setCompiled(true), []);
  return (
    <Canvas
      dpr={lite ? [1, 1.25] : [1, 1.5]}
      camera={{ position: [0, 0, CAMERA_Z], fov: FOV, near: 0.05, far: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={!compiled ? "never" : active ? "always" : "demand"}
      eventSource={eventSource as RefObject<HTMLElement>}
      eventPrefix="client"
      style={{ pointerEvents: "none" }}
      aria-hidden
    >
      {/* The scene and its warm-up mount together, once the matcaps have loaded */}
      <Suspense fallback={null}>
        <Bangles progress={progress} lite={lite} />
        <Warmup onCompiled={onCompiled} />
      </Suspense>
      {compiled && <FirstFrame onLive={onLive} />}
    </Canvas>
  );
}
