"use client";

/**
 * src/components/layout/Navbar.tsx
 * Fungsi: Komponen navigasi atas. Biasanya diletakkan secara global atau di halaman utama 
 * berisi logo, menu navigasi, dan tombol aksi (misal: tombol kontak).
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  let navItems = [
    { name: 'Home', id: '01', href: '/' },
    { name: 'About', id: '02', href: '/about' },
    { name: 'Services', id: '03', href: '/#services' },
    { name: 'Project', id: '04', href: '/projects' },
  ];

  if (pathname !== '/') {
    navItems = navItems.filter(item => item.name !== 'Services');
    navItems = navItems.map((item, index) => ({
      ...item,
      id: `0${index + 1}`
    }));
  }

  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-50 px-6 md:px-10 py-6 flex items-center justify-between">
        {/* Logo */}
        <div className="text-white text-xl font-bold tracking-tighter" style={{ fontFamily: 'var(--font-inter)' }}>
          LOGO
        </div>

        {/* Desktop Nav Links & CTA */}
        <div className="hidden md:flex items-center gap-12">
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <motion.div
                key={item.id}
                className="group flex items-start gap-1 text-sm text-neutral-100 hover:text-white transition-colors duration-300 cursor-pointer"
                style={{ fontFamily: 'var(--font-inter)' }}
                initial="initial"
                whileHover="hover"
              >
                <Link href={item.href} className="flex items-start gap-1">
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
                </Link>
              </motion.div>
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
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Dropdown - Setengah Layar */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 w-full h-auto pb-4 z-[100] bg-[#F03C2E] flex flex-col md:hidden shadow-2xl rounded-b-[2rem]"
            >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-white/20">
              <div className="text-white text-2xl font-black tracking-tighter" style={{ fontFamily: 'var(--font-inter)' }}>
                VIPER
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-white p-2"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Mobile Menu Links */}
            <div className="flex flex-col px-6 mt-2 flex-grow">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="border-b border-white/20 py-5"
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-start gap-1 text-white hover:text-white/80 transition-colors"
                  >
                    <span className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-inter)' }}>
                      {item.name}
                    </span>
                    <span className="text-xs font-bold mt-1" style={{ fontFamily: 'var(--font-mono)' }}>
                      {item.id}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="px-6 pb-12 mt-8"
            >
              <button 
                className="flex items-center bg-white rounded-full p-1 hover:bg-neutral-100 transition-colors inline-flex"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#F03C2E]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
                <span className="text-lg font-medium text-black px-6" style={{ fontFamily: 'var(--font-inter)' }}>
                  Get in touch
                </span>
              </button>
            </motion.div>

          </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
