import { useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag, X, Menu, ArrowUpRight } from 'lucide-react';
import { WineCardLight } from '@/components/WineCardLight';
import { Accordion } from '@/components/Accordion';
import { Newsletter } from '@/components/Newsletter';
import { ScrollProgress } from '@/components/ScrollProgress';
import { ContactForm } from '@/components/ContactForm';
import { StickyCTA } from '@/components/StickyCTA';

gsap.registerPlugin(ScrollTrigger);

// Version ALLÉGÉE - Mode économie d'énergie
const F = {
  display: "'Cormorant Garamond', Georgia, serif",
  ui: "'Inter', -apple-system, sans-serif",
};

const C = {
  bg: '#F5ECDF',
  bgElevated: '#FDF7F0',
  text: '#1A0606',
  textMuted: 'rgba(26,6,6,0.55)',
  accent: '#8B1414',
  gold: '#C4A558',
  sage: '#8B7355',
};

const IMAGES = {
  hero: '/taluau/6syg9mu2g9lk16ryryijjp_TZRxp63bv.webp',
  family: '/taluau/famille-taluau-foltzenlogel.webp',
};

const featuredWines = [
  { name: 'Le Vau Jaumier', cuvee: 'Coteaux argilo-calcaires', price: '12,50 €', image: '/taluau/nbl653dzyehptv8so6wh99_soEGh57Ut.png' },
  { name: 'Vieilles Vignes', cuvee: 'Vignes 50+ ans', price: '14,00 €', image: '/taluau/nkaj3xmrnvjo95wzjgdngt7_pKXzI-qx8.jpeg' },
  { name: "L'Insoumise", cuvee: 'Sélection parcellaire', price: '15,50 €', image: '/taluau/n8zixrrzcq7bs2ujhrhuuim_sztDqd0VX9.jpeg' },
  { name: "L'Expression", cuvee: 'Terroir argilo-sableux', price: '13,00 €', image: '/taluau/nbi07vuduokcs6lcpl65v0i_sya4UmJEP.png' },
];

const faqItems = [
  { question: 'Où acheter vos vins ?', answer: 'Au caveau à Chevrette ou sur notre boutique en ligne.' },
  { question: 'Proposez-vous des visites ?', answer: 'Oui, sur rendez-vous au 02 47 97 78 64.' },
  { question: 'Température de service ?', answer: '14-17°C selon les cuvées.' },
];

// VERSION ALLÉGÉE - Sans animations lourdes
export default function AppLight() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: C.bg, color: C.text, fontFamily: F.ui }}>
      <ScrollProgress />
      <StickyCTA />

      {/* NAVBAR SIMPLIFIÉE */}
      <nav className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center transition-all ${
        scrolled ? 'bg-[#F5EDE4]/95 shadow-sm' : 'bg-transparent'
      }`}>
        <a href="#" className="text-sm tracking-[0.15em] uppercase font-medium" style={{ color: C.text }}>
          Taluau · Foltzenlogel
        </a>
        
        <div className="hidden md:flex items-center gap-8">
          {['Vins', 'Domaine', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-xs tracking-[0.1em] uppercase hover:opacity-70 transition-opacity"
              style={{ color: C.textMuted }}
            >
              {item}
            </a>
          ))}
        </div>
        
        <button 
          className="md:hidden p-2"
          onClick={() => setMenuOpen(true)}
        >
          <Menu className="w-5 h-5" style={{ color: C.text }} />
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8" style={{ background: C.bg }}>
          <button className="absolute top-6 right-8" onClick={() => setMenuOpen(false)}>
            <X className="w-6 h-6" style={{ color: C.text }} />
          </button>
          {['Vins', 'Domaine', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={() => setMenuOpen(false)}
              className="text-3xl font-light"
              style={{ fontFamily: F.display, color: C.text }}
            >
              {item}
            </a>
          ))}
        </div>
      )}

      {/* HERO SIMPLIFIÉ - Sans vidéo, animations réduites */}
      <section className="min-h-[80vh] flex items-center justify-center px-6 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: C.sage }}>
            Saint-Nicolas-de-Bourgueil
          </p>
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-light mb-6"
            style={{ fontFamily: F.display, color: C.text }}
          >
            Vignerons depuis 1970
          </h1>
          <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: C.textMuted }}>
            Cabernet Franc 100% · Val de Loire
          </p>
          <a 
            href="https://vins-taluau-foltzenlogel.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm tracking-wider uppercase text-white"
            style={{ background: C.accent }}
          >
            Découvrir nos vins <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* VINS - SANS ANIMATIONS COMPLEXES */}
      <section id="vins" className="py-16 px-6" style={{ background: C.bgElevated }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: C.sage }}>Nos Cuvées</p>
            <h2 className="text-3xl md:text-5xl font-light" style={{ fontFamily: F.display }}>
              100% Cabernet Franc
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredWines.map((wine) => (
              <WineCardLight key={wine.name} wine={wine} />
            ))}
          </div>
        </div>
      </section>

      {/* DOMAINE - SIMPLIFIÉ */}
      <section id="domaine" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: C.sage }}>Notre Histoire</p>
              <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ fontFamily: F.display }}>
                Vignerons en Val de Loire
              </h2>
              <p className="mb-6" style={{ color: C.textMuted }}>
                Joël Taluau et Thierry Foltzenlogel cultivent avec passion leurs vignes 
                à Chevrette, au cœur de l'appellation Saint-Nicolas-de-Bourgueil.
              </p>
              <div className="flex gap-8">
                <div>
                  <p className="text-3xl font-light" style={{ color: C.accent, fontFamily: F.display }}>20+</p>
                  <p className="text-xs tracking-wider uppercase" style={{ color: C.textMuted }}>Hectares</p>
                </div>
                <div>
                  <p className="text-3xl font-light" style={{ color: C.accent, fontFamily: F.display }}>50+</p>
                  <p className="text-xs tracking-wider uppercase" style={{ color: C.textMuted }}>Ans</p>
                </div>
              </div>
            </div>
            <img 
              src={IMAGES.family} 
              alt="Famille" 
              className="rounded-2xl shadow-lg"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6" style={{ background: C.bgElevated }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-light text-center mb-10" style={{ fontFamily: F.display }}>
            Questions fréquentes
          </h2>
          <Accordion items={faqItems} />
        </div>
      </section>

      <Newsletter />

      {/* CONTACT */}
      <section id="contact" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-light mb-6" style={{ fontFamily: F.display }}>
                Contactez-nous
              </h2>
              <div className="space-y-4 text-sm" style={{ color: C.textMuted }}>
                <p>Chevrette<br/>37140 Saint-Nicolas-de-Bourgueil</p>
                <p><a href="tel:+33247977864" style={{ color: C.accent }}>02 47 97 78 64</a></p>
                <p>Lundi-Samedi, 9h-18h</p>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t" style={{ borderColor: 'rgba(92,64,51,0.1)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-lg font-light" style={{ fontFamily: F.display }}>Taluau · Foltzenlogel</p>
          <p className="text-xs" style={{ color: 'rgba(26,6,6,0.4)' }}>© 2026 · Vignerons en Val de Loire</p>
        </div>
      </footer>
    </div>
  );
}
