"use client";

import React, { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  spinSpeed: number;
  color: string;
}

export default function FallingPetals() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let petals: Petal[] = [];
    const maxPetals = 45; // Subtle particle density

    const colors = [
      "rgba(212, 175, 55, 0.35)",  // Golden glow petal
      "rgba(251, 245, 183, 0.25)", // Soft cream petal
      "rgba(255, 182, 193, 0.3)",  // Light pink rose petal
      "rgba(219, 112, 147, 0.25)", // Pale crimson rose petal
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize petals
    for (let i = 0; i < maxPetals; i++) {
      petals.push(createPetal(true));
    }

    function createPetal(isInitial = false): Petal {
      const size = Math.random() * 6 + 4;
      return {
        x: Math.random() * (canvas?.width || 800),
        y: isInitial ? Math.random() * (canvas?.height || 600) : -10,
        size,
        speedY: Math.random() * 1.2 + 0.8,
        speedX: Math.random() * 0.8 - 0.4,
        rotation: Math.random() * Math.PI * 2,
        spinSpeed: Math.random() * 0.02 - 0.01,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petals.forEach((petal, idx) => {
        // Draw petal (oval or leaf shape)
        ctx.save();
        ctx.translate(petal.x, petal.y);
        ctx.rotate(petal.rotation);
        ctx.fillStyle = petal.color;
        
        ctx.beginPath();
        // Draw leaf/petal paths using bezier curves
        ctx.moveTo(0, -petal.size);
        ctx.quadraticCurveTo(petal.size / 2, 0, 0, petal.size);
        ctx.quadraticCurveTo(-petal.size / 2, 0, 0, -petal.size);
        ctx.fill();
        ctx.restore();

        // Update positions
        petal.y += petal.speedY;
        petal.x += petal.speedX + Math.sin(petal.y / 30) * 0.2; // Add soft swaying swing
        petal.rotation += petal.spinSpeed;

        // Reset if offscreen
        if (petal.y > canvas.height + 10 || petal.x < -10 || petal.x > canvas.width + 10) {
          petals[idx] = createPetal(false);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
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
