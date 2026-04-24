"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface TransitionContextProps {
  isTransitioning: boolean;
  setIsTransitioning: (val: boolean) => void;
  navigateWithTransition: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextProps | undefined>(undefined);

export const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Reset transitioning state when the pathname changes
  useEffect(() => {
    setIsTransitioning(false);
  }, [pathname]);

  const navigateWithTransition = (href: string) => {
    if (pathname === href) return;
    
    setIsTransitioning(true);
    
    // Wait for the entry animation (slide in) before navigating
    // Match this with the transition duration in Preloader
    setTimeout(() => {
      router.push(href);
    }, 1000); 
  };

  return (
    <TransitionContext.Provider value={{ isTransitioning, setIsTransitioning, navigateWithTransition }}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
};
