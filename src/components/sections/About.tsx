"use client";

import { useRef, memo } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

/**
 * Komponen pembantu untuk animasi per kata
 */
const Word = memo(({
  text,
  progress,
  range,
  targetColor
}: {
  text: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetColor: string;
}) => {
  const color = useTransform(progress, range, ["#444444", targetColor]);

  return (
    <motion.span style={{ color, marginRight: '0.2em' }}>
      {text}
    </motion.span>
  );
});
Word.displayName = "Word";

// Membagi headline menjadi array kata per kata beserta informasi warnanya (Dipindah ke luar agar tidak re-create)
const words = [
  { text: "I'm", color: "#FFFFFF" },
  { text: "a", color: "#FFFFFF" },
  { text: "Developer", color: "#FF442B" },
  { text: "&", color: "#FF442B" },
  { text: "Creator", color: "#FF442B" },
  { text: "Turning", color: "#FFFFFF" },
  { text: "ideas", color: "#FFFFFF" },
  { text: "into", color: "#FFFFFF" },
  { text: "functional", color: "#FF442B" },
  { text: "reality.", color: "#FF442B" },
  { text: "I", color: "#FFFFFF" },
  { text: "focus", color: "#FFFFFF" },
  { text: "on", color: "#FFFFFF" },
  { text: "clean", color: "#FFFFFF" },
  { text: "interfaces,", color: "#FFFFFF" },
  { text: "modern", color: "#FFFFFF" },
  { text: "tech", color: "#FFFFFF" },
  { text: "stacks,", color: "#FFFFFF" },
  { text: "and", color: "#FFFFFF" },
  { text: "high-impact", color: "#FF442B" },
  { text: "execution.", color: "#FF442B" },
];

/**
 * src/components/sections/About.tsx
 * Fungsi: Section untuk menjelaskan siapa dirimu, latar belakang,
 * visi, misi, atau ringkasan cerita profesionalmu.
 * Design: Figma node 173:292
 */

export default function About() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "center 50%"],
  });

  const textProgress = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: '#18181B',
        paddingTop: 'clamp(60px, 8vw, 120px)',
        paddingBottom: 'clamp(60px, 8vw, 120px)',
        paddingLeft: 'clamp(24px, 5vw, 80px)',
        paddingRight: 'clamp(24px, 5vw, 80px)',
      }}
    >
      {/* // Intro Label - Top Left */}
      <span
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: '14px',
          fontWeight: 400,
          color: '#FF442B',
          letterSpacing: '0.02em',
          display: 'block',
        }}
      >
        // Intro
      </span>

      {/* Main Headline - SemiBold, centered container, text indented and left-aligned */}
      <div style={{ marginTop: 'clamp(40px, 6vw, 80px)', display: 'flex', justifyContent: 'flex-start' }}>
        <h2
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 600,
            fontSize: 'clamp(32px, 8vw, 69px)',
            lineHeight: 1.05,
            color: '#FFFFFF',
            letterSpacing: '-0.04em',
            maxWidth: '1150px',
            textAlign: 'left',
            display: 'inline-flex',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ display: 'inline-block', width: 'clamp(40px, 8vw, 110px)' }}></span>
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);

            return (
              <Word
                key={i}
                progress={textProgress}
                range={[start, end]}
                text={word.text}
                targetColor={word.color}
              />
            )
          })}
        </h2>
      </div>

      {/* Bottom Row: Sub-description + Button - Right aligned */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: 'clamp(48px, 6vw, 120px)',
          maxWidth: '1150px',
        }}
      >
        <div style={{ width: '100%', maxWidth: '440px', textAlign: 'left', paddingLeft: 'clamp(0px, 4vw, 40px)' }}>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
              fontSize: 'clamp(14px, 1.2vw, 16px)',
              lineHeight: 1.6,
              color: '#FFFFFF',
              opacity: 0.9,
            }}
          >
            Transforming complex requirements into seamless digital
            experiences—from robust backend logic to pixel-perfect UIs—
            I deliver high-performance web applications tailored to your
            needs.
          </p>

          <button
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
              fontSize: 'clamp(13px, 1.1vw, 15px)',
              color: '#FFFFFF',
              backgroundColor: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '999px',
              padding: '10px 24px',
              marginTop: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#FF442B';
              e.currentTarget.style.color = '#FF442B';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
              e.currentTarget.style.color = '#FFFFFF';
            }}
          >
            More About Me...
          </button>
        </div>
      </div>

      {/* Bottom Divider Line - sits at the very edge */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '0.5px',
          backgroundColor: '#666666',
        }}
      />
    </section>
  );
}
