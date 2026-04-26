"use client";

import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';

/**
 * src/components/layout/SmoothScroll.tsx
 * Memberikan efek scrolling yang halus ke seluruh website menggunakan library Lenis.
 */

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Disable Lenis on mobile devices for better performance/native feel
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 1.0, // Dipercepat sedikit dari 1.2
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // Dikurangi agar scroll tidak terasa terlalu berat
      touchMultiplier: 1.2, // Disamakan agar lebih native di touchpad/touchscreen
      infinite: false,
    });

    lenisRef.current = lenis;

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    // Lock/Unlock handlers
    const lockScroll = () => {
      lenis.stop();
    };
    const unlockScroll = () => {
      lenis.start();
    };

    window.addEventListener('lock-scroll', lockScroll);
    window.addEventListener('unlock-scroll', unlockScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      lenisRef.current = null;
      window.removeEventListener('lock-scroll', lockScroll);
      window.removeEventListener('unlock-scroll', unlockScroll);
    };
  }, []);

  // Reset scroll to top on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  // Handle custom scroll-to events (e.g., from Navbar)
  useEffect(() => {
    const handleScrollTo = (e: any) => {
      const target = e.detail?.target;
      if (target && lenisRef.current) {
        lenisRef.current.scrollTo(target, { 
          duration: 2.5, 
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
        });
      }
    };

    window.addEventListener('lenis-scroll-to', handleScrollTo);
    return () => window.removeEventListener('lenis-scroll-to', handleScrollTo);
  }, []);

  return <>{children}</>;
}
