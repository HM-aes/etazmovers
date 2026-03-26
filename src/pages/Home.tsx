import Hero from '../components/Hero';
import Stats from '../components/Stats';
import AboutUs from '../components/AboutUs';
import Process from '../components/Process';
import TruckAnimation from '../components/TruckAnimation';
import AIVideoGen from '../components/AIVideoGen';
import AIMaps from '../components/AIMaps';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      {/* We removed Services from Home as per user request to have it on its own page */}
      <AboutUs />
      <Process />
      <TruckAnimation />
      <AIVideoGen />
      <AIMaps />
      <Reviews />
      <Contact />
    </main>
  );
}
