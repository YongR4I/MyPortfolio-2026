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
    imagePlaceholder: "/images/CardProject/mockup.jpg",
    images: ["/images/CardProject/mockup.jpg", "/images/About.jpg", "/images/Frame 67.png"],
    year: "March - Apr 2026",
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
    slug: "finlitgo",
    title: "FinLitGo — Digital Literacy & Financial Management",
    description: "Addressing the paradox of low financial literacy amidst rapid fintech adoption, FinLitGo is an adaptive educational platform that integrates practical cash flow management with an intelligent AI-driven assistant. It bridges the gap between static theory and real-world financial application.",
    techStack: ["Financial Technology", "Personalized UX", "AI Implementation"],
    imagePlaceholder: "/images/CardProject/finmockup.png",
    images: ["/images/CardProject/finmockup.png", "/images/projectdummy.png", "/images/About.jpg"],
    year: "April - May 2026",
    overview: "FinLitGo is a comprehensive digital literacy and financial management platform designed to bridge the gap between seamless fintech access and poor risk management among Gen Z. Developed alongside team CC26-PS031, the project's core mission is to transform traditional financial education from static theory into a highly adaptive, practical asset management experience.",
    problemAndApproach: "The modern digital landscape offers unprecedented access to e-wallets and digital investments, often leading young adults into impulsive consumer behavior. The primary challenge was architecting an ecosystem that actively guides users through daily cash flow management. Operating as a Full-Stack Developer, I built a high-performance infrastructure utilizing React and Vite for the frontend, powered by a robust RESTful API and Supabase for scalable data management. The UI/UX was meticulously crafted in Figma to ensure maximum engagement for a younger demographic.",
    results: [
      "Adaptive Learning Architecture: Engineered personalized educational pathways supporting varied media formats to maximize knowledge retention.",
      "AI Financial Assistant: Integrated advanced AI capabilities to provide users with real-time, context-aware financial recommendations.",
      "Smart Financial Dashboard: Developed an intuitive tracking system allowing users to monitor income, expenses, and overall financial health.",
      "Comprehensive Curriculum: Structured a tiered educational module system ranging from foundational literacy to long-term investment strategies."
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
