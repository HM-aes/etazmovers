import { motion } from 'motion/react';
import { Truck, Home, Building2, Package, Wrench, ShieldCheck } from 'lucide-react';

const services = [
  {
    title: 'Particuliere Verhuizing',
    description: 'Zorgeloos verhuizen naar uw nieuwe woning met onze ervaren verhuizers.',
    icon: Home,
  },
  {
    title: 'Zakelijke Verhuizing',
    description: 'Efficiënte kantoorverhuizingen met minimale downtime voor uw bedrijf.',
    icon: Building2,
  },
  {
    title: 'Inpakservice',
    description: 'Professioneel inpakken van uw spullen voor maximale bescherming.',
    icon: Package,
  },
  {
    title: 'Montage & Demontage',
    description: 'Vakkundige (de)montage van uw meubels door onze specialisten.',
    icon: Wrench,
  },
  {
    title: 'Transport',
    description: 'Veilig transport van enkele stuks tot complete inboedels.',
    icon: Truck,
  },
  {
    title: 'Opslag',
    description: 'Tijdelijke of langdurige opslag in onze beveiligde faciliteiten.',
    icon: ShieldCheck,
  },
];

export default function Services() {
  return (
    <section className="py-24 bg-zinc-950 text-white overflow-hidden">
      {/* Marquee */}
      <div className="w-full bg-amber-500 text-zinc-950 py-4 overflow-hidden whitespace-nowrap mb-20 -rotate-2 scale-110">
        <motion.div
          className="inline-block font-bold text-2xl uppercase tracking-widest"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        >
          {Array(10).fill('ETAZ MOVERS • SNEL • VEILIG • BETROUWBAAR • ').join('')}
        </motion.div>
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Onze Diensten</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Wij bieden een compleet pakket aan verhuisdiensten, afgestemd op uw specifieke wensen en behoeften.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 hover:border-amber-500/50 transition-colors group"
            >
              <div className="w-14 h-14 bg-zinc-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors">
                <service.icon className="w-7 h-7 text-amber-500 group-hover:text-zinc-950 transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
