"use client";

import React, { useEffect, useRef } from "react";

export default function ConstellationBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let particles = [];
    const particleCount = 120;
    const connectionDistance = 160;
    const mouseRadius = 200;
    const pushStrength = 80;
    const ease = 0.08;

    // Track mouse position
    const mouse = {
      x: null,
      y: null,
    };

    // Handle mouse move
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    // Handle mouse leave
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    // Initialize particles
    const initParticles = (currentWidth, currentHeight) => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * currentWidth;
        const y = Math.random() * currentHeight;
        particles.push({
          baseX: x,
          baseY: y,
          x: x,
          y: y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.5 + 1, // 1px to 2.5px
          alpha: Math.random() * 0.5 + 0.3, // Opacity between 0.3 and 0.8
        });
      }
    };

    // Initialize/Resize Canvas
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Re-initialize particles to fit the new screen bounds
      if (particles.length === 0) {
        initParticles(width, height);
      } else {
        particles.forEach((p) => {
          if (p.baseX > width) p.baseX = Math.random() * width;
          if (p.baseY > height) p.baseY = Math.random() * height;
        });
      }
    };

    // Animation loop
    const animate = () => {
      // Clear with background color #1a1a2e
      ctx.fillStyle = "#1a1a2e";
      ctx.fillRect(0, 0, width, height);

      // Draw the soft radial teal/cyan glow blooming from the center of the viewport
      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.max(width, height) * 0.7;
      const radialGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        maxRadius
      );
      
      // Soft blue glow: blooming from center, fading to transparent
      radialGradient.addColorStop(0, "rgba(2, 62, 138, 0.18)");
      radialGradient.addColorStop(0.5, "rgba(2, 62, 138, 0.06)");
      radialGradient.addColorStop(1, "rgba(26, 26, 46, 0)");
      
      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach((p) => {
        // Drift movement
        p.baseX += p.vx;
        p.baseY += p.vy;

        // Wrap around boundaries
        if (p.baseX < 0) p.baseX = width;
        if (p.baseX > width) p.baseX = 0;
        if (p.baseY < 0) p.baseY = height;
        if (p.baseY > height) p.baseY = 0;

        // Apply mouse interaction
        let targetX = p.baseX;
        let targetY = p.baseY;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.baseX - mouse.x;
          const dy = p.baseY - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouseRadius) {
            const force = (mouseRadius - dist) / mouseRadius; // 1 at mouse, 0 at border
            const pushDirX = dx / (dist || 1);
            const pushDirY = dy / (dist || 1);
            
            // Push target away
            targetX = p.baseX + pushDirX * force * pushStrength;
            targetY = p.baseY + pushDirY * force * pushStrength;
          }
        }

        // Interpolate current position to target position (smooth drift back)
        if (Math.abs(targetX - p.x) > width / 2) {
          p.x = targetX;
        } else {
          p.x += (targetX - p.x) * ease;
        }

        if (Math.abs(targetY - p.y) > height / 2) {
          p.y = targetY;
        } else {
          p.y += (targetY - p.y) * ease;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 180, 216, ${p.alpha})`; // Teal/Cyan particle
        ctx.fill();
      });

      // Draw connections (lines)
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        // Connect to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < connectionDistance) {
            // Smooth fade out based on distance
            const alpha = (1 - dist / connectionDistance) * 0.15;
            ctx.strokeStyle = `rgba(2, 62, 138, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Connect to mouse cursor
        if (mouse.x !== null && mouse.y !== null) {
          const mDist = Math.hypot(p1.x - mouse.x, p1.y - mouse.y);
          if (mDist < mouseRadius) {
            // Smooth fade out based on distance
            const alpha = (1 - mDist / mouseRadius) * 0.65; // increased opacity from 0.25 to 0.65
            ctx.strokeStyle = `rgba(0, 180, 216, ${alpha})`;
            ctx.lineWidth = 1.2; // increased thickness from 0.8 to 1.2
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            ctx.lineWidth = 0.6; // restore width
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Event listeners
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    
    // Init and start loop
    resizeCanvas();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}
