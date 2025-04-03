// components/ScrollRevealWrapper.tsx
'use client';
import { ReactNode, useEffect, useRef } from 'react';

interface ScrollRevealOptions {
  distance?: string;
  origin?: string;
  delay?: number;
  duration?: number;
  interval?: number;
  // Add other options you use
}

export default function ScrollRevealWrapper({
  children,
  options = {
    distance: '50px',
    origin: 'bottom',
    duration: 800,
    delay: 0,
    interval: 100 // Default interval between items
  },
  className
}: {
  children: ReactNode;
  options?: ScrollRevealOptions;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadScrollReveal() {
      const ScrollReveal = (await import('scrollreveal')).default;
      if (ref.current) {
        ScrollReveal().reveal(ref.current, {
          ...options,
          // Ensure the interval is applied
          delay: options?.delay
        });
      }
    }
    loadScrollReveal();
  }, [options]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}