"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { weddingConfig } from "@/utils/weddingConfig";

export default function PhotoGallery() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx === null) return;
    setActiveIdx((activeIdx + 1) % weddingConfig.galleryPhotos.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx === null) return;
    setActiveIdx(
      (activeIdx - 1 + weddingConfig.galleryPhotos.length) %
        weddingConfig.galleryPhotos.length
    );
  };

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto relative">
      {/* Background Decor Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.02)_0%,rgba(0,0,0,0)_75%)] pointer-events-none" />

      {/* Title */}
      <div className="text-center mb-16 space-y-2">
        <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-gold-400 uppercase">
          Pre-Wedding Gallery
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-white font-light">
          Moments of Love
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4" />
      </div>

      {/* Styled Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[250px]">
        {weddingConfig.galleryPhotos.map((photo, idx) => {
          // Create varied grid card sizes for an elegant editorial look
          let gridSpan = "md:col-span-4";
          if (idx === 0) gridSpan = "md:col-span-8 md:row-span-2 md:h-[516px]"; // Hero horizontal card
          else if (idx === 1) gridSpan = "md:col-span-4 md:row-span-2 md:h-[516px]"; // Hero vertical card
          else if (idx === 2) gridSpan = "md:col-span-4";
          else if (idx === 3) gridSpan = "md:col-span-4";
          else if (idx === 4) gridSpan = "md:col-span-4";

          return (
            <motion.div
              key={idx}
              className={`${gridSpan} overflow-hidden rounded-2xl relative border border-[#d4af37]/15 group cursor-pointer shadow-lg`}
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.3 }}
              onClick={() => setActiveIdx(idx)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Gold gradient shine overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity z-10" />

              {/* Next.js optimized Image loader */}
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority={idx === 0}
              />

              {/* Hover actions icon overlay */}
              <div className="absolute bottom-4 right-4 z-20 w-8 h-8 rounded-full bg-[#050814]/80 border border-[#d4af37]/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4 text-gold-300" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Premium Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIdx(null)}
          >
            {/* Exit button */}
            <button
              onClick={() => setActiveIdx(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Nav Button */}
            <button
              onClick={handlePrev}
              className="absolute left-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Slideable Lightbox Container */}
            <motion.div
              key={activeIdx}
              className="w-full max-w-5xl max-h-[80vh] relative aspect-[4/3] md:aspect-[16/10] overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={weddingConfig.galleryPhotos[activeIdx].src}
                alt={weddingConfig.galleryPhotos[activeIdx].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>

            {/* Right Nav Button */}
            <button
              onClick={handleNext}
              className="absolute right-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Description overlay */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#050814]/80 border border-white/10 px-6 py-2.5 rounded-full text-xs font-sans tracking-widest text-[#fdfcf7] uppercase">
              {activeIdx + 1} / {weddingConfig.galleryPhotos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
