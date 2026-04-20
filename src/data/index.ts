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
    slug: "project-one",
    title: "Project One",
    description: "This is a brief description of the first project.",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    imagePlaceholder: "/images/projectdummy.png"
  },
  {
    id: 2,
    slug: "project-two",
    title: "Project Two",
    description: "This is a brief description of the second project.",
    techStack: ["React", "TypeScript", "GSAP"],
    imagePlaceholder: "/images/projectdummy.png"
  },
  {
    id: 3,
    slug: "project-three",
    title: "Project Three",
    description: "This is a brief description of the third project.",
    techStack: ["Vite", "Canvas API", "Three.js"],
    imagePlaceholder: "/images/projectdummy.png"
  }
];
