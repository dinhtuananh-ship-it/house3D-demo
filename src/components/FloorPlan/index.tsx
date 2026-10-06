import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloorPlan: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ground' | 'second'>('ground');

  const plans = {
    ground: {
      rooms: [
        { name: 'Living Room', area: '42 m²' },
        { name: 'Kitchen & Dining', area: '38 m²' },
        { name: 'Guest Bedroom', area: '20 m²' },
        { name: 'Garage', area: '36 m²' },
        { name: 'Garden & Pool', area: '85 m²' },
      ]
    },
    second: {
      rooms: [
        { name: 'Master Bedroom', area: '35 m²' },
        { name: 'Master Bath', area: '15 m²' },
        { name: 'Bedroom 3', area: '18 m²' },
        { name: 'Bedroom 4', area: '18 m²' },
        { name: 'Terrace', area: '24 m²' },
      ]
    }
  };

  return (
    <section className="py-32 px-6 md:px-16 bg-[#e6dec8]/30">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
        
        <div className="flex-1 w-full">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl font-serif font-medium mb-16"
          >
            The Layout.
          </motion.h2>

          <div className="flex space-x-12 mb-16 border-b border-gray-300 pb-6 relative">
            <button 
              onClick={() => setActiveTab('ground')}
              className={`text-[10px] tracking-[0.2em] uppercase transition-colors ${activeTab === 'ground' ? 'text-black font-medium' : 'text-gray-400 hover:text-gray-800'}`}
            >
              Ground Floor
            </button>
            <button 
              onClick={() => setActiveTab('second')}
              className={`text-[10px] tracking-[0.2em] uppercase transition-colors ${activeTab === 'second' ? 'text-black font-medium' : 'text-gray-400 hover:text-gray-800'}`}
            >
              Second Floor
            </button>
            {/* Active Tab Indicator */}
            <div className={`absolute bottom-0 h-[1px] bg-black transition-all duration-500 ease-out ${activeTab === 'ground' ? 'left-0 w-24' : 'left-[130px] w-24'}`} />
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                {plans[activeTab].rooms.map((room, idx) => (
                  <div key={idx} className="flex justify-between items-end border-b border-gray-200 pb-6 group">
                    <span className="text-xl font-serif text-gray-800 group-hover:pl-4 transition-all duration-300">{room.name}</span>
                    <span className="text-gray-500 font-light text-sm">{room.area}</span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex-1 w-full flex items-center justify-center lg:justify-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg aspect-square bg-white shadow-2xl p-12 flex flex-col items-center justify-center border border-gray-100"
            >
              <div className="w-full h-full border border-gray-200 border-dashed flex flex-col items-center justify-center relative">
                <div className="absolute top-4 left-4 text-[10px] tracking-widest text-gray-300 uppercase">
                  N
                </div>
                <div className="text-center">
                  <div className="w-16 h-[1px] bg-gray-300 mx-auto mb-6"></div>
                  <span className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-medium">Blueprint Visualization</span>
                  <div className="w-16 h-[1px] bg-gray-300 mx-auto mt-6"></div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default FloorPlan;
