import React from 'react';
import { Sun, Moon, Maximize, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface HouseControlsProps {
  isNight: boolean;
  setIsNight: (val: boolean) => void;
  exteriorMaterial: string;
  setExteriorMaterial: (val: string) => void;
}

const HouseControls: React.FC<HouseControlsProps> = ({ 
  isNight, 
  setIsNight, 
  exteriorMaterial, 
  setExteriorMaterial 
}) => {
  const materials = ['Concrete', 'White Stone', 'Dark Stone', 'Wood'];

  return (
    <div className="absolute bottom-12 left-0 right-0 z-40 px-6 md:px-16 flex flex-col md:flex-row justify-between items-end md:items-center pointer-events-none">
      
      {/* Material Selector - Minimalist */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="hidden md:flex flex-col space-y-4 pointer-events-auto"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">Exterior Finish</span>
        <div className="flex flex-col space-y-2">
          {materials.map((mat) => (
            <button
              key={mat}
              onClick={() => setExteriorMaterial(mat)}
              className={`text-left text-xs uppercase tracking-widest transition-all duration-300 flex items-center group ${
                exteriorMaterial === mat 
                  ? 'text-white' 
                  : 'text-white/40 hover:text-white/80'
              }`}
            >
              <div className={`h-[1px] bg-white transition-all duration-300 mr-3 ${exteriorMaterial === mat ? 'w-6' : 'w-0 group-hover:w-3'}`} />
              {mat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Day / Night & Camera Reset Toggle */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="flex space-x-3 pointer-events-auto"
      >
        <div className="flex bg-white/10 backdrop-blur-xl border border-white/10 rounded-full p-1 shadow-2xl">
          <button 
            onClick={() => setIsNight(false)}
            className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-500 ${!isNight ? 'bg-white text-black shadow-lg' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
            aria-label="Day Mode"
          >
            <Sun size={16} strokeWidth={1.5} />
          </button>
          <button 
            onClick={() => setIsNight(true)}
            className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-500 ${isNight ? 'bg-black text-white shadow-lg border border-white/20' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
            aria-label="Night Mode"
          >
            <Moon size={16} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex bg-white/10 backdrop-blur-xl border border-white/10 rounded-full p-1 shadow-2xl">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('zoom-in'))}
            className="flex items-center justify-center w-12 h-12 rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-all duration-500"
            aria-label="Zoom In"
            title="Zoom In"
          >
            <span className="text-xl leading-none">+</span>
          </button>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('zoom-out'))}
            className="flex items-center justify-center w-12 h-12 rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-all duration-500"
            aria-label="Zoom Out"
            title="Zoom Out"
          >
            <span className="text-xl leading-none">-</span>
          </button>
        </div>

        <button 
          onClick={() => window.location.reload()}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-500 shadow-2xl"
          aria-label="Reset View"
          title="Reset View"
        >
          <RotateCcw size={16} strokeWidth={1.5} />
        </button>
      </motion.div>

    </div>
  );
};

export default HouseControls;
