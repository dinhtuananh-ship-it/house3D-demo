import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, PerspectiveCamera, CameraControls } from '@react-three/drei';
import HouseModel from './HouseModel';

import * as THREE from 'three';

interface HouseViewerProps {
  isNight: boolean;
  exteriorMaterial: string;
}

const CameraController = ({ cameraControlsRef }: { cameraControlsRef: any }) => {
  const keys = useRef<{ [key: string]: boolean }>({});
  const isFPSMode = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { keys.current[e.code] = true; };
    const handleKeyUp = (e: KeyboardEvent) => { keys.current[e.code] = false; };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame((state, delta) => {
    const c = cameraControlsRef.current;
    if (!c) return;

    let moveX = 0;
    let moveY = 0;
    let moveZ = 0;
    
    const speed = 15.0 * delta; // smooth units per second

    if (keys.current['KeyW']) moveZ += speed;
    if (keys.current['KeyS']) moveZ -= speed;
    if (keys.current['KeyA']) moveX -= speed;
    if (keys.current['KeyD']) moveX += speed;
    if (keys.current['ArrowUp']) moveY += speed;
    if (keys.current['ArrowDown']) moveY -= speed;

    const pos = new THREE.Vector3();
    const target = new THREE.Vector3();
    c.getPosition(pos);
    c.getTarget(target);

    if (moveX !== 0 || moveY !== 0 || moveZ !== 0) {
      isFPSMode.current = true;

      const forward = new THREE.Vector3().subVectors(target, pos);
      forward.y = 0;
      if (forward.lengthSq() < 0.001) {
        c.camera.getWorldDirection(forward);
        forward.y = 0;
      }
      forward.normalize();

      const right = new THREE.Vector3(-forward.z, 0, forward.x);
      const up = new THREE.Vector3(0, 1, 0);

      const deltaVec = new THREE.Vector3()
        .addScaledVector(forward, moveZ)
        .addScaledVector(right, moveX)
        .addScaledVector(up, moveY);

      pos.add(deltaVec);
      target.add(deltaVec);

      c.setLookAt(
        pos.x, pos.y, pos.z,
        target.x, target.y, target.z,
        false
      );
    }

    if (isFPSMode.current) {
      // Enforce FPS look-around by keeping the target very close to the camera
      const dist = pos.distanceTo(target);
      if (Math.abs(dist - 0.1) > 0.001) {
        const dir = new THREE.Vector3().subVectors(target, pos);
        if (dir.lengthSq() < 0.001) {
          c.camera.getWorldDirection(dir);
        }
        dir.normalize();
        const newTarget = pos.clone().add(dir.multiplyScalar(0.1));
        c.setLookAt(
          pos.x, pos.y, pos.z,
          newTarget.x, newTarget.y, newTarget.z,
          false
        );
      }
    }
  });

  return null;
};

const HouseViewer: React.FC<HouseViewerProps> = ({ isNight, exteriorMaterial }) => {
  const cameraControlsRef = useRef<CameraControls>(null);

  useEffect(() => {
    const handleZoomIn = () => cameraControlsRef.current?.dolly(5, true);
    const handleZoomOut = () => cameraControlsRef.current?.dolly(-5, true);

    window.addEventListener('zoom-in', handleZoomIn);
    window.addEventListener('zoom-out', handleZoomOut);
    
    return () => {
      window.removeEventListener('zoom-in', handleZoomIn);
      window.removeEventListener('zoom-out', handleZoomOut);
    };
  }, []);

  const handleFocusSpot = (camPos: [number, number, number], targetPos: [number, number, number]) => {
    if (cameraControlsRef.current) {
      // Set to 0.1 distance to engage FPS look around automatically when landing on a hotspot
      const cPos = new THREE.Vector3(...camPos);
      const tPos = new THREE.Vector3(...targetPos);
      const dir = new THREE.Vector3().subVectors(tPos, cPos).normalize();
      const newTarget = cPos.clone().add(dir.multiplyScalar(0.1));

      cameraControlsRef.current.setLookAt(
        cPos.x, cPos.y, cPos.z,
        newTarget.x, newTarget.y, newTarget.z,
        true // animate
      );
      
      // Let CameraController know we might want FPS mode for the interior
      // But we won't strictly enforce it until they use WASD
    }
  };

  return (
    <div className="w-full h-screen absolute top-0 left-0 z-0 transition-colors duration-1000" style={{ backgroundColor: isNight ? '#0a0a0c' : '#e0dcd3' }}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[15, 10, 20]} fov={35} />
        
        <color attach="background" args={[isNight ? '#0a0a0c' : '#e0dcd3']} />
        
        <fog attach="fog" args={[isNight ? '#0a0a0c' : '#e0dcd3', 20, 60]} />

        {isNight ? (
          <>
            <ambientLight intensity={0.1} />
            <directionalLight 
              position={[5, 10, -5]} 
              intensity={0.2} 
              color="#4a6b99" 
              castShadow 
              shadow-mapSize={[2048, 2048]} 
            />
            {/* Simulated interior lights coming out of windows */}
            <pointLight position={[2, 2.5, 3]} intensity={4} color="#ffaa55" distance={15} castShadow />
            <pointLight position={[3, 6, 3]} intensity={3} color="#ffaa55" distance={15} castShadow />
            <pointLight position={[-3.5, 2.5, 1]} intensity={2} color="#ffffff" distance={10} />
            <Environment preset="night" background blur={0.8} />
          </>
        ) : (
          <>
            <ambientLight intensity={0.5} />
            <directionalLight 
              position={[10, 20, 10]} 
              intensity={2} 
              color="#ffffff" 
              castShadow 
              shadow-mapSize={[4096, 4096]} 
              shadow-camera-left={-15}
              shadow-camera-right={15}
              shadow-camera-top={15}
              shadow-camera-bottom={-15}
              shadow-bias={-0.0001}
            />
            <Environment preset="city" background blur={0.8} />
          </>
        )}

        <Suspense fallback={null}>
          <HouseModel exteriorMaterial={exteriorMaterial} onFocusSpot={handleFocusSpot} />
        </Suspense>

        <ContactShadows position={[0, -0.09, 0]} opacity={0.6} scale={40} blur={2.5} far={4} color="#000000" />
        
        <CameraControls 
          ref={cameraControlsRef}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minDistance={0.1}
          maxDistance={40}
          smoothTime={0.4}
          draggingSmoothTime={0.2}
          dollySpeed={2}
        />
        <CameraController cameraControlsRef={cameraControlsRef} />
      </Canvas>
    </div>
  );
};

export default HouseViewer;
