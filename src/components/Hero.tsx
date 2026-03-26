import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import MagneticButton from './MagneticButton';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const yNumber = useTransform(scrollYProgress, [0, 1], ['0%', '-150%']);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 1.5, delayChildren: 1.5 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: -120 },
    show: { opacity: 1, y: 0, transition: { duration: 5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  };

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center transition-colors duration-300"
    >
      {/* Parallax Background Image */}
      <motion.div
        className="absolute inset-0 z-0 opacity-20 dark:opacity-40 grayscale transition-opacity duration-300"
        style={{
          y: yBg,
          backgroundImage: 'url(https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&q=80&w=2000)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Floating Geometric Shapes & Orbiting Rings */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 border border-amber-500/20 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-96 h-96 border border-zinc-500/20 rounded-full"
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full"
          animate={{ y: [0, -50, 0], x: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-48 h-48 bg-zinc-500/10 blur-3xl rounded-full"
          animate={{ y: [0, 60, 0], x: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{ y: yText }}
          className="max-w-4xl"
        >
          <motion.h1 variants={item} className="text-5xl md:text-7xl lg:text-8xl font-bold text-zinc-900 dark:text-white tracking-tighter leading-none mb-2 transition-colors">
            VERHUIZEN ZONDER
          </motion.h1>
          <motion.h1 variants={item} className="text-5xl md:text-7xl lg:text-8xl font-bold text-amber-600 dark:text-amber-500 tracking-tighter leading-none mb-6">
            ZORGEN
          </motion.h1>
          <motion.p variants={item} className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 mb-10 max-w-2xl mx-auto transition-colors">
            Etaz Movers is uw betrouwbare partner voor particuliere en zakelijke verhuizingen. Snel, veilig en professioneel.
          </motion.p>
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/#contact">
              <MagneticButton className="bg-amber-500 text-zinc-950 px-8 py-4 text-lg">
                Vraag Offerte Aan
              </MagneticButton>
            </a>
            <a href="/diensten">
              <MagneticButton className="bg-transparent border border-zinc-300 dark:border-zinc-500 text-zinc-900 dark:text-white px-8 py-4 text-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                Onze Diensten
              </MagneticButton>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Parallax Number */}
      <motion.div
        className="absolute bottom-10 right-10 text-[15rem] font-bold text-zinc-900/5 dark:text-white/5 pointer-events-none z-0 leading-none transition-colors"
        style={{ y: yNumber }}
      >
        01
      </motion.div>
    </section>
  );
}
