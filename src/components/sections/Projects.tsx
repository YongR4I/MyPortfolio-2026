'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projectsData } from '@/data';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useTransition } from '@/context/TransitionContext';

/**
 * src/components/sections/Projects.tsx
 * Fungsi: Section untuk memamerkan karya, portfolio, atau proyek yang pernah kamu buat.
 * Setiap proyek ditampilkan sebagai satu "Page Section" besar.
 */

const getTechIconUrl = (tech: string) => {
  const map: Record<string, string> = {
    'Next.js': 'https://cdn.simpleicons.org/nextdotjs/white',
    'React': 'https://cdn.simpleicons.org/react/61DAFB',
    'TypeScript': 'https://cdn.simpleicons.org/typescript/3178C6',
    'Framer Motion': 'https://cdn.simpleicons.org/framer/white',
    'Tailwind CSS': 'https://cdn.simpleicons.org/tailwindcss/06B6D4',
    'Vite': 'https://cdn.simpleicons.org/vite/646CFF',
    'Three.js': 'https://cdn.simpleicons.org/threedotjs/white',
    'WebGL': 'https://cdn.simpleicons.org/webgl/990000',
    'Supabase': 'https://cdn.simpleicons.org/supabase/3ECF8E',
    'Figma': 'https://cdn.simpleicons.org/figma/F24E1E',
    'Node.js': 'https://cdn.simpleicons.org/nodedotjs/339933',
    'Express': 'https://cdn.simpleicons.org/express/white',
    'Firebase': 'https://cdn.simpleicons.org/firebase/FFCA28',
    'Groq': 'https://cdn.simpleicons.org/openai/white', // Fallback ke icon AI karena Groq belum ada di SimpleIcons
    'React Router': 'https://cdn.simpleicons.org/reactrouter/CA4245'
  };
  return map[tech] || 'https://cdn.simpleicons.org/javascript/yellow';
};

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
            <Image
              src={project.imagePlaceholder}
              alt={project.title}
              fill
              className="object-cover pointer-events-none"
              sizes="(max-width: 1024px) 100vw, 65vw"
            />
          </div>

          {/* Right: Description Card */}
          <div className="w-full lg:w-[35%] h-[45%] lg:h-full relative">
            <div className={`flex flex-col h-full p-2 lg:py-4 lg:px-4`}>
              <h3 className="font-['Inter_Display'] font-semibold text-base md:text-lg tracking-tight text-white mb-2 md:mb-3 pointer-events-none">
                {project.title}
              </h3>
              {/* Year using DM Mono */}
              <p className="font-mono mb-2 md:mb-4 tracking-wider text-sm md:text-base pointer-events-none text-white/60">
                {project.year}
              </p>

              {/* Description using Inter Display Regular */}
              <div className="flex-1 min-h-0 overflow-hidden mb-2">
                <p className="block font-['Inter_Display'] font-normal text-sm md:text-base lg:text-[1.1rem] leading-relaxed pointer-events-none line-clamp-4 md:line-clamp-5 lg:line-clamp-none text-white/80">
                  {project.description}
                </p>
              </div>

              {/* List / Tech Stack with Tooltips */}
              <div className="flex justify-between items-end mt-auto pointer-events-none gap-4">
                <div className="flex flex-wrap gap-3">
                  {project.techStack?.slice(0, 5).map((tech: string, i: number) => (
                    <div key={i} className="relative group/tech flex items-center justify-center">
                      {/* Tooltip Content - Muncul saat group/tech di-hover */}
                      <div 
                        className="absolute bottom-full mb-3 px-3 py-1.5 bg-[#1e1e21] border border-white/10 rounded-lg opacity-0 group-hover/tech:opacity-100 translate-y-2 group-hover/tech:translate-y-0 pointer-events-none z-50 whitespace-nowrap shadow-2xl transition-all duration-300 ease-out"
                      >
                        <p className="font-['Inter_Display'] text-[11px] font-medium text-white tracking-wide">
                          {tech}
                        </p>
                        {/* Tooltip Arrow */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1e1e21] border-r border-b border-white/10 rotate-45 -mt-1" />
                      </div>

                      {/* Icon Container */}
                      <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10 group-hover/tech:bg-white/10 group-hover/tech:border-white/20 transition-all duration-300 pointer-events-auto cursor-help">
                        <Image 
                          src={getTechIconUrl(tech)} 
                          alt={tech} 
                          width={24}
                          height={24}
                          className="object-contain opacity-60 group-hover/tech:opacity-100 transition-opacity"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="w-10 h-10 lg:w-12 lg:h-12 flex-shrink-0 rounded-full flex items-center justify-center bg-white pointer-events-auto transition-transform hover:scale-110 active:scale-95">
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
  const containerRef = useRef<HTMLDivElement>(null);
  const isInsideRef = useRef(false);

  // Menyimpan posisi mouse X dan Y menggunakan Framer Motion value
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Memberikan efek "spring" (membal) agar kursor terasa smooth & organik
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const container = containerRef.current;

    const moveCursor = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      isInsideRef.current = (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      );
      if (isInsideRef.current) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    const handleScroll = () => {
      if (!isInsideRef.current) {
        setIsHovered(false);
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
      <div id="projects-container" ref={containerRef}>
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