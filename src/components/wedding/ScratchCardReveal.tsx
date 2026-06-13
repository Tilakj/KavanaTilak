"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Calendar } from "lucide-react";
import { weddingConfig } from "@/utils/weddingConfig";

export default function ScratchCardReveal() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isScratchedOff, setIsScratchedOff] = useState(false);
  const isDrawingRef = useRef(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Calculate live countdown timer
  useEffect(() => {
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
  }, []);

  // Setup HTML5 canvas scratch layer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions based on container parent
    const resizeCanvas = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        // Redraw gold foil coating on resize
        drawGoldFoil(ctx, canvas.width, canvas.height);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [isScratchedOff]);

  // Draw golden metallic canvas surface
  const drawGoldFoil = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    // Fill background gold gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#bf953f");
    grad.addColorStop(0.25, "#fcf6ba");
    grad.addColorStop(0.5, "#b38728");
    grad.addColorStop(0.75, "#fbf5b7");
    grad.addColorStop(1, "#aa771c");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Overlay light gold dust noise texture for a premium tactile look
    ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
    for (let i = 0; i < 2000; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = Math.random() * 1.5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add card text decoration
    ctx.font = "italic 20px Cormorant Garamond, Serif";
    ctx.fillStyle = "#5c3e08";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Scratch to Reveal the Big Day", w / 2, h / 2 - 10);

    ctx.font = "bold 10px Outfit, Sans-Serif";
    ctx.fillText("✨ DRAG OR SWIPE TO RUB ✨", w / 2, h / 2 + 18);
  };

  // Scratch Action Handlers
  const getMousePos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    // Check if touch event or mouse event
    if ("touches" in e) {
      if (e.touches.length === 0) return { x: 0, y: 0 };
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const startScratching = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    isDrawingRef.current = true;
    scratch(e);
  };

  const stopScratching = () => {
    isDrawingRef.current = false;
    checkScratchPercentage();
  };

  const scratch = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawingRef.current || isScratchedOff) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const pos = getMousePos(e);
    
    // Draw transparent brush path
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 24, 0, Math.PI * 2); // 24px scratch brush diameter
    ctx.fill();
  };

  // Calculate remaining gold coating area
  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imgData.data;
      let transparentCount = 0;

      // Scan alpha channel of pixels (every 4th element)
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) {
          transparentCount++;
        }
      }

      const scratchRatio = transparentCount / (pixels.length / 4);

      // Trigger automatic complete reveal at 45% scratched
      if (scratchRatio > 0.45) {
        setIsScratchedOff(true);
        triggerConfetti();
      }
    } catch (err) {
      console.warn("Scratch percentage check failed due to cross-origin images or dimensions.", err);
    }
  };

  // Spectacular Confetti Spray
  const triggerConfetti = () => {
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ["#bf953f", "#fcf6ba", "#b38728", "#aa771c"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ["#bf953f", "#fcf6ba", "#b38728", "#aa771c"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      {/* Decorative Gold Border Frame Wrapper */}
      <div 
        ref={containerRef}
        className="w-full max-w-xl aspect-[1.8/1] rounded-2xl relative border-2 border-[#d4af37]/30 bg-[#090f24]/90 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
      >
        {/* Background Layer: The Revealed Date and Countdown */}
        <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center">
          <Calendar className="w-8 h-8 text-[#d4af37] mb-2 animate-bounce" />
          
          <h3 className="font-serif text-2xl md:text-3xl text-gold-300 tracking-wide font-light">
            Save The Date
          </h3>
          
          <h2 className="font-serif text-3xl md:text-4xl text-white font-semibold my-2 tracking-wider">
            {weddingConfig.events[2].date}
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

        {/* Foreground Layer: Interactive Scratch Canvas */}
        <AnimatePresence>
          {!isScratchedOff && (
            <motion.canvas
              ref={canvasRef}
              className="absolute inset-0 z-10 w-full h-full cursor-crosshair touch-none"
              exit={{ opacity: 0, scale: 1.05, filter: "blur(5px)" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              onMouseDown={startScratching}
              onMouseUp={stopScratching}
              onMouseLeave={stopScratching}
              onMouseMove={scratch}
              onTouchStart={startScratching}
              onTouchEnd={stopScratching}
              onTouchMove={scratch}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Helper text shown after reveal */}
      {isScratchedOff && (
        <motion.p
          className="text-xs text-gold-400 font-serif italic tracking-widest mt-4 flex items-center gap-1.5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Sparkles className="w-3.5 h-3.5" /> Can't wait to see you there! <Sparkles className="w-3.5 h-3.5" />
        </motion.p>
      )}
    </div>
  );
}
