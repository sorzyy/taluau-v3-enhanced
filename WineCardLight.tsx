import { useState } from 'react';
import { Heart } from 'lucide-react';

const C = {
  bg: '#F5ECDF',
  text: '#1A0606',
  textMuted: 'rgba(26,6,6,0.55)',
  accent: '#8B1414',
};

const F = {
  display: "'Cormorant Garamond', Georgia, serif",
  ui: "'Inter', -apple-system, sans-serif",
};

interface Wine {
  name: string;
  cuvee: string;
  price: string;
  image: string;
}

// VERSION ALLÉGÉE - Sans animations complexes
export function WineCardLight({ wine }: { wine: Wine }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div 
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-[3/4]">
        <img 
          src={wine.image} 
          alt={wine.name}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isWishlisted ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-600'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-light mb-1" style={{ fontFamily: F.display, color: C.text }}>
          {wine.name}
        </h3>
        <p className="text-sm mb-2" style={{ color: C.textMuted, fontFamily: F.ui }}>
          {wine.cuvee}
        </p>
        
        <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'rgba(92,64,51,0.08)' }}>
          <span className="text-xl font-light" style={{ color: C.accent, fontFamily: F.display }}>
            {wine.price}
          </span>
          <button 
            className="px-4 py-2 rounded-full text-xs tracking-wider uppercase"
            style={{ border: '1px solid rgba(139,20,20,0.3)', color: C.accent, fontFamily: F.ui }}
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}
