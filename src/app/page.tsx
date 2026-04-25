/**
 * src/app/page.tsx
 * Fungsi: Ini adalah halaman utama (Root Page) dari aplikasimu.
 * Di sinilah kita menggabungkan semua komponen bagian (sections) menjadi satu halaman utuh.
 */

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Stats from "@/components/sections/Stats";

export default function Home() {
  return (
    <main className="min-h-screen relative bg-black">
      <Navbar />
      <div className="relative z-10 bg-black">
        <div className="sticky top-0 z-0">
          <Hero />
        </div>
        <div className="relative z-10 bg-black shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          <About />
          <Services />
          <Projects />
          <Stats />
        </div>
      </div>
      <div className="relative z-50 bg-transparent">
        <Footer />
      </div>
    </main>
  );
}
