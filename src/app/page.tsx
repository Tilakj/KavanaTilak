"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { weddingConfig } from "@/utils/weddingConfig";
import LuxuryRevealDoor from "@/components/wedding/LuxuryRevealDoor";
import ScratchCardReveal from "@/components/wedding/ScratchCardReveal";
import EventTimeline from "@/components/wedding/EventTimeline";
import VenueMap from "@/components/wedding/VenueMap";
import PhotoGallery from "@/components/wedding/PhotoGallery";
import FallingPetals from "@/components/wedding/FallingPetals";

export default function Home() {
  const [isRevealed, setIsRevealed] = useState(false);
  const { scrollY } = useScroll();

  // Smooth Parallax Scroll transforms
  const yVideo = useTransform(scrollY, [0, 800], [0, 220]);
  const yHeroText = useTransform(scrollY, [0, 800], [0, -110]);
  const opacityHeroText = useTransform(scrollY, [0, 500], [1, 0]);

  const handleReveal = () => {
    setIsRevealed(true);
  };

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden select-none">
      {/* 3D Envelope/Door Cover overlay */}
      <LuxuryRevealDoor onReveal={handleReveal} />

      {/* Background Falling Petals Physics Layer (active once opened) */}
      {isRevealed && <FallingPetals />}

      {/* Main Wedding Content Container */}
      {isRevealed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="relative z-10 w-full"
        >
          {/* SECTION 1: HERO HEADER WITH VIDEO BACKGROUND */}
          <section className="relative h-[95vh] md:h-screen w-full flex items-end justify-center pb-24 md:pb-32 overflow-hidden">
            {/* Background Video Layer */}
            <motion.div 
              style={{ y: yVideo }}
              className="absolute inset-0 z-0"
            >
              <video
                src={weddingConfig.heroVideoSrc}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-top scale-105 opacity-70"
              />
              {/* Premium dark vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050814] via-[#050814]/40 to-[#050814]/85 z-10" />
            </motion.div>

            {/* Header Content Overlay */}
            <motion.div 
              style={{ y: yHeroText, opacity: opacityHeroText }}
              className="relative z-20 text-center px-4 max-w-3xl space-y-6"
            >


              <motion.h1
                className="font-serif text-6xl md:text-8xl text-white font-light tracking-wide leading-none"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.0, delay: 0.7 }}
              >
                {weddingConfig.couple.first}
                <span className="block font-serif text-3xl md:text-4xl text-gold-400 italic my-2 md:my-3">
                  &
                </span>
                {weddingConfig.couple.second}
              </motion.h1>

              <motion.div
                className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto"
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              />

              <motion.p
                className="font-serif text-lg md:text-xl text-gold-300 italic tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                Are getting married. You are invited to join their celebrations.
              </motion.p>
            </motion.div>

            {/* Scroll Down Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 opacity-60">
              <span className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-gold-400">
                Scroll Down
              </span>
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-gold-400"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </div>
          </section>

          {/* SECTION 2: SCRATCH DATE & COUNTDOWN */}
          <section className="bg-glow relative py-12">
            <ScratchCardReveal />
          </section>


          {/* SECTION 5: EVENT SCHEDULE TIMELINE */}
          <EventTimeline />

          {/* SECTION 5.5: VENUE & MAP */}
          <VenueMap />

          {/* SECTION 6: PHOTO GALLERY */}
          <PhotoGallery />

          {/* SECTION 8: FOOTER */}
          <footer className="py-12 bg-royal-dark border-t border-[#d4af37]/10 text-center relative z-20">
            <h2 className="font-serif text-3xl text-white font-light mb-3">
              {weddingConfig.couple.first} <span className="text-gold-400">&</span> {weddingConfig.couple.second}
            </h2>
            
            <p className="text-[10px] font-sans font-bold tracking-[0.3em] text-[#d4af37] uppercase mb-4">
              {weddingConfig.couple.hashtag}
            </p>
            

          </footer>
        </motion.div>
      )}
    </main>
  );
}
