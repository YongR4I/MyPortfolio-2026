"use client";

/**
 * src/app/about/page.tsx
 * Optimized scroll smooth:
 * - Menggunakan `position: sticky` (hardware accelerated, no lag/jitter dengan Lenis).
 * - Hero menempel di atas (`sticky`), Card naik menutupinya di flow normal.
 * - Navbar di-absolut pada root sehingga otomatis ikut scroll naik.
 */

import { useRef } from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion, useScroll, useTransform } from 'framer-motion';

const HERO_HEIGHT = 360;

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const bottomScale = useTransform(scrollYProgress, [0.7, 1], [1.2, 1]);

  return (
    <div className="relative bg-black text-white">

      {/* ── Navbar ──
          Diletakkan di flow normal agar ikut scroll naik. */}
      <Navbar />

      {/* ── Hero ──
          STICKY agar sangat smooth dan ringan.
          Mobile: h-[60vh] (lebih tinggi agar proporsional di layar portrait)
          Desktop: h-[360px] */}
      <section
        className="sticky top-0 left-0 w-full overflow-hidden h-[60vh] md:h-[360px] z-[1]"
      >
        <Image
          src="/images/projectdummy.png"
          alt="About Hero Background"
          fill
          priority
          className="object-cover object-center"
        />

        <div
          className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/25 to-black/40"
        />

        {/* Teks "About" di pojok kiri bawah */}
        <div className="absolute bottom-0 left-0 z-20 flex flex-col pb-4 pl-6 md:pl-[60px]">
          <span
            className="text-white text-sm md:text-base font-semibold mb-1 tracking-wide"
            style={{ fontFamily: 'var(--font-mono, monospace)' }}
          >
            © 2026
          </span>
          <div className="flex items-start">
            <h1
              className="text-white font-bold leading-none tracking-tighter"
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(56px, 12vw, 148px)',
                lineHeight: '0.88',
                marginLeft: '-4px',
              }}
            >
              About 
            </h1>
            <span
              className="text-[#FF4D00] font-bold"
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(42px, 9vw, 110px)',
                lineHeight: '0.8',
                marginTop: 'clamp(2px, 0.5vw, 6px)',
                marginLeft: 'clamp(2px, 0.5vw, 6px)'
              }}
            >
              *
            </span>
          </div>
        </div>
      </section>

      {/* ── Card ──
          Di-render SELETAH hero, akan slide up saat di-scroll karena hero bersifat sticky.
          Mobile: padding lebih kecil (px-6 py-12)
          Desktop: padding lebih besar (md:px-10 md:py-[100px]) */}
      <section
        className="relative w-full bg-black min-h-screen z-10"
      >
        <div className="mx-auto max-w-[1280px] min-h-[720px] px-6 py-16 md:px-10 md:py-[100px]">
          <div className="max-w-[1050px] mx-auto mt-8 md:mt-12">

            {/* ── Top Typography & Floated Image ── */}
            <h2
              className="text-white font-semibold tracking-tight mb-16 md:mb-24"
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(36px, 5.5vw, 69px)',
                lineHeight: '1.08'
              }}
            >
              <span className="hidden">
                 {/* Spacer logic */}
              </span>
              I’m a Software Engineering student and Frontend Developer dedicated to building high-performance web experiences. By blending technical logic with creative storytelling, I transform complex code into seamless, user-centric digital products that scale
            </h2>

            {/* ── Bottom Text Columns ── */}
            <div
              className="flex flex-col md:flex-row justify-between text-[#A1A1AA] text-[13px] md:text-[14px] leading-relaxed tracking-normal"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              <div className="md:w-[32%] md:pr-4">
                <p>
                 Currently pursuing a major in Software and Game Development at SMKN 1 Ciomas, I&apos;ve spent my academic career diving deep into software architecture and programming logic. My journey is rooted in a passion for digital craftsmanship, where I constantly bridge the gap between back-end stability and front-end elegance.
                </p>
              </div>
              <div className="md:w-[32%] md:pr-4 mt-8 md:mt-0">
                <p>
                  Specialized in Frontend Development, I build responsive, mobile-first applications using React and Next.js. Beyond the code, I am a content creator focused on tech education—using storytelling to turn technical challenges into tangible solutions. I&rsquo;m now looking to bring this blend of technical skill and creative strategy to a professional internship, transforming business needs into memorable digital experiences. 
                </p>
              </div>
              <div className="md:w-[36%] flex justify-end items-end mt-12 md:mt-0">
                <button className="px-8 py-2.5 border border-white/10 rounded-full text-white text-[13px] hover:bg-white/5 transition-colors">
                  Let&apos;s Talk
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Parallax Image Block ── */}
      <div className="relative w-full h-[200vh] z-[5]">
        <section className="sticky top-0 w-full h-screen z-[5] bg-black overflow-hidden">
          <motion.div
            className="relative w-full h-full origin-center"
            style={{ scale: bottomScale }}
          >
            <Image
              src="/images/Image About.png"
              alt="About Middle Parallax Background"
              fill
              className="object-cover object-center"
              quality={100}
            />
          </motion.div>
        </section>
      </div>

      {/* ── Certificates Page ── */}
      <section className="relative w-full bg-black min-h-screen z-10 flex flex-col justify-center -mt-[100vh]">
        <div className="mx-auto max-w-[1280px] w-full px-6 md:px-10 py-16 md:py-24">
          <h2 className="text-white font-medium tracking-tight text-[32px] md:text-[40px] mb-8 md:mb-10" style={{ fontFamily: 'var(--font-inter)' }}>
            Certificates
          </h2>
          
          <div className="border-t border-[#333]">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between items-center py-6 md:py-8 border-b border-[#333]">
                <h3 className="text-white/95 text-[22px] md:text-[28px] tracking-tight" style={{ fontFamily: 'var(--font-inter)' }}>
                  Fundamental Front-end Web Development
                </h3>
                <div className="flex flex-col text-right text-white font-medium text-lg md:text-[20px] leading-[1.05] tracking-tight">
                  <span>20</span>
                  <span>26</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}