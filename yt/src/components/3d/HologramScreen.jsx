import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, Image } from '@react-three/drei';

export function HologramScreen({ videoData }) {
  const thumbnail = videoData?.id 
    ? `https://img.youtube.com/vi/${videoData.id}/hqdefault.jpg`
    : "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800";

  return (
    <group position={[0, 2.2, -1]}>
      <Float speed={2} rotationIntensity={0.15} floatIntensity={0.4}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[4.2, 2.4]} />
          <meshStandardMaterial color="#040817" metalness={0.8} opacity={0.9} transparent />
        </mesh>
        <Image url={thumbnail} scale={[3.9, 2.1, 1]} position={[0, 0, 0.02]} opacity={0.85} transparent />
        <Text fontSize={0.16} color="#00f0ff" position={[0, 1.4, 0.05]} anchorX="center">
          {videoData ? `ANALYZING: ${videoData.title.slice(0, 32)}...` : "PASTE YOUTUBE URL TO BEGIN"}
        </Text>
      </Float>
    </group>
  );
}