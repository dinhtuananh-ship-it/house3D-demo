import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-screen flex flex-col justify-end px-6 md:px-16 pb-16 md:pb-24 pointer-events-none z-10 text-white">
      {/* Subtle overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 mix-blend-multiply" />
      
      <div className="max-w-6xl relative z-20">
        <div className="overflow-hidden mb-4">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-[10rem] font-serif font-medium tracking-tighter leading-[0.85]"
          >
            NOVA
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8 md:mb-12">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-[10rem] font-serif font-medium tracking-tighter leading-[0.85] text-white/90"
          >
            HOUSE.
          </motion.h1>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="text-lg md:text-xl font-light tracking-wide max-w-sm"
          >
            Where architecture, nature and modern living come together in perfect harmony.
          </motion.p>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
