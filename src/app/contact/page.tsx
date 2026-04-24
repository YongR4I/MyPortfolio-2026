"use client";

import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import ContactFormSection from "@/components/sections/ContactFormSection";
import Footer from "@/components/layout/Footer";
import { AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20">
      <Navbar />

      <main className="relative pt-[25vh] pb-12 px-6 md:px-10 max-w-[1440px] mx-auto min-h-[85vh] flex flex-col justify-between">

        {/* Top Section: Heading */}
        <div className="flex flex-col items-center text-center relative">
          <div className="absolute top-0 left-0">
            <span className="text-[#FF4D00] text-sm md:text-base font-mono">{'//Contact'}</span>
          </div>

          <button 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`px-6 py-2 rounded-full border text-xs tracking-widest font-mono uppercase transition-all duration-300 mb-12 relative z-[101]
              ${isHovered ? 'border-black/40 text-black hover:bg-black/5' : 'border-white/20 text-white hover:bg-white/10'}`}
          >
            SAY HI
          </button>

          <div className="relative inline-flex justify-center">
            <h1
              className="text-white font-medium tracking-tighter leading-[1.0] w-full"
              style={{
                fontFamily: 'var(--font-montreal, "PP Neue Montreal", sans-serif)',
                fontSize: 'clamp(60px, 15vw, 149px)'
              }}
            >
              NO NEED<br />TO BE SHY.
            </h1>
          </div>
        </div>

        {/* Bottom Section: Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mt-[20vh] border-t border-white/10 pt-12">

          {/* Column 1: Statement */}
          <div className="md:col-span-1 flex flex-col gap-8">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
            <p
              className="text-white/80 leading-relaxed uppercase"
              style={{ fontFamily: 'var(--font-montreal, "PP Neue Montreal", sans-serif)' }}
            >
              WE MAY ONLY HAVE ONE OYE<br />
              BUT WE WE HAVE TWO GOOD<br />
              EARS AND ARE WAITING TO<br />
              HEAR FROM YOU
            </p>
          </div>

          {/* Column 2: Social Links */}
          <div className="md:col-span-1 flex flex-col gap-6">
            <h3 className="text-white uppercase tracking-widest text-sm mb-2" style={{ fontFamily: 'var(--font-montreal, "PP Neue Montreal", sans-serif)' }}>
              SOCIAL
            </h3>
            <div className="flex flex-wrap gap-3">
              <a href="#" className="px-5 py-2 rounded-full border border-white/20 text-xs uppercase hover:bg-white/5 transition-colors">
                INSTAGRAM
              </a>
              <a href="#" className="px-5 py-2 rounded-full border border-white/20 text-xs uppercase hover:bg-white/5 transition-colors">
                LINKEDIN
              </a>
              <a href="#" className="px-5 py-2 rounded-full border border-white/20 text-xs uppercase hover:bg-white/5 transition-colors">
                GITHUB
              </a>
            </div>
          </div>

          {/* Column 3: Contact Info */}
          <div className="md:col-span-1 flex flex-col gap-6">
            <h3 className="text-white uppercase tracking-widest text-sm mb-2" style={{ fontFamily: 'var(--font-montreal, "PP Neue Montreal", sans-serif)' }}>
              Contact
            </h3>
            <div className="flex flex-col gap-2">
              <a href="mailto:raihandaffa.dev@gmail.com" className="text-white hover:text-[#FF4D00] transition-colors" style={{ fontFamily: 'var(--font-montreal, "PP Neue Montreal", sans-serif)' }}>
                raihandaffa.dev@gmail.com
              </a>
              <a href="tel:+6285694917839" className="text-white hover:text-[#FF4D00] transition-colors" style={{ fontFamily: 'var(--font-montreal, "PP Neue Montreal", sans-serif)' }}>
                +6285694917839
              </a>
            </div>
          </div>

          {/* Column 4: Location */}
          <div className="md:col-span-1 flex flex-col gap-6">
            <h3 className="text-white uppercase tracking-widest text-sm mb-2" style={{ fontFamily: 'var(--font-montreal, "PP Neue Montreal", sans-serif)' }}>
              LOCATION
            </h3>
            <p className="text-white leading-relaxed" style={{ fontFamily: 'var(--font-montreal, "PP Neue Montreal", sans-serif)' }}>
              Ciomas District, Bogor<br />
              Regency, West Java,<br />
              Indonesia
            </p>
          </div>

        </div>
      </main>

      {/* Scrolling Banner Section (Outside Main for Full Screen Width) */}
      <ScrollingBanner />

      {/* Detail Form Section */}
      <ContactFormSection />

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-[100] flex flex-col justify-end items-start overflow-hidden pointer-events-none"
          >
            {/* Blinking Red Dot */}
            <div className="absolute top-10 right-10 md:top-20 md:right-20">
              <motion.div 
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-5 h-5 md:w-8 md:h-8 bg-red-600 rounded-full shadow-[0_0_20px_rgba(220,38,38,0.4)]"
              />
            </div>

            {/* H E L L O Typing Text - Massive and Left-Aligned */}
            <div className="flex w-full px-6 md:px-12 pb-10 md:pb-20">
              {"HELLO".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ 
                    delay: 0.3 + (index * 0.5), 
                    duration: 0.1,
                    ease: "linear"
                  }}
                  className="text-black font-medium select-none"
                  style={{ 
                    fontFamily: 'var(--font-montreal, "PP Neue Montreal", sans-serif)', 
                    fontSize: 'clamp(80px, 32vw, 500px)',
                    lineHeight: '0.7',
                    letterSpacing: '-0.05em'
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-50 bg-transparent">
        <Footer />
      </div>
    </div>
  );
}

function ScrollingBanner() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Base x translation based on scroll: right on scroll down
  const x = useTransform(scrollYProgress, [0, 1], [-2000, 0]);
  const springX = useSpring(x, { stiffness: 50, damping: 20 });

  return (
    <div className="w-full overflow-hidden h-[100px] flex items-center border-t border-black/5 mt-20 relative select-none bg-white text-black">
      <motion.div
        style={{ x: springX }}
        className="flex whitespace-nowrap gap-8 md:gap-16 items-center"
      >
        {[...Array(12)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 md:gap-16">
            <span
              className="text-[80px] md:text-[100px] font-medium tracking-tighter uppercase leading-none"
              style={{ fontFamily: 'var(--font-montreal, "PP Neue Montreal", sans-serif)' }}
            >
              SAY HI
            </span>
            <div className="flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                className="w-12 h-12 md:w-20 md:h-20 text-black animate-spin-star"
                fill="currentColor"
              >
                <path d="M50 0C50 27.6142 72.3858 50 100 50C72.3858 50 50 72.3858 50 100C50 72.3858 27.6142 50 0 50C27.6142 50 50 27.6142 50 0Z" />
              </svg>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}