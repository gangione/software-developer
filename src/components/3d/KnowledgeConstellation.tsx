"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Node {
  position: THREE.Vector3;
  connections: number[];
  speed: number;
  offset: number;
}

export default function KnowledgeConstellation() {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { nodes, pointPositions, linePositions } = useMemo(() => {
    const nodeCount = 40;
    const ns: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2 + Math.random() * 3;
      ns.push({
        position: new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        ),
        connections: [],
        speed: 0.2 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
      });
    }

    // Connect nearby nodes
    for (let i = 0; i < ns.length; i++) {
      for (let j = i + 1; j < ns.length; j++) {
        if (ns[i].position.distanceTo(ns[j].position) < 3.5) {
          ns[i].connections.push(j);
        }
      }
    }

    const pp = new Float32Array(nodeCount * 3);
    ns.forEach((n, i) => {
      pp[i * 3] = n.position.x;
      pp[i * 3 + 1] = n.position.y;
      pp[i * 3 + 2] = n.position.z;
    });

    const lineCoords: number[] = [];
    ns.forEach((n, i) => {
      n.connections.forEach((j) => {
        lineCoords.push(
          n.position.x, n.position.y, n.position.z,
          ns[j].position.x, ns[j].position.y, ns[j].position.z
        );
      });
    });

    return {
      nodes: ns,
      pointPositions: pp,
      linePositions: new Float32Array(lineCoords),
    };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.15;

    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position;
      nodes.forEach((node, i) => {
        const t = state.clock.elapsedTime * node.speed + node.offset;
        (positions.array as Float32Array)[i * 3 + 1] =
          node.position.y + Math.sin(t) * 0.15;
      });
      positions.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.15}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[pointPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.3}
          color="#60a5fa"
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Core glow */}
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
