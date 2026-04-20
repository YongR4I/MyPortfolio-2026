"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

/**
 * Services.tsx
 * Detailed Services design based on user provided image.
 * Features:
 * - Massive stroked numbers (DM Mono).
 * - Inter Display typography.
 * - Table-like list layout.
 * - Fully responsive (mobile-first).
 */

const services = [
  {
    id: "01",
    title: "Web Development",
    description: "Building high-performance websites with clean code and modern tech. Focused on speed, scalability, and seamless digital experiences.",
    features: [
      "Custom Web Application",
      "Responsive & Performance",
      "Modern Tech Stack (React/Next.js)",
      "SEO & Accessibility"
    ]
  },
  {
    id: "02",
    title: "Creative Strategy",
    description: "Solving complex business challenges through strategic creative thinking. Effective communication to bridge the gap between ideas and results.",
    features: [
      "Business Problem Solving",
      "Public Speaking & Presentation",
      "Strategic Storytelling",
      "Solution Architecture"
    ]
  },
  {
    id: "03",
    title: "Content Strategist",
    description: "Driving organic growth through trend-driven and purposeful content. Crafting stories that capture attention and build brand authority.",
    features: [
      "Social Media Branding",
      "Short-form Video Production",
      "Visual Content Creation",
      "Organic Growth Strategy"
    ]
  }
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="bg-[#18181B] relative px-6 lg:px-20 py-24">
      {/* Label Header - Only one at the top of the entire section */}
      <div className="absolute top-12 left-6 lg:left-20 z-10">
        <span className="text-[#FF442B] font-inter text-[14px] uppercase tracking-wider">
          // Service
        </span>
      </div>

      <div className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row relative">

        {/* Sticky Number Side - The number stays fixed, changes based on scroll with spin animation */}
        <div className="hidden lg:flex w-1/2 h-screen sticky top-0 items-center justify-start z-0">
          <div className="relative w-full h-full flex items-center justify-start overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h3
                key={activeIndex}
                initial={{ opacity: 0, rotateY: 90, scale: 0.95 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: -90, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" }} // Faster and snappier transition
                className="font-mono leading-none select-none text-[#18181B] absolute"
                style={{
                  fontSize: 'clamp(140px, 22vw, 300px)',
                  WebkitTextStroke: '2px #FFFFFF',
                  fontFamily: 'var(--font-mono)',
                  top: '25%', // Move the start point much higher up
                  transform: 'translateY(-20%)'
                }}
              >
                {services[activeIndex].id}
              </motion.h3>
            </AnimatePresence>
          </div>
        </div>

        {/* Content Side */}
        <div className="w-full lg:w-1/2 flex flex-col z-10 pt-12 lg:pt-0">
          {services.map((service, index) => (
            <motion.section
              key={service.id}
              id={index === 0 ? "services" : undefined}
              className="relative min-h-[100vh] w-full flex flex-col justify-center"
              onViewportEnter={() => setActiveIndex(index)}
              viewport={{ amount: 0.5, margin: "-10% 0px -10% 0px" }} // Trigger animation precisely when content hits the center
            >
              {/* Content Area */}
              <div className="w-full">
                {/* Title and Description */}
                <div className="mb-12 text-left">
                  <h2 className="text-white font-inter font-bold text-[48px] md:text-[64px] lg:text-[76px] leading-[1.0] mb-6 tracking-tighter">
                    {service.title}
                  </h2>
                  <p className="text-white/60 font-inter font-normal text-[16px] md:text-[18px] leading-relaxed max-w-[500px]">
                    {service.description}
                  </p>
                </div>

                {/* Features List (Table-like with Numbers) */}
                <div className="w-full border-t border-white/20">
                  {service.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-6 border-b border-white/20 group cursor-default transition-all duration-300"
                    >
                      <span className="text-white/90 font-inter font-semibold text-[16px] md:text-[18px] group-hover:text-white transition-colors duration-300">
                        {feature}
                      </span>
                      <div className="text-white/50 font-mono text-[14px] group-hover:text-[#FF442B] transition-colors duration-300">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}
