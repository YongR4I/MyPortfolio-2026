"use client";

/**
 * src/app/about/page.tsx
 * Optimized scroll smooth:
 * - Menggunakan `position: sticky` (hardware accelerated, no lag/jitter dengan Lenis).
 * - Hero menempel di atas (`sticky`), Card naik menutupinya di flow normal.
 * - Navbar di-absolut pada root sehingga otomatis ikut scroll naik.
 */

import { useRef, useState, useEffect } from 'react';
import Lenis from 'lenis';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';

const HERO_HEIGHT = 360;

const experiencesData = [
  {
    id: 'smkn',
    title: 'SMKN 1 Ciomas',
    period: '2024 — 2027',
    role: 'Software Engineering Lead & Full-Stack Developer',
    status: 'Student',
    image: '/images/Experience/smkn.jpg',
    takeaways: [
      'Laravel, React, Vite, PHP',
      'MySQL & Supabase',
      'System Debugging & Optimization',
      'Public Speaking & Technical Training',
      'Agile Problem Solving'
    ],
    description: [
      "Spearheading software development initiatives and system architecture within the academic environment. Focused on integrating modern frameworks to build high-performance digital solutions while actively fostering a culture of technical literacy through community mentorship and sharing sessions.",
      "End-to-End Engineering: Architected and deployed scalable web applications leveraging the React (Vite) and Laravel ecosystem, ensuring seamless integration between intuitive frontends and robust backends.",
      "Database Design: Developed and optimized data schemas using MySQL and Supabase, implementing real-time data handling and secure storage solutions.",
      "Technical Mentorship: Orchestrated and led the \"Zero to Web Dev\" sharing sessions, educating over 150 students across multiple cohorts on industry-standard development workflows and foundational coding principles.",
      "Performance Optimization: Conducted rigorous system debugging and performance tuning to ensure a fluid, cross-platform responsive experience across all user touchpoints.",
      "Strategic Version Control: Established streamlined collaboration workflows using GitHub, maintaining clean code architecture and efficient project versioning."
    ]
  },
  {
    id: 'codingcamp',
    title: 'Codingcamp by DBS 2026',
    period: 'Jan 2026 - May 2026',
    role: 'DBS Foundation Tech Cohort',
    status: 'Developer',
    image: '/images/Experience/codingcamp.png',
    takeaways: [
      'React 19 & Vite Ecosystem',
      'Supabase Integration',
      'AI-driven Assistants',
      'Node.js/Express 5',
      'GSAP & Framer Motion'
    ],
    description: [
      "Developed FinLitGo, a full-stack financial literacy app for Gen-Z using React 19, Vite, and Supabase, featuring AI-driven assistants.",
      "Implemented modern web architectures with Node.js/Express 5 and TailwindCSS 4, enhanced by smooth GSAP and Framer Motion animations.",
      "Collaborated in a high-performance technical team to solve complex problems through creative engineering and personal branding."
    ]
  },
  {
    id: 'freelance',
    title: 'Independent Web Developer & Strategist',
    period: 'Jan 2025 - Present',
    role: 'Creative Digital Strategist',
    status: 'Freelance',
    image: '/images/Experience/freelancer.png',
    takeaways: [
      'Digital Transformation',
      'Cinematic Branding',
      'Brand Identity Architecture',
      'Strategic Consultation'
    ],
    description: [
      "Digitalized local business operations for brands like Kopitography and Jurasep by engineering responsive web solutions while conceptualizing cinematic visual content to strengthen their social media identity.",
      "Architected a credible digital presence for Brand Lorin, providing strategic consultation on brand identity design to foster consumer trust during their initial high-stakes launch on Shopee.",
      "Developed integrated branding ecosystems that bridge technical web functionality with high-end aesthetics, ensuring consistent and competitive growth for MSMEs in the digital landscape."
    ]
  }
];






