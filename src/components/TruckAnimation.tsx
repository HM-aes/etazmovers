import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function TruckAnimation() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const truckX = useTransform(scrollYProgress, [0, 1], ['-20%', '120%']);
  const roadX = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  return (
    <section ref={ref} className="h-64 bg-zinc-50 dark:bg-zinc-900 relative overflow-hidden flex items-end border-y border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      {/* Scrolling Road */}
      <motion.div
        className="absolute bottom-0 w-[200%] h-8 border-t-2 border-dashed border-zinc-300 dark:border-zinc-600 transition-colors"
        style={{ x: roadX }}
      />

      {/* Animated Truck */}
      <motion.div
        className="absolute bottom-4 w-48 h-24 z-10"
        style={{ x: truckX }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Truck Body */}
        <div className="absolute right-0 bottom-4 w-32 h-20 bg-amber-500 rounded-l-lg rounded-tr-sm flex items-center justify-center border-2 border-zinc-950">
          <span className="font-bold text-zinc-950 text-xl tracking-tighter">ETAZ</span>
        </div>
        {/* Truck Cabin */}
        <div className="absolute left-4 bottom-4 w-12 h-14 bg-zinc-200 rounded-r-xl border-2 border-zinc-950">
          <div className="absolute top-2 right-2 w-6 h-6 bg-sky-200 rounded-tr-md border border-zinc-950" />
        </div>
        {/* Wheels */}
        <motion.div
          className="absolute left-8 bottom-0 w-8 h-8 bg-zinc-800 rounded-full border-4 border-zinc-950 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-2 h-2 bg-zinc-400 rounded-full" />
        </motion.div>
        <motion.div
          className="absolute right-6 bottom-0 w-8 h-8 bg-zinc-800 rounded-full border-4 border-zinc-950 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-2 h-2 bg-zinc-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
