import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import AppLight from './AppLight';
import './index.css';

// Détection mode économie d'énergie
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const connection = (navigator as any).connection;
const isSlowConnection = connection && (connection.saveData || connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g');

// Utiliser version allégée si:
// - L'utilisateur préfère réduire les animations
// - C'est un mobile ET connexion lente
// - Mode économie de données activé
const useLightVersion = prefersReducedMotion || isSlowConnection || (isMobile && prefersReducedMotion);

// Log pour debug
console.log('%c🍷 Taluau V3', 'font-size: 20px; color: #8B1414; font-weight: bold;');
console.log(`Mode: ${useLightVersion ? '⚡ Économie d\'énergie' : '🎨 Complet'}`);
console.log(`Mobile: ${isMobile ? 'Oui' : 'Non'}, Connexion: ${connection?.effectiveType || 'inconnue'}`);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {useLightVersion ? <AppLight /> : <App />}
  </StrictMode>,
);
