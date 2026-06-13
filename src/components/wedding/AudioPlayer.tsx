"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { weddingConfig } from "@/utils/weddingConfig";

interface AudioPlayerProps {
  forcePlayTrigger: boolean;
}

export default function AudioPlayer({ forcePlayTrigger }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Trigger autoplay once the user unlocks it by opening the envelope doors
  useEffect(() => {
    if (forcePlayTrigger && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Autoplay blocked or interrupted: ", err));
    }
  }, [forcePlayTrigger]);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Playback failed: ", err));
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Hidden native HTML audio element */}
      <audio
        ref={audioRef}
        src={weddingConfig.musicSrc}
        loop
        preload="auto"
      >
        {/* Fallback to online sample MP3 if user's local file isn't uploaded yet */}
        <source src={weddingConfig.defaultMusicSrc} type="audio/mpeg" />
      </audio>

      {/* Floating control widget */}
      <motion.button
        onClick={togglePlayback}
        className="w-14 h-14 rounded-full flex items-center justify-center bg-[#090f24]/90 border border-[#d4af37]/30 shadow-[0_4px_25px_rgba(212,175,55,0.25)] hover:border-[#d4af37]/75 backdrop-blur-md cursor-pointer select-none focus:outline-none relative group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Animated wave visualizer rings when active */}
        {isPlaying && (
          <>
            <span className="absolute -inset-2 rounded-full border border-[#d4af37]/20 scale-100 opacity-60 animate-ping pointer-events-none" />
            <span className="absolute -inset-4 rounded-full border border-[#d4af37]/10 scale-100 opacity-30 animate-ping delay-300 pointer-events-none" />
          </>
        )}

        <div className="flex items-center justify-center gap-1.5 h-6">
          {/* Animated SVG Audio Waves */}
          <div className="flex items-end gap-[3px] w-6 h-4 mr-0.5 justify-center">
            {[1, 2, 3, 4].map((bar) => (
              <motion.div
                key={bar}
                className="w-[2.5px] bg-gradient-to-t from-[#bf953f] to-[#fcf6ba] rounded-full"
                animate={
                  isPlaying
                    ? {
                        height: bar === 1 ? [4, 14, 4] : bar === 2 ? [4, 18, 4] : bar === 3 ? [4, 12, 4] : [4, 16, 4],
                      }
                    : { height: 4 }
                }
                transition={{
                  repeat: Infinity,
                  duration: bar === 1 ? 0.75 : bar === 2 ? 0.6 : bar === 3 ? 0.8 : 0.7,
                  ease: "easeInOut",
                  delay: bar * 0.15,
                }}
              />
            ))}
          </div>

          {/* Toggle Icon overlay */}
          <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-250 bg-[#090f24] inset-0 rounded-full flex items-center justify-center border border-[#d4af37]">
            {isPlaying ? (
              <VolumeX className="w-5 h-5 text-gold-400" />
            ) : (
              <Volume2 className="w-5 h-5 text-gold-400 animate-pulse" />
            )}
          </div>
        </div>
      </motion.button>
    </div>
  );
}
