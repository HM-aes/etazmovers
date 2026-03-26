import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Phone, Truck, Box, UserRound } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-black/10 dark:border-white/10 py-2 shadow-sm'
          : 'bg-transparent border-transparent py-4 backdrop-blur-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO SECTION */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-14 h-14 bg-black/5 dark:bg-white/5 rounded-xl flex items-center justify-center p-1 relative overflow-hidden shrink-0 border border-black/10 dark:border-white/10 group-hover:border-amber-500/50 transition-colors">
              <img 
                src="https://etazmovers.nl/wp-content/uploads/2025/12/cropped-ETAZ-Movers-logo.png" 
                alt="ETAZ Movers Logo" 
                className="w-full h-full object-contain transform group-hover:scale-110 transition-all duration-500 invert dark:invert-0 drop-shadow-sm dark:drop-shadow-none"
              />
            </div>
            
            <div className="flex flex-col">
              <span className="font-black text-2xl tracking-tighter text-zinc-900 dark:text-white leading-none transition-colors">
                ETAZ MOVERS
              </span>
              <span className="text-[10px] font-mono tracking-[0.2em] text-amber-600 dark:text-amber-500 uppercase mt-1 transition-colors">
                Professionele Verhuisservice
              </span>
            </div>
          </Link>
        </div>
        
        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8 font-mono text-sm uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
          <Link to="/" className="text-zinc-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-500 transition-colors relative group">
            Home
            <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-amber-500 origin-left scale-x-100 transition-transform"></span>
          </Link>
          <Link to="/diensten" className="hover:text-amber-600 dark:hover:text-amber-500 transition-colors relative group">
            Onze Diensten
            <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-amber-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform"></span>
          </Link>
        </div>

        {/* CTA SECTION */}
        <div className="flex items-center gap-6">
          <ThemeToggle />
          <a href="tel:0640406400" className="hidden lg:flex items-center gap-2 font-mono text-sm text-zinc-600 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-500 transition-colors">
            <Phone className="w-4 h-4" />
            06 40 40 64 00
          </a>
          
          {/* Kinetic Button */}
          <a href="/#contact" className="bg-amber-500 text-zinc-950 px-6 py-3 font-black text-xs uppercase tracking-widest hover:bg-white hover:pl-8 hover:pr-4 transition-all duration-300 shadow-[0_10px_30px_rgba(245,158,11,0.2)] flex items-center gap-2"
            style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)' }}>
            <span>Offerte Aanvragen</span>
            <span className="w-4 h-[2px] bg-zinc-950 inline-block"></span>
          </a>
        </div>

      </div>
    </motion.nav>
  );
}
