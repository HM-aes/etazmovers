import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { Star } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  createdAt: any;
}

const defaultReviews = [
  { id: '1', name: 'Jan de Vries', rating: 5, text: 'Geweldige service, snelle verhuizing zonder schade!', createdAt: new Date() },
  { id: '2', name: 'Sophie Bakker', rating: 5, text: 'Vriendelijk personeel en alles netjes op zijn plek gezet.', createdAt: new Date() },
  { id: '3', name: 'Pieter Jansen', rating: 4, text: 'Goede communicatie vooraf en tijdens de verhuizing.', createdAt: new Date() },
  { id: '4', name: 'Emma Visser', rating: 5, text: 'Top verhuisbedrijf! Zeker een aanrader voor iedereen.', createdAt: new Date() },
];

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(defaultReviews);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'), limit(10));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const fetchedReviews = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Review[];
        setReviews(fetchedReviews);
      }
    }, (error) => {
      console.error('Error fetching reviews:', error);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-6 mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Wat Onze Klanten Zeggen</h2>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto transition-colors">
          Ontdek waarom honderden klanten voor Etaz Movers kozen.
        </p>
      </div>

      <div
        className="relative flex overflow-hidden w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex gap-6 px-6"
          animate={{ x: isHovered ? 0 : ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{ width: 'max-content' }}
        >
          {/* Duplicate array for seamless loop */}
          {[...reviews, ...reviews].map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              className="w-80 md:w-96 flex-shrink-0 bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md dark:shadow-none transition-colors duration-300"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 transition-colors ${i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-zinc-300 dark:text-zinc-700'}`}
                  />
                ))}
              </div>
              <p className="text-zinc-700 dark:text-zinc-300 mb-6 italic transition-colors">"{review.text}"</p>
              <div className="font-bold text-amber-500">{review.name}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
