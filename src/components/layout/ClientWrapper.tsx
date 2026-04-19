"use client";

import dynamic from 'next/dynamic';
import SmoothScroll from "@/components/layout/SmoothScroll";

// Import Preloader tanpa SSR untuk mencegah error hidrasi di tingkat root
const Preloader = dynamic(() => import('@/components/layout/Preloader'), { ssr: false });

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <Preloader />
      {children}
    </SmoothScroll>
  );
}
