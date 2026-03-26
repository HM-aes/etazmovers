import { motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

function Counter({ from, to, duration, suffix = '' }: { from: number; to: number; duration: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setCount(Math.floor(progress * (to - from) + from));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Stats() {
  const stats = [
    { label: 'Tevreden Klanten', value: 1500, suffix: '+' },
    { label: 'Ervaring', value: 15, suffix: ' jaar' },
    { label: 'Schadevrij', value: 98, suffix: '%' },
    { label: 'Bereikbaar', value: 24, suffix: '/7' },
  ];

  return (
    <section className="bg-amber-500 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-zinc-950 mb-2 font-mono">
                <Counter from={0} to={stat.value} duration={2} suffix={stat.suffix} />
              </div>
              <div className="text-sm md:text-base font-medium text-zinc-800 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
