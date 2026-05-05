import type { Metadata } from "next";
import "./globals.css";
import Preloader from "@/components/layout/Preloader";
import SmoothScroll from "@/components/layout/SmoothScroll";

export const metadata: Metadata = {
  title: "Raihan Daffa - Creative Web Developer",
  description: "Web Developer Portfolio",
};

import { TransitionProvider } from "@/context/TransitionContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <TransitionProvider>
          <Preloader />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </TransitionProvider>
      </body>
    </html>
  );
}
