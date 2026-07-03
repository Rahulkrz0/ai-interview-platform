import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const LiveBackground = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    let animationFrameId;
    let isActive = true;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let particles = [];
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const initParticles = () => {
      particles = [];
      const particleCount = theme === 'dark' ? (width < 768 ? 150 : 400) : (width < 768 ? 50 : 100);

      for (let i = 0; i < particleCount; i++) {
        const isDust = theme === 'dark' && Math.random() < 0.1;
        
        // Colors
        let color;
        if (theme === 'dark') {
          const colors = ['rgba(255, 255, 255, 0.8)', 'rgba(200, 230, 255, 0.6)', 'rgba(230, 200, 255, 0.5)'];
          color = isDust ? `rgba(100, 150, 255, ${Math.random() * 0.05})` : colors[Math.floor(Math.random() * colors.length)];
        } else {
          const colors = ['rgba(150, 200, 255, 0.4)', 'rgba(255, 255, 255, 0.6)'];
          color = colors[Math.floor(Math.random() * colors.length)];
        }

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: isDust ? Math.random() * 100 + 50 : Math.random() * (theme === 'dark' ? 1.5 : 3) + 0.5,
          color: color,
          vx: prefersReducedMotion ? 0 : (Math.random() - 0.5) * (theme === 'dark' ? 0.2 : 0.5),
          vy: prefersReducedMotion ? 0 : (Math.random() - 0.5) * (theme === 'dark' ? 0.2 : 0.5),
          isDust: isDust,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          alpha: Math.random()
        });
      }
    };

    initParticles();

    const drawBackground = () => {
      if (theme === 'dark') {
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#020617'); // slate-950
        gradient.addColorStop(1, '#0f172a'); // slate-900
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      } else {
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#f8fafc'); // slate-50
        gradient.addColorStop(1, '#e2e8f0'); // slate-200
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }
    };

    const render = () => {
      if (!isActive) return;

      drawBackground();

      // Smooth mouse interpolation for parallax
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      const offsetX = (mouseX - width / 2) * 0.02;
      const offsetY = (mouseY - height / 2) * 0.02;

      // Draw particles
      particles.forEach((p) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -p.radius * 2) p.x = width + p.radius * 2;
        if (p.x > width + p.radius * 2) p.x = -p.radius * 2;
        if (p.y < -p.radius * 2) p.y = height + p.radius * 2;
        if (p.y > height + p.radius * 2) p.y = -p.radius * 2;

        // Twinkle
        if (!prefersReducedMotion && !p.isDust && theme === 'dark') {
          p.alpha += p.twinkleSpeed;
          if (p.alpha > 1 || p.alpha < 0) p.twinkleSpeed = -p.twinkleSpeed;
        }

        ctx.beginPath();
        
        // Draw with parallax offset
        const drawX = p.x + (p.isDust ? offsetX * 2 : offsetX * (p.radius * 0.5));
        const drawY = p.y + (p.isDust ? offsetY * 2 : offsetY * (p.radius * 0.5));

        ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2, false);
        
        if (theme === 'dark' && !p.isDust) {
           ctx.globalAlpha = Math.max(0, Math.min(1, Math.abs(p.alpha)));
        } else {
           ctx.globalAlpha = 1;
        }
        
        ctx.fillStyle = p.color;
        
        if (p.isDust) {
          // Soft blur effect for dust/nebula
          ctx.shadowBlur = 40;
          ctx.shadowColor = p.color;
        } else {
          ctx.shadowBlur = theme === 'dark' ? Math.random() * 5 + 2 : 0;
          ctx.shadowColor = p.color;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      });

      ctx.globalAlpha = 1; // Reset alpha

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Event Listeners
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    const handleMouseMove = (e) => {
      if (!prefersReducedMotion) {
        targetMouseX = e.clientX;
        targetMouseY = e.clientY;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isActive = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        isActive = true;
        render();
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -10, // Must be strictly behind everything
        pointerEvents: 'none', // Critical: do not block clicks!
      }}
      aria-hidden="true"
    />
  );
};

export default LiveBackground;
