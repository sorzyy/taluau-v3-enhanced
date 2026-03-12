import { useState } from 'react';
import { gsap } from 'gsap';
import { Wine, ChevronDown, X } from 'lucide-react';

const C = {
  bg: '#F5ECDF',
  text: '#1A0606',
  textMuted: 'rgba(26,6,6,0.55)',
  accent: '#8B1414',
  accentLight: '#C4453A',
};

const F = {
  display: "'Cormorant Garamond', Georgia, serif",
  ui: "'Inter', -apple-system, sans-serif",
};

const featuredWines = [
  { name: 'Le Vau Jaumier', price: '12,50 €', image: 'https://assets.evolusite.fr/1/nbl653dzyehptv8so6wh99_soEGh57Ut.png', badge: 'Signature' },
  { name: 'Vieilles Vignes', price: '14,00 €', image: 'https://assets.evolusite.fr/1/nkaj3xmrnvjo95wzjgdngt7_pKXzI-qx8.jpeg', badge: 'Coup de cœur' },
  { name: "L'Insoumise", price: '15,50 €', image: 'https://assets.evolusite.fr/1/n8zixrrzcq7bs2ujhrhuuim_sztDqd0VX9.jpeg', badge: 'Nouveau' },
  { name: "L'Expression", price: '13,00 €', image: 'https://assets.evolusite.fr/1/nbi07vuduokcs6lcpl65v0i_sya4UmJEP.png', badge: null },
];

export function MegaMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState('tous');

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[150] pt-20"
      style={{ background: 'rgba(245,237,228,0.98)', backdropFilter: 'blur(20px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(139,115,85,0.8)' }}>
              Nos Cuvées
            </p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: F.display, color: C.text }}>
              Découvrez nos vins
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 transition-all"
          >
            <X className="w-6 h-6" style={{ color: C.text }} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 mb-10 border-b" style={{ borderColor: 'rgba(92,64,51,0.1)' }}>
          {['Tous les vins', 'Rouges', 'Millésimes', 'Coffrets'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className="pb-4 text-sm tracking-[0.1em] uppercase transition-all relative"
              style={{ 
                fontFamily: F.ui, 
                color: activeTab === tab.toLowerCase() ? C.accent : C.textMuted 
              }}
            >
              {tab}
              {activeTab === tab.toLowerCase() && (
                <span 
                  className="absolute bottom-0 left-0 w-full h-0.5"
                  style={{ background: C.accent }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredWines.map((wine, i) => (
            <div 
              key={i}
              className="group cursor-pointer"
              onClick={onClose}
            >
              <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-xl bg-white shadow-sm">
                <img 
                  src={wine.image} 
                  alt={wine.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {wine.badge && (
                  <span 
                    className="absolute top-3 left-3 px-3 py-1 text-xs rounded-full"
                    style={{ 
                      background: wine.badge === 'Coup de cœur' ? C.accent : 'rgba(196,165,88,0.9)',
                      color: 'white',
                      fontFamily: F.ui
                    }}
                  >
                    {wine.badge}
                  </span>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all" />
              </div>
              <h3 className="text-lg font-light mb-1" style={{ fontFamily: F.display, color: C.text }}>
                {wine.name}
              </h3>
              <p className="text-lg" style={{ color: C.accent, fontFamily: F.display }}>
                {wine.price}
              </p>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 pt-8 border-t flex justify-between items-center" style={{ borderColor: 'rgba(92,64,51,0.1)' }}>
          <p className="text-sm" style={{ color: C.textMuted }}>
            Livraison offerte dès 6 bouteilles
          </p>
          <a 
            href="https://vins-taluau-foltzenlogel.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full text-sm tracking-[0.15em] uppercase text-white transition-transform hover:scale-105"
            style={{ background: C.accent, fontFamily: F.ui }}
            onClick={onClose}
          >
            Voir la boutique →
          </a>
        </div>
      </div>
    </div>
  );
}