const ExperienceOverlay = ({ item, onClose }: any) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [imgHeight, setImgHeight] = useState(280);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const measure = () => {
      if (imgRef.current) setImgHeight(imgRef.current.offsetHeight);
    };
    measure();
    window.addEventListener('resize', measure);

    // Initialize smooth scroll for overlay (Desktop Only)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (!isMobile && scrollRef.current) {
      const lenis = new Lenis({
        wrapper: scrollRef.current,
        content: scrollRef.current.querySelector('.lenis-content') as HTMLElement,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenisRef.current = lenis;

      let rafId: number;
      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
        window.removeEventListener('resize', measure);
      };
    }

    return () => window.removeEventListener('resize', measure);
  }, [item.image]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-md flex flex-col justify-end"
      onClick={onClose}
    >

      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ 
          duration: 1.0, 
          ease: [0.16, 1, 0.3, 1] // Even smoother ease-out
        }}
        className="relative w-full h-[92vh] bg-[#0a0a0a] rounded-t-[40px] shadow-2xl overflow-hidden border-t border-white/10"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button — now inside the card, top-right */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 md:top-8 md:right-8 z-[230] w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/80 hover:border-white/60 transition-all duration-200"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
          </svg>
        </button>

        {/* ── Image Section (Parallax within card) ── */}
        {item.image && (
          <div className="absolute top-0 left-0 right-0 z-0 h-[50vh]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover block"
            />
            {/* Gradient fade at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            {/* Period badge */}
            <span className="absolute bottom-5 left-6 md:left-12 font-mono text-xs tracking-widest uppercase text-white/60">
              {item.period}
            </span>
          </div>
        )}

        {/* ── Scroll container ── */}
        <div
          ref={scrollRef}
          className="absolute inset-0 z-10 overflow-y-auto overscroll-contain"
        >
          <div className="lenis-content flex flex-col w-full">
            {/* Transparent spacer — determines initial image visibility */}
            <div
              style={{ height: '45vh' }}
              className="cursor-pointer flex-shrink-0"
              onClick={onClose}
            />

            {/* Dark content panel — slides up over image on scroll */}
            <div className="relative bg-[#0a0a0a] min-h-screen shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border-t border-white/[0.12]">
              {/* Edge Glow Highlight */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent z-20" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] h-[40px] bg-white/[0.05] blur-2xl rounded-full z-10 pointer-events-none" />

              {/* Header inside scroll (for title reveal) */}
              <div className="pt-12 pb-4 px-6 md:px-12">
                <div className="w-10 h-1 rounded-full bg-[#333] mx-auto mb-10" />
                <div className="flex items-baseline gap-4">
                  <h3 className="text-3xl md:text-5xl font-semibold text-white tracking-tight" style={{ fontFamily: 'var(--font-inter)' }}>{item.title}</h3>
                  <span className="text-[#696969] font-mono text-sm hidden md:block">{item.period}</span>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 md:px-12 py-10 flex flex-col gap-10">
                {/* Role + Status */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1">
                    <p className="text-[#696969] text-xs font-mono uppercase tracking-widest mb-2">Role</p>
                    <h4 className="text-xl md:text-3xl text-white font-semibold leading-snug" style={{ fontFamily: 'var(--font-inter)' }}>{item.role}</h4>
                  </div>
                  <span className="inline-block self-start px-4 py-2 bg-[#1a2315] text-[#84cc16] text-xs font-mono tracking-widest uppercase rounded-full border border-[#84cc16]/30">
                    {item.status}
                  </span>
                </div>

                {/* Expertise pills */}
                <div>
                  <p className="text-[#696969] text-xs font-mono uppercase tracking-widest mb-4">Expertise</p>
                  <div className="flex flex-wrap gap-2">
                    {item.takeaways.map((t: string, i: number) => (
                      <span key={i} className="px-4 py-2 bg-[#111] border border-[#222] rounded-xl text-sm text-[#d4d4d8]">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-[#1a1a1a]" />

                {/* Description */}
                <div>
                  <p className="text-[#696969] text-xs font-mono uppercase tracking-widest mb-6">Description</p>
                  <ul className="space-y-6">
                    {item.description.map((desc: string, i: number) => (
                      <li key={i} className="text-[#A1A1AA] text-base md:text-lg leading-relaxed font-light border-b border-[#1a1a1a] pb-6 last:border-0 last:pb-0" style={{ fontFamily: 'var(--font-inter)' }}>
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="h-20" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};


export default function AboutPage() {
  const experienceRef = useRef<HTMLDivElement>(null);
  const [selectedExp, setSelectedExp] = useState<number | null>(null);
    
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [hasSeen, setHasSeen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<number | null>(null);

  useEffect(() => {
    const isLocked = selectedCert !== null || selectedExp !== null;

    if (isLocked) {
      // Store current scroll position and freeze the body in place
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      // Also stop Lenis
      window.dispatchEvent(new Event('lock-scroll'));
    } else {
      // Restore scroll position exactly where user was
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
      window.dispatchEvent(new Event('unlock-scroll'));
    }

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
      window.dispatchEvent(new Event('unlock-scroll'));
    };
  }, [selectedCert, selectedExp]);

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



  const certificates = [
    {
      title: "React Web Development",
      company: "Codingcamp Powered By DBS",
      year: "2026",
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
      year: "2026",
      image: "/images/Certificates/3.png",
      link: "https://www.dicoding.com/certificates/2VX30N1OJXYQ"
    },
    {
      title: "Cloud Computing & Generative AI on AWS",
      company: "Codingcamp Powered By DBS",
      year: "2026",
      image: "/images/Certificates/4.png",
      link: "https://www.dicoding.com/certificates/53XEK850KXRN"
    },
    {
      title: "Back-End Development with JavaScript",
      company: "Codingcamp Powered By DBS",
      year: "2026",
      image: "/images/Certificates/5.png",
      link: "https://www.dicoding.com/certificates/EYX4K44G5PDL"
    },
    {
      title: "Web Programming Fundamentals",
      company: "Codingcamp Powered By DBS",
      year: "2026",
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
          src="/images/About/About.jpg"
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
                <Link href="/contact" className="px-8 py-2.5 border border-white/10 rounded-full text-white text-[13px] hover:bg-white/5 transition-colors">
                  Let&apos;s Talk
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ── Experience Section (Numbered List + Overlay) ── */}
      <section
        ref={experienceRef}
        className="relative w-full bg-black z-10 py-24 md:py-32"
      >
        <div className="mx-auto max-w-[1200px] w-full px-6 md:px-10">

          {/* Header */}
          <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-white font-medium tracking-tight text-[40px] md:text-[60px] leading-none" style={{ fontFamily: 'var(--font-inter)' }}>
              Experience
            </h2>
            <p className="text-[#696969] text-sm font-mono uppercase tracking-widest">
              Tap to view details
            </p>
          </div>

          {/* Numbered List */}
          <div className="flex flex-col border-t border-[#1a1a1a]">
            {experiencesData.map((exp, index) => (
              <motion.button
                key={exp.id}
                onClick={() => setSelectedExp(index)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group w-full text-left flex items-center gap-6 md:gap-10 py-7 md:py-9 border-b border-[#1a1a1a] hover:bg-white/[0.03] transition-colors duration-300 px-2"
              >
                {/* Number */}
                <span className="text-[#333] font-mono text-base md:text-lg group-hover:text-[#FF442B] transition-colors duration-300 flex-shrink-0 w-10 text-right">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Title */}
                <span className="flex-1 text-[#A1A1AA] group-hover:text-white text-2xl md:text-4xl font-medium tracking-tight transition-colors duration-300" style={{ fontFamily: 'var(--font-inter)' }}>
                  {exp.title}
                </span>

                {/* Period (hidden on small mobile) */}
                <span className="hidden sm:block text-[#333] font-mono text-sm group-hover:text-[#696969] transition-colors duration-300 flex-shrink-0">
                  {exp.period}
                </span>

                {/* Arrow */}
                <motion.div
                  className="w-10 h-10 rounded-full border border-[#222] flex items-center justify-center text-[#333] group-hover:border-white group-hover:text-white transition-colors duration-300 flex-shrink-0"
                  whileHover={{ rotate: -45 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              </motion.button>
            ))}
          </div>

        </div>
      </section>

      {/* ── Certificates Section ── */}
      <section 
        className="relative w-full bg-black min-h-screen z-10 flex flex-col justify-center"
      >
        <div className="mx-auto max-w-[1280px] w-full px-6 md:px-10 py-16 md:py-24 relative">
          <h2 className="text-white font-medium tracking-tight text-[32px] md:text-[40px] mb-8 md:mb-10" style={{ fontFamily: 'var(--font-inter)' }}>
            Certificates
          </h2>
          
          <div className="border-t border-[#333] relative">
            {certificates.map((cert, i) => (
              <div 
                key={i} 
                className="group flex flex-row justify-between items-center py-6 md:py-8 border-b border-[#333] cursor-pointer transition-colors duration-500"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedCert(i)}
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
                  <div 
                    className={`text-right font-medium text-base md:text-[20px] leading-none tracking-tight transition-colors duration-500 ${
                      hoveredIndex === null ? 'text-[#A1A1AA]' : 
                      hoveredIndex === i ? 'text-white' : 'text-[#444]'
                    }`}
                  >
                    <span>{cert.year}</span>
                  </div>

                  {/* Arrow Icon */}
                  <div className={`w-[36px] h-[36px] md:w-[44px] md:h-[44px] flex flex-shrink-0 items-center justify-center rounded-full border transition-all duration-500 ml-2 md:ml-4 ${
                      hoveredIndex === null ? 'bg-[#111] border-white/10 text-white' : 
                      hoveredIndex === i ? 'bg-[#222] border-white/20 text-white scale-110' : 'bg-[#0a0a0a] border-white/5 text-[#444]'
                    }`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="md:w-[18px] md:h-[18px]">
                      <path d="M7 17l10-10M7 7h10v10"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Full-screen Overlays (Placed at root to avoid parent clipping) */}
      <AnimatePresence>
        {selectedExp !== null && (
          <ExperienceOverlay
            item={experiencesData[selectedExp]}
            onClose={() => setSelectedExp(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedCert !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8"
            onClick={() => setSelectedCert(null)}
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={certificates[selectedCert].image}
                alt={certificates[selectedCert].title}
                className="max-w-[90vw] max-h-[85vh] md:max-w-[1000px] rounded-xl object-contain block shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10"
              />
              
              {/* Close Button placed at the top right of the image */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute -top-4 -right-4 md:-top-5 md:-right-5 z-[260] w-10 h-10 flex items-center justify-center rounded-full bg-[#111] border border-white/10 hover:bg-[#222] hover:border-white/20 text-white transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Footer />
    </div>
  );
}