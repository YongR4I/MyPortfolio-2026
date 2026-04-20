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
    // Timer untuk menyembunyikan preloader setelah animasi selesai
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    // Kunci scroll saat preloader aktif
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      clearTimeout(timer);
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
          exit={{ y: "-100%" }}
          transition={{ 
            duration: 0.8, 
            ease: [0.85, 0, 0.15, 1], // Custom cubic-bezier for smooth slide up
            delay: 0.5 // Reduced for faster transition
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FF442B]"
        >
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.33, 1, 0.68, 1],
                delay: 0.2 // Reduced from 0.5 for immediate text appearance
              }}
              className="text-white font-bold tracking-tighter"
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(32px, 8vw, 64px)', // Ideal balanced size
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
