"use client";

/**
 * src/app/about/page.tsx
 * Optimized scroll smooth:
 * - Menggunakan `position: sticky` (hardware accelerated, no lag/jitter dengan Lenis).
 * - Hero menempel di atas (`sticky`), Card naik menutupinya di flow normal.
 * - Navbar di-absolut pada root sehingga otomatis ikut scroll naik.
 */

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const HERO_HEIGHT = 360;

export default function AboutPage() {
  const experienceRef = useRef<HTMLDivElement>(null);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hasSeen, setHasSeen] = useState(false);

  const { scrollYProgress: aboutScrollProgress } = useScroll();
  const bottomScale = useTransform(aboutScrollProgress, [0.7, 1], [1.2, 1]);

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

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const certificates = [
    {
      title: "React Web Development",
      company: "Codingcamp Powered By DBS",
      year: "2025",
      image: "/images/Certificates/1.png",
      link: "https://www.dicoding.com/certificates/0LZ0Y1RRNX65"
    },
    {
      title: "Front-End Development Fundamentals",
      company: "Codingcamp Powered By DBS",
      year: "2026",
      image: "/images/Certificates/2.png",
      link: "https://www.dicoding.com/certificates/RVZK06LYQZD5"
    },
    {
      title: "JavaScript Programming Foundations",
      company: "Codingcamp Powered By DBS",
      year: "2025",
      image: "/images/Certificates/3.png",
      link: "https://www.dicoding.com/certificates/2VX30N1OJXYQ"
    },
    {
      title: "Cloud Computing & Generative AI on AWS",
      company: "Codingcamp Powered By DBS",
      year: "2024",
      image: "/images/Certificates/4.png",
      link: "https://www.dicoding.com/certificates/53XEK850KXRN"
    },
    {
      title: "Back-End Development with JavaScript",
      company: "Codingcamp Powered By DBS",
      year: "2024",
      image: "/images/Certificates/5.png",
      link: "https://www.dicoding.com/certificates/EYX4K44G5PDL"
    },
    {
      title: "Web Programming Fundamentals",
      company: "Codingcamp Powered By DBS",
      year: "2024",
      image: "/images/Certificates/6.png",
      link: "https://www.dicoding.com/certificates/MEPJ24J3WP3V"
    }

    
  ];

  return (
    <div className="relative bg-black text-white">

      {/* ── Navbar ── */}
      <Navbar />

      {/* ── Hero ── */}
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
              About 
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

      {/* ── Card ── */}
      <section
        className="relative w-full bg-black min-h-screen z-10"
      >
        <div className="mx-auto max-w-[1280px] min-h-[720px] px-6 py-16 md:px-10 md:py-[100px]">
          <div className="max-w-[1050px] mx-auto mt-8 md:mt-12">
            <h2
              className="text-white font-semibold tracking-tight mb-16 md:mb-24"
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(36px, 5.5vw, 69px)',
                lineHeight: '1.08'
              }}
            >
              I’m a Software Engineering student and Frontend Developer dedicated to building high-performance web experiences. By blending technical logic with creative storytelling, I transform complex code into seamless, user-centric digital products that scale
            </h2>

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

      {/* ── Experience Section (Grid Design) ── */}
      <section 
        ref={experienceRef}
        className="relative w-full bg-black z-10 py-24 md:py-32"
      >
        <div className="mx-auto max-w-[1280px] w-full px-6 md:px-10">
          <div className="border-b border-[#333] pb-10 mb-16 md:mb-24">
            <h2 className="text-white font-medium tracking-tight text-[32px] md:text-[40px]" style={{ fontFamily: 'var(--font-inter)' }}>
              Experience
            </h2>
          </div>

          <div className="space-y-32 md:space-y-48">
            {/* Item 1: Codingcamp */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12"
            >
              <div className="md:col-span-12 mb-8 md:mb-12">
                <h3 className="text-white text-[42px] md:text-[56px] font-bold leading-none tracking-tighter" style={{ fontFamily: 'var(--font-inter)' }}>
                  Codingcamp Powered By DBS
                </h3>
              </div>

              <div className="md:col-span-3">
                <p className="text-white text-base md:text-lg mb-4 font-medium" style={{ fontFamily: 'var(--font-inter)' }}>Student / Developer</p>
                <span className="text-[#A1A1AA] text-sm md:text-base font-mono">Jan 2026 — May 2026</span>
              </div>

              <div className="md:col-span-4 grid grid-cols-2 gap-y-4 text-sm md:text-base" style={{ fontFamily: 'var(--font-inter)' }}>
                <span className="text-[#696969]">Position</span>
                <span className="text-white">DBS Foundation Tech Cohort</span>
                
                <span className="text-[#696969]">Industry</span>
                <span className="text-white">Fintech / Edutech</span>
                
                <span className="text-[#696969]">Website</span>
                <a 
                  href="https://codingcamp.dicoding.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white border-b border-white/20 hover:border-white transition-colors w-fit inline-flex items-center gap-1.5 whitespace-nowrap"
                >
                  codingcamp.dicoding.com ↗
                </a>
              </div>

              <div className="md:col-span-5 space-y-6">
                <p className="text-[#A1A1AA] text-lg leading-relaxed">
                  Developed FinLitGo, a full-stack financial literacy app for Gen-Z using React 19, Vite, and Supabase, featuring AI-driven assistants.
                </p>
                <p className="text-[#A1A1AA] text-lg leading-relaxed">
                  Implemented modern web architectures with Node.js/Express 5 and TailwindCSS 4, enhanced by smooth GSAP and Framer Motion animations.
                </p>
                <p className="text-[#A1A1AA] text-lg leading-relaxed">
                  Collaborated in a high-performance technical team to solve complex problems through creative engineering and personal branding.
                </p>
              </div>
            </motion.div>

            {/* Item 2: Digital Creator */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12"
            >
              <div className="md:col-span-12 mb-8 md:mb-12">
                <h3 className="text-white text-[42px] md:text-[56px] font-bold leading-none tracking-tighter" style={{ fontFamily: 'var(--font-inter)' }}>
                  Independent Digital Product Creator
                </h3>
              </div>

              <div className="md:col-span-3">
                <p className="text-white text-base md:text-lg mb-4 font-medium" style={{ fontFamily: 'var(--font-inter)' }}>Digital Product Owner</p>
                <span className="text-[#A1A1AA] text-sm md:text-base font-mono">May 2025 — Present</span>
              </div>

              <div className="md:col-span-4 grid grid-cols-2 gap-y-4 text-sm md:text-base" style={{ fontFamily: 'var(--font-inter)' }}>
                <span className="text-[#696969]">Position</span>
                <span className="text-white">Independent Creator</span>
                
                <span className="text-[#696969]">Location</span>
                <span className="text-white">Remote</span>
                
                <span className="text-[#696969]">Industry</span>
                <span className="text-white">SaaS / Digital Goods</span>
                
                <span className="text-[#696969]">Status</span>
                <span className="text-white italic">Market Validated</span>
              </div>

              <div className="md:col-span-5 space-y-6">
                <p className="text-[#A1A1AA] text-lg leading-relaxed">
                  Built high-performance website templates and source codes reaching 50+ active users through technical education and presentations.
                </p>
                <p className="text-[#A1A1AA] text-lg leading-relaxed">
                  Transformed real-world user pain points into practical digital solutions, achieving strong commercial sales conversions.
                </p>
              </div>
            </motion.div>

            {/* Item 3: Freelance */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12"
            >
              <div className="md:col-span-12 mb-8 md:mb-12">
                <h3 className="text-white text-[42px] md:text-[56px] font-bold leading-none tracking-tighter" style={{ fontFamily: 'var(--font-inter)' }}>
                  Creative Digital Strategist
                </h3>
              </div>

              <div className="md:col-span-3">
                <p className="text-white text-base md:text-lg mb-4 font-medium" style={{ fontFamily: 'var(--font-inter)' }}>Web Strategist</p>
                <span className="text-[#A1A1AA] text-sm md:text-base font-mono">Sept 2025 — April 2026</span>
              </div>

              <div className="md:col-span-4 grid grid-cols-2 gap-y-4 text-sm md:text-base" style={{ fontFamily: 'var(--font-inter)' }}>
                <span className="text-[#696969]">Position</span>
                <span className="text-white">Full-stack Freelancer</span>
                
                <span className="text-[#696969]">Location</span>
                <span className="text-white">Remote</span>
                
                <span className="text-[#696969]">Industry</span>
                <span className="text-white">Creative Agency</span>
                
                <span className="text-[#696969]">Impact</span>
                <span className="text-white italic">Digital Growth</span>
              </div>

              <div className="md:col-span-5 space-y-6">
                <p className="text-[#A1A1AA] text-lg leading-relaxed">
                  Digitalized local business operations for multiple brands, includingLor Coffee Shop through responsive web and branding solutions.
                </p>
                <p className="text-[#A1A1AA] text-lg leading-relaxed">
                  Consulted on coherent brand identities for Lorin’s Shopee launch to build customer trust through technical and aesthetic excellence.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Certificates Section ── */}
      <section 
        className="relative w-full bg-black min-h-screen z-10 flex flex-col justify-center"
        onMouseMove={handleMouseMove}
      >
        <div className="mx-auto max-w-[1280px] w-full px-6 md:px-10 py-16 md:py-24 relative">
          <h2 className="text-white font-medium tracking-tight text-[32px] md:text-[40px] mb-8 md:mb-10" style={{ fontFamily: 'var(--font-inter)' }}>
            Certificates
          </h2>
          
          <div className="border-t border-[#333] relative">
            {certificates.map((cert, i) => (
              <a 
                key={i} 
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-row justify-between items-center py-6 md:py-8 border-b border-[#333] cursor-pointer transition-colors duration-500 no-underline"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <h3 
                  className={`text-[18px] md:text-[28px] tracking-tight transition-colors duration-500 flex-1 pr-4 ${
                    hoveredIndex === null ? 'text-white/95' : 
                    hoveredIndex === i ? 'text-white' : 'text-[#444]'
                  }`} 
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {cert.title}
                </h3>
                
                <div className="flex flex-row items-center gap-4 md:gap-12">
                  <span className={`text-[11px] md:text-[16px] font-medium transition-colors duration-500 whitespace-nowrap ${
                      hoveredIndex === null ? 'text-[#A1A1AA]' : 
                      hoveredIndex === i ? 'text-[#FF4D00]' : 'text-[#222]'
                    }`}
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {cert.company}
                  </span>

                  <div 
                    className={`flex flex-col text-right font-medium text-base md:text-[20px] leading-[1.05] tracking-tight transition-colors duration-500 ${
                      hoveredIndex === null ? 'text-white' : 
                      hoveredIndex === i ? 'text-white' : 'text-[#444]'
                    }`}
                  >
                    <span>{cert.year.slice(0, 2)}</span>
                    <span>{cert.year.slice(2, 4)}</span>
                  </div>

                  {/* Arrow for Mobile/Hover */}
                  <div className={`transition-all duration-500 ${
                    hoveredIndex === i ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                  } md:block hidden`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF4D00]">
                      <path d="M7 17l10-10M7 7h10v10"/>
                    </svg>
                  </div>

                  <div className="md:hidden block ml-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/40">
                      <path d="M7 17l10-10M7 7h10v10"/>
                    </svg>
                  </div>
                </div>
              </a>
            ))}

            {/* Hover Image Reveal - Desktop Only */}
            <AnimatePresence>
              {hoveredIndex !== null && (
                <motion.div
                  key={hoveredIndex}
                  initial={{ opacity: 0, scale: 0.8, x: '-50%', y: '-50%', filter: 'blur(10px)' }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    filter: 'blur(0px)',
                    left: mousePosition.x,
                    top: mousePosition.y,
                    transition: { 
                      opacity: { duration: 0.3 },
                      filter: { duration: 0.4 },
                      scale: { type: 'spring', stiffness: 200, damping: 25 },
                      left: { type: 'spring', stiffness: 150, damping: 20, mass: 0.5 },
                      top: { type: 'spring', stiffness: 150, damping: 20, mass: 0.5 }
                    }
                  }}
                  exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)', transition: { duration: 0.2 } }}
                  className="fixed pointer-events-none z-[100] w-[400px] h-[250px] overflow-hidden rounded-xl shadow-2xl border border-white/10 hidden md:block"
                  style={{ 
                    left: mousePosition.x, 
                    top: mousePosition.y,
                    x: '-50%',
                    y: '-50%'
                  }}
                >
                  <img
                    key={`cert-img-${hoveredIndex}`}
                    src={certificates[hoveredIndex].image}
                    alt={certificates[hoveredIndex].title}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover' 
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}