import React from 'react';
import { motion } from 'framer-motion';

const CTA: React.FC = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-[#050505]/90 backdrop-blur-3xl text-white text-center">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium mb-8"
        >
          Ready to see it <br /> in person?
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl font-light text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          Experience NOVA HOUSE and discover what modern living can feel like.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a href="#contact" className="px-8 py-4 bg-white text-black uppercase tracking-widest text-sm font-medium hover:bg-gray-200 transition-colors w-full sm:w-auto">
            Book a Private Tour →
          </a>
          <a href="#" className="px-8 py-4 border border-white text-white uppercase tracking-widest text-sm font-medium hover:bg-white hover:text-black transition-colors w-full sm:w-auto">
            Download Brochure
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
