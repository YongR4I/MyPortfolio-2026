"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * src/components/layout/Preloader.tsx
 * Fungsi: Animasi intro/loading saat pertama kali website dibuka.
 * Menggunakan background #FF442B dan teks "Raihan" dengan animasi slide up.
 */

import { useTransition } from '@/context/TransitionContext';

export default function Preloader() {
  const { isTransitioning } = useTransition();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Initial Load Logic
    if (document.readyState === 'complete') {
      setTimeout(() => setIsVisible(false), 800);
    } else {
      const handleLoad = () => setTimeout(() => setIsVisible(false), 800);
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  // Update visibility based on global transition state
  useEffect(() => {
    if (isTransitioning) {
      setIsVisible(true);
    } else {
      // Only hide if we are not in the initial load phase (or just always attempt to hide after a delay)
      const timer = setTimeout(() => setIsVisible(false), 400); 
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  useEffect(() => {
    // Scroll lock management
    if (isVisible) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      window.dispatchEvent(new CustomEvent('lock-scroll'));
    }

    return () => {
      // Clean up on unmount or state change
      if (!isVisible) {
        // handleExitComplete logic will handle the unlock for AnimatePresence
      }
    };
  }, [isVisible]);

  const handleExitComplete = () => {
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
    window.dispatchEvent(new CustomEvent('unlock-scroll'));
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ 
            duration: 0.8, 
            ease: [0.85, 0, 0.15, 1],
            delay: 0.5
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FF442B]"
          style={{ 
            willChange: 'transform',
            touchAction: 'none'
          }}
        >
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ 
                duration: 0.8, 
                ease: [0.33, 1, 0.68, 1],
                delay: 0.2
              }}
              className="text-white font-bold tracking-tighter"
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(32px, 10vw, 80px)',
                lineHeight: 1
              }}
            >
              Raihan Daffa
            </motion.h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
