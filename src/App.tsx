import React, { useState } from 'react';
import { Loader } from '@react-three/drei';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HouseViewer from './components/HouseViewer';
import HouseControls from './components/HouseControls';
import Features from './components/Features';
import CTA from './components/CTA';

const App: React.FC = () => {
  const [isNight, setIsNight] = useState(false);
  const [exteriorMaterial, setExteriorMaterial] = useState('Concrete');

  return (
    <div className="relative font-sans text-dark-gray bg-[#0a0a0c] selection:bg-white selection:text-black w-full min-h-screen">
      <Navbar />
      
      {/* 3D Hero Section - Fixed in Background */}
      <div id="viewer" className="fixed top-0 left-0 w-full h-screen z-0">
        <HouseViewer 
          isNight={isNight} 
          exteriorMaterial={exteriorMaterial} 
        />
      </div>

      <main className="relative z-10 w-full pointer-events-none">
        {/* Transparent section to allow the fixed 3D background to be fully visible and interactive initially */}
        <div className="relative w-full h-screen pointer-events-none">
          <Hero />
          <HouseControls 
            isNight={isNight} 
            setIsNight={setIsNight} 
            exteriorMaterial={exteriorMaterial} 
            setExteriorMaterial={setExteriorMaterial} 
          />
        </div>

        {/* Scrollable Content overlaying the 3D canvas */}
        <div className="relative z-20 w-full pointer-events-auto">
          <Features />
          <CTA />
          
          {/* Simple Footer */}
          <footer className="py-8 text-center text-xs tracking-[0.2em] uppercase text-white/40 bg-[#050505]">
            © {new Date().getFullYear()} NOVA HOUSE. All rights reserved.
          </footer>
        </div>
      </main>

      <Loader containerStyles={{ background: '#0a0a0c' }} innerStyles={{ width: '300px' }} barStyles={{ background: '#fff', height: '2px' }} dataStyles={{ color: '#fff', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '10px' }} />
    </div>
  );
};

export default App;
