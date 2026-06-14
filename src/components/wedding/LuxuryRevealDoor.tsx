"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { weddingConfig } from "@/utils/weddingConfig";

interface LuxuryRevealDoorProps {
  onReveal: () => void;
}

export default function LuxuryRevealDoor({ onReveal }: LuxuryRevealDoorProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [isDestroyed, setIsDestroyed] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleOpen = () => {
    setIsOpened(true);
    // Allow doors to swing fully open before unmounting
    setTimeout(() => {
      onReveal();
      setIsDestroyed(true);
    }, 1800);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isOpened) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Normalized coordinates from center (-0.5 to 0.5)
    const xOffset = (clientX / innerWidth) - 0.5;
    const yOffset = (clientY / innerHeight) - 0.5;
    
    // Subtle tilt for 3D card depth
    setTilt({
      x: -yOffset * 15,
      y: xOffset * 15,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  if (isDestroyed) return null;

  return (
    <AnimatePresence>
      {!isDestroyed && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#02040a] select-none"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 1400 }} // Enable deep 3D space
        >
          {/* Ambient space glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.04)_0%,rgba(0,0,0,0)_85%)] pointer-events-none" />

          {/* LEFT DOOR (Swings to the left) */}
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full bg-[#060a1c] border-r-2 border-[#d4af37]/30 flex justify-end items-center overflow-hidden shadow-[15px_0_40px_rgba(0,0,0,0.65)] z-10"
            style={{ 
              originX: 0, // Rotate Y from the left boundary
              transformStyle: "preserve-3d"
            }}
            animate={isOpened ? { rotateY: -95, opacity: [1, 1, 0] } : { rotateY: 0 }}
            transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Left side mandala pattern */}
            <div className="w-[320px] h-[640px] rounded-r-full border-[3px] border-[#d4af37]/10 border-l-0 absolute right-0 flex items-center pr-12 opacity-30 pointer-events-none">
              <div className="w-[220px] h-[440px] rounded-r-full border-2 border-dashed border-[#d4af37]/10 border-l-0" />
            </div>
          </motion.div>

          {/* RIGHT DOOR (Swings to the right) */}
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full bg-[#060a1c] border-l-2 border-[#d4af37]/35 flex justify-start items-center overflow-hidden shadow-[-15px_0_40px_rgba(0,0,0,0.65)] z-10"
            style={{ 
              originX: 1, // Rotate Y from the right boundary
              transformStyle: "preserve-3d"
            }}
            animate={isOpened ? { rotateY: 95, opacity: [1, 1, 0] } : { rotateY: 0 }}
            transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Right side mandala pattern */}
            <div className="w-[320px] h-[640px] rounded-l-full border-[3px] border-[#d4af37]/10 border-r-0 absolute left-0 flex items-center pl-12 opacity-30 pointer-events-none">
              <div className="w-[220px] h-[440px] rounded-l-full border-2 border-dashed border-[#d4af37]/10 border-r-0" />
            </div>
          </motion.div>

          {/* CENTER INVITATION CARD CONTENT & SEAL */}
          <motion.div
            className="relative z-20 flex flex-col items-center justify-center p-6 text-center max-w-md"
            style={{
              transformStyle: "preserve-3d",
              rotateX: tilt.x,
              rotateY: tilt.y,
            }}
            animate={isOpened ? { 
              scale: [1, 0.95, 1.4], 
              opacity: [1, 1, 0],
              filter: ["none", "none", "blur(8px)"]
            } : { 
              scale: 1, 
              opacity: 1 
            }}
            transition={isOpened ? {
              duration: 1.5,
              times: [0, 0.15, 1],
              ease: "easeInOut"
            } : {
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
          >
            {/* Elegant embossed card cover */}
            <div 
              className="mb-8 p-8 md:p-10 rounded-2xl bg-[#080d24]/95 border border-[#d4af37]/25 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-md flex flex-col items-center"
              style={{ transform: "translateZ(30px)" }} // Sits forward in 3D
            >
              <span className="text-[9px] font-sans font-bold tracking-[0.3em] text-[#d4af37] uppercase mb-4">
                You are Cordially Invited
              </span>
              
              <h1 className="font-serif text-5xl md:text-6xl text-white font-light mb-2 leading-none">
                {weddingConfig.couple.first}
                <span className="block font-serif text-3xl italic text-[#d4af37] my-2">&</span>
                {weddingConfig.couple.second}
              </h1>

              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent my-4" />
              
              <p className="font-serif text-sm text-gold-300 italic tracking-wide">
                To Celebrate Their Wedding Journey
              </p>
            </div>

            {/* Pulsing gold wax seal opener */}
            <motion.button
              onClick={handleOpen}
              className="relative group w-24 h-24 rounded-full flex items-center justify-center bg-gradient-to-br from-[#bf953f] via-[#fcf6ba] to-[#aa771c] shadow-[0_8px_30px_rgba(212,175,55,0.5)] border-2 border-white/20 active:scale-95 transition-all cursor-pointer focus:outline-none select-none"
              style={{ 
                transformStyle: "preserve-3d",
                transform: "translateZ(60px)" // Sits proudest in 3D
              }}
              whileHover={{ scale: 1.05 }}
              animate={isOpened ? { 
                scale: 0, 
                opacity: 0,
                filter: "blur(5px)"
              } : {
                scale: 1,
                opacity: 1,
                boxShadow: [
                  "0 8px 30px rgba(212,175,55,0.4)",
                  "0 8px 45px rgba(212,175,55,0.7)",
                  "0 8px 30px rgba(212,175,55,0.4)"
                ]
              }}
              transition={isOpened ? {
                duration: 0.5,
                ease: "easeOut"
              } : {
                boxShadow: { repeat: Infinity, duration: 2 }
              }}
            >
              {/* Seal Inner monogram */}
              <div className="absolute inset-1.5 rounded-full border border-[#734d0b]/40 flex flex-col items-center justify-center bg-[#b38728]/20 group-hover:bg-[#b38728]/10 transition-colors">
                <span className="font-serif font-bold text-2xl text-[#5c3e08] tracking-widest">
                  K&T
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#5c3e08]/70 mt-0.5 animate-pulse" />
              </div>

              {/* Ping alert wave */}
              <div className="absolute -inset-4 rounded-full border border-[#d4af37]/35 scale-100 opacity-60 animate-ping pointer-events-none" />
              
              {/* Explanatory text */}
              <span className="absolute -bottom-8 whitespace-nowrap text-[9px] font-sans tracking-[0.25em] font-bold text-[#d4af37] group-hover:text-white transition-colors">
                Open Invitation
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
