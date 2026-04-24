"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function TerrainMesh() {
  const ref = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(40, 24, 80, 48);
    const position = geo.attributes.position;
    if (position) {
      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i);
        const y = position.getY(i);
        const z =
          Math.sin(x * 0.3) * 0.6 +
          Math.cos(y * 0.4) * 0.4 +
          Math.sin(x * 0.15 + y * 0.2) * 1.2;
        position.setZ(i, z);
      }
      position.needsUpdate = true;
      geo.computeVertexNormals();
    }
    return new THREE.WireframeGeometry(geo);
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <lineSegments ref={ref} geometry={geometry} rotation={[-Math.PI / 2.4, 0, 0]} position={[0, -2, 0]}>
      <lineBasicMaterial color="#E8A020" transparent opacity={0.35} />
    </lineSegments>
  );
}

export function WebGLHero() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 4, 12], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={["#08080A", 12, 30]} />
        <ambientLight intensity={0.2} />
        <TerrainMesh />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
    </div>
  );
}
