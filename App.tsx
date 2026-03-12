import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag, X, Menu, ArrowUpRight, Volume2, VolumeX } from 'lucide-react';
import { ParallaxImage } from '@/components/ParallaxImage';
import { Magnetic } from '@/components/Magnetic';
import { Loader } from '@/components/Loader';
import { CustomCursor } from '@/components/CustomCursor';
import { Marquee } from '@/components/Marquee';
import { SmoothScroll } from '@/components/SmoothScroll';
import { FilmGrain } from '@/components/FilmGrain';
import { EnhancedTextReveal } from '@/components/EnhancedTextReveal';
import { WineCard } from '@/components/WineCard';
import { Accordion } from '@/components/Accordion';
import { TerroirParallax } from '@/components/TerroirParallax';
import { ProcessSteps } from '@/components/ProcessSteps';
import { Awards } from '@/components/Awards';
import { Newsletter } from '@/components/Newsletter';
import { ScrollProgress } from '@/components/ScrollProgress';
import { Hero21st } from '@/components/Hero21st';
import { ContactForm } from '@/components/ContactForm';
import { useAudio } from '@/context/AudioContext';
import { MegaMenu } from '@/components/MegaMenu';
import { StickyCTA } from '@/components/StickyCTA';
import { WineCardEnhanced } from '@/components/WineCardEnhanced';

gsap.registerPlugin(ScrollTrigger);

// Typography
const F = {
  display: "'Cormorant Garamond', Georgia, serif",
  ui: "'Inter', -apple-system, sans-serif",
};

// Colors - Thème Bourgueil / Bordeaux & Crème
const C = {
  bg: '#F5ECDF',
  bgElevated: '#FDF7F0',
  bgDark: '#1A0606',
  text: '#1A0606',
  textMuted: 'rgba(26,6,6,0.55)',
  accent: '#8B1414',
  accentLight: '#C4453A',
  gold: '#C4A558',
  sage: '#8B7355',
};

// Photos réelles du Domaine Taluau-Foltzenlogel
const IMAGES = {
  hero: 'https://assets.evolusite.fr/1/6syg9mu2g9lk16ryryijjp_TZRxp63bv.png',
  family: 'https://assets.evolusite.fr/ik-seo/1/ud5882i9lmplkfk8dkqr_THz8Nakc0/famille-taluau-foltzenlogel.jpg',
  terroir1: 'https://assets.evolusite.fr/1/6syg9mu2g9lk16ryryijjp_TZRxp63bv.png',
  terroir2: 'https://assets.evolusite.fr/ik-seo/1/ifdvl4kytmlndr9xi6yu5_baKVvkRHL/vigne-domaine-taluau-foltzenlogel.jpg',
  terroir3: 'https://assets.evolusite.fr/ik-seo/1/qpkfx55th8wlz1w87cez_L6wSzRM9C/la-taille-des-vignes-a-bourgueil.jpg',
  vigneron1: 'https://assets.evolusite.fr/ik-seo/1/ud5882i9lmplkfk8dkqr_THz8Nakc0/famille-taluau-foltzenlogel.jpg',
  vigneron2: 'https://assets.evolusite.fr/ik-seo/1/ifdvl4kytmlndr9xi6yu5_baKVvkRHL/vigne-domaine-taluau-foltzenlogel.jpg',
  vigneron3: 'https://assets.evolusite.fr/ik-seo/1/qpkfx55th8wlz1w87cez_L6wSzRM9C/la-taille-des-vignes-a-bourgueil.jpg',
  chai: 'https://assets.evolusite.fr/1/q8ibbpfsrng2jufudypvo_D5h6l8yXh.png',
  tank: 'https://assets.evolusite.fr/1/q8ibbpfsrng2jufudypvo_D5h6l8yXh.png',
};

