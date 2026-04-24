"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * src/components/layout/Preloader.tsx
 * Fungsi: Animasi intro/loading saat pertama kali website dibuka.
 * Menggunakan background #FF442B dan teks "Raihan" dengan animasi slide up.
 */

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Fail-safe: Hide after max 2s (dikurangi dari 4s agar tidak ngelag lama)
    const fallbackTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    const handleLoad = () => {
      // Lebih cepat hilangnya (800ms) untuk kesan yang lebih responsif
      setTimeout(() => setIsVisible(false), 800);
    };

    // Pengecekan lebih sederhana untuk status dokumen
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(fallbackTimer);
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: "-100vh" }}
          transition={{ 
            duration: 0.8, 
            ease: [0.85, 0, 0.15, 1],
            delay: 0.5
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FF442B]"
          style={{ willChange: 'transform' }}
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
