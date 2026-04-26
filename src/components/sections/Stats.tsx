'use client';

import React from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

/**
 * src/components/sections/Stats.tsx
 * Fungsi: Menampilkan statistik dan fakta menarik dengan animasi penghitungan.
 */

const stats = [
  {
    value: 2,
    suffix: "+",
    label: "Years Experience",
    description: "In the web design industry field."
  },
  {
    value: 10,
    suffix: "+",
    label: "Projects Done",
    description: "Around worldwide in last 2 years."
  },
  {
    value: 100,
    suffix: "%",
    label: "Satisfied Clients",
    description: "With a great experience and results."
  }
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  React.useEffect(() => {
    if (isInView) {
      animate(count, value, { duration: 2, ease: "easeOut" });
    }
  }, [isInView, count, value]);

  return (
    <motion.h3 
      ref={ref}
      className="font-['Inter_Display'] font-bold text-6xl md:text-7xl lg:text-[100px] text-white mb-4 leading-none"
    >
      <motion.span>{rounded}</motion.span>{suffix}
    </motion.h3>
  );
}

export default function Stats() {
  return (
    <section className="bg-[#18181B] py-24 md:py-32 px-6 md:px-10 lg:px-20 border-t border-white/5 relative">
      {/* Top Center Plus Icon */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="text-white/20 text-2xl font-light">+</span>
      </div>

      <div className="max-w-[1440px] mx-auto">
        {/* Label and First Line Alignment */}
        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-0">
          {/* Label with Red Dot */}
          <div className="flex items-center gap-2 min-w-[200px]">
            <div className="w-2.5 h-2.5 rounded-[2px] bg-[#FF442B]" />
            <span className="text-[#18181B] dark:text-white font-medium text-[10px] md:text-[11px] uppercase tracking-wider">
              Stats & Facts
            </span>
          </div>

          {/* Headline - 40px bold, indented first line */}
          <div className="flex-1">
            <h2 className="font-['Inter_Display'] font-bold text-[22px] md:text-[40px] leading-[1.2] text-white max-w-[1100px] mb-20 md:mb-32">
              <span className="inline-block w-[15%] md:w-[12%] h-1" />
              I take pride in creating solutions that are not only visually stunning® but also highly functional. Every number tells a story, and I’m excited to bring that same dedication.
            </h2>
          </div>
        </div>

        {/* Bottom Row - Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 relative">
          {/* Subtle horizontal line divider for desktop */}
          <div className="absolute top-[-40px] left-0 w-full h-[0.5px] bg-white/10 hidden md:block" />
          
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="font-['Inter_Display'] font-bold text-lg md:text-xl text-white mb-2">
                {stat.label}
              </p>
              <p className="text-[#999999] text-sm md:text-base max-w-[200px]">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
