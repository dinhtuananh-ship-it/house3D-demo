import React from 'react';
import { motion } from 'framer-motion';

const spaces = [
  { name: 'Living Room', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80', desc: 'Bathed in natural light with seamless outdoor transitions.' },
  { name: 'Kitchen', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1600&q=80', desc: 'Minimalist aesthetics meeting state-of-the-art culinary tech.' },
  { name: 'Master Suite', image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80', desc: 'A private sanctuary offering unparalleled comfort.' },
];

const Interior: React.FC = () => {
  return (
    <section id="interior" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium mb-6">Inside NOVA.</h2>
            <p className="text-lg text-gray-500 font-light max-w-xl">
              A sanctuary designed for clarity and peace. Natural light pours in through floor-to-ceiling windows, highlighting warm textures and minimalist forms.
            </p>
          </div>
          <a href="#" className="text-[10px] uppercase tracking-[0.2em] font-medium border-b border-black pb-1 hover:text-gray-500 transition-colors">
            View All Spaces
          </a>
        </motion.div>
      </div>

      <div className="space-y-16 md:space-y-32">
        {spaces.map((space, index) => (
          <div key={space.name} className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden group">
            <motion.div 
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <img src={space.image} alt={space.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2000ms]" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-[1000ms]" />
            </motion.div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-[1000ms]">
              <h3 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 transform translate-y-12 group-hover:translate-y-0 transition-transform duration-[1000ms] ease-out">
                {space.name}
              </h3>
              <p className="text-white/80 font-light text-lg transform translate-y-8 group-hover:translate-y-0 transition-transform duration-[1000ms] delay-100 ease-out max-w-md text-center px-6">
                {space.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Interior;
