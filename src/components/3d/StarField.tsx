"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Suppress THREE.Clock deprecation warning from @react-three/fiber internals
// (R3F v9 still uses THREE.Clock; no stable release with THREE.Timer yet)
if (typeof window !== "undefined") {
  const _warn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return;
    _warn.apply(console, args);
  };
}

const circleVertexShader = /* glsl */ `
  attribute float size;
  varying float vAlpha;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (200.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    vAlpha = 1.0;
  }
`;

function createCircleShaderMaterial(color: string, opacity: number, baseSize: number, useSizeAttr: boolean) {
  const fragmentShader = /* glsl */ `
    uniform vec3 uColor;
    uniform float uOpacity;
    void main() {
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;
      float alpha = 1.0 - smoothstep(0.35, 0.5, dist);
      gl_FragColor = vec4(uColor, alpha * uOpacity);
    }
  `;

  const vertexShader = useSizeAttr
    ? circleVertexShader
    : /* glsl */ `
      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = ${baseSize.toFixed(1)} * (200.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uOpacity: { value: opacity },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}

function Stars() {
  const ref = useRef<THREE.Points>(null);
  const count = 1200;

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100;
      sz[i] = Math.random() * 1.5 + 0.5;
    }
    return [pos, sz];
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.015;
    ref.current.rotation.y = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <primitive object={createCircleShaderMaterial("#60a5fa", 0.4, 0, true)} attach="material" />
    </points>
  );
}

function FloatingParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 80;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <primitive object={createCircleShaderMaterial("#f59e0b", 0.3, 4.0, false)} attach="material" />
    </points>
  );
}

export default function StarField() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
        gl={{ antialias: false, alpha: true }}
      >
        <Stars />
        <FloatingParticles />
      </Canvas>
    </div>
  );
}
