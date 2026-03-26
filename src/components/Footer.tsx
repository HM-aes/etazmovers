import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer className="bg-zinc-100 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 py-12 border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tighter mb-4 transition-colors">ETAZ MOVERS</h3>
            <p className="max-w-sm">
              Uw betrouwbare partner voor zorgeloze verhuizingen in heel Nederland en daarbuiten.
            </p>
          </div>
          <div>
            <h4 className="text-zinc-900 dark:text-white font-bold mb-4 transition-colors">Diensten</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-amber-500 transition-colors">Particulier</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Zakelijk</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Inpakservice</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-zinc-900 dark:text-white font-bold mb-4 transition-colors">Contact</h4>
            <ul className="space-y-2">
              <li>info@etazmovers.nl</li>
              <li>+31 (0)20 123 4567</li>
              <li>Amsterdam, NL</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center text-sm transition-colors">
          <p>&copy; {new Date().getFullYear()} Etaz Movers. Alle rechten voorbehouden.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-amber-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-amber-500 transition-colors">Voorwaarden</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
