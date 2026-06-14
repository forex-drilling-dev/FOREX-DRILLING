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

const TIP_MARGIN = 0.45; // gap between the point and the canvas bottom
const TAPER = 2.4; // length over which the core narrows to the point
const FLIGHT_TIP_GAP = 1.0; // bare (flight-free) length at the very point

/** Parametric helicoid — one continuous flight winding around the rod axis,
 *  from yTop down to yFlightEnd. Between yFlightEnd and yTaperStart the flight
 *  radius eases to zero; below yFlightEnd the point is a bare, symmetric cone
 *  (so it never appears to "flatten" while the auger rotates). */
function buildFlighting(
  yTop: number,
  yFlightEnd: number,
  yTaperStart: number,
): BufferGeometry {
  const span = yTop - yFlightEnd;
  const turns = Math.max(2, Math.ceil(span / PITCH));
  const uSteps = turns * SEG_PER_TURN;
  const taperLen = yTaperStart - yFlightEnd;
  const positions: number[] = [];
  const indices: number[] = [];
  for (let i = 0; i <= uSteps; i++) {
    const u = (i / SEG_PER_TURN) * Math.PI * 2;
    const y = yTop - (i / uSteps) * span;
    const s = Math.min(1, Math.max(0, (y - yFlightEnd) / taperLen));
    const innerR = ROD_R * s;
    const outerR = BLADE_R * s;
    for (let j = 0; j < RADIAL; j++) {
      const r = innerR + (outerR - innerR) * (j / (RADIAL - 1));
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

  // The spine overflows the top (enters from above) and tapers to a point near
  // the bottom of the canvas (= bottom of Operating Model, above the CTA).
  const worldH = size.height / ZOOM;
  const yTop = worldH / 2 + 2 * PITCH;
  const yTip = -worldH / 2 + TIP_MARGIN;
  const yTaperStart = yTip + TAPER;
  const yFlightEnd = yTip + FLIGHT_TIP_GAP;
  const rodH = yTop - yTaperStart;
  const rodCenter = (yTop + yTaperStart) / 2;
  const coneCenter = (yTip + yTaperStart) / 2;
  const flighting = useMemo(
    () => buildFlighting(yTop, yFlightEnd, yTaperStart),
    [yTop, yFlightEnd, yTaperStart],
  );

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
      {/* Core rod */}
      <mesh position={[0, rodCenter, 0]}>
        <cylinderGeometry args={[ROD_R, ROD_R, rodH, 24]} />
        <meshStandardMaterial color="#1c3a6b" metalness={0.55} roughness={0.38} />
      </mesh>
      {/* Core tapering to the point (continues the rod, no fat cone) */}
      <mesh position={[0, coneCenter, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[ROD_R, TAPER, 24]} />
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
