import React from 'react';
import { motion } from 'framer-motion';

const features = [
  { num: '01', title: '4 Bedrooms', desc: 'Spacious suites with panoramic views.' },
  { num: '02', title: '3 Bathrooms', desc: 'Luxurious stone finishes and rainfall showers.' },
  { num: '03', title: '320 m²', desc: 'Expansive open-plan living areas.' },
  { num: '04', title: 'Infinity Pool', desc: 'Seamlessly blending with the horizon.' },
  { num: '05', title: 'Private Garden', desc: 'Landscaped serenity steps from your door.' },
  { num: '06', title: 'Smart Home', desc: 'Integrated climate, lighting, and security.' },
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-32 px-6 md:px-16 bg-[#0a0a0c]/80 backdrop-blur-2xl text-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-32 relative z-10">
        <div className="lg:w-1/3">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl font-serif font-medium leading-tight mb-8"
          >
            Everything <br /> Has Its Place.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-gray-400 font-light text-lg"
          >
            We believe that true luxury lies in space, light, and the quality of materials. 
            Every detail is meticulously crafted.
          </motion.p>
        </div>

        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col border-t border-white/20 pt-8"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-6">{feature.num}</span>
              <span className="text-2xl font-serif font-medium tracking-wide mb-3">{feature.title}</span>
              <span className="text-gray-400 font-light">{feature.desc}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
