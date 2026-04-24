"use client";

import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const projectsData = [
  {
    id: 1,
    title: "Aurum Art Gallery",
    date: "11/2025",
    videoSrc: "/videos/project1.mp4",
    tags: ["Frontend", "Web App"],
    desc: "Aurum is an AI-powered knowledge graph platform that revolutionizes art exploration. It combines a semantic search engine for finding artworks by description, an interactive force-directed graph to visualize complex relationships, and a robust unified dashboard.",
    types: ["Frontend"]
  },
  {
    id: 2,
    title: "Bedah Kampus UI 2025",
    date: "11/2024",
    videoSrc: "/videos/project2.mp4",
    tags: ["Fullstack", "Web App"],
    desc: "A comprehensive event platform for Bedah Kampus UI 2025 featuring a high-performance landing page, an integrated ticketing and merchandise store with midtrans payment gateway. The system includes a mobile-optimized QR code check-in tool.",
    types: ["Backend", "Frontend"]
  },
  {
    id: 3,
    title: "Project Dashboard",
    date: "08/2024",
    videoSrc: "/videos/project3.mp4",
    tags: ["Frontend", "Dashboard"],
    desc: "A modern admin dashboard built with Next.js and Tailwind CSS featuring advanced data visualization, real-time analytics, and smooth role-based access control management.",
    types: ["Frontend"]
  },
  {
    id: 4,
    title: "Mobile Portfolio",
    date: "04/2024",
    videoSrc: "/videos/project4.mp4",
    tags: ["Mobile", "React Native"],
    desc: "A high-fidelity mobile application portfolio showcasing projects with native-like gestures, smooth page transitions, and offline caching support.",
    types: ["Frontend"]
  }
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hasSeen, setHasSeen] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem('hasSeenHeroEntrance');
    if (!seen) {
      setHasSeen(false);
      sessionStorage.setItem('hasSeenHeroEntrance', 'true');
    } else {
      setHasSeen(true);
    }
  }, []);

  const shouldPlay = !hasSeen;

  // Typing Reveal + Blur settings
  const entranceInitial = { opacity: 0, filter: 'blur(15px)', clipPath: 'inset(0 100% 0 0)' };
  const entranceTransition = (delay: number) => ({
    duration: 1.5,
    ease: [0.22, 1, 0.36, 1],
    delay: delay
  });

  const filteredProjects = activeFilter === 'All' 
    ? projectsData 
    : projectsData.filter((project: any) => project.types.includes(activeFilter));

  const filters = ['All', 'Frontend', 'Backend'];

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
          alt="Projects Hero Background"
          fill
          priority
          className="object-cover object-center"
        />

        <div
          className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/25 to-black/40"
        />

        {/* Teks "Project" di pojok kiri bawah */}
        <div className="absolute bottom-0 left-0 z-20 flex flex-col pb-4 pl-6 md:pl-[60px]">
          <motion.span
            initial={shouldPlay ? entranceInitial : false}
            animate={{ opacity: 1, filter: 'blur(0px)', clipPath: 'inset(0 0% 0 0)' }}
            transition={entranceTransition(shouldPlay ? 1.6 : 0) as any}
            className="text-white text-sm md:text-base font-semibold mb-1 tracking-wide"
            style={{ 
              fontFamily: 'var(--font-mono, monospace)',
              willChange: 'filter, opacity, clip-path',
              transform: 'translateZ(0)'
            }}
          >
            © 2026
          </motion.span>
          <div className="flex items-start">
            <motion.h1
              initial={shouldPlay ? entranceInitial : false}
              animate={{ opacity: 1, filter: 'blur(0px)', clipPath: 'inset(0 0% 0 0)' }}
              transition={entranceTransition(shouldPlay ? 1.8 : 0) as any}
              className="text-white font-bold leading-none tracking-tighter"
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(56px, 12vw, 148px)',
                lineHeight: '0.88',
                marginLeft: '-4px',
                willChange: 'filter, opacity, clip-path',
                transform: 'translateZ(0)'
              }}
            >
              Project
            </motion.h1>
            <motion.span
              initial={shouldPlay ? entranceInitial : false}
              animate={{ opacity: 1, filter: 'blur(0px)', clipPath: 'inset(0 0% 0 0)' }}
              transition={entranceTransition(shouldPlay ? 1.9 : 0) as any}
              className="text-[#FF4D00] font-bold"
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(42px, 9vw, 110px)',
                lineHeight: '0.8',
                marginTop: 'clamp(2px, 0.5vw, 6px)',
                marginLeft: 'clamp(2px, 0.5vw, 6px)',
                willChange: 'filter, opacity, clip-path',
                transform: 'translateZ(0)'
              }}
            >
              *
            </motion.span>
          </div>
        </div>
      </section>

      {/* ── Stuff I've Built ── */}
      <section
        className="relative w-full bg-black min-h-screen z-10 pb-20"
      >
        <div className="mx-auto max-w-[1280px] min-h-[720px] px-6 py-16 md:px-10 md:py-[100px]">
          
          {/* TITLE & LINE */}
          <div className="flex items-center gap-6 mb-12">
            <h2 className="text-white text-3xl md:text-[56px] tracking-tight font-medium" style={{ fontFamily: 'var(--font-inter)' }}>
              Stuff I&apos;ve built
            </h2>
            <div className="flex-1 h-[1px] bg-white/20 mt-1 md:mt-2"></div>
          </div>

          {/* FILTER */}
          <div className="flex flex-col items-center justify-center mb-16 md:mb-20 gap-4">
            <div className="flex items-center gap-2 text-[#A1A1AA] text-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              <span>Filter by type:</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2 rounded-full font-semibold text-sm transition-colors ${
                    activeFilter === filter 
                      ? 'bg-white text-black' 
                      : 'border border-[rgba(255,255,255,0.15)] text-[rgba(255,255,255,0.7)] hover:text-white hover:border-[rgba(255,255,255,0.3)] font-medium'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-[#111111] rounded-[24px] overflow-hidden flex flex-col border border-white/5 hover:border-white/20 transition-all duration-300">
                {/* Media Area (Autoplay Video) */}
                <div className="relative w-full aspect-[4/3] bg-[#1A1A1A]">
                  <video 
                    src={project.videoSrc} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover border-b border-white/5"
                  />
                </div>
                
                {/* Card Body */}
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-white text-[26px] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-inter)' }}>{project.title}</h3>
                    <span className="text-[#A1A1AA] text-sm font-mono mt-2">{project.date}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                      <span key={tag} className="bg-white/10 text-white/90 text-xs px-3 py-1 rounded-md font-semibold tracking-wide">{tag}</span>
                    ))}
                  </div>

                  <p className="text-[#A1A1AA] text-[15px] leading-relaxed mb-auto">
                    {project.desc}
                  </p>

                  <div className="flex justify-between items-center mt-10 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 rounded-full bg-white/20"></div>
                       <div className="w-6 h-6 rounded-full bg-white/20"></div>
                       {project.id === 1 && <div className="w-6 h-6 rounded-full bg-white/20"></div>}
                    </div>
                    
                    <div className="flex gap-3">
                      <button className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-colors">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                      </button>
                      <button className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 9v7h3.5a3.5 3.5 0 1 0 0-7H12z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/></svg>
                      </button>
                    </div>
                  </div>
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