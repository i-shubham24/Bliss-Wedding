"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { SCENE_READY_EVENT } from "@/lib/site-events";

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

function bandGeometry(radius: number, width: number, depth: number) {
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
  return new THREE.LatheGeometry(pts, 112);
}

function Studs({ depth, material }: { depth: number; material: THREE.Material }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const geo = useMemo(() => new THREE.SphereGeometry(0.021, 10, 8), []);
  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    const radius = 1 + depth / 2 + 0.004;
    for (let i = 0; i < STUDS; i++) {
      const a = (i / STUDS) * Math.PI * 2;
      m.makeTranslation(Math.cos(a) * radius, 0, Math.sin(a) * radius);
      ref.current!.setMatrixAt(i, m);
    }
    ref.current!.instanceMatrix.needsUpdate = true;
  }, [depth]);
  return <instancedMesh ref={ref} args={[geo, material, STUDS]} />;
}

function Bangles({ progress }: { progress: RefObject<number> }) {
  const tilt = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const bands = useRef<(THREE.Group | null)[]>([]);
  const { size } = useThree();
  // Below 1024px the canvas is its own square stage under the copy, so the stack sits centred in it
  const mobile = size.width < 1024;

  const mats = useMemo(
    () => ({
      red: new THREE.MeshPhysicalMaterial({
        color: "#c4141c",
        roughness: 0.2,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        side: THREE.DoubleSide,
      }),
      ivory: new THREE.MeshPhysicalMaterial({
        color: "#f4e9d9",
        roughness: 0.28,
        clearcoat: 0.9,
        clearcoatRoughness: 0.08,
        side: THREE.DoubleSide,
      }),
      gold: new THREE.MeshStandardMaterial({ color: "#d9a957", metalness: 1, roughness: 0.18, side: THREE.DoubleSide }),
      pearl: new THREE.MeshStandardMaterial({ color: "#fff8ef", roughness: 0.16, metalness: 0.1 }),
    }),
    [],
  );

  const geos = useMemo(() => SET.map((b) => bandGeometry(1, b.width, b.depth)), []);

  useFrame((state, dt) => {
    const p = progress.current ?? 0;
    const t = state.clock.elapsedTime;
    const face = smooth(0, 0.5, p);
    const spread = smooth(0.08, 0.72, p);
    const fly = smooth(0.3, 1, p);
    const g = tilt.current!;

    // Frame size at the starting camera distance: centre the stack in the right half,
    // lifted so it only kisses the top of the BLISS wordmark
    // Wide, short screens (laptops at 125% scaling) get a smaller stack so it clears the nav
    // and sits over the wordmark rather than on it.
    const aspect = size.width / size.height;
    const frameH = 2 * 6.2 * Math.tan(THREE.MathUtils.degToRad(16));
    const frameW = frameH * aspect;
    // On small screens the canvas is the full screen around a square stage of up to 26rem
    const stagePx = Math.min(size.width - 32, 416);
    const baseScale = mobile ? (0.82 * stagePx * (frameH / size.height)) / 2.2 : Math.min(0.92, Math.max(0.6, 1.45 / aspect));
    const centreFromTop = mobile ? 0.5 : 0.155 + 0.337 * baseScale;
    const baseX = mobile ? 0 : frameW * 0.232;
    const baseY = (0.5 - centreFromTop) * frameH;
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
    state.camera.position.z = lerp(6.2, -4.5, fly);
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
            {b.studs && <Studs depth={b.depth} material={mats.pearl} />}
          </group>
        ))}
      </group>
    </group>
  );
}

// Compile every shader once on mount, then tell the loader the heavy work is done
function Warmup() {
  const { gl, scene, camera } = useThree();
  useEffect(() => {
    gl.compile(scene, camera);
    const id = requestAnimationFrame(() => window.dispatchEvent(new Event(SCENE_READY_EVENT)));
    return () => cancelAnimationFrame(id);
  }, [gl, scene, camera]);
  return null;
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

// Flat stand-in for devices without WebGL: the same chooda, drawn.
function FlatChooda() {
  return (
    <div className="absolute inset-0 grid place-items-center lg:justify-end lg:pr-[12vw]">
      <svg viewBox="0 0 200 120" className="w-[64vw] max-w-[520px] -rotate-12" aria-hidden>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <ellipse
            key={i}
            cx="100"
            cy={36 + i * 8}
            rx="88"
            ry="30"
            fill="none"
            stroke={i === 2 || i === 5 ? "#d9a957" : i === 3 ? "#f4e9d9" : "#c4141c"}
            strokeWidth={i === 2 || i === 5 ? 3 : 7}
          />
        ))}
      </svg>
    </div>
  );
}

export default function ChoodaCanvas({
  progress,
  active,
  eventSource,
}: {
  progress: RefObject<number>;
  active: boolean;
  eventSource: RefObject<HTMLElement | null>;
}) {
  const [webgl] = useState(hasWebGL);
  useEffect(() => {
    if (!webgl) window.dispatchEvent(new Event(SCENE_READY_EVENT));
  }, [webgl]);
  if (!webgl) return <FlatChooda />;

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6.2], fov: 32, near: 0.05, far: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "demand"}
      eventSource={eventSource as RefObject<HTMLElement>}
      eventPrefix="client"
      style={{ pointerEvents: "none" }}
      aria-hidden
      onCreated={({ gl, scene }) => {
        // Studio reflections from the room environment built into three: no HDR download, no extra library
        const pmrem = new THREE.PMREMGenerator(gl);
        scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
        scene.environmentIntensity = 0.85;
        pmrem.dispose();
      }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 4, 5]} intensity={1.5} color="#fff1e6" />
      <directionalLight position={[-4, -2, 2]} intensity={0.55} color="#ffb3a3" />
      <Bangles progress={progress} />
      <Warmup />
    </Canvas>
  );
}
