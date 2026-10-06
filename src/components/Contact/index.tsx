import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 px-6 md:px-12 bg-off-white">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-medium mb-6">Contact Us</h2>
          <p className="text-gray-500 font-light">Fill out the form below to request a private visit.</p>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <label className="text-xs uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
              <input type="text" className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-black transition-colors" required />
            </div>
            <div className="flex flex-col">
              <label className="text-xs uppercase tracking-widest text-gray-500 mb-2">Email</label>
              <input type="email" className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-black transition-colors" required />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <label className="text-xs uppercase tracking-widest text-gray-500 mb-2">Phone</label>
              <input type="tel" className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-black transition-colors" />
            </div>
            <div className="flex flex-col">
              <label className="text-xs uppercase tracking-widest text-gray-500 mb-2">Preferred Date</label>
              <input type="date" className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-black transition-colors" />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-xs uppercase tracking-widest text-gray-500 mb-2">Message</label>
            <textarea rows={4} className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-black transition-colors resize-none"></textarea>
          </div>

          <div className="pt-8">
            <button type="submit" className="w-full bg-black text-white uppercase tracking-widest text-sm font-medium py-4 hover:bg-gray-800 transition-colors">
              Request a Visit
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
