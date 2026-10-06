import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Architecture: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section id="architecture" ref={containerRef} className="py-32 px-6 md:px-16 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
        
        <div className="flex-1 w-full relative h-[60vh] lg:h-[90vh] overflow-hidden group">
          <motion.div style={{ y: y1 }} className="absolute inset-0 w-full h-[140%] -top-[20%]">
            <img 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80" 
              alt="NOVA HOUSE Architecture" 
              className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
            />
          </motion.div>
        </div>

        <div className="flex-1 relative">
          <motion.div 
            style={{ y: y2 }}
            className="absolute -top-32 -left-16 text-[12rem] font-serif font-bold text-gray-50/80 pointer-events-none select-none hidden lg:block"
          >
            01
          </motion.div>

          <div className="relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium mb-10 tracking-tight leading-tight"
            >
              Architecture <br /> That Breathes.
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl font-light text-gray-500 max-w-md leading-relaxed mb-12"
            >
              Designed with clean geometry, natural materials and a deep connection to the surrounding landscape. 
              NOVA is not just a house; it's a seamless extension of its environment.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
              className="h-[1px] w-full max-w-sm bg-gray-300 origin-left"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Architecture;
