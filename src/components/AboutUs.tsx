import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Check } from 'lucide-react';

export default function AboutUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  
  const reasons = [
    'Gediplomeerde verhuizers',
    'Volledig verzekerd transport',
    'Transparante tarieven',
  ];

  return (
    <section id="over-ons" className="py-32 px-6 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white overflow-hidden relative transition-colors duration-300" ref={containerRef}>
      {/* Background Dots */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at center, #52525b 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}
      />
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        
        {/* Left: Image with Parallax & Hover Enhancement */}
        <div className="relative group perspective-1000">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-500/20 blur-3xl rounded-full transition-transform duration-700 group-hover:scale-150 group-hover:bg-amber-500/30"></div>
          
          <motion.div 
            className="relative z-10 w-full h-[600px] overflow-hidden rounded-2xl shadow-2xl border border-black/5 dark:border-white/5"
            whileHover={{ scale: 1.02, rotateY: 5, rotateX: 2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.img 
              style={{ y: imageY, scale: 1.15 }}
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
              alt="Moving House"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="absolute bottom-6 right-6 lg:-right-12 z-20 bg-amber-500 text-zinc-950 p-8 rounded-xl shadow-[0_20px_40px_rgba(245,158,11,0.3)] backdrop-blur-md"
          >
            <div className="font-black text-4xl leading-tight">
              10+ JAAR<br/>
              <span className="text-xl font-medium font-mono uppercase tracking-widest">ERVARING</span>
            </div>
          </motion.div>
        </div>
        
        {/* Right: Content */}
        <div className="space-y-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-6xl font-black tracking-tighter leading-none"
          >
            WAAROM KIEZEN VOOR <span className="text-amber-600 dark:text-amber-500 transition-colors">ETAZ MOVERS?</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed transition-colors"
          >
            Bij Etaz Movers begrijpen we dat elke verhuizing uniek is. Ons team combineert fysieke kracht met logistiek inzicht om uw transitie vlekkeloos te laten verlopen.
          </motion.p>
          
          <ul className="space-y-6">
            {reasons.map((reason, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (index * 0.1) }}
                className="flex items-center gap-4 text-lg font-bold group text-zinc-900 dark:text-white transition-colors"
              >
                <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors duration-300">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-500 group-hover:text-zinc-950 transition-colors" strokeWidth={3} />
                </div>
                {reason}
              </motion.li>
            ))}
          </ul>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="pt-8"
          >
            <button className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 px-10 py-5 font-black text-sm uppercase tracking-widest hover:bg-amber-600 dark:hover:bg-amber-500 hover:text-white dark:hover:text-zinc-950 hover:tracking-[0.25em] transition-all duration-300 shadow-xl"
            style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)' }}>
              LEES OVER ONZE AANPAK
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
