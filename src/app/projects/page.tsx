"use client";

import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projectsData = [
  {
    id: 1,
    title: "GAVIN SCHNEIDER PRODUCTIONS",
    category: "DIGITAL DESIGN - WEB DEVELOPMENT",
    image: "/images/projectdummy.png",
  },
  {
    id: 2,
    title: "FRESHMAN",
    category: "STRATEGY - BRAND IDENTITY - DIGITAL DESIGN - WEB DEVELOPMENT - CREATIVE DIRECTION",
    image: "/images/projectdummy.png",
  },
  {
    id: 3,
    title: "MOON EVENT",
    category: "EVENT - DIGITAL DESIGN",
    image: "/images/projectdummy.png",
  },
  {
    id: 4,
    title: "AESOP ROZU",
    category: "WEB DEVELOPMENT - DIGITAL DESIGN",
    image: "/images/projectdummy.png",
  }
];

export default function ProjectsPage() {
  const [view, setView] = useState<'GRID' | 'LIST'>('GRID');
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-24 md:pt-32 pb-20 px-4 md:px-8 max-w-[1600px] mx-auto">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/20 pb-4">
            <div className="flex items-start">
              <h1 className="text-[60px] md:text-[100px] leading-none font-medium tracking-tight" style={{ fontFamily: 'var(--font-inter)' }}>PROJECT</h1>
              <span className="text-sm font-medium mt-2 ml-1">26</span>
            </div>

            <div className="flex items-center gap-6 mt-6 md:mt-0">
                <div className="flex items-center gap-2 text-sm uppercase font-medium">
                    <span className="text-white/60">FILTER:</span>
                    <button className="hover:opacity-60 transition-opacity">ALL PROJECT +</button>
                </div>

                <div className="flex items-center border border-white/20 rounded-full overflow-hidden text-sm font-medium">
                    <button
                        onClick={() => setView('GRID')}
                        className={`px-5 py-2 transition-colors ${view === 'GRID' ? 'bg-white text-black' : 'bg-transparent text-white hover:bg-white/10'}`}
                    >
                        GRID
                    </button>
                    <button
                         onClick={() => setView('LIST')}
                        className={`px-5 py-2 transition-colors ${view === 'LIST' ? 'bg-white text-black' : 'bg-transparent text-white hover:bg-white/10'}`}
                    >
                        LIST
                    </button>
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
              <div className="mt-auto">
                <p className="text-xs uppercase mb-2 text-white/60 font-medium tracking-wider">
                  {project.category}
                </p>
                <h2 className="text-xl md:text-2xl font-medium" style={{ fontFamily: 'var(--font-inter)' }}>
                  {project.title}
                </h2>
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
              <div className="flex justify-between items-center p-6 md:p-8 shrink-0">
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

              {/* Modal Content - Draggable Image Slider */}
              <div className="flex-1 w-full relative overflow-hidden" ref={containerRef}>
                <motion.div
                  drag="x"
                  dragConstraints={containerRef}
                  className="flex gap-4 px-6 md:px-8 h-full pb-8 md:pb-12 cursor-grab active:cursor-grabbing"
                  style={{ width: "max-content" }}
                >
                  {/* First Image */}
                  <div className="relative w-[85vw] md:w-[70vw] h-full shrink-0 overflow-hidden bg-white/5">
                     <Image
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        fill
                        className="object-cover pointer-events-none"
                      />
                  </div>

                  {/* Second Image (Dummy for sliding) */}
                  <div className="relative w-[85vw] md:w-[70vw] h-full shrink-0 overflow-hidden bg-white/5">
                     <Image
                        src={selectedProject.image}
                        alt={`${selectedProject.title} - 2`}
                        fill
                        className="object-cover pointer-events-none"
                      />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}