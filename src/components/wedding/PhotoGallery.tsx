"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PhotoGallery() {
  return (
    <section className="py-20 px-4 max-w-4xl mx-auto relative z-10 flex flex-col items-center">
      {/* Title */}
      <div className="text-center mb-12 space-y-2">
        <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-gold-400 uppercase">
          A Glimpse of Us
        </span>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4" />
      </div>

      {/* Single Elegant Framed Image */}
      <motion.div
        className="relative w-full max-w-md aspect-[3/4] md:aspect-[4/5] rounded-2xl overflow-hidden border border-gold-500/20 p-2 md:p-3 bg-[#050814]/80 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group hover:border-[#d4af37]/40 transition-colors duration-300"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-royal-dark">
          <Image
            src="/wedding/Edited - 98.JPEG"
            alt="Kavana and Tilak traditional pose"
            fill
            className="object-cover group-hover:scale-102 transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, 450px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        </div>
      </motion.div>
    </section>
  );
}
