"use client";

import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { weddingConfig } from "@/utils/weddingConfig";

export default function ScratchCardReveal() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  // Set isMounted to true on client-side mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculate live countdown timer
  useEffect(() => {
    if (!isMounted) return;
    
    const target = weddingConfig.weddingDate.getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [isMounted]);

  // Server-side and Initial Client HTML Placeholder to prevent Hydration Mismatch
  if (!isMounted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />
        <div 
          className="w-full max-w-xl aspect-[1.8/1] rounded-2xl relative border-2 border-gold-500/30 bg-royal-card/90 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex items-center justify-center"
        >
          <div className="p-6 flex flex-col items-center justify-center text-center">
            <Calendar className="w-8 h-8 text-[#d4af37] mb-2 animate-bounce" />
            <h3 className="font-serif text-2xl md:text-3xl text-gold-300 tracking-wide font-light">
              Save The Date
            </h3>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-semibold my-2 tracking-wider">
              {weddingConfig.events[1].date}
            </h2>
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent my-3" />
            <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-sm mt-1">
              {["Days", "Hours", "Mins", "Secs"].map((label, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className="font-sans text-2xl md:text-3xl font-light text-white tracking-tighter">
                    00
                  </span>
                  <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-gold-500 mt-1">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active client rendering once mounted
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      {/* Decorative Gold Border Frame Wrapper */}
      <div 
        className="w-full max-w-xl aspect-[1.8/1] rounded-2xl relative border-2 border-gold-500/30 bg-royal-card/90 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex items-center justify-center"
      >
        <div className="p-6 flex flex-col items-center justify-center text-center">
          <Calendar className="w-8 h-8 text-[#d4af37] mb-2 animate-bounce" />
          
          <h3 className="font-serif text-2xl md:text-3xl text-gold-300 tracking-wide font-light">
            Save The Date
          </h3>
          
          <h2 className="font-serif text-3xl md:text-4xl text-white font-semibold my-2 tracking-wider">
            {weddingConfig.events[1].date}
          </h2>

          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent my-3" />

          {/* Countdown Clock Grid */}
          <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-sm mt-1">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Mins", value: timeLeft.minutes },
              { label: "Secs", value: timeLeft.seconds },
            ].map((unit, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="font-sans text-2xl md:text-3xl font-light text-white tracking-tighter">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-gold-500 mt-1">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
