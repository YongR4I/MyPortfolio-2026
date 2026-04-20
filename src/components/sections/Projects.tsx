'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { projectsData } from '@/data';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

/**
 * src/components/sections/Projects.tsx
 * Fungsi: Section untuk memamerkan karya, portfolio, atau proyek yang pernah kamu buat.
 * Setiap proyek ditampilkan sebagai satu "Page Section" besar.
 */

const ProjectCard = ({
  project,
  index,
  total,
  setHover
}: {
  project: any,
  index: number,
  total: number,
  setHover: (val: boolean) => void
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"]
  });

  // Skala mengecil ke 0.95 saat di-scroll lewat
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <div
      ref={cardRef}
      className="h-screen w-full sticky top-0 flex items-center justify-center"
    >
      <motion.div
        style={{ scale }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        // cursor-none digunakan agar cursor bawaan hilang saat hover pada area card ini
        className="cursor-none flex flex-col lg:flex-row justify-between gap-4 md:gap-6 w-full max-w-[1250px] mx-auto p-4 md:p-6 origin-top bg-[#18181B] rounded-[2rem]"
      >
        {/* Left: Image Container */}
        <div className="cursor-none w-full lg:w-[800px] h-[35vh] lg:h-[600px] relative rounded-2xl overflow-hidden border border-white/10 bg-[#18181B] shadow-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.imagePlaceholder}
            alt={project.title}
            className="object-cover w-full h-full pointer-events-none"
          />

          {/* Mobile Liquid Glass Button - Positioned absolute bottom right inside the image */}
          <div className="lg:hidden absolute bottom-4 right-4 pointer-events-auto z-10">
            <Link
              href={project.link || '#'}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-['Inter_Display'] text-sm font-medium shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:bg-white/20 transition-all duration-300"
            >
              Visit Site
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transform rotate-[-45deg]"
              >
                <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Right: Description Card */}
        <div className="cursor-none w-full lg:flex-1 h-auto lg:h-[600px]">
          <div className="cursor-none flex flex-col h-full p-6 lg:p-10 rounded-2xl border border-white/10 bg-[#18181B] shadow-2xl">
            {/* Year using DM Mono */}
            <p className="font-mono text-white mb-3 md:mb-6 tracking-wider text-sm md:text-base pointer-events-none">
              (2024)
            </p>

            {/* Title using Inter Display Bold */}
            <h3 className="font-['Inter_Display'] font-bold text-3xl md:text-4xl lg:text-[44px] leading-tight mb-4 md:mb-8 text-white pointer-events-none">
              {project.title}
            </h3>

            {/* Description using Inter Display Regular */}
            <p className="hidden lg:block font-['Inter_Display'] font-normal text-[#999999] text-base leading-relaxed flex-grow pointer-events-none">
              For {project.title}, we crafted a design that honors the rich heritage of classic cars while adding a modern twist. Combining timeless elegance with sleek, contemporary elements, we created an experience that appeals to both enthusiasts and newcomers, celebrating the past with a fresh perspective.
            </p>

            {/* List / Table */}
            <div className="flex flex-col mt-auto pt-4 lg:pt-6 pointer-events-none">
              <div className="border-b-[0.5px] border-white/10 pb-2 mb-2 lg:py-4 lg:mb-0">
                <p className="font-['Inter_Display'] text-[#999999] text-sm md:text-base">Landing Page</p>
              </div>
              <div className="border-b-[0.5px] border-white/10 pb-2 mb-2 lg:py-4 lg:mb-0">
                <p className="font-['Inter_Display'] text-[#999999] text-sm md:text-base">Mobile App</p>
              </div>
              <div className="border-b-[0.5px] border-white/10 pb-2 lg:py-4">
                <p className="font-['Inter_Display'] text-[#999999] text-sm md:text-base">Redesign</p>
              </div>
            </div>
          </div>

          {/* Mobile Liquid Glass Button - Positioned absolute to the Description Card */}
          <div className="lg:hidden absolute bottom-6 right-6 pointer-events-auto z-10">
            <Link
              href={project.link || '#'}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:bg-white/20 transition-all duration-300"
              aria-label="Visit Site"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transform rotate-[-45deg]"
              >
                <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function Projects() {
  // State untuk melacak apakah cursor berada di area kartu proyek
  const [isHovered, setIsHovered] = useState(false);

  // Menyimpan posisi mouse X dan Y menggunakan Framer Motion value
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Memberikan efek "spring" (membal) agar kursor terasa smooth & organik
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Fungsi untuk memperbarui nilai X dan Y mouse setiap kali bergerak
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Fungsi untuk memastikan kursor mati jika di-scroll keluar area section
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const el = document.elementFromPoint(mouseX.get(), mouseY.get());
        // Jika elemen di bawah mouse BUKAN bagian dari section projects, sembunyikan kursor kustom
        if (!el?.closest('#projects')) {
          setIsHovered(false);
        }
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mouseX, mouseY]);

  return (
    <section
      id="projects"
      className="bg-[#18181B] relative w-full pb-[10vh] cursor-default"
      onMouseLeave={() => setIsHovered(false)}
    >

      {/*
        Custom Cursor "VIEW"
        Dengan animasi fade up dan transisi warna transparan ke oranye
      */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100] hidden lg:flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        <motion.div
          className="w-[90px] h-[90px] rounded-[1.5rem] flex items-center justify-center shadow-2xl border border-white/20 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30, scale: 0.8, backgroundColor: "rgba(255, 68, 43, 0)" }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 30,
            scale: isHovered ? 1 : 0.8,
            backgroundColor: isHovered ? "#FF442B" : "rgba(255, 68, 43, 0)"
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <span className="text-white font-['Inter_Display'] font-bold text-[14px] leading-tight text-center tracking-widest uppercase">
            VIEW
          </span>
        </motion.div>
      </motion.div>

      {/* Label Header */}
      <div className="absolute top-12 left-6 md:left-6 lg:left-20 z-10">
        <span className="text-[#FF442B] font-['Inter_Display'] text-[14px] uppercase tracking-wider">
          // Projects
        </span>
      </div>

      {/* Spacer atas agar card pertama tidak tertutup label header */}
      <div className="h-[15vh]" />

      {projectsData.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
          total={projectsData.length}
          setHover={setIsHovered}
        />
      ))}
    </section>
  );
}