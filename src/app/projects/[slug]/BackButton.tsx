'use client';

import React from 'react';
import Link from 'next/link';
import { useTransition } from '@/context/TransitionContext';

export function BackButton() {
  const { navigateWithTransition } = useTransition();

  const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigateWithTransition('/#projects-container');
  };

  return (
    <a
      href="/#projects-container"
      onClick={handleBack}
      className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors cursor-pointer"
    >
      <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/60 transition-colors">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <span className="font-mono text-xs uppercase tracking-widest">Back</span>
    </a>
  );
}