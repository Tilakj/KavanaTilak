"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  speedY: number;
  speedX: number;
  vx: number; // velocity X
  vy: number; // velocity Y
  color: string;
  opacity: number;
}

export default function FallingPetals() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const maxParticles = 120; // Dense but light stardust count

    const colors = [
      "rgba(212, 175, 55, ",  // Warm Gold
      "rgba(251, 245, 183, ", // Pale Cream
      "rgba(255, 255, 255, ", // Bright White
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle(true));
    }

    function createParticle(isInitial = false): Particle {
      const size = Math.random() * 1.5 + 0.8; // Minute sizes (0.8px to 2.3px)
      const x = Math.random() * (canvas?.width || 800);
      const y = isInitial ? Math.random() * (canvas?.height || 600) : -10;
      
      return {
        x,
        y,
        baseX: x,
        baseY: y,
        size,
        speedY: Math.random() * 0.6 + 0.3, // Soft drifting speed
        speedX: Math.random() * 0.4 - 0.2,
        vx: 0,
        vy: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.4 + 0.3, // Opacity between 0.3 and 0.7
      };
    }

    // Track Mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
      mouseRef.current.active = false;
    };

    // Track Touch position for Mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        mouseRef.current.active = true;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      const influenceRadius = 130; // Distance of cursor repulsion force

      particles.forEach((p, idx) => {
        // Calculate distance to cursor
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < influenceRadius) {
            // Push force calculation (stronger when closer)
            const force = (influenceRadius - dist) / influenceRadius;
            const angle = Math.atan2(dy, dx);
            
            // Accelerate velocity away from mouse
            p.vx += Math.cos(angle) * force * 1.6;
            p.vy += Math.sin(angle) * force * 1.6;
          }
        }

        // Apply friction to slow down velocities back to base drift
        p.vx *= 0.93;
        p.vy *= 0.93;

        // Apply velocities to coordinates
        p.x += p.speedX + p.vx;
        p.y += p.speedY + p.vy;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        
        // Add subtle stardust glow
        if (p.size > 1.8) {
          ctx.shadowBlur = 4;
          ctx.shadowColor = "rgba(212, 175, 55, 0.4)";
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();

        // Reset if offscreen (bottom, left, or right)
        if (p.y > canvas.height + 10 || p.x < -10 || p.x > canvas.width + 10) {
          particles[idx] = createParticle(false);
        }
      });

      // Clear shadows for performance
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
