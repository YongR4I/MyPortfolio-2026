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

  // Animasi scale down saat section di-scroll ke atas (stuck effect)
  // Kecuali untuk card terakhir, kita buat tetap 1 agar tidak mengecil saat di-scroll ke section berikutnya
  const targetScale = index === total - 1 ? 1 : 0.9;
  const targetOpacity = index === total - 1 ? 1 : 0.8;

  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, targetOpacity]);

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity }}
      className="w-full h-[100dvh] flex items-center justify-center"
    >
      <Link href={`/projects/${project.slug}`} className="block w-full h-full cursor-none">
        <motion.div
           onMouseEnter={() => setHover(true)}
           onMouseLeave={() => setHover(false)}
           className={`flex flex-col lg:flex-row p-4 md:p-8 lg:p-12 justify-between gap-4 md:gap-8 w-full h-full bg-[#18181B] border-t border-white/10`}
        >
          {/* Left: Image Container */}
          <div className={`w-full lg:w-[65%] h-[55%] lg:h-full relative rounded-2xl overflow-hidden bg-[#18181B]`}>
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
              {/* Year using DM Mono */}
              <p className={`font-mono mb-2 md:mb-4 tracking-wider text-sm md:text-base pointer-events-none text-white/60`}>
                Jan - Apr 2026
              </p>

              {/* Description using Inter Display Regular */}
              <div className="flex-1 min-h-0 overflow-hidden mb-2">
                <p className={`block font-['Inter_Display'] font-normal text-sm md:text-base lg:text-[1.1rem] leading-relaxed pointer-events-none text-white/80 line-clamp-4 md:line-clamp-5 lg:line-clamp-none`}>
                  {project.description}
                </p>
              </div>

              {/* List / Table */}
              <div className="flex justify-between items-end mt-auto pointer-events-none gap-4">
                <div className="flex flex-wrap gap-2">
                  {project.techStack?.slice(0, 3).map((tech: string, i: number) => (
                    <div key={i} className={`py-2 px-3 lg:px-4 rounded-[1.5rem] bg-white/10 flex items-center justify-center`}>
                      <p className={`font-['Inter_Display'] text-xs lg:text-sm text-white/80 whitespace-nowrap`}>{tech}</p>
                    </div>
                  ))}
                </div>

                <div className={`w-10 h-10 lg:w-12 lg:h-12 flex-shrink-0 rounded-full bg-white flex items-center justify-center`}>
                  <svg width="20" height="20" className="lg:w-6 lg:h-6 -rotate-[60deg]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 5L19 12L12 19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
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
          
          {/* Custom Cursor "VIEW" per section */}
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
              className={`w-[90px] h-[90px] rounded-[1.5rem] flex items-center justify-center shadow-2xl border backdrop-blur-sm ${index === 0 ? 'border-black/20' : 'border-white/20'}`}
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
        </section>
      ))}
    </div>
  );
}