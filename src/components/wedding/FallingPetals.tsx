"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  vx: number; // velocity X
  vy: number; // velocity Y
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
    const maxParticles = 180; // Increased stardust count for richer visuals

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
      const size = Math.random() * 1.5 + 0.6; // 0.6px to 2.1px tiny dots
      return {
        x: Math.random() * (canvas?.width || 800),
        y: isInitial ? Math.random() * (canvas?.height || 600) : -10,
        size,
        speedY: Math.random() * 0.4 + 0.2, // Gentle downward drift
        speedX: Math.random() * 0.3 - 0.15,
        vx: 0,
        vy: 0,
        opacity: Math.random() * 0.4 + 0.2, // 0.2 to 0.6 opacity
      };
    }

    // Track Mouse positions
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

    // Track Mobile Touch
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
      const mouseRadius = 140; // Area of cursor influence
      const particleConnectionDist = 65; // Distance limit to link dots together

      // 1. Update velocities and positions
      particles.forEach((p, idx) => {
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRadius) {
            const force = (mouseRadius - dist) / mouseRadius;
            const angle = Math.atan2(dy, dx);
            
            // Repel particles smoothly
            p.vx += Math.cos(angle) * force * 1.5;
            p.vy += Math.sin(angle) * force * 1.5;
          }
        }

        // Apply friction to return to drift state
        p.vx *= 0.93;
        p.vy *= 0.93;

        p.x += p.speedX + p.vx;
        p.y += p.speedY + p.vy;

        // Reset if off-screen
        if (p.y > canvas.height + 10 || p.x < -10 || p.x > canvas.width + 10) {
          particles[idx] = createParticle(false);
        }
      });

      // 2. Draw connecting constellation lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Draw connections to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < particleConnectionDist) {
            const alpha = (1 - dist / particleConnectionDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Draw laser connections from cursor to particles
        if (mouse.active) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRadius) {
            const alpha = (1 - dist / mouseRadius) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // 3. Draw the particles themselves
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`;
        
        // Add tiny glows to larger particles
        if (p.size > 1.6) {
          ctx.shadowBlur = 3;
          ctx.shadowColor = "rgba(212, 175, 55, 0.35)";
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      });

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
