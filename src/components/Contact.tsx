import { useState } from 'react';
import { motion } from 'motion/react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import MagneticButton from './MagneticButton';
import { CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Neem Contact Op</h2>
          <p className="text-zinc-600 dark:text-zinc-400 transition-colors">
            Vraag een vrijblijvende offerte aan of stel uw vraag. Wij reageren binnen 24 uur.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-3xl shadow-2xl border border-zinc-100 dark:border-zinc-800 transition-colors duration-300"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 transition-colors">Naam</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                placeholder="Uw naam"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 transition-colors">E-mailadres</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                placeholder="uw@email.nl"
              />
            </div>
          </div>
          <div className="mb-8">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 transition-colors">Bericht</label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all resize-none"
              placeholder="Hoe kunnen we u helpen?"
            />
          </div>

          <div className="flex justify-center">
            <MagneticButton
              className={`w-full md:w-auto px-12 py-4 text-lg font-bold transition-all duration-300 ${
                status === 'success' ? 'bg-green-500 text-white' : 'bg-amber-500 text-zinc-950'
              }`}
            >
              {status === 'submitting' ? (
                <span className="animate-pulse">Verzenden...</span>
              ) : status === 'success' ? (
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6" /> Verzonden!
                </span>
              ) : (
                'Verstuur Bericht'
              )}
            </MagneticButton>
          </div>
          {status === 'error' && (
            <p className="text-red-500 text-center mt-4">Er is iets misgegaan. Probeer het later opnieuw.</p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
