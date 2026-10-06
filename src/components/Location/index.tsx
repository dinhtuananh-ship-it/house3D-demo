import React from 'react';
import { motion } from 'framer-motion';

const Location: React.FC = () => {
  return (
    <section id="location" className="py-32 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row gap-16 lg:gap-24 items-center">
        
        <div className="flex-1 w-full h-[50vh] lg:h-[70vh] bg-gray-100 relative overflow-hidden">
          {/* Placeholder for map */}
          <div className="absolute inset-0 bg-[#e6e4df] flex items-center justify-center">
             <div className="text-center">
                <div className="w-4 h-4 bg-black rounded-full mx-auto mb-4 animate-pulse"></div>
                <span className="text-sm tracking-widest uppercase font-medium">NOVA HOUSE LOCATION</span>
             </div>
          </div>
        </div>

        <div className="flex-1">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-medium mb-8"
          >
            A Place to Call Home
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 font-light mb-12"
          >
            Located in a serene neighborhood that perfectly balances natural tranquility with urban convenience.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <h4 className="text-sm font-medium uppercase tracking-widest mb-2">City Center</h4>
              <p className="text-gray-500 font-light">15 minutes drive</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <h4 className="text-sm font-medium uppercase tracking-widest mb-2">International Airport</h4>
              <p className="text-gray-500 font-light">30 minutes drive</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
              <h4 className="text-sm font-medium uppercase tracking-widest mb-2">Central Park</h4>
              <p className="text-gray-500 font-light">5 minutes walk</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
              <h4 className="text-sm font-medium uppercase tracking-widest mb-2">Shopping District</h4>
              <p className="text-gray-500 font-light">10 minutes drive</p>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Location;
