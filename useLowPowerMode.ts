// Mode économie d'énergie - Désactive les animations lourdes
export function useLowPowerMode() {
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    // Détecte si l'utilisateur préfère réduire les animations
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Détecte si batterie faible (API Battery si disponible)
    const checkBattery = async () => {
      if ('getBattery' in navigator) {
        const battery = await (navigator as any).getBattery();
        const isLowBattery = battery.level < 0.2 && !battery.charging;
        setIsLowPower(prefersReducedMotion || isLowBattery);
      } else {
        setIsLowPower(prefersReducedMotion);
      }
    };
    
    checkBattery();
  }, []);

  return isLowPower;
}

// Hook pour animations conditionnelles
export function useSmartAnimation(config: any, isLowPower: boolean) {
  return isLowPower ? { duration: 0 } : config;
}
