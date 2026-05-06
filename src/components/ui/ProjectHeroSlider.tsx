"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectHeroSliderProps {
  images: string[];
  alt: string;
}

const slideVariants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function ProjectHeroSlider({ images, alt }: ProjectHeroSliderProps) {
  const [[page, direction], setPage] = useState([0, 0]);

  // Handle case where there are no images
  if (!images || images.length === 0) {
    return null;
  }

  // If there's only one image, just render it without slider controls
  if (images.length === 1) {
    const isVideo = images[0].toLowerCase().endsWith('.mp4') || images[0].toLowerCase().endsWith('.webm');
    return (
      <div className="w-full aspect-[4/3] md:aspect-[21/9] relative rounded-[2rem] overflow-hidden bg-[#1e1e21] border border-white/5">
        {isVideo ? (
          <video
            src={images[0]}
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full pointer-events-none"
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={images[0]}
            alt={alt}
            className="object-cover w-full h-full pointer-events-none"
          />
        )}
      </div>
    );
  }

  // We only have 3 images, but we want to wrap around infinitely
  const imageIndex = ((page % images.length) + images.length) % images.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="w-full aspect-[4/3] md:aspect-[21/9] relative rounded-[2rem] overflow-hidden bg-[#1e1e21] border border-white/5 group">
      <AnimatePresence initial={false} custom={direction}>
        {images[imageIndex].toLowerCase().endsWith('.mp4') || images[imageIndex].toLowerCase().endsWith('.webm') ? (
          <motion.video
            key={page}
            src={images[imageIndex]}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            autoPlay
            loop
            muted
            playsInline
            className="absolute object-cover w-full h-full cursor-grab active:cursor-grabbing"
          />
        ) : (
          <motion.img
            key={page}
            src={images[imageIndex]}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            alt={`${alt} image ${imageIndex + 1}`}
            className="absolute object-cover w-full h-full cursor-grab active:cursor-grabbing"
          />
        )}
      </AnimatePresence>
      
      {/* Prev Button */}
      <button
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-black/60 hover:scale-105 transition-all z-10"
        onClick={() => paginate(-1)}
        aria-label="Previous image"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Next Button */}
      <button
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-black/60 hover:scale-105 transition-all z-10"
        onClick={() => paginate(1)}
        aria-label="Next image"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const newDirection = index > imageIndex ? 1 : -1;
              setPage([page + (index - imageIndex), newDirection]);
            }}
            className={`transition-all duration-300 rounded-full ${
              index === imageIndex
                ? "w-8 h-2 bg-white"
                : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
