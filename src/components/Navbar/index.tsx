import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-8 transition-all duration-700 ${
        isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm py-6 text-black' : 'bg-transparent text-white'
      }`}
    >
      <div className="flex-1">
        <a href="#" className="text-xl md:text-2xl font-serif font-medium tracking-tight">
          NOVA<span className="font-light">HOUSE</span>
        </a>
      </div>

      <div className="flex-1 flex justify-end">
        <a 
          href="#contact" 
          className={`group flex items-center space-x-3 text-[10px] uppercase tracking-[0.2em] font-medium px-6 py-3 border transition-colors ${
            isScrolled ? 'border-black hover:bg-black hover:text-white' : 'border-white/30 hover:bg-white hover:text-black'
          }`}
        >
          <span>Book Tour</span>
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
