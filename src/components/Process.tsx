import { motion } from 'motion/react';

const steps = [
  { num: '01', title: 'Aanvraag', desc: 'Vul het formulier in of bel ons voor een vrijblijvende offerte.' },
  { num: '02', title: 'Planning', desc: 'Samen bespreken we de details en plannen we de verhuisdatum.' },
  { num: '03', title: 'Uitvoering', desc: 'Onze professionals voeren de verhuizing efficiënt en veilig uit.' },
  { num: '04', title: 'Oplevering', desc: 'We controleren alles samen met u voor 100% tevredenheid.' },
];

export default function Process() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Onze Werkwijze</h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto transition-colors">
            Een transparant en efficiënt proces voor een zorgeloze verhuizing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-zinc-200 dark:bg-zinc-800 z-0 transition-colors" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 bg-white dark:bg-zinc-900 rounded-full border-4 border-amber-500 flex items-center justify-center text-3xl font-bold text-zinc-950 dark:text-white mb-6 shadow-xl transition-colors">
                {step.num}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 transition-colors">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
