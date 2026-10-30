import React from 'react';

export function CyberFloor() {
  return (
    <group position={[0, -1, 0]}>
      <gridHelper args={[30, 30, '#00f0ff', '#101a38']} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#030612" roughness={0.8} />
      </mesh>
    </group>
  );
}