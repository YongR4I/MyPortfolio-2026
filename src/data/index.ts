/**
 * src/data/index.ts
 * Fungsi: Sebagai "database" sementara berisi data statis (hardcoded).
 * Tujuannya agar kode di UI (komponen) lebih bersih dan data lebih mudah diubah/diupdate.
 */

import { ServiceType, ProjectType } from "../types";

// Isi array ini nanti dengan data layananmu
export const servicesData: ServiceType[] = [];

// Isi array ini nanti dengan data proyek-proyekmu
export const projectsData: ProjectType[] = [
  {
    id: 1,
    slug: "modern-portfolio",
    title: "Modern Portfolio",
    description: "Building a personal brand required a balance between high-end aesthetics and smooth performance. I approached this by implementing a motion-first architecture using Next.js 15 and Framer Motion, resulting in a seamless, immersive experience that communicates professionalism through every interaction. The result is a highly polished digital presence that effectively showcases my capabilities.",
    techStack: ["Immersive UX", "Smooth Transition", "Performance Focus"],
    imagePlaceholder: "/images/mockup.jpg",
    images: ["/images/mockup.jpg", "/images/About.jpg", "/images/Frame 67.png"],
    year: "Jan - Apr 2026",
    overview: "A personal digital playground designed to reflect my identity as a creative developer. Rather than relying on standard templates, I wanted to build a bespoke experience that feels alive. It serves not just as a gallery of my past work, but as a living proof of my skills in bridging the gap between intricate design and solid front-end engineering.",
    problemAndApproach: "The primary challenge was implementing complex, continuous motion graphics without sacrificing web performance and accessibility. I chose Next.js 15 for its robust server-side capabilities and paired it with Framer Motion to orchestrate fluid, physics-based animations. I adopted a motion-first architecture, ensuring that transitions don't block the main thread. Lazy loading, layout shift prevention, and custom cursor mechanics were meticulously coded to create an immersive yet highly performant user journey.",
    results: [
      "Achieved a 98+ Lighthouse performance score despite heavy animation usage.",
      "Reduced Cumulative Layout Shift (CLS) to near zero through strict layout boundaries.",
      "Established a cohesive, memorable brand identity with custom interactions."
    ],
    liveLink: "https://your-portfolio.com",
    githubLink: "PRIVATE FOR NOW"
  },
  {
    id: 2,
    slug: "project-two",
    title: "Project Two",
    description: "Designed and developed a comprehensive e-commerce solution focused on conversion optimization. By analyzing user behavior patterns, I restructured the checkout flow to minimize friction, resulting in a significantly lower cart abandonment rate. The platform handles complex state management effortlessly.",
    techStack: ["React", "TypeScript", "GSAP"],
    imagePlaceholder: "/images/projectdummy.png",
    images: ["/images/projectdummy.png", "/images/project-image.png", "/images/About.jpg"],
    year: "Sep - Dec 2025",
    overview: "A conceptual high-end fashion e-commerce platform focused on delivering a premium shopping experience. The goal was to break away from traditional grid-based storefronts and introduce editorial-style layouts paired with seamless micro-interactions.",
    problemAndApproach: "E-commerce sites often suffer from bloated state management and clunky cart interactions. I utilized React with TypeScript to establish a strictly typed, predictable state flow. For the visual layer, I integrated GSAP for scroll-triggered animations and page transitions, carefully optimizing them to prevent frame drops on mobile devices. The checkout flow was entirely reimagined to reduce user friction.",
    results: [
      "Designed a frictionless, single-page checkout flow.",
      "Implemented advanced GSAP scroll animations maintaining 60fps.",
      "Established a scalable TypeScript architecture for product data."
    ],
    liveLink: "https://project-two.com",
    githubLink: "https://github.com/yourusername/project-two"
  },
  {
    id: 3,
    slug: "project-three",
    title: "Project Three",
    description: "An experimental web application pushing the boundaries of what's possible in the browser. Leveraging WebGL and custom shaders, I created an interactive 3D environment that responds in real-time to user inputs and audio frequencies. This required deep optimization to maintain 60fps.",
    techStack: ["Vite", "Canvas API", "Three.js"],
    imagePlaceholder: "/images/projectdummy.png",
    images: ["/images/projectdummy.png", "/images/About.jpg", "/images/mockup.jpg"],
    year: "Jun - Aug 2025",
    overview: "An experimental WebGL project that transforms audio input into interactive 3D visualizations in real-time. It serves to explore the intersection of sound, mathematics, and browser-based graphics.",
    problemAndApproach: "Rendering thousands of particles dynamically in the browser usually leads to severe frame drops. I bypassed the standard DOM completely, relying on raw Canvas API and Three.js. I wrote custom WebGL shaders to offload the heavy mathematical audio-frequency calculations directly to the GPU. The Vite bundler was used to keep the final build incredibly lightweight.",
    results: [
      "Maintained a stable 60fps while rendering over 50,000 active particles.",
      "Successfully synced real-time audio frequency data with GPU shader uniforms.",
      "Published as an open-source experiment for the creative coding community."
    ],
    liveLink: "https://project-three.com",
    githubLink: "https://github.com/yourusername/project-three"
  }
];
