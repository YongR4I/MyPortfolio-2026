"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

/**
 * src/components/sections/Hero.tsx
 * Fungsi: Section pertama yang akan dilihat pengunjung saat membuka website.
 * Berisi sapaan utama, perkenalan singkat, dan tombol Call-To-Action (CTA).
 */

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Motion values for mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for high-end movement feel
  const springX = useSpring(mouseX, { damping: 30, stiffness: 100 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 100 });

  // Map mouse position to subtle parallax ranges
  const textMoveX = useTransform(springX, (val) => val * -0.005);
  const textMoveY = useTransform(springY, (val) => val * -0.005);


  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen w-full bg-[#8D8D8D] overflow-hidden flex flex-col justify-end"
    >

      {/* Background Image Container - Subtle Parallax */}
      <motion.div 
        className="absolute inset-0 z-0 w-full h-full flex items-end justify-center pointer-events-none"
      >
         <Image
            src="/assets/New Hero.png"   
            alt="Hero Background Silhouette"
            fill
            priority
            unoptimized
            className="object-cover object-bottom"
            style={{
              objectPosition: 'bottom center',
            }}
         />
      </motion.div>

      <div className="relative z-10 w-full h-full max-w-[1440px] mx-auto px-6 md:px-10 pb-8 md:pb-12 flex flex-col md:flex-row md:items-end justify-between pointer-events-none">
        {/* Left Side: Copyright & Main Title - Subtle Counter-Movement */}
        <motion.div 
          className="flex flex-col mt-auto pointer-events-auto"
          style={{ x: textMoveX, y: textMoveY }}
        >
          {/* Copyright Section */}
          <div className="flex items-center gap-3 mb-2 md:mb-4">
            <span 
              className="text-white font-medium" 
              style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: 'clamp(18px, 4vw, 32px)' 
              }}
            >
              ©2026
            </span>
          </div>

          {/* Main Title Section */}
          <div className="flex items-start">
            <h1
              className="text-white font-bold leading-[0.8] tracking-tighter mix-blend-difference"
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(80px, 16vw, 228px)',
                marginLeft: '-4px'
              }}
            >
              Raihan
            </h1>
            <span
              className="text-[#FF4D00] font-bold"
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(60px, 12vw, 160px)',
                lineHeight: '0.8',
                marginTop: 'clamp(4px, 1vw, 10px)',
                marginLeft: 'clamp(4px, 1vw, 10px)'
              }}
            >
              *
            </span>
          </div>
        </motion.div>

        {/* Right Side: Description */}
        <div className="md:max-w-[320px] lg:max-w-[400px] text-left md:text-right mt-6 md:mt-0 md:mb-12 pointer-events-auto">
          <p
            className="text-white font-bold text-sm md:text-base lg:text-lg leading-snug tracking-tight"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Hi, I am Raihan. Creative<br className="hidden md:block"/>
            web developer and storyteller<br className="hidden md:block"/>
            building seamless interfaces and<br className="hidden md:block"/>
            high-impact digital content.
          </p>
        </div>
      </div>
    </section>
  );
}