// Cuvées réelles du Domaine Taluau-Foltzenlogel
const featuredWines = [
  { name: 'Le Vau Jaumier', cuvee: 'Coteaux argilo-calcaires', appellation: 'AOP Saint-Nicolas-de-Bourgueil', price: '12,50 €', vintage: 2022, image: 'https://assets.evolusite.fr/1/nbl653dzyehptv8so6wh99_soEGh57Ut.png', badge: 'Signature', poem: 'Charnu et équilibré, aux notes de fruits rouges et d\'épices douces.' },
  { name: 'Vieilles Vignes', cuvee: 'Vignes de plus de 50 ans', appellation: 'AOP Saint-Nicolas-de-Bourgueil', price: '14,00 €', vintage: 2021, image: 'https://assets.evolusite.fr/1/nkaj3xmrnvjo95wzjgdngt7_pKXzI-qx8.jpeg', badge: 'Coup de cœur', poem: 'Concentré et profond, expression maximale du Cabernet Franc.' },
  { name: "L'Insoumise", cuvee: 'Sélection parcellaire', appellation: 'AOP Saint-Nicolas-de-Bourgueil', price: '15,50 €', vintage: 2021, image: 'https://assets.evolusite.fr/1/n8zixrrzcq7bs2ujhrhuuim_sztDqd0VX9.jpeg', poem: 'Caractère affirmé, tanins soyeux, finale longue et persistante.' },
  { name: "L'Expression", cuvee: 'Terroir argilo-sableux', appellation: 'AOP Saint-Nicolas-de-Bourgueil', price: '13,00 €', vintage: 2022, image: 'https://assets.evolusite.fr/1/nbi07vuduokcs6lcpl65v0i_sya4UmJEP.png', poem: "La quintessence du Saint-Nicolas, frais et floral." },
  { name: 'Bourgueil Passion', cuvee: 'AOP Bourgueil · tuffeau', appellation: 'AOP Bourgueil', price: '11,50 €', vintage: 2022, image: 'https://assets.evolusite.fr/1/nwr4uevp7nvl95veeobn1m8_lt6ZiZ_1sw.jpeg', badge: 'Accessible', poem: 'Souple, fruité, idéal pour la table du quotidien.' },
];

const timeline = [
  { year: '1970', title: 'Les origines', text: 'Joël Taluau s\'installe à Chevrette et plante les premières vignes de Cabernet Franc.' },
  { year: '1985', title: 'L\'association', text: 'Thierry Foltzenlogel rejoint l\'aventure. Naissance du domaine familial Taluau-Foltzenlogel.' },
  { year: '1995', title: 'Le caveau', text: 'Création du caveau de dégustation. Le domaine s\'ouvre au grand public.' },
  { year: '2005', title: 'Développement', text: 'Extension du vignoble. Le domaine atteint plus de 20 hectares en Val de Loire.' },
  { year: '2015', title: 'Certification HVE', text: 'Obtention de la certification Haute Valeur Environnementale, engagement durable.' },
  { year: '2023', title: 'Aujourd\'hui', text: 'Vignerons indépendants reconnus, exportant dans toute l\'Europe.' },
];

const vignerons = [
  { name: 'Joël Taluau & Thierry Foltzenlogel', role: 'Vignerons associés — Domaine familial', generation: 'Fondateurs', image: '/taluau/famille-taluau-foltzenlogel.webp' },
  { name: 'Le Vignoble', role: 'Saint-Nicolas-de-Bourgueil · Val de Loire', generation: '20+ hectares', image: '/taluau/6syg9mu2g9lk16ryryijjp_TZRxp63bv.webp' },
  { name: 'Le Savoir-Faire', role: 'Taille, vendange et vinification traditionnelle', generation: 'Depuis 1970', image: '/taluau/la-taille-des-vignes-a-bourgueil.webp' },
];

const faqItems = [
  { question: 'Où puis-je acheter vos vins ?', answer: 'Directement au caveau de dégustation à Chevrette (Saint-Nicolas-de-Bourgueil), sur notre boutique en ligne ou lors des salons de vins en France et en Europe.' },
  { question: 'Proposez-vous des visites de cave ?', answer: 'Oui, nous accueillons les visiteurs au caveau toute l\'année sur rendez-vous. Dégustation de nos cuvées incluse. Appelez-nous au 02 47 97 78 64.' },
  { question: 'Quelle est la température idéale de service ?', answer: 'Nos rouges se servent entre 14°C et 17°C. Le Bourgueil Passion vers 14-15°C, les cuvées de garde (Vieilles Vignes, Vau Jaumier) vers 16-17°C.' },
  { question: 'Livrez-vous à l\'international ?', answer: 'Nous livrons en France métropolitaine et dans plusieurs pays d\'Europe. Pour une expédition hors UE, contactez-nous directement.' },
  { question: 'Quel est le potentiel de garde de vos vins ?', answer: 'De 3-5 ans pour le Bourgueil Passion jusqu\'à 10-15 ans pour les Vieilles Vignes et le Vau Jaumier conservés en cave à température constante.' }
];

