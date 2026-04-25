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
  const [isFirstMount, setIsFirstMount] = useState(true);

  useEffect(() => {
    // Initial Load Logic
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Wait for exit animation to complete before switching mount type
      setTimeout(() => setIsFirstMount(false), 800);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Update visibility based on global transition state
  useEffect(() => {
    if (isTransitioning) {
      setIsVisible(true);
    } else if (!isFirstMount) {
      const timer = setTimeout(() => setIsVisible(false), 400); 
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, isFirstMount]);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      window.dispatchEvent(new CustomEvent('lock-scroll'));
    } else {
      handleExitComplete();
    }
  }, [isVisible]);

  const handleExitComplete = () => {
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
    window.dispatchEvent(new CustomEvent('unlock-scroll'));
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ y: isFirstMount ? 0 : "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ 
            duration: 0.8, 
            ease: [0.85, 0, 0.15, 1],
            delay: isTransitioning ? 0 : 0.5
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
                delay: isFirstMount ? 0.2 : 0.1
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
