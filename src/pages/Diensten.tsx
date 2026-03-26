import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { Truck, Home, Building2, Package, Wrench, ShieldCheck, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Particuliere Verhuizingen',
    description: 'Gaat u verhuizen naar een nieuwe woning? Wij zorgen voor een soepel en efficiënt verloop van uw verhuizing. Van inpakken tot transport en het plaatsen van uw meubels op de exacte juiste plek. Uw inboedel is bij ons in veilige handen vanaf het eerste moment.',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Zakelijke Verhuizingen',
    description: 'Een zakelijke verhuizing vraagt om zorgvuldige planning en snelheid. ETAZ Movers zorgt ervoor dat uw bedrijf zo min mogelijk stil komt te liggen dankzij onze gestructureerde aanpak. Of het nu gaat om een interne verhuizing of een transitie naar een compleet nieuw pand.',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Montageservice',
    description: 'Een mooie keuken gevonden in de showroom of op Marktplaats? Wij zorgen voor een vakkundige demontage, transport en perfecte installatie in uw woning. Ook voor eventueel leiding- en elektrawerk bent u bij ETAZ Montage aan het juiste adres. Kortom: volledige ontzorging!',
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Opslag & Ontruimingen',
    description: 'Woning of pand leegmaken? ETAZ Movers verzorgt complete ontruimingen, snel en 100% discreet. Ook het stofvrij opleveren van het pand, tijdelijke klimaatgecontroleerde opslag van uw inboedel en herstelwerkzaamheden aan de woning behoren tot onze mogelijkheden.',
    icon: ShieldCheck,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Inpakservice',
    description: 'Geen tijd of zin om zelf in te pakken? Ons professionele team verzorgt het inpakken van uw gehele inboedel. Wij gebruiken uitsluitend de stevigste materialen en beproefde methoden om uw kostbare bezittingen tijdens het transport optimaal te beschermen.',
    icon: Package,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Speciaal Transport',
    description: "Veilig en verzekerd transport van uiterst kwetsbare goederen, zware kluizen, kunstobjecten en piano's. Vakkundig verpakt, vastgezet en getransporteerd in onze speciaal uitgeruste luchtgeveerde verhuiswagens voor maximale stabiliteit en precisie.",
    icon: Truck,
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80&w=800',
  },
];

export default function Diensten() {
  const headerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.drop-text', {
        y: -120,
        opacity: 0,
        duration: 5,
        stagger: 1.5,
        ease: 'power1.out',
        delay: 1.5 // Start after Navbar settles
      });

      gsap.from('.drop-subtext', {
        y: 60,
        opacity: 0,
        duration: 4,
        delay: 4.5,
        ease: 'power1.out'
      });

      // ScrollTrigger Animation for the new Large Image Cards
      const cards = gsap.utils.toArray('.service-card') as HTMLElement[];
      
      cards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse',
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white pt-20 transition-colors duration-300" ref={headerRef}>
      {/* Header Section */}
      <section className="relative py-32 px-6 overflow-hidden border-b border-black/5 dark:border-white/5 transition-colors duration-300">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 dark:from-amber-500/5 to-transparent z-0"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 ref={textRef} className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase overflow-hidden">
            <span className="inline-block drop-text text-amber-500">Volledige </span>
            <span className="inline-block drop-text ml-4">Ontzorging</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto drop-subtext font-mono tracking-tight transition-colors">
            Van particuliere verhuizingen tot complexe montages en veilige opslag. Ontdek wat wij voor u kunnen betekenen.
          </p>
        </div>
      </section>

      {/* Enhanced Services Grid Section */}
      <section className="py-24 px-6 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto" ref={cardsRef}>
          <div className="grid md:grid-cols-2 gap-10">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="service-card group relative bg-white dark:bg-zinc-900 overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/50 transition-all duration-500 shadow-xl dark:shadow-2xl flex flex-col h-full"
              >
                {/* Image Header */}
                <div className="relative h-64 overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-white/20 dark:bg-zinc-950/20 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-multiply"></div>
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                  />
                  {/* Floating Icon */}
                  <div className="absolute top-4 right-4 z-20 w-14 h-14 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-500 group-hover:bg-amber-500 group-hover:text-white dark:group-hover:text-zinc-950 transition-colors duration-500 shadow-xl">
                    <service.icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-10 flex flex-col grow bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 transition-colors duration-300">
                  <h3 className="text-3xl font-black tracking-tight mb-4 flex items-center justify-between">
                    {service.title}
                  </h3>
                  <div className="w-12 h-1 bg-amber-500 mb-6 transform origin-left group-hover:scale-x-150 transition-transform duration-500"></div>
                  
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg mb-8 grow transition-colors">
                    {service.description}
                  </p>

                  <div className="inline-flex items-center gap-3 text-amber-500 font-bold uppercase tracking-widest text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                    Vraag offerte aan
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Contact Banner */}
      <section className="py-32 px-6 bg-amber-500 text-zinc-950 text-center relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ backgroundImage: 'radial-gradient(circle at center, #000 2px, transparent 2.5px)', backgroundSize: '40px 40px' }}
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">
            Klaar Voor De Volgende Stap?
          </h2>
          <p className="text-2xl font-bold mb-10 opacity-80">
            Neem vrijblijvend contact op en ontvang razendsnel een offerte.
          </p>
          <a href="/#contact" className="inline-block bg-zinc-900 text-white dark:bg-zinc-950 dark:text-white px-12 py-5 text-lg font-black tracking-widest uppercase hover:bg-zinc-800 dark:hover:bg-white dark:hover:text-zinc-950 transition-all duration-300 shadow-2xl transform hover:scale-105" style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)' }}>
            Vraag Offerte Aan
          </a>
        </div>
      </section>
    </main>
  );
}
