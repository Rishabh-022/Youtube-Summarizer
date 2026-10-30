import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';

export function StationPillar({ position, label, sublabel, color, active, shape, onClick }) {
  const orbRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (orbRef.current) orbRef.current.rotation.y = state.clock.getElapsedTime() * 0.7;
  });

  return (
    <group position={position}>
      {/* Base Pedestal */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.7, 0.85, 0.25, 32]} />
        <meshStandardMaterial color="#0b1329" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Floating 3D Interactive Crystal */}
      <Float speed={3} floatIntensity={0.8}>
        <group
          ref={orbRef}
          position={[0, 0.5, 0]}
          scale={hovered ? [1.2, 1.2, 1.2] : [1, 1, 1]}
          onClick={(e) => { e.stopPropagation(); onClick(); }}
          onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
        >
          <mesh>
            {shape === 'octahedron' && <octahedronGeometry args={[0.5, 0]} />}
            {shape === 'dodecahedron' && <dodecahedronGeometry args={[0.48, 0]} />}
            {shape === 'icosahedron' && <icosahedronGeometry args={[0.48, 0]} />}
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered || active ? 1.5 : 0.6} />
          </mesh>
        </group>
      </Float>

      <Text position={[0, -0.2, 0.8]} fontSize={0.18} color={hovered || active ? "#ffffff" : color} anchorX="center">
        {label}
      </Text>
      <Text position={[0, -0.38, 0.8]} fontSize={0.11} color="#94a3b8" anchorX="center">
        {sublabel}
      </Text>
    </group>
  );
}