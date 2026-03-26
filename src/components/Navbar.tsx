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
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:0640406400" className="flex items-center gap-2 font-mono text-sm text-zinc-600 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-500 transition-colors">
              <Phone className="w-4 h-4" />
              06 40 40 64 00
            </a>
            <a 
              href="https://wa.me/31640406400?text=Hallo%20ETAZ%20Movers,%20ik%20ontvang%20graag%20een%20vrijblijvende%20offerte."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
              title="Chat via WhatsApp"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
            </a>
          </div>
          
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
