"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  BufferGeometry,
  Float32BufferAttribute,
  DoubleSide,
  type Group,
} from "three";
import type { MotionValue } from "framer-motion";

interface AugerCanvasProps {
  /** Scroll progress (0→1) of the About body; drives the rotation. */
  progress: MotionValue<number>;
  /** When true (prefers-reduced-motion) the auger renders static. */
  reduce: boolean;
}

const ZOOM = 92; // orthographic px-per-world-unit
const PITCH = 1.05; // world units per flight turn (visual density)
const SEG_PER_TURN = 40;
const RADIAL = 8;
const ROD_R = 0.17;
const BLADE_R = 0.64;

/** Parametric helicoid — one continuous flight winding around the rod axis,
 *  built tall enough to fill the given world height. */
function buildFlighting(worldHeight: number): BufferGeometry {
  const turns = Math.max(4, Math.ceil(worldHeight / PITCH));
  const height = turns * PITCH;
  const uSteps = turns * SEG_PER_TURN;
  const positions: number[] = [];
  const indices: number[] = [];
  for (let i = 0; i <= uSteps; i++) {
    const u = (i / SEG_PER_TURN) * Math.PI * 2;
    const y = height / 2 - (i / uSteps) * height;
    for (let j = 0; j < RADIAL; j++) {
      const r = ROD_R + (BLADE_R - ROD_R) * (j / (RADIAL - 1));
      positions.push(Math.cos(u) * r, y, Math.sin(u) * r);
    }
  }
  for (let i = 0; i < uSteps; i++) {
    for (let j = 0; j < RADIAL - 1; j++) {
      const a = i * RADIAL + j;
      const b = a + RADIAL;
      indices.push(a, b, a + 1, a + 1, b, b + 1);
    }
  }
  const geo = new BufferGeometry();
  geo.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function Auger({ progress, reduce }: AugerCanvasProps) {
  const group = useRef<Group>(null);
  const { size, invalidate } = useThree();

  // Fill the full canvas height (+ a little overflow so the ends never show).
  const worldH = size.height / ZOOM + 2 * PITCH;
  const flighting = useMemo(() => buildFlighting(worldH), [worldH]);

  // On-demand rendering: re-render only while the page is scrolling.
  useEffect(() => {
    if (reduce) return;
    const unsub = progress.on("change", () => invalidate());
    return () => unsub();
  }, [progress, reduce, invalidate]);

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    const p = reduce ? 0 : progress.get();
    g.rotation.y = p * Math.PI * 2 * 7; // seven turns across the scroll range
  });

  return (
    <group ref={group} rotation={[0.14, 0, 0]}>
      <mesh geometry={flighting}>
        <meshStandardMaterial
          color="#e3aa00"
          metalness={0.32}
          roughness={0.42}
          side={DoubleSide}
        />
      </mesh>
      <mesh>
        <cylinderGeometry args={[ROD_R, ROD_R, worldH + 4, 24]} />
        <meshStandardMaterial color="#1c3a6b" metalness={0.55} roughness={0.38} />
      </mesh>
    </group>
  );
}

export default function AugerCanvas({ progress, reduce }: AugerCanvasProps) {
  return (
    <Canvas
      orthographic
      frameloop="demand"
      camera={{ position: [0, 0, 12], zoom: ZOOM, near: 0.1, far: 100 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 8, 6]} intensity={1.5} />
      <directionalLight position={[-5, -3, 3]} intensity={0.45} color="#a9c7ff" />
      <Auger progress={progress} reduce={reduce} />
    </Canvas>
  );
}