const QUIZ_QUESTIONS = [
  { question: 'Pour quelle occasion ?', options: [
    { label: "Cadeau d'exception", icon: '🎁', scores: [2,2,1,0,0] },
    { label: 'Dîner romantique', icon: '🕯️', scores: [2,1,0,2,0] },
    { label: 'Apéro entre amis', icon: '🥂', scores: [0,0,1,2,3] },
    { label: 'Dégustation solo', icon: '🍷', scores: [2,3,2,1,0] },
  ]},
  { question: 'Quel style préférez-vous ?', options: [
    { label: 'Rouge puissant', icon: '🌑', scores: [1,3,2,0,0] },
    { label: 'Rouge léger', icon: '🍒', scores: [0,0,0,2,3] },
    { label: 'Fruité & floral', icon: '🌸', scores: [0,0,1,3,2] },
    { label: 'Surprenez-moi', icon: '✨', scores: [2,2,2,2,2] },
  ]},
  { question: 'Votre budget ?', options: [
    { label: 'Moins de 12 €', icon: '💚', scores: [0,0,0,1,3] },
    { label: '12 — 14 €', icon: '💜', scores: [2,0,0,2,0] },
    { label: '14 € et plus', icon: '🌟', scores: [1,3,3,0,0] },
    { label: 'Sans limite', icon: '♾️', scores: [2,3,2,1,1] },
  ]},
  { question: 'Votre terroir préféré ?', options: [
    { label: 'Argilo-calcaire', icon: '🪨', scores: [3,2,0,1,0] },
    { label: 'Vieilles vignes', icon: '🌿', scores: [1,3,2,0,0] },
    { label: 'Parcellaire', icon: '🗺️', scores: [0,0,3,2,0] },
    { label: 'Je découvre', icon: '🔭', scores: [1,1,1,2,2] },
  ]},
];

function QuizModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState([0, 0, 0, 0, 0]);
  const [done, setDone] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const { playClick } = useAudio();

  useEffect(() => {
    const panel = panelRef.current;
    if (panel) {
      gsap.fromTo(panel, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' });
    }
  }, []);

  const pick = (optScores: number[]) => {
    playClick();
    const next = scores.map((s, i) => s + optScores[i]);
    setScores(next);
    if (step < QUIZ_QUESTIONS.length - 1) setStep(step + 1);
    else setDone(true);
  };

  type ScoredWine = typeof featuredWines[number] & { score: number };
  const recommended: ScoredWine[] = [...featuredWines]
    .map((w, i) => ({ ...w, score: scores[i] }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4" style={{ background: 'rgba(245,237,228,0.95)', backdropFilter: 'blur(20px)' }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div ref={panelRef} className="relative w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl" style={{ background: 'white', border: '1px solid rgba(139,58,58,0.15)' }}>
        <button className="absolute top-6 right-6 z-10 p-2 rounded-full transition-all hover:bg-black/5" style={{ color: C.textMuted }} onClick={() => { playClick(); onClose(); }}>
          <X className="w-5 h-5" />
        </button>

        {!done ? (
          <div className="p-10 md:p-12">
            <div className="flex gap-2 mb-10">
              {QUIZ_QUESTIONS.map((_, i) => (
                <div key={i} className="h-px flex-1" style={{ background: i <= step ? C.accent : 'rgba(92,64,51,0.15)' }} />
              ))}
            </div>
            <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: C.sage, fontFamily: F.ui }}>
              Question {step + 1} / {QUIZ_QUESTIONS.length}
            </p>
            <h3 className="text-3xl md:text-4xl font-light mb-10" style={{ fontFamily: F.display, color: C.text }}>
              {QUIZ_QUESTIONS[step].question}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {QUIZ_QUESTIONS[step].options.map((opt, idx) => (
                <Magnetic key={idx} strength={0.1}>
                  <button onClick={() => pick(opt.scores)} className="p-6 rounded-xl text-left transition-all duration-300 hover:shadow-lg group" style={{ background: 'white', border: '1px solid rgba(92,64,51,0.1)' }}>
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{opt.icon}</div>
                    <p className="text-sm font-medium" style={{ color: C.text, fontFamily: F.ui }}>{opt.label}</p>
                  </button>
                </Magnetic>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-10 md:p-12">
            <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: C.sage, fontFamily: F.ui }}>Votre sélection</p>
            <h3 className="text-3xl font-light mb-8" style={{ fontFamily: F.display, color: C.text }}>Notre recommandation</h3>
            <div className="space-y-4 mb-8">
              {recommended.map((wine, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: C.bg, border: '1px solid rgba(92,64,51,0.08)' }}>
                  <img src={wine.image} alt={wine.name} className="w-14 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <p className="text-xs mb-1" style={{ color: C.sage, fontFamily: F.ui }}>{wine.appellation}</p>
                    <p className="font-light text-lg" style={{ fontFamily: F.display, color: C.text }}>{wine.name}</p>
                    <p className="text-xs" style={{ color: C.textMuted }}>{wine.cuvee}</p>
                  </div>
                  <p className="text-xl font-light" style={{ fontFamily: F.display, color: C.accent }}>{wine.price}</p>
                </div>
              ))}
            </div>
            <a href="https://vins-taluau-foltzenlogel.fr" target="_blank" rel="noopener noreferrer" onClick={playClick} className="block w-full py-4 rounded-xl text-sm tracking-[0.15em] uppercase text-center text-white" style={{ fontFamily: F.ui, background: C.accent }}>
              Commander en ligne
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function AudioToggle() {
  const { isMuted, toggleMute, playClick } = useAudio();
  return (
    <button
      onClick={() => { playClick(); toggleMute(); }}
      aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
      className="fixed top-6 right-6 z-[300] w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
      style={{ background: 'rgba(92,64,51,0.08)' }}
    >
      {isMuted ? <VolumeX className="w-4 h-4" style={{ color: C.text }} /> : <Volume2 className="w-4 h-4" style={{ color: C.text }} />}
    </button>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const { playHover, playClick } = useAudio();

  const handleLoaderDone = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal-up').forEach((el) => {
        gsap.fromTo(el, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' } });
      });
      gsap.utils.toArray<HTMLElement>('.reveal-line').forEach((el) => {
        gsap.fromTo(el, { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 1.5, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
      });
    }, mainRef);
    return () => ctx.revert();
  }, [loaded]);

  return (
    <SmoothScroll>
      <>
        <Loader onDone={handleLoaderDone} />
        <CustomCursor />
        <FilmGrain />
        <ScrollProgress />
        <AudioToggle />
        {quizOpen && <QuizModal onClose={() => setQuizOpen(false)} />}
        {megaMenuOpen && <MegaMenu onClose={() => setMegaMenuOpen(false)} />}
        <StickyCTA />

        <div ref={mainRef} className="min-h-screen" style={{ background: C.bg, color: C.text, fontFamily: F.ui }}>
          
          <nav className={`fixed top-0 left-0 w-full z-50 px-6 md:px-16 py-6 flex justify-between items-center transition-all duration-300 ${scrolled ? 'bg-[#F5EDE4]/95 shadow-sm' : 'bg-gradient-to-b from-[#F5EDE4] via-[#F5EDE4]/90 to-transparent'}`} style={scrolled ? { backdropFilter: 'blur(12px)'} : {}}>
            <a href="#" onMouseEnter={playHover} onClick={playClick} className="text-sm tracking-[0.2em] uppercase font-medium" style={{ fontFamily: F.ui, color: C.text }}>Taluau · Foltzenlogel</a>
            <div className="hidden md:flex items-center gap-12">
              {['Domaine', 'Vins', 'Terroir', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={item === 'Vins' ? undefined : `#${item.toLowerCase()}`}
                  onClick={item === 'Vins' ? () => { playClick(); setMegaMenuOpen(true); } : playClick}
                  onMouseEnter={playHover} 
                  className="text-xs tracking-[0.15em] uppercase transition-colors relative group cursor-pointer" 
                  style={{ fontFamily: F.ui, color: C.textMuted }}
                >
                  {item}
                  {item === 'Vins' && (
                    <span className="ml-1 text-[10px] opacity-60">▼</span>
                  )}
                  <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300" style={{ background: C.accent }} />
                </a>
              ))}
            </div>
            <Magnetic strength={0.2}>
              <a href="https://vins-taluau-foltzenlogel.fr" target="_blank" rel="noopener noreferrer" onMouseEnter={playHover} onClick={playClick} className="hidden md:flex items-center gap-2 text-xs tracking-[0.1em] uppercase px-6 py-3 rounded-full border transition-all hover:bg-[#8B1414] hover:text-white hover:border-[#8B1414]" style={{ fontFamily: F.ui, borderColor: 'rgba(139,20,20,0.4)', color: C.text }}>
                Boutique <ArrowUpRight className="w-3 h-3" />
              </a>
            </Magnetic>
            <button className="md:hidden" aria-label="Ouvrir le menu" onClick={() => { playClick(); setMenuOpen(true); }}><Menu className="w-6 h-6" style={{ color: C.text }} /></button>
          </nav>

          {menuOpen && (
            <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8" style={{ background: C.bg }}>
              <button className="absolute top-6 right-8" aria-label="Fermer le menu" onClick={() => { playClick(); setMenuOpen(false); }}><X className="w-6 h-6" style={{ color: C.text }} /></button>
              {['Domaine', 'Vins', 'Terroir', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => { playClick(); setMenuOpen(false); }} className="text-4xl font-light" style={{ fontFamily: F.display, color: C.text }}>{item}</a>
              ))}
            </div>
          )}

          <Hero21st />
          <Marquee />

          <section id="domaine" className="py-24 md:py-40 px-6 md:px-16">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                <div>
                  <div className="reveal-line w-16 h-px mb-8" style={{ background: C.accent }} />
                  <p className="reveal-up text-xs tracking-[0.3em] uppercase mb-6" style={{ color: C.sage }}>Notre Histoire</p>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-8" style={{ fontFamily: F.display, color: C.text }}>
                    <EnhancedTextReveal splitBy="words">Vignerons en Val de Loire</EnhancedTextReveal>
                  </h2>
                  <p className="reveal-up text-base md:text-lg leading-relaxed mb-8" style={{ color: C.textMuted }}>
                    Joël Taluau et Thierry Foltzenlogel cultivent avec passion leurs vignes à Chevrette, au cœur de l'appellation Saint-Nicolas-de-Bourgueil. Un domaine familial entièrement dédié au Cabernet Franc, cépage roi de la Loire.
                  </p>
                  <div className="reveal-up grid grid-cols-3 gap-6">
                    <AnimatedCounter end={20} suffix="+" label="Hectares" duration={1.8} formatNumber={false}
                      valueClassName="text-2xl md:text-3xl font-light" labelClassName="text-xs tracking-[0.2em] uppercase"
                      className="" />
                    <AnimatedCounter end={5} label="Cuvées" duration={1.2} formatNumber={false}
                      valueClassName="text-2xl md:text-3xl font-light" labelClassName="text-xs tracking-[0.2em] uppercase"
                      className="" />
                    <AnimatedCounter end={50} suffix="+" label="Ans" duration={1.5} formatNumber={false}
                      valueClassName="text-2xl md:text-3xl font-light" labelClassName="text-xs tracking-[0.2em] uppercase"
                      className="" />
                  </div>
                </div>
                <div className="reveal-up">
                  <ParallaxImage src={IMAGES.family} alt="Famille Taluau-Foltzenlogel" className="rounded-2xl aspect-[4/5] shadow-xl" />
                </div>
              </div>

              <div className="mt-24 md:mt-32">
                <div className="reveal-line w-full h-px mb-12 md:mb-16" style={{ background: 'rgba(92,64,51,0.1)' }} />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
                  {timeline.map((item, i) => (
                    <div key={i} className="reveal-up">
                      <p className="text-sm tracking-[0.2em] uppercase mb-2" style={{ color: C.accent, fontFamily: F.ui }}>{item.year}</p>
                      <p className="text-lg md:text-xl font-light mb-2" style={{ fontFamily: F.display, color: C.text }}>{item.title}</p>
                      <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <TerroirParallax images={[IMAGES.terroir1, IMAGES.terroir2, IMAGES.terroir3]} />
          <ProcessSteps />

          <section id="vins" className="py-24 md:py-40 px-6 md:px-16" style={{ background: C.bgElevated }}>
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20">
                <div>
                  <div className="reveal-line w-16 h-px mb-8" style={{ background: C.accent }} />
                  <p className="reveal-up text-xs tracking-[0.3em] uppercase mb-4" style={{ color: C.sage }}>Nos Cuvées</p>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-light" style={{ fontFamily: F.display, color: C.text }}>
                    <EnhancedTextReveal splitBy="words">100% Cabernet Franc</EnhancedTextReveal>
                  </h2>
                </div>
                <p className="reveal-up max-w-sm mt-6 md:mt-0 text-sm md:text-base" style={{ color: C.textMuted }}>Cinq cuvées, cinq expressions du même cépage sur des terroirs différents.</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {featuredWines.map((wine, i) => (
                  <div key={i} className="reveal-up" onMouseEnter={playHover}>
                    <WineCardEnhanced wine={wine} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <Awards />

          <section id="terroir" className="py-24 md:py-40 px-6 md:px-16">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16 md:mb-20">
                <div className="reveal-line w-16 h-px mx-auto mb-8" style={{ background: C.accent }} />
                <p className="reveal-up text-xs tracking-[0.3em] uppercase mb-4" style={{ color: C.sage }}>Le Domaine</p>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-light" style={{ fontFamily: F.display, color: C.text }}>
                  <EnhancedTextReveal splitBy="words">Les hommes & la terre</EnhancedTextReveal>
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {vignerons.map((v, i) => (
                  <div key={i} className="reveal-up group">
                    <div className="relative aspect-[3/4] mb-6 overflow-hidden rounded-2xl shadow-lg">
                      <img src={v.image} alt={v.name} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-6 left-6">
                        <p className="text-xs tracking-[0.2em] uppercase" style={{ color: C.accentLight, fontFamily: F.ui }}>{v.generation}</p>
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-light mb-1" style={{ fontFamily: F.display, color: C.text }}>{v.name}</h3>
                    <p className="text-sm" style={{ color: C.textMuted, fontFamily: F.ui }}>{v.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-24 md:py-40 px-6 md:px-16" style={{ background: C.bgElevated }}>
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12 md:mb-16">
                <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: C.sage }}>FAQ</p>
                <h2 className="text-3xl md:text-5xl font-light" style={{ fontFamily: F.display, color: C.text }}>
                  Questions <em className="italic" style={{ color: C.accent }}>fréquentes</em>
                </h2>
              </div>
              <Accordion items={faqItems} />
            </div>
          </section>

          <Newsletter />

          <section className="py-24 md:py-40 px-6 md:px-16 relative overflow-hidden" style={{ background: C.bg }}>
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 80% 50% at 50% 50%, ${C.accent}10, transparent)` }} />
            </div>
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-light mb-8" style={{ fontFamily: F.display, color: C.text }}>
                <EnhancedTextReveal splitBy="words">Venez déguster au domaine</EnhancedTextReveal>
              </h2>
              <p className="reveal-up text-base md:text-lg mb-12 max-w-xl mx-auto" style={{ color: C.textMuted }}>
                Caveau de dégustation ouvert toute la semaine. Découvrez nos vins au cœur du vignoble.
              </p>
              <div className="reveal-up flex flex-col sm:flex-row gap-4 justify-center">
                <Magnetic strength={0.15}>
                  <a href="https://vins-taluau-foltzenlogel.fr" target="_blank" rel="noopener noreferrer" onMouseEnter={playHover} onClick={playClick} className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm tracking-[0.15em] uppercase text-white shadow-lg transition-transform hover:scale-105" style={{ fontFamily: F.ui, background: C.accent }}>
                    <ShoppingBag className="w-4 h-4" /> Boutique en ligne
                  </a>
                </Magnetic>
                <Magnetic strength={0.15}>
                  <a href="https://www.facebook.com/taluaufoltzenlogel/" target="_blank" rel="noopener noreferrer" onMouseEnter={playHover} onClick={playClick} className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm tracking-[0.15em] uppercase border transition-all hover:bg-[#8B1414] hover:text-white hover:border-[#8B1414]" style={{ fontFamily: F.ui, borderColor: 'rgba(139,20,20,0.4)', color: C.text }}>
                    Instagram
                  </a>
                </Magnetic>
              </div>
            </div>
          </section>

          <section id="contact-form" className="py-24 md:py-32 px-6 md:px-16" style={{ background: C.bgElevated }}>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
                <div>
                  <div className="reveal-line w-16 h-px mb-8" style={{ background: C.accent }} />
                  <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: C.sage, fontFamily: F.ui }}>Nous écrire</p>
                  <h2 className="text-3xl md:text-5xl font-light mb-6" style={{ fontFamily: F.display, color: C.text }}>
                    Venez au <em style={{ color: C.accent }}>domaine</em>
                  </h2>
                  <div className="space-y-4 text-sm" style={{ color: C.textMuted }}>
                    <p>Chevrette<br/>37140 Saint-Nicolas-de-Bourgueil</p>
                    <p><a href="tel:+33247977864" className="hover:underline" style={{ color: C.accent }}>02 47 97 78 64</a></p>
                    <p>Du lundi au samedi, 9h–18h</p>
                  </div>
                </div>
                <ContactForm />
              </div>
            </div>
          </section>

          <footer id="contact" className="py-16 md:py-20 px-6 md:px-16 border-t" style={{ background: C.bg, borderColor: 'rgba(92,64,51,0.1)' }}>
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
                <div className="md:col-span-2">
                  <p className="text-2xl md:text-3xl font-light mb-4" style={{ fontFamily: F.display, color: C.text }}>Taluau · Foltzenlogel</p>
                  <p className="text-sm leading-relaxed max-w-sm" style={{ color: C.textMuted }}>
                    Chevrette<br />37140 Saint-Nicolas-de-Bourgueil<br />02 47 97 78 64
                  </p>
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: C.accent }}>Navigation</p>
                  <div className="space-y-2">
                    {['Domaine', 'Vins', 'Terroir', 'Contact'].map((item) => (
                      <a key={item} href={`#${item.toLowerCase()}`} onMouseEnter={playHover} onClick={playClick} className="block text-sm transition-colors hover:text-[#8B1414]" style={{ color: C.textMuted }}>{item}</a>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: C.accent }}>Réseaux</p>
                  <div className="space-y-2">
                    <a href="https://vins-taluau-foltzenlogel.fr" target="_blank" rel="noopener noreferrer" onMouseEnter={playHover} onClick={playClick} className="block text-sm transition-colors hover:text-[#8B1414]" style={{ color: C.textMuted }}>Site officiel</a>
                    <a href="https://www.facebook.com/taluaufoltzenlogel/" target="_blank" rel="noopener noreferrer" onMouseEnter={playHover} onClick={playClick} className="block text-sm transition-colors hover:text-[#8B1414]" style={{ color: C.textMuted }}>Facebook</a>
                  </div>
                </div>
              </div>
              <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: 'rgba(92,64,51,0.1)' }}>
                <p className="text-xs tracking-widest" style={{ color: 'rgba(26,6,6,0.45)', fontFamily: F.ui }}>© 2026 Taluau · Foltzenlogel · Vignerons en Val de Loire</p>
                <p className="text-xs" style={{ color: 'rgba(26,6,6,0.4)', fontFamily: F.ui }}>L'abus d'alcool est dangereux pour la santé</p>
              </div>
            </div>
          </footer>
        </div>
      </>
    </SmoothScroll>
  );
}
