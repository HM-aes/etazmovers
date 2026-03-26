import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function Contact() {
  const whatsappNumber = '31640406400';
  const whatsappMessage = encodeURIComponent('Hallo ETAZ Movers, ik ontvang graag een vrijblijvende offerte.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section id="contact" className="py-24 bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Neem Contact Op</h2>
          <p className="text-zinc-600 dark:text-zinc-400 transition-colors">
            Vraag direct een vrijblijvende offerte aan via WhatsApp. Wij reageren razendsnel!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-zinc-900 p-8 md:p-16 rounded-3xl shadow-2xl border border-zinc-100 dark:border-zinc-800 transition-colors duration-300 text-center flex flex-col items-center"
        >
          <div className="w-24 h-24 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-8">
            <MessageCircle className="w-12 h-12 text-[#25D366]" />
          </div>
          
          <h3 className="text-3xl font-black mb-4">Stuur Ons Een Bericht</h3>
          <p className="text-zinc-600 dark:text-zinc-400 mb-10 max-w-md text-lg">
            Klik op de onderstaande knop om direct een gesprek met ons te starten via WhatsApp. U krijgt persoonlijk contact met een van onze verhuisspecialisten.
          </p>

          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
            <MagneticButton
              className="w-full md:w-auto px-12 py-5 text-xl font-bold transition-all duration-300 bg-[#25D366] text-white hover:bg-[#1ebd5a] shadow-[0_10px_30px_rgba(37,211,102,0.3)] flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-6 h-6" />
              Chat via WhatsApp
            </MagneticButton>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
