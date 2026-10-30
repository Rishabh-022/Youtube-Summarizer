import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { HologramScreen } from './HologramScreen';
import { StationPillar } from './StationPillar';
import { CyberFloor } from './CyberFloor';

export function Scene({ videoData, activeTab, onSelectTab }) {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 2.8, 6.2], fov: 50 }}>
        <color attach="background" args={['#030612']} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 15, 10]} intensity={1.2} />
        <pointLight position={[-3, 2, 2]} color="#00f0ff" intensity={2} />
        <pointLight position={[0, 2, 2]} color="#10b981" intensity={2} />
        <pointLight position={[3, 2, 2]} color="#a855f7" intensity={2} />

        <Suspense fallback={null}>
          <Stars radius={100} depth={50} count={3000} factor={4} fade />
          <CyberFloor />
          <HologramScreen videoData={videoData} />

          {/* 3 Interactive Stations */}
          <StationPillar
            position={[-3.2, 0.4, 0.8]}
            label="1. SUMMARY"
            sublabel="Key Takeaways"
            color="#00f0ff"
            shape="octahedron"
            active={activeTab === 'summary'}
            onClick={() => onSelectTab('summary')}
          />
          <StationPillar
            position={[0, 0.2, 1.8]}
            label="2. NOTES & PDF"
            sublabel="Export Study Guide"
            color="#10b981"
            shape="dodecahedron"
            active={activeTab === 'notes'}
            onClick={() => onSelectTab('notes')}
          />
          <StationPillar
            position={[3.2, 0.4, 0.8]}
            label="3. QUESTIONS"
            sublabel="Interactive Quiz"
            color="#a855f7"
            shape="icosahedron"
            active={activeTab === 'questions'}
            onClick={() => onSelectTab('questions')}
          />

          <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2 - 0.05} minDistance={4} maxDistance={9} />
        </Suspense>
      </Canvas>
    </div>
  );
}