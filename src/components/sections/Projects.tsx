'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { projectsData } from '@/data';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useTransition } from '@/context/TransitionContext';

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

  // Efek meredup dan scale down dihapus sesuai permintaan agar transisi murni flat

  const { navigateWithTransition } = useTransition();

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigateWithTransition(`/projects/${project.slug}`);
  };

  return (
    <motion.div
      ref={cardRef}
      className="w-full h-[100dvh] flex items-center justify-center sticky top-0 overflow-hidden"
    >
      <a 
        href={`/projects/${project.slug}`} 
        onClick={handleCardClick} 
        className="block w-full h-full cursor-none relative"
      >
        <motion.div
           onMouseEnter={() => setHover(true)}
           onMouseLeave={() => setHover(false)}
           className={`flex flex-col lg:flex-row p-4 md:p-8 lg:p-12 justify-between gap-4 md:gap-8 w-full h-full border-t border-white/10 bg-[#18181B] overflow-hidden`}
        >
          {/* Left: Image Container */}
          <div className={`w-full lg:w-[65%] h-[55%] lg:h-full relative rounded-2xl overflow-hidden ${
             'bg-[#18181B]'
          }`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.imagePlaceholder}
              alt={project.title}
              className="object-cover w-full h-full pointer-events-none"
            />
          </div>

          {/* Right: Description Card */}
          <div className="w-full lg:w-[35%] h-[45%] lg:h-full relative">
            <div className={`flex flex-col h-full p-2 lg:py-4 lg:px-4`}>
              {index === 0 && (
                <h3 className="font-['Inter_Display'] font-semibold text-base md:text-lg tracking-tight text-white mb-2 md:mb-3 pointer-events-none">
                  Modern Portfolio
                </h3>
              )}
              {/* Year using DM Mono */}
              <p className="font-mono mb-2 md:mb-4 tracking-wider text-sm md:text-base pointer-events-none text-white/60">
                Jan - Apr 2026
              </p>

              {/* Description using Inter Display Regular */}
              <div className="flex-1 min-h-0 overflow-hidden mb-2">
                <p className="block font-['Inter_Display'] font-normal text-sm md:text-base lg:text-[1.1rem] leading-relaxed pointer-events-none line-clamp-4 md:line-clamp-5 lg:line-clamp-none text-white/80">
                  {project.description}
                </p>
              </div>

              {/* List / Table */}
              <div className="flex justify-between items-end mt-auto pointer-events-none gap-4">
                <div className="flex flex-wrap gap-2">
                  {project.techStack?.slice(0, 3).map((tech: string, i: number) => (
                    <div key={i} className="py-2 px-3 lg:px-4 rounded-[1.5rem] flex items-center justify-center bg-white/10">
                      <p className="font-['Inter_Display'] text-xs lg:text-sm whitespace-nowrap text-white/80">{tech}</p>
                    </div>
                  ))}
                </div>

                <div className="w-10 h-10 lg:w-12 lg:h-12 flex-shrink-0 rounded-full flex items-center justify-center bg-white">
                  <svg width="20" height="20" className="lg:w-6 lg:h-6 -rotate-[60deg]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 5L19 12L12 19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </a>
    </motion.div>
  );
};

export default function Projects() {
  // Hook untuk navigasi dengan transisi
  const { navigateWithTransition } = useTransition();

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
        // Jika elemen di bawah mouse BUKAN bagian dari salah satu section project, sembunyikan kursor kustom
        if (!el?.closest('[id^="project-section-"]')) {
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
    <>
      <div id="projects-container">
        {/* Label Header Global (Hanya tampil sekali di paling atas) */}
      <div className="relative pt-12 pb-6 px-6 md:px-12 lg:px-20 bg-[#18181B]">
        <span className="text-[#FF442B] font-['Inter_Display'] text-[14px] uppercase tracking-wider">
          {"//"} Projects
        </span>
      </div>

      {projectsData.map((project, index) => (
        <section
          key={project.id}
          id={`project-section-${index}`}
          className={`relative w-full h-screen cursor-default flex items-center justify-center sticky top-0`}
          onMouseLeave={() => setIsHovered(false)}
        >
          <ProjectCard
            project={project}
            index={index}
            total={projectsData.length}
            setHover={setIsHovered}
          />
        </section>
      ))}

      {/* Custom Cursor "VIEW" Global untuk Projects */}
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
          className="w-[90px] h-[90px] rounded-[1.5rem] flex items-center justify-center shadow-2xl border backdrop-blur-sm border-white/20"
          initial={{ opacity: 0, y: 30, scale: 0.8, backgroundColor: "rgba(255, 68, 43, 0)" }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 30,
            scale: isHovered ? 1 : 0.8,
            backgroundColor: isHovered ? "#FF442B" : "rgba(255, 68, 43, 0)"
          }}
          transition={{ duration: isHovered ? 0.4 : 0.15, ease: "easeOut" }}
        >
          <span className="text-white font-['Inter_Display'] font-bold text-[14px] leading-tight text-center tracking-widest uppercase">
            VIEW
          </span>
        </motion.div>
      </motion.div>
      </div>

      {/* More Projects Button Section */}
      <section className="relative w-full py-16 md:py-24 bg-[#18181B] flex flex-col justify-center items-center gap-8 z-10">
        <h3 
          className="text-white text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-center"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          Want to see more of my work?
        </h3>
        <div 
          onClick={() => navigateWithTransition("/projects")}
          className="cursor-pointer"
        >
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
              See All Work
            </motion.span>
          </motion.button>
        </div>
      </section>
    </>
  );
}