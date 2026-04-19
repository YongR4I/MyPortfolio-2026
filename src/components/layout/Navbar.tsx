"use client";

/**
 * src/components/layout/Navbar.tsx
 * Fungsi: Komponen navigasi atas. Biasanya diletakkan secara global atau di halaman utama 
 * berisi logo, menu navigasi, dan tombol aksi (misal: tombol kontak).
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', id: '01', href: '#hero' },
    { name: 'About', id: '02', href: '#about' },
    { name: 'Services', id: '03', href: '#services' },
    { name: 'Project', id: '04', href: '#projects' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-10 py-6 flex items-center justify-between">
        {/* Logo */}
        <div className="text-white text-xl font-bold tracking-tighter" style={{ fontFamily: 'var(--font-inter)' }}>
          LOGO
        </div>

        {/* Desktop Nav Links & CTA */}
        <div className="hidden md:flex items-center gap-12">
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.id}
                href={item.href}
                className="group flex items-start gap-1 text-sm text-neutral-100 hover:text-white transition-colors duration-300"
                style={{ fontFamily: 'var(--font-inter)' }}
                initial="initial"
                whileHover="hover"
              >
                <div className="relative h-5 overflow-hidden">
                  <motion.div
                    variants={{
                      initial: { y: 0 },
                      hover: { y: '-50%' }
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <span className="block h-5 font-medium tracking-wide">{item.name}</span>
                    <span className="block h-5 font-medium tracking-wide text-[#FF4D00]">{item.name}</span>
                  </motion.div>
                </div>
                <span 
                  className="text-[10px] font-medium opacity-50 -mt-1" 
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {item.id}
                </span>
              </motion.a>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <motion.button 
            className="relative flex items-center bg-[#E5E5E5] rounded-full p-1 group overflow-hidden"
            initial="rest"
            whileHover="hover"
            animate="rest"
          >
            <motion.div 
              className="absolute left-1 top-1 bottom-1 bg-[#FF4D00] rounded-full z-0"
              variants={{
                rest: { width: '40px' },
                hover: { width: 'calc(100% - 8px)' }
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full z-10 shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <motion.span 
              className="relative text-sm font-medium pr-6 pl-2 z-10 whitespace-nowrap transition-colors duration-300" 
              style={{ fontFamily: 'var(--font-inter)' }}
              variants={{
                rest: { color: "#000000" },
                hover: { color: "#FFFFFF" }
              }}
            >
              Get in touch
            </motion.span>
          </motion.button>
        </div>

        {/* Mobile Toggle Button (+) */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 text-white"
        >
          <motion.span
            animate={{ rotate: isMenuOpen ? 45 : 0 }}
            className="text-2xl font-light"
          >
            +
          </motion.span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center gap-10 md:hidden pt-20"
          >
            <div className="flex flex-col items-center gap-6">
              {navItems.map((item) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-start gap-2 text-2xl text-neutral-400 hover:text-white transition-colors"
                  style={{ fontFamily: 'var(--font-inter)' }}
                  initial="initial"
                  whileHover="hover"
                >
                  <div className="relative h-8 overflow-hidden">
                    <motion.div
                      variants={{
                        initial: { y: 0 },
                        hover: { y: '-50%' }
                      }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <span className="block h-8 font-bold tracking-tight uppercase">{item.name}</span>
                      <span className="block h-8 font-bold tracking-tight uppercase text-[#FF4D00]">{item.name}</span>
                    </motion.div>
                  </div>
                  <span className="text-xs font-medium opacity-50" style={{ fontFamily: 'var(--font-mono)' }}>{item.id}</span>
                </motion.a>
              ))}
            </div>

            <motion.button 
              className="relative flex items-center bg-[#E5E5E5] rounded-full p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#FF4D00]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-lg font-semibold text-black px-6" style={{ fontFamily: 'var(--font-inter)' }}>
                Get in touch
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
