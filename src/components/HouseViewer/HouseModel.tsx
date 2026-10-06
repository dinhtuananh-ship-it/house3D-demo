import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, MeshTransmissionMaterial, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface HouseModelProps {
  exteriorMaterial: string;
  onFocusSpot: (position: [number, number, number], target: [number, number, number]) => void;
}

const HouseModel: React.FC<HouseModelProps> = ({ exteriorMaterial, onFocusSpot }) => {
  const group = useRef<THREE.Group>(null);
  const garageDoorRef = useRef<THREE.Group>(null);
  const [hoveredSpot, setHoveredSpot] = useState<string | null>(null);
  const [isGarageOpen, setIsGarageOpen] = useState(false);

  useFrame((state, delta) => {
    if (garageDoorRef.current) {
      // Lerp scale and position to simulate a roll-up door
      const targetScaleY = isGarageOpen ? 0.05 : 1;
      const targetPosY = isGarageOpen ? 3.3 : 1.75;
      
      garageDoorRef.current.scale.y = THREE.MathUtils.lerp(garageDoorRef.current.scale.y, targetScaleY, delta * 4);
      garageDoorRef.current.position.y = THREE.MathUtils.lerp(garageDoorRef.current.position.y, targetPosY, delta * 4);
    }

    // Auto-close garage when zooming out far enough
    if (isGarageOpen) {
      const dist = state.camera.position.distanceTo(new THREE.Vector3(-3.5, 1.75, 3.91));
      if (dist > 12) {
        setIsGarageOpen(false);
      }
    }
  });

  const getExteriorMatProps = () => {
    switch (exteriorMaterial) {
      case 'Concrete': return { color: '#8a8d8f', roughness: 0.9, metalness: 0.1 };
      case 'White Stone': return { color: '#f0f0f0', roughness: 0.8, metalness: 0.05 };
      case 'Dark Stone': return { color: '#2a2a2a', roughness: 0.8, metalness: 0.1 };
      case 'Wood': return { color: '#4a3320', roughness: 0.7, metalness: 0 };
      default: return { color: '#8a8d8f', roughness: 0.9, metalness: 0.1 };
    }
  };

  const matProps = getExteriorMatProps();
  const woodProps = { color: '#3a2518', roughness: 0.7, metalness: 0.1 };
  const darkMetalProps = { color: '#111111', roughness: 0.4, metalness: 0.8 };
  const interiorWallProps = { color: '#fafafa', roughness: 0.9, metalness: 0 };
  const interiorFloorProps = { color: '#d2b48c', roughness: 0.6, metalness: 0.1 }; // Wood floor
  const garageFloorProps = { color: '#444444', roughness: 0.8, metalness: 0.2 }; // Concrete floor

  const Wall = ({ args, position }: any) => (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial {...matProps} />
    </mesh>
  );

  const InteriorWall = ({ args, position }: any) => (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial {...interiorWallProps} />
    </mesh>
  );

  const handleHotspotClick = (title: string, camPos: [number, number, number], targetPos: [number, number, number]) => {
    onFocusSpot(camPos, targetPos);
    if (title === "Private Garage") {
      setIsGarageOpen(true);
    } else {
      setIsGarageOpen(false);
    }
  };

  const Hotspot = ({ position, title, camPos, targetPos }: any) => {
    const isHovered = hoveredSpot === title;
    return (
      <group position={position}>
        <Html center zIndexRange={[100, 0]}>
          <div 
            className="w-16 h-16 cursor-pointer flex items-center justify-center relative"
            onMouseEnter={() => setHoveredSpot(title)}
            onMouseLeave={() => setHoveredSpot(null)}
            onClick={() => handleHotspotClick(title, camPos, targetPos)}
          >
            <div className={`w-4 h-4 rounded-full border-2 border-white flex items-center justify-center transition-all duration-300 shadow-lg ${isHovered ? 'scale-125 bg-white' : 'scale-100 bg-black/50 backdrop-blur-md'}`}>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
            {isHovered && (
              <div className="absolute top-10 bg-white/95 backdrop-blur-sm text-black text-[10px] px-3 py-1.5 uppercase tracking-widest whitespace-nowrap rounded-sm shadow-xl font-medium animate-in fade-in zoom-in duration-200">
                {title}
              </div>
            )}
          </div>
        </Html>
      </group>
    );
  };

  return (
    <group ref={group} dispose={null}>
      
      {/* =======================
          GROUND FLOOR (X: -6 to 6, Z: -4 to 4, Y: 0 to 3.5)
      ======================= */}
      {/* Ceiling with Stairwell Hole (Hole at X: -1 to 1, Z: -3.8 to -1.6) */}
      <Wall position={[-3.5, 3.4, 0]} args={[5, 0.2, 8]} /> {/* Left solid part */}
      <Wall position={[3.5, 3.4, 0]} args={[5, 0.2, 8]} /> {/* Right solid part */}
      <Wall position={[0, 3.4, 1.2]} args={[2, 0.2, 5.6]} /> {/* Front middle part */}
      <Wall position={[0, 3.4, -3.9]} args={[2, 0.2, 0.2]} /> {/* Back middle part */}

      {/* Exterior Walls */}
      <Wall position={[-5.9, 1.75, 0]} args={[0.2, 3.5, 8]} /> {/* Left */}
      
      {/* Right Wall with Entrance Door at Z = 2.5 */}
      <Wall position={[5.9, 1.75, -1.05]} args={[0.2, 3.5, 5.9]} /> {/* Right Back */}
      <Wall position={[5.9, 1.75, 3.55]} args={[0.2, 3.5, 0.9]} /> {/* Right Front */}
      <Wall position={[5.9, 2.85, 2.5]} args={[0.2, 1.3, 1.2]} /> {/* Header */}
      {/* Right Entrance Door (open) */}
      <mesh position={[5.9, 1.1, 1.9]} rotation={[0, -Math.PI / 3, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.05, 2.2, 1.2]} />
        <meshStandardMaterial {...woodProps} />
      </mesh>

      <Wall position={[0, 1.75, -3.9]} args={[12, 3.5, 0.2]} /> {/* Back */}
      <Wall position={[5.5, 1.75, 3.9]} args={[1, 3.5, 0.2]} /> {/* Front Right Solid */}

      {/* --- GARAGE INTERIOR (X: -6 to -1) --- */}
      {/* Separating wall between Living Room and Garage (with doorway to garage) */}
      <InteriorWall position={[-1, 1.75, -2.65]} args={[0.2, 3.5, 2.7]} /> {/* Back */}
      <InteriorWall position={[-1, 1.75, 1.85]} args={[0.2, 3.5, 4.3]} /> {/* Front */}
      <InteriorWall position={[-1, 2.85, -0.8]} args={[0.2, 1.3, 1.0]} /> {/* Header */}
      {/* Door to Garage (partially open) */}
      <mesh position={[-1, 1.1, -1.25]} rotation={[0, Math.PI / 4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.05, 2.2, 0.9]} />
        <meshStandardMaterial {...woodProps} />
      </mesh>
      {/* Garage Floor (Fit inside to avoid Z-fighting) */}
      <mesh position={[-3.45, 0.1, 0]} receiveShadow><boxGeometry args={[4.7, 0.2, 7.6]} /><meshStandardMaterial {...garageFloorProps} /></mesh>
      
      {/* Abstract Car inside Garage */}
      <group position={[-3.5, 0.5, 1]}>
        {/* Car Body */}
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[2, 0.6, 4]} />
          <meshStandardMaterial color="#882222" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Car Cabin */}
        <mesh castShadow receiveShadow position={[0, 0.5, -0.5]}>
          <boxGeometry args={[1.8, 0.5, 2]} />
          <meshStandardMaterial color="#111111" roughness={0.1} metalness={0.9} />
        </mesh>
        {/* Wheels */}
        <mesh position={[-1, -0.2, 1.2]} rotation={[0, 0, Math.PI/2]} castShadow><cylinderGeometry args={[0.3, 0.3, 0.2]} /><meshStandardMaterial color="#111" /></mesh>
        <mesh position={[1, -0.2, 1.2]} rotation={[0, 0, Math.PI/2]} castShadow><cylinderGeometry args={[0.3, 0.3, 0.2]} /><meshStandardMaterial color="#111" /></mesh>
        <mesh position={[-1, -0.2, -1.2]} rotation={[0, 0, Math.PI/2]} castShadow><cylinderGeometry args={[0.3, 0.3, 0.2]} /><meshStandardMaterial color="#111" /></mesh>
        <mesh position={[1, -0.2, -1.2]} rotation={[0, 0, Math.PI/2]} castShadow><cylinderGeometry args={[0.3, 0.3, 0.2]} /><meshStandardMaterial color="#111" /></mesh>
      </group>

      {/* Garage Light (so it's not pitch black inside) */}
      <pointLight position={[-3.5, 3, 0]} intensity={isGarageOpen ? 1.5 : 0} distance={10} color="#ffeedd" />

      {/* Garage Door Frame (Hollow) */}
      <Wall position={[-5.9, 1.75, 3.9]} args={[0.2, 3.5, 0.2]} /> {/* Left Pillar */}
      <Wall position={[-1.1, 1.75, 3.9]} args={[0.2, 3.5, 0.2]} /> {/* Right Pillar */}
      <Wall position={[-3.5, 3.4, 3.9]} args={[4.6, 0.2, 0.2]} /> {/* Top Header */}
      
      {/* Animated Garage Door */}
      <group ref={garageDoorRef} position={[-3.5, 1.75, 3.91]}>
        <mesh position={[0, 0, 0]}><planeGeometry args={[4.6, 3.1]} /><meshStandardMaterial color="#0a0a0a" roughness={0.3} metalness={0.6} /></mesh>
        {[0, 1, 2, 3].map(i => (
          <mesh key={`gpanel-${i}`} position={[0, -1.15 + i * 0.8, 0.01]}>
            <boxGeometry args={[4.6, 0.02, 0.02]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
        ))}
      </group>


      {/* --- LIVING ROOM INTERIOR (X: -1 to 5) --- */}
      {/* Living Room Floor (Fit inside to avoid Z-fighting) */}
      <mesh position={[2.45, 0.1, 0]} receiveShadow><boxGeometry args={[6.7, 0.2, 7.6]} /><meshStandardMaterial {...interiorFloorProps} /></mesh>
      
      {/* Large Glass Window - Ground Floor */}
      <mesh position={[2, 1.75, 3.9]}>
        <planeGeometry args={[6, 3.3]} />
        <MeshTransmissionMaterial background={new THREE.Color('#fff')} transmission={0.95} thickness={0.5} roughness={0.05} ior={1.5} color="#e0f0ff" />
      </mesh>
      
      {/* Living Room Furniture */}
      <group position={[2.5, 0.2, 1]}>
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI/2, 0, 0]} receiveShadow><planeGeometry args={[4, 3]} /><meshStandardMaterial color="#e5e5e5" roughness={1} /></mesh>
        <mesh position={[0, 0.3, -0.5]} castShadow receiveShadow><boxGeometry args={[3, 0.6, 1]} /><meshStandardMaterial color="#888888" roughness={0.9} /></mesh>
        <mesh position={[0, 0.6, -1]} castShadow receiveShadow><boxGeometry args={[3, 0.6, 0.2]} /><meshStandardMaterial color="#888888" roughness={0.9} /></mesh>
        <mesh position={[0, 0.2, 0.8]} castShadow receiveShadow><boxGeometry args={[1.5, 0.05, 0.8]} /><meshStandardMaterial color="#111111" roughness={0.2} metalness={0.8} /></mesh>
        <mesh position={[-2.8, 1, 0]} castShadow receiveShadow><boxGeometry args={[0.2, 2, 3]} /><meshStandardMaterial {...woodProps} /></mesh>
        <mesh position={[-2.69, 1.2, 0]} castShadow><boxGeometry args={[0.05, 1.2, 2.2]} /><meshStandardMaterial color="#000000" roughness={0.1} metalness={0.8} /></mesh>
      </group>

      {/* U-Shaped Staircase (Pressed against back wall Z=-3.8) */}
      <group position={[0, 0, 0]}>
        {/* Flight 1: Left side, going backward from -1.6 to -3.4 */}
        {Array.from({ length: 8 }).map((_, i) => {
          const stepHeight = 1.7 / 8; 
          const stepDepth = 1.8 / 8;
          return (
            <mesh key={`stair-1-${i}`} position={[-0.5, 0.2 + i * stepHeight, -1.6 - i * stepDepth]} castShadow receiveShadow>
              <boxGeometry args={[0.9, 0.05, 0.25]} />
              <meshStandardMaterial {...woodProps} />
            </mesh>
          );
        })}
        {/* Landing at the back wall */}
        <mesh position={[0, 1.9, -3.4]} castShadow receiveShadow>
          <boxGeometry args={[1.9, 0.05, 0.8]} />
          <meshStandardMaterial {...woodProps} />
        </mesh>
        {/* Flight 2: Right side, going forward from -3.4 to -1.6 */}
        {Array.from({ length: 8 }).map((_, i) => {
          const stepHeight = 1.7 / 8; 
          const stepDepth = 1.8 / 8;
          return (
            <mesh key={`stair-2-${i}`} position={[0.5, 1.9 + (i+1) * stepHeight, -3.4 + i * stepDepth]} castShadow receiveShadow>
              <boxGeometry args={[0.9, 0.05, 0.25]} />
              <meshStandardMaterial {...woodProps} />
            </mesh>
          );
        })}
        
        {/* Central Spine / Support */}
        <mesh position={[-0.5, 1.05, -2.5]} rotation={[Math.atan2(1.7, 1.8), 0, 0]} castShadow>
          <boxGeometry args={[0.2, 0.1, 2.47]} />
          <meshStandardMaterial color="#222" roughness={0.8} />
        </mesh>
        <mesh position={[0.5, 2.75, -2.5]} rotation={[-Math.atan2(1.7, 1.8), 0, 0]} castShadow>
          <boxGeometry args={[0.2, 0.1, 2.47]} />
          <meshStandardMaterial color="#222" roughness={0.8} />
        </mesh>
      </group>


      {/* =======================
          SECOND FLOOR (X: -6 to 8, Z: -4 to 4, Y: 3.5 to 7)
      ======================= */}
      {/* Floor with Stairwell Hole (Hole at X: -1 to 1, Z: -3.8 to -1.6) */}
      <mesh position={[-3.4, 3.6, 0]} receiveShadow><boxGeometry args={[4.8, 0.2, 7.6]} /><meshStandardMaterial {...interiorFloorProps} /></mesh> {/* Left part */}
      <mesh position={[4.4, 3.6, 0]} receiveShadow><boxGeometry args={[6.8, 0.2, 7.6]} /><meshStandardMaterial {...interiorFloorProps} /></mesh> {/* Right part */}
      <mesh position={[0, 3.6, 1.1]} receiveShadow><boxGeometry args={[2, 0.2, 5.4]} /><meshStandardMaterial {...interiorFloorProps} /></mesh> {/* Front middle part */}

      <Wall position={[1, 6.9, 0]} args={[14, 0.2, 8]} />
      {/* Roof Overhang */}
      <mesh position={[1, 7.1, 0]} castShadow receiveShadow><boxGeometry args={[14.4, 0.2, 8.4]} /><meshStandardMaterial {...darkMetalProps} /></mesh>

      {/* Exterior Walls */}
      <Wall position={[-5.9, 5.25, 0]} args={[0.2, 3.5, 8]} /> {/* Left */}
      
      {/* Right Wall with Window */}
      <Wall position={[7.9, 5.25, -2]} args={[0.2, 3.5, 4]} /> {/* Right Back */}
      <Wall position={[7.9, 5.25, 3]} args={[0.2, 3.5, 2]} /> {/* Right Front */}
      <Wall position={[7.9, 3.95, 1]} args={[0.2, 0.9, 2]} /> {/* Window Bottom */}
      <Wall position={[7.9, 6.5, 1]} args={[0.2, 1.0, 2]} /> {/* Window Top */}
      {/* Master Bedroom Window Glass */}
      <mesh position={[7.9, 5.2, 1]}>
        <boxGeometry args={[0.1, 1.6, 2]} />
        <MeshTransmissionMaterial background={new THREE.Color('#fff')} transmission={0.9} thickness={0.1} />
      </mesh>
      {/* Curtains */}
      <group position={[7.8, 5.2, 1]}>
        {/* Left Curtain */}
        <mesh position={[0, 0, -0.8]} castShadow>
          <boxGeometry args={[0.1, 2.2, 0.6]} />
          <meshStandardMaterial color="#eeeeee" roughness={0.8} />
        </mesh>
        {/* Right Curtain */}
        <mesh position={[0, 0, 0.8]} castShadow>
          <boxGeometry args={[0.1, 2.2, 0.6]} />
          <meshStandardMaterial color="#eeeeee" roughness={0.8} />
        </mesh>
        {/* Curtain Rod */}
        <mesh position={[0, 1.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 2.4]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      </group>

      <Wall position={[1, 5.25, -3.9]} args={[14, 3.5, 0.2]} /> {/* Back */}
      <Wall position={[7.5, 5.25, 3.9]} args={[1, 3.5, 0.2]} /> {/* Front Right Solid */}

      {/* 2nd Floor Separating Walls */}
      {/* Office Wall at X=-1.0 */}
      <InteriorWall position={[-1.0, 5.25, -1.65]} args={[0.2, 3.5, 4.3]} />
      <InteriorWall position={[-1.0, 5.25, 2.65]} args={[0.2, 3.5, 2.3]} />
      <InteriorWall position={[-1.0, 6.35, 1.0]} args={[0.2, 1.3, 1.0]} /> {/* Door Header */}

      {/* Master Bedroom Wall at X=1.5 */}
      <InteriorWall position={[1.5, 5.25, -1.65]} args={[0.2, 3.5, 4.3]} />
      <InteriorWall position={[1.5, 5.25, 2.65]} args={[0.2, 3.5, 2.3]} />
      <InteriorWall position={[1.5, 6.35, 1.0]} args={[0.2, 1.3, 1.0]} /> {/* Door Header */}

      {/* Office Glass (X: -6 to -1) -> Wait, Front Left Solid covers X:-6 to -1! So Office has NO front glass! It has side glass at X=-6 maybe? No, X=-6 is solid Wall Left. Let's make Front Left a glass window too! */}
      {/* Currently Front Left Solid is: <Wall position={[-3.5, 5.25, 3.9]} args={[5, 3.5, 0.2]} /> */}
      {/* Oh wait, the louvers cover X: -5.5 to -1.5, they are for the glass! But I had a solid wall behind them! Let's delete the solid wall and make it glass! */}
      
      {/* Master Bedroom & Office Glass (X: -6 to 7) */}
      <mesh position={[1, 5.25, 3.9]}>
        <planeGeometry args={[13.5, 3.3]} />
        <MeshTransmissionMaterial background={new THREE.Color('#fff')} transmission={0.95} thickness={0.5} roughness={0.05} ior={1.5} color="#e0f0ff" />
      </mesh>

      {/* Louvers for the Office */}
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh key={`louver-${i}`} position={[-5.5 + i * 0.35, 5.25, 4.2]} castShadow receiveShadow>
          <boxGeometry args={[0.05, 3.5, 0.3]} />
          <meshStandardMaterial {...woodProps} />
        </mesh>
      ))}

      {/* Office Interior */}
      <group position={[-3.5, 3.7, 0]}>
        {/* Desk */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow><boxGeometry args={[2.5, 0.05, 1]} /><meshStandardMaterial {...woodProps} /></mesh>
        <mesh position={[-1.2, 0.2, 0]} castShadow receiveShadow><boxGeometry args={[0.1, 0.4, 0.9]} /><meshStandardMaterial color="#111" /></mesh>
        <mesh position={[1.2, 0.2, 0]} castShadow receiveShadow><boxGeometry args={[0.1, 0.4, 0.9]} /><meshStandardMaterial color="#111" /></mesh>
        {/* Chair */}
        <mesh position={[0, 0.25, 0.8]} castShadow receiveShadow><boxGeometry args={[0.6, 0.05, 0.6]} /><meshStandardMaterial color="#333" /></mesh>
        <mesh position={[0, 0.6, 1.05]} castShadow receiveShadow><boxGeometry args={[0.6, 0.6, 0.1]} /><meshStandardMaterial color="#333" /></mesh>
        {/* Laptop */}
        <mesh position={[0, 0.45, -0.2]} rotation={[0, 0, 0]}><boxGeometry args={[0.4, 0.02, 0.3]} /><meshStandardMaterial color="#888" /></mesh>
        <mesh position={[0, 0.55, -0.35]} rotation={[-Math.PI/6, 0, 0]}><boxGeometry args={[0.4, 0.3, 0.02]} /><meshStandardMaterial color="#000" /></mesh>
      </group>

      {/* Master Bedroom Interior */}
      <group position={[4.5, 3.7, 0]}>
        {/* Bed */}
        <mesh position={[1, 0.2, -1]} castShadow receiveShadow><boxGeometry args={[2.2, 0.4, 2.2]} /><meshStandardMaterial {...woodProps} /></mesh>
        <mesh position={[1, 0.5, -1]} castShadow receiveShadow><boxGeometry args={[2, 0.2, 2]} /><meshStandardMaterial color="#ffffff" roughness={0.9} /></mesh>
        <mesh position={[0.5, 0.65, -1.6]} castShadow><boxGeometry args={[0.6, 0.1, 0.4]} /><meshStandardMaterial color="#f0f0f0" /></mesh>
        <mesh position={[1.5, 0.65, -1.6]} castShadow><boxGeometry args={[0.6, 0.1, 0.4]} /><meshStandardMaterial color="#f0f0f0" /></mesh>
        <mesh position={[1, 0.01, 0]} rotation={[-Math.PI/2, 0, 0]} receiveShadow><planeGeometry args={[4, 3]} /><meshStandardMaterial color="#bbbbbb" roughness={1} /></mesh>
      </group>


      {/* =======================
          EXTERIOR & LANDSCAPING
      ======================= */}
      {/* Infinity Pool & Deck */}
      <group position={[3, 0.1, 8]}>
        <mesh receiveShadow castShadow position={[0, -0.1, 0]}><boxGeometry args={[8, 0.4, 4]} /><meshStandardMaterial color="#222222" /></mesh>
        <mesh position={[0, 0.11, 0]} rotation={[-Math.PI/2, 0, 0]}>
          <planeGeometry args={[7.8, 3.8]} />
          <MeshReflectorMaterial blur={[400, 100]} resolution={1024} mixBlur={1} mixStrength={20} roughness={0.1} depthScale={1} minDepthThreshold={0.4} maxDepthThreshold={1.4} color="#226677" metalness={0.6} mirror={1} />
        </mesh>
        <mesh position={[-5.5, 0.05, 0]} receiveShadow castShadow><boxGeometry args={[3, 0.1, 4]} /><meshStandardMaterial {...woodProps} /></mesh>
        <mesh position={[-5.5, 0.2, -0.5]} rotation={[0, Math.PI/2, 0]} castShadow><boxGeometry args={[1.5, 0.1, 0.5]} /><meshStandardMaterial color="#f0f0f0" /></mesh>
        <mesh position={[-6.2, 0.4, -0.5]} rotation={[0, Math.PI/2, Math.PI/6]} castShadow><boxGeometry args={[0.8, 0.1, 0.5]} /><meshStandardMaterial color="#f0f0f0" /></mesh>
      </group>

      {/* Trees - Moved to avoid clipping */}
      <group position={[-7.5, 0, 6]}>
        <mesh position={[0, 1.5, 0]} castShadow><cylinderGeometry args={[0.1, 0.2, 3]} /><meshStandardMaterial color="#2d1c10" /></mesh>
        <mesh position={[0, 3, 0]} castShadow><icosahedronGeometry args={[1.2, 2]} /><meshStandardMaterial color="#1a331a" roughness={1} /></mesh>
        <mesh position={[1.5, 1, 1]} castShadow><cylinderGeometry args={[0.08, 0.15, 2]} /><meshStandardMaterial color="#2d1c10" /></mesh>
        <mesh position={[1.5, 2, 1]} castShadow><icosahedronGeometry args={[0.8, 2]} /><meshStandardMaterial color="#224422" roughness={1} /></mesh>
      </group>
      
      {/* Moved further right and forward to avoid Master Bedroom */}
      <group position={[10, 0, 5]}>
        <mesh position={[0, 2, 0]} castShadow><cylinderGeometry args={[0.15, 0.25, 4]} /><meshStandardMaterial color="#2d1c10" /></mesh>
        <mesh position={[0, 4, 0]} castShadow><icosahedronGeometry args={[1.8, 2]} /><meshStandardMaterial color="#1a331a" roughness={1} /></mesh>
      </group>

      {/* Ground Base */}
      <mesh position={[0, -0.1, 0]} receiveShadow><cylinderGeometry args={[20, 20, 0.2, 64]} /><meshStandardMaterial color="#e0dcd3" roughness={1} /></mesh>
      
      {/* Stone Pathway */}
      <mesh position={[-1, -0.04, 8]} rotation={[-Math.PI/2, 0, 0]} receiveShadow><planeGeometry args={[2, 8]} /><meshStandardMaterial color="#999999" roughness={0.8} /></mesh>
      {[0, 1, 2, 3, 4].map(i => (
        <mesh key={`step-${i}`} position={[-1, -0.03, 5 + i * 1.5]} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
          <planeGeometry args={[1.6, 0.8]} />
          <meshStandardMaterial color="#eeeeee" roughness={0.9} />
        </mesh>
      ))}


      {/* =======================
          HOTSPOTS
      ======================= */}
      <Hotspot position={[2, 1.75, 4.3]} title="Living Room" camPos={[0.5, 1.5, 2]} targetPos={[4, 1.5, -1]} />
      <Hotspot position={[3, 5.25, 4.3]} title="Master Suite" camPos={[2, 4.5, 2]} targetPos={[4.5, 4.5, 0]} />
      <Hotspot position={[3, 0.5, 8]} title="Infinity Pool" camPos={[8, 3, 12]} targetPos={[3, 0, 8]} />
      {/* Garage Hotspot */}
      <Hotspot position={[-3.5, 1.75, 4.3]} title="Private Garage" camPos={[-3.5, 1.5, 5]} targetPos={[-3.5, 1.5, 0]} />

    </group>
  );
};

export default HouseModel;
