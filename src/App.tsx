/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Routes, Route } from 'react-router-dom';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Diensten from './pages/Diensten';
import Process from './components/Process';
import TruckAnimation from './components/TruckAnimation';
import Reviews from './components/Reviews';
import AIVideoGen from './components/AIVideoGen';
import AIMaps from './components/AIMaps';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen text-zinc-950 dark:text-zinc-50 font-sans selection:bg-amber-500 selection:text-zinc-950 transition-colors duration-300">
      <Cursor />
      
      <AnimatePresence mode="wait">
        {isLoading && <Loader key="loader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      
      {!isLoading && (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/diensten" element={<Diensten />} />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
}
