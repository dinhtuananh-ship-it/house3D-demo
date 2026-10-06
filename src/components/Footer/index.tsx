import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-white py-16 px-6 md:px-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        <div className="flex-1">
          <h3 className="text-2xl font-serif font-medium tracking-tight mb-2">NOVA HOUSE</h3>
          <p className="text-gray-500 font-light text-sm">A modern sanctuary.</p>
        </div>

        <div className="flex-1 flex justify-start md:justify-center">
          <ul className="flex flex-wrap gap-x-8 gap-y-4 text-xs uppercase tracking-widest text-gray-400">
            <li><a href="#architecture" className="hover:text-white transition-colors">Architecture</a></li>
            <li><a href="#interior" className="hover:text-white transition-colors">Interior</a></li>
            <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="#location" className="hover:text-white transition-colors">Location</a></li>
            <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        <div className="flex-1 flex justify-start md:justify-end">
          <ul className="flex space-x-6 text-xs uppercase tracking-widest text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Pinterest</a></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 text-center md:text-left flex flex-col md:flex-row justify-between text-xs text-gray-600 font-light">
        <p>© 2026 NOVA HOUSE. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0 justify-center">
          <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
