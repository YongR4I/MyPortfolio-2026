"use client";

import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useVelocity, useSpring, useTransform, useMotionValue, useAnimationFrame } from 'framer-motion';
import Lenis from 'lenis';

const projectsData = [
  {
    id: 1,
    title: "GAVIN SCHNEIDER PRODUCTIONS",
    category: "DIGITAL DESIGN - WEB DEVELOPMENT",
    image: "/images/projectdummy.png",
    images: [
      "/images/projectdummy.png",
      "/images/projectdummy.png",
      "/images/projectdummy.png",
      "/images/projectdummy.png"
    ],
    overview: "A comprehensive digital platform showcasing high-end production portfolios. The design focuses on large imagery and smooth, elegant interactions to reflect the premium quality of the productions.",
    problemAndApproach: "The primary challenge was implementing complex, continuous motion graphics without sacrificing web performance and accessibility.",
    results: [
      "Achieved a 98+ Lighthouse performance score despite heavy animation usage.",
      "Established a cohesive, memorable brand identity with custom interactions."
    ],
    role: "Frontend Developer",
    year: "2024",
    techStack: ["Next.js", "Framer Motion", "Tailwind CSS"],
    liveLink: "https://your-portfolio.com",
    githubLink: "PRIVATE FOR NOW"
  },
  {
    id: 2,
    title: "FRESHMAN",
    category: "STRATEGY - BRAND IDENTITY - DIGITAL DESIGN - WEB DEVELOPMENT - CREATIVE DIRECTION",
    image: "/images/projectdummy.png",
    images: [
      "/images/projectdummy.png",
      "/images/projectdummy.png",
      "/images/projectdummy.png",
      "/images/projectdummy.png"
    ],
    overview: "A complete brand overhaul and digital presence for Freshman. The project encompassed everything from strategic positioning to a fully bespoke e-commerce experience.",
    problemAndApproach: "E-commerce sites often suffer from bloated state management and clunky cart interactions. I utilized React with TypeScript to establish a strictly typed, predictable state flow.",
    results: [
      "Designed a frictionless, single-page checkout flow.",
      "Implemented advanced GSAP scroll animations maintaining 60fps."
    ],
    role: "Full Stack Developer",
    year: "2025",
    techStack: ["React", "TypeScript", "GSAP"],
    liveLink: "https://project-two.com",
    githubLink: "https://github.com/yourusername/project-two"
  },
  {
    id: 3,
    title: "MOON EVENT",
    category: "EVENT - DIGITAL DESIGN",
    image: "/images/projectdummy.png",
    images: [
      "/images/projectdummy.png",
      "/images/projectdummy.png",
      "/images/projectdummy.png",
      "/images/projectdummy.png"
    ],
    overview: "An immersive digital invitation and event management platform. Built to handle high traffic and provide a seamless RSVP experience with interactive 3D elements.",
    problemAndApproach: "Rendering thousands of particles dynamically in the browser usually leads to severe frame drops. I bypassed the standard DOM completely, relying on raw Canvas API and Three.js.",
    results: [
      "Maintained a stable 60fps while rendering over 50,000 active particles.",
      "Successfully synced real-time audio frequency data with GPU shader uniforms."
    ],
    role: "Creative Developer",
    year: "2023",
    techStack: ["Vite", "Three.js", "WebGL"],
    liveLink: "https://project-three.com",
    githubLink: "https://github.com/yourusername/project-three"
  },
  {
    id: 4,
    title: "AESOP ROZU",
    category: "WEB DEVELOPMENT - DIGITAL DESIGN",
    image: "/images/projectdummy.png",
    images: [
      "/images/projectdummy.png",
      "/images/projectdummy.png",
      "/images/projectdummy.png",
      "/images/projectdummy.png"
    ],
    overview: "An interactive product showcase for the Rozu fragrance. The site features sensory-driven design, subtle animations, and performance-optimized media delivery.",
    problemAndApproach: "Creating a seamless sensory experience required careful coordination of visual assets and smooth animations while keeping load times minimal.",
    results: [
      "Implemented an intuitive scroll-driven narrative.",
      "Optimized high-resolution image delivery with Next.js Image component."
    ],
    role: "UI/UX Developer",
    year: "2024",
    techStack: ["Next.js", "Lenis", "GSAP"],
    liveLink: "https://aesop-rozu.com",
    githubLink: "https://github.com/yourusername/aesop"
  }
];

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const InfiniteSlider = ({ images }: { images: string[] }) => {
  const baseX = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((t, delta) => {
    if (isHovered || isDragging) return;
    
    // Constant slow marquee moving left
    const moveBy = -1.5 * (delta / 1000); 
    
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => {
    return `${wrap(-50, 0, v)}%`;
  });

  const handlePan = (event: any, info: any) => {
    if (!containerRef.current) return;
    // Total width is the scrollWidth of the entire max-content div
    const totalWidth = containerRef.current.scrollWidth;
    const halfWidth = totalWidth / 2;
    
    // Convert pixel delta to percentage delta (relative to halfWidth which represents 50%)
    const percentageDelta = (info.delta.x / halfWidth) * 50;
    
    baseX.set(baseX.get() + percentageDelta);
  };

  return (
    <div 
      className="w-full relative py-8 md:py-12 border-b border-white/10 overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        ref={containerRef}
        className="flex gap-4 px-6 md:px-8" 
        style={{ x, width: "max-content", touchAction: "pan-y" }}
        onPanStart={() => setIsDragging(true)}
        onPan={handlePan}
        onPanEnd={() => setIsDragging(false)}
      >
        {[...images, ...images].map((img, i) => (
          <div key={i} className="relative w-[85vw] md:w-[717px] aspect-[717/538] shrink-0 overflow-hidden bg-white/5 pointer-events-none">
            <Image
              src={img}
              alt={`Slide ${i}`}
              fill
              className="object-cover"
              draggable={false}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const getTechIconUrl = (tech: string) => {
  const map: Record<string, string> = {
    'Next.js': 'https://cdn.simpleicons.org/nextdotjs/white',
    'React': 'https://cdn.simpleicons.org/react/61DAFB',
    'TypeScript': 'https://cdn.simpleicons.org/typescript/3178C6',
    'Framer Motion': 'https://cdn.simpleicons.org/framer/white',
    'Tailwind CSS': 'https://cdn.simpleicons.org/tailwindcss/06B6D4',
    'GSAP': 'https://cdn.simpleicons.org/greensock/88CE02',
    'Vite': 'https://cdn.simpleicons.org/vite/646CFF',
    'Three.js': 'https://cdn.simpleicons.org/threedotjs/white',
    'WebGL': 'https://cdn.simpleicons.org/webgl/990000',
    'Lenis': 'https://cdn.simpleicons.org/framer/white'
  };
  return map[tech] || 'https://cdn.simpleicons.org/javascript/yellow';
};

export default function ProjectsPage() {

  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const containerRef = useRef<HTMLDivElement>(null);
  const modalScrollRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterRef]);

  // Mencegah scroll saat modal terbuka
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      // Mencegah Lenis dari scrolling
      window.dispatchEvent(new Event('lock-scroll'));
    } else {
      document.body.style.overflow = 'unset';
      // Menyalakan Lenis scroll kembali
      window.dispatchEvent(new Event('unlock-scroll'));
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.dispatchEvent(new Event('unlock-scroll'));
    };
  }, [selectedProject]);

  useEffect(() => {
    let lenis: Lenis | null = null;
    let rafId: number;

    if (selectedProject && modalScrollRef.current) {
      lenis = new Lenis({
        wrapper: modalScrollRef.current,
        content: modalScrollRef.current.firstElementChild as HTMLElement,
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.2,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    }

    return () => {
      if (lenis) {
        lenis.destroy();
        cancelAnimationFrame(rafId);
      }
    };
  }, [selectedProject]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      <main className="pt-24 md:pt-32 pb-20 px-4 md:px-8 max-w-[1600px] mx-auto">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/20 pb-4">
            <div className="flex items-start">
              <h1 className="text-[60px] md:text-[100px] leading-none font-medium tracking-tight" style={{ fontFamily: 'var(--font-inter)' }}>PROJECT</h1>
              <span className="text-sm font-medium mt-2 ml-1">26</span>
            </div>

            <div className="flex items-center gap-6 mt-6 md:mt-0">
                <div className="relative flex items-center gap-2 text-sm uppercase font-medium" ref={filterRef}>
                    <span className="text-white/60">FILTER:</span>
                    <button 
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                      className="hover:opacity-60 transition-opacity flex items-center gap-1"
                    >
                      {selectedFilter} {isFilterOpen ? '-' : '+'}
                    </button>

                    <AnimatePresence>
                      {isFilterOpen && (
                        <motion.div
                          initial={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)', y: -10 }}
                          animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', y: 0 }}
                          exit={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)', y: -10 }}
                          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute top-[calc(100%+16px)] right-0 bg-[#F8F8F8] text-black min-w-[240px] py-4 z-50 rounded shadow-2xl origin-top-right"
                        >
                          {['ALL', 'FRONTEND', 'BACKEND'].map((filter) => (
                            <button
                              key={filter}
                              onClick={() => {
                                setSelectedFilter(filter);
                                setIsFilterOpen(false);
                              }}
                              className="w-full text-left px-6 py-2.5 hover:bg-black/5 transition-colors text-[13px] tracking-wide"
                            >
                              {filter}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                </div>


            </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 mt-12 md:mt-16">
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="flex flex-col pb-12 mb-12 group cursor-pointer relative md:odd:pr-8 md:even:pl-8"
            >
              {/* Divider line between columns (vertical, only on left item) */}
              {index % 2 === 0 && (
                <div className="hidden md:block absolute right-0 top-0 bottom-[-3rem] w-[1px] bg-white/20" />
              )}

              {/* Bottom border for rows (horizontal, with gap in the center) */}
              <div className={`absolute bottom-0 h-[1px] bg-white/20 ${index % 2 === 0 ? 'left-0 right-0 md:right-8' : 'left-0 md:left-8 right-0'}`} />

              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] bg-white/5 overflow-hidden mb-6">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="mt-auto flex flex-col gap-3">
                <div className="flex justify-between items-start gap-4">
                  <h2 className="text-xl md:text-2xl font-medium uppercase tracking-tight" style={{ fontFamily: 'var(--font-inter)' }}>
                    {project.title}
                  </h2>
                  <span className="text-sm font-mono text-white/50 pt-1 shrink-0">
                    {project.year}
                  </span>
                </div>
                <p className="text-sm text-white/60 line-clamp-2 leading-relaxed">
                  {project.overview}
                </p>

                {/* Tech Stack Icons */}
                <div className="flex items-center gap-3 mt-4">
                  {project.techStack?.map((tech) => (
                    <img 
                      key={tech} 
                      src={getTechIconUrl(tech)} 
                      alt={tech} 
                      title={tech}
                      className="w-[18px] h-[18px] opacity-70 hover:opacity-100 transition-opacity" 
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">

            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-auto"
            />

            {/* The Modal Window */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)] bg-[#111] rounded-t-2xl md:rounded-t-3xl overflow-hidden flex flex-col z-10 pointer-events-auto"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 md:p-8 shrink-0 border-b border-white/10 z-20 bg-[#111]">
                <div className="flex gap-2 text-sm font-medium">
                  <span>0{selectedProject.id}</span>
                  <span className="text-white/50">—</span>
                  <div className="flex items-center gap-1 border border-white/20 rounded-full px-3 py-1">
                    <span className="text-xs">DRAG</span>
                  </div>
                  <span className="text-white/50">—</span>
                  <span className="text-white/50">10</span>
                </div>

                <h3 className="hidden md:block text-sm md:text-base font-medium tracking-wide">
                  {selectedProject.title}
                </h3>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-sm font-medium tracking-wider hover:opacity-60 transition-opacity flex items-center gap-2"
                >
                  CLOSE
                </button>
              </div>

              {/* Scrollable Modal Content */}
              <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden w-full" data-lenis-prevent="true" ref={modalScrollRef}>
                <div className="w-full">
                  {/* Infinite Marquee Image Slider */}
                  {selectedProject.images && (
                    <InfiniteSlider images={selectedProject.images} />
                  )}

                  {/* Project Details Section */}
                  <div className="px-6 md:px-8 py-12 md:py-20 max-w-5xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
                    
                    {/* Left Column (Overview, Challenge, Results) */}
                    <div className="md:col-span-2 flex flex-col gap-12 md:gap-16">
                      
                      {selectedProject.overview && (
                        <div>
                          <h4 className="text-xs text-[#FF442B] font-mono uppercase tracking-widest mb-4 flex items-center gap-4">
                            <span className="w-6 h-[1px] bg-[#FF442B]"></span>
                            Overview
                          </h4>
                          <p className="text-xl md:text-3xl leading-relaxed font-light text-white/90" style={{ fontFamily: 'var(--font-inter)' }}>
                            {selectedProject.overview}
                          </p>
                        </div>
                      )}

                      {selectedProject.problemAndApproach && (
                        <div>
                          <h4 className="text-xs text-[#FF442B] font-mono uppercase tracking-widest mb-4 flex items-center gap-4">
                            <span className="w-6 h-[1px] bg-[#FF442B]"></span>
                            Challenge & Approach
                          </h4>
                          <p className="text-lg md:text-xl leading-relaxed text-white/60 font-light" style={{ fontFamily: 'var(--font-inter)' }}>
                            {selectedProject.problemAndApproach}
                          </p>
                        </div>
                      )}

                      {selectedProject.results && selectedProject.results.length > 0 && (
                        <div>
                          <h4 className="text-xs text-[#FF442B] font-mono uppercase tracking-widest mb-4 flex items-center gap-4">
                            <span className="w-6 h-[1px] bg-[#FF442B]"></span>
                            Results
                          </h4>
                          <div className="flex flex-col gap-4">
                            {selectedProject.results.map((result: string, i: number) => (
                              <div key={i} className="flex gap-4 items-start p-4 md:p-6 rounded-2xl bg-white/5 border border-white/5">
                                <div className="w-1.5 h-1.5 mt-2.5 rounded-full bg-[#FF442B] flex-shrink-0" />
                                <p className="font-light text-base md:text-lg text-white/80 leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                                  {result}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                    
                    {/* Right Column (Meta Information) */}
                    <div className="flex flex-col gap-8 pt-2 md:pt-0">
                      
                      {selectedProject.role && (
                        <div>
                          <h4 className="text-xs text-white/50 uppercase tracking-wider mb-2">Role</h4>
                          <p className="text-base font-medium">{selectedProject.role}</p>
                        </div>
                      )}

                      {selectedProject.year && (
                        <div>
                          <h4 className="text-xs text-white/50 uppercase tracking-wider mb-2">Year</h4>
                          <p className="text-base font-medium">{selectedProject.year}</p>
                        </div>
                      )}

                      {selectedProject.techStack && (
                        <div>
                          <h4 className="text-xs text-white/50 uppercase tracking-wider mb-2">Tech Stack</h4>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {selectedProject.techStack.map((tech: string, index: number) => (
                              <span key={index} className="text-xs font-mono uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Links Section */}
                      <div className="flex flex-col gap-4 mt-4 pt-8 border-t border-white/10">
                        {selectedProject.liveLink && (
                          <a 
                            href={selectedProject.liveLink}
                            target="_blank"
                            rel="noreferrer"
                            className="group flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all"
                          >
                            <span className="text-sm font-medium">Live Site</span>
                            <span className="text-xs font-mono text-white/50 group-hover:text-white transition-colors">↗</span>
                          </a>
                        )}

                        {selectedProject.githubLink && (
                          <a 
                            href={selectedProject.githubLink === 'PRIVATE FOR NOW' ? '#' : selectedProject.githubLink}
                            target={selectedProject.githubLink === 'PRIVATE FOR NOW' ? '_self' : '_blank'}
                            rel="noreferrer"
                            className={`group flex items-center justify-between p-4 rounded-xl border transition-all ${
                              selectedProject.githubLink === 'PRIVATE FOR NOW' 
                                ? 'border-white/5 bg-white/5 opacity-50 cursor-not-allowed' 
                                : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                            }`}
                          >
                            <span className="text-sm font-medium">Source Code</span>
                            {selectedProject.githubLink !== 'PRIVATE FOR NOW' && (
                              <span className="text-xs font-mono text-white/50 group-hover:text-white transition-colors">↗</span>
                            )}
                            {selectedProject.githubLink === 'PRIVATE FOR NOW' && (
                              <span className="text-xs font-mono text-white/50">PRIVATE</span>
                            )}
                          </a>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}