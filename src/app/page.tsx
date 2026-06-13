"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { weddingConfig } from "@/utils/weddingConfig";
import LuxuryRevealDoor from "@/components/wedding/LuxuryRevealDoor";
import AudioPlayer from "@/components/wedding/AudioPlayer";
import ScratchCardReveal from "@/components/wedding/ScratchCardReveal";
import EventTimeline from "@/components/wedding/EventTimeline";
import PhotoGallery from "@/components/wedding/PhotoGallery";
import RSVPForm from "@/components/wedding/RSVPForm";
import FallingPetals from "@/components/wedding/FallingPetals";

export default function Home() {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    setIsRevealed(true);
  };

  return (
    <main className="relative min-h-screen bg-[#050814] overflow-hidden select-none">
      {/* 3D Envelope/Door Cover overlay */}
      <LuxuryRevealDoor onReveal={handleReveal} />

      {/* Background Falling Petals Physics Layer (active once opened) */}
      {isRevealed && <FallingPetals />}

      {/* Ambient Sound Player */}
      <AudioPlayer forcePlayTrigger={isRevealed} />

      {/* Main Wedding Content Container */}
      {isRevealed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="relative z-10 w-full"
        >
          {/* SECTION 1: HERO HEADER WITH VIDEO BACKGROUND */}
          <section className="relative h-[95vh] md:h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background Video Layer */}
            <div className="absolute inset-0 z-0">
              <video
                src={weddingConfig.heroVideoSrc}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover scale-100 opacity-70"
              />
              {/* Premium dark vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050814] via-[#050814]/40 to-[#050814]/85 z-10" />
            </div>

            {/* Header Content Overlay */}
            <div className="relative z-20 text-center px-4 max-w-3xl space-y-6">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex justify-center items-center gap-1 bg-[#090f24]/60 border border-[#d4af37]/35 px-4 py-1.5 rounded-full w-fit mx-auto backdrop-blur-sm shadow-[0_4px_15px_rgba(212,175,55,0.1)]"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span className="text-[9px] font-sans font-bold uppercase tracking-[0.25em] text-[#d4af37]">
                  {weddingConfig.couple.hashtag}
                </span>
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              </motion.div>

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
            </div>

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

          {/* SECTION 3: INVITATION STATEMENT / PARENTS */}
          <section className="py-20 px-4 text-center max-w-3xl mx-auto space-y-6 relative">
            <Heart className="w-8 h-8 text-gold-400 mx-auto animate-pulse" />
            
            <p className="font-serif text-lg text-slate-300 leading-relaxed italic">
              "Two hearts, joined in friendship, united in love."
            </p>
            
            <div className="w-12 h-[1px] bg-[#d4af37]/25 mx-auto" />

            <div className="space-y-4">
              <p className="text-xs font-sans font-bold text-gold-400 uppercase tracking-widest">
                Invitation From Parents
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-xl mx-auto pt-2">
                <div className="p-4 rounded-xl bg-[#090f24]/50 border border-[#d4af37]/10">
                  <span className="text-[10px] font-sans text-slate-500 uppercase tracking-widest block mb-1">
                    Groom's Family
                  </span>
                  <p className="font-serif text-base text-white">
                    {weddingConfig.couple.groomParents}
                  </p>
                </div>
                
                <div className="p-4 rounded-xl bg-[#090f24]/50 border border-[#d4af37]/10">
                  <span className="text-[10px] font-sans text-slate-500 uppercase tracking-widest block mb-1">
                    Bride's Family
                  </span>
                  <p className="font-serif text-base text-white">
                    {weddingConfig.couple.brideParents}
                  </p>
                </div>
              </div>
            </div>
          </section>


          {/* SECTION 4.5: ENGAGEMENT SPECIAL CARD */}
          <section className="py-8 px-4 max-w-4xl mx-auto text-center relative z-20">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#090f24] to-[#121b3d] border border-[#d4af37]/35 shadow-[0_15px_40px_rgba(212,175,55,0.08)] backdrop-blur-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />
              
              <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#d4af37] uppercase mb-2 block">
                May 10, 2025
              </span>
              
              <h3 className="font-serif text-3xl text-white font-light mb-4">
                Our Engagement Gallery
              </h3>
              
              <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto mb-6 leading-relaxed">
                Our engagement took place on May 10th. We have gathered all the beautiful moments and photos from the day into a shared Google Drive folder. You can view and download them below!
              </p>

              <a
                href={weddingConfig.engagementDriveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-3 px-6 rounded-xl text-xs md:text-sm font-semibold text-slate-900 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_8px_20px_rgba(212,175,55,0.25)] cursor-pointer"
              >
                View & Download Engagement Photos
              </a>
            </div>
          </section>

          {/* SECTION 5: EVENT SCHEDULE TIMELINE */}
          <EventTimeline />

          {/* SECTION 6: PHOTO GALLERY */}
          <PhotoGallery />

          {/* SECTION 7: RSVP & BLESSINGS */}
          <RSVPForm />

          {/* SECTION 8: FOOTER */}
          <footer className="py-12 bg-[#030610] border-t border-[#d4af37]/10 text-center relative z-20">
            <h2 className="font-serif text-3xl text-white font-light mb-3">
              {weddingConfig.couple.first} <span className="text-gold-400">&</span> {weddingConfig.couple.second}
            </h2>
            
            <p className="text-[10px] font-sans font-bold tracking-[0.3em] text-[#d4af37] uppercase mb-4">
              {weddingConfig.couple.hashtag}
            </p>
            
            <div className="w-12 h-[1px] bg-[#d4af37]/25 mx-auto mb-6" />

            <p className="text-[10px] font-sans text-slate-500 uppercase tracking-widest">
              © 2026 {weddingConfig.couple.first} & {weddingConfig.couple.second}. All Rights Reserved.
            </p>
          </footer>
        </motion.div>
      )}
    </main>
  );
}
