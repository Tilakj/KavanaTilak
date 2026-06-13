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

  const handleOpen = () => {
    setIsOpened(true);
    // Let the animations run for 1.8s before completely removing the gate from the DOM
    setTimeout(() => {
      onReveal();
      setIsDestroyed(true);
    }, 1800);
  };

  if (isDestroyed) return null;

  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#050814] select-none"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ perspective: 1200 }} // Enable 3D depth
        >
          {/* Ambient background particles */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,rgba(0,0,0,0)_80%)] pointer-events-none" />

          {/* Left Door */}
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full bg-[#070c24] border-r border-[#d4af37]/30 flex justify-end items-center overflow-hidden shadow-[10px_0_30px_rgba(0,0,0,0.5)]"
            style={{ originX: 0 }} // Rotate from left hinge
            animate={isOpened ? { rotateY: -90, opacity: 0 } : { rotateY: 0 }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Traditional floral mandala half-pattern */}
            <div className="w-[300px] h-[600px] rounded-r-full border-[3px] border-[#d4af37]/10 border-l-0 absolute right-0 flex items-center pr-10 opacity-30">
              <div className="w-[200px] h-[400px] rounded-r-full border-2 border-dashed border-[#d4af37]/10 border-l-0" />
            </div>
          </motion.div>

          {/* Right Door */}
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full bg-[#070c24] border-l border-[#d4af37]/30 flex justify-start items-center overflow-hidden shadow-[-10px_0_30px_rgba(0,0,0,0.5)]"
            style={{ originX: 1 }} // Rotate from right hinge
            animate={isOpened ? { rotateY: 90, opacity: 0 } : { rotateY: 0 }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Traditional floral mandala other half-pattern */}
            <div className="w-[300px] h-[600px] rounded-l-full border-[3px] border-[#d4af37]/10 border-r-0 absolute left-0 flex items-center pl-10 opacity-30">
              <div className="w-[200px] h-[400px] rounded-l-full border-2 border-dashed border-[#d4af37]/10 border-r-0" />
            </div>
          </motion.div>

          {/* Center Card Envelope & Golden Wax Seal Stamp */}
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center p-8 text-center max-w-md"
            animate={isOpened ? { scale: 0.8, opacity: 0, filter: "blur(10px)" } : { scale: 1, opacity: 1 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
          >
            {/* Embossed Card Cover */}
            <div className="mb-8 p-10 rounded-2xl bg-[#090f28]/95 border border-[#d4af37]/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-md flex flex-col items-center">
              <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#d4af37] uppercase mb-4">
                You are Cordially Invited
              </span>
              
              <h1 className="font-serif text-5xl md:text-6xl text-white font-light mb-2">
                {weddingConfig.couple.first}
                <span className="block font-serif text-3xl italic text-[#d4af37] my-1">&</span>
                {weddingConfig.couple.second}
              </h1>

              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent my-4" />
              
              <p className="font-serif text-base text-gold-300 italic tracking-wide">
                To Celebrate Their Wedding Journey
              </p>
            </div>

            {/* Pulsing Gold Wax Seal Button */}
            <motion.button
              onClick={handleOpen}
              className="relative group w-24 h-24 rounded-full flex items-center justify-center bg-gradient-to-br from-[#bf953f] via-[#fcf6ba] to-[#aa771c] shadow-[0_8px_30px_rgba(212,175,55,0.4)] border-2 border-white/20 active:scale-95 transition-transform cursor-pointer focus:outline-none select-none"
              whileHover={{ scale: 1.05 }}
              animate={{
                boxShadow: [
                  "0 8px 30px rgba(212,175,55,0.4)",
                  "0 8px 45px rgba(212,175,55,0.7)",
                  "0 8px 30px rgba(212,175,55,0.4)"
                ]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {/* Seal Inner Border */}
              <div className="absolute inset-1.5 rounded-full border border-[#734d0b]/40 flex flex-col items-center justify-center bg-[#b38728]/20 group-hover:bg-[#b38728]/10 transition-colors">
                <span className="font-serif font-bold text-2xl text-[#5c3e08] tracking-widest">
                  K&T
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#5c3e08]/70 mt-0.5 animate-pulse" />
              </div>

              {/* Pulsing Outer Rings */}
              <div className="absolute -inset-4 rounded-full border border-[#d4af37]/20 scale-100 opacity-60 animate-ping pointer-events-none" />
              
              {/* Button text overlay */}
              <span className="absolute -bottom-8 whitespace-nowrap text-xs font-sans tracking-[0.2em] font-semibold text-[#d4af37] uppercase group-hover:text-white transition-colors">
                Click to Open
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
