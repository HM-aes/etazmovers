import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'dark'
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`relative w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-zinc-800 border border-white/10' : 'bg-zinc-200 border border-black/10'
      }`}
      aria-label="Toggle theme"
    >
      <motion.div
        layout
        className={`w-4 h-4 rounded-full flex items-center justify-center ${
          theme === 'dark' ? 'bg-zinc-950 ml-6 text-amber-500' : 'bg-white mr-6 text-amber-600'
        }`}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {theme === 'dark' ? (
          <Moon className="w-3 h-3" />
        ) : (
          <Sun className="w-3 h-3" />
        )}
      </motion.div>
    </motion.button>
  );
}
