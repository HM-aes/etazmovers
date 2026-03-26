import { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { motion } from 'motion/react';
import { MapPin, Search, Loader2 } from 'lucide-react';
import MagneticButton from './MagneticButton';
import Markdown from 'react-markdown';

export default function AIMaps() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Je bent een behulpzame AI-assistent voor Etaz Movers. Beantwoord de volgende vraag met behulp van Google Maps data: ${query}`,
        config: {
          tools: [{ googleMaps: {} }],
        },
      });

      setResult(response.text || 'Geen resultaat gevonden.');
    } catch (err: any) {
      console.error(err);
      setError('Er is een fout opgetreden bij het ophalen van de locatiegegevens.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">AI Locatie Assistent</h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto transition-colors">
            Vraag onze AI naar reistijden, afstanden of handige locaties (zoals bouwmarkten of opslag) in de buurt van uw nieuwe woning.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSearch} className="relative mb-8">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Bijv: Waar is de dichtstbijzijnde bouwmarkt in Amsterdam?"
              className="w-full px-6 py-5 pl-14 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white shadow-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-lg transition-all"
            />
            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 w-6 h-6" />
            <MagneticButton
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-amber-500 text-zinc-950 p-3 rounded-xl hover:bg-amber-400"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            </MagneticButton>
          </form>

          {error && (
            <div className="p-4 bg-red-100 text-red-700 rounded-xl mb-8 text-center">
              {error}
            </div>
          )}

          {result && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl dark:shadow-2xl border border-zinc-100 dark:border-zinc-800 prose prose-zinc dark:prose-invert max-w-none transition-colors duration-300"
            >
              <Markdown>{result}</Markdown>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
