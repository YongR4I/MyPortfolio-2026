import type { Metadata } from "next";
import "./globals.css";
import { TransitionProvider } from "@/context/TransitionContext";
import ClientWrapper from "@/components/layout/ClientWrapper";

export const metadata: Metadata = {
  title: "Raihan Daffa - Creative Web Developer",
  description: "Web Developer Portfolio",
};

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
      </head>
      <body>
        <TransitionProvider>
          <ClientWrapper>
            {children}
          </ClientWrapper>
        </TransitionProvider>
      </body>
    </html>
  );
}
