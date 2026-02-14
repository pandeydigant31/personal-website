'use client';

import { useState, useEffect, useRef, useCallback, type CSSProperties } from 'react';

// ─── Fragment data: geometric shapes with Boccioni's Futurist palette ───

interface Fragment {
  x: number;
  y: number;
  size: number;
  rotation: number;
  color: string;
  shape: string;
  speed: number;
  drift: number;
  blend: string;
  blur: number;
}

const FRAGMENTS: Fragment[] = [
  {
    x: 48, y: 42, size: 200, rotation: 18,
    color: 'rgba(204, 61, 41, 0.35)',
    shape: 'polygon(50% 5%, 95% 90%, 5% 90%)',
    speed: 0.035, drift: 0.85, blend: 'screen', blur: 2.5,
  },
  {
    x: 32, y: 35, size: 170, rotation: -30,
    color: 'rgba(42, 98, 154, 0.3)',
    shape: 'ellipse(45% 48% at 55% 50%)',
    speed: 0.028, drift: 0.6, blend: 'screen', blur: 3,
  },
  {
    x: 64, y: 54, size: 130, rotation: 45,
    color: 'rgba(218, 135, 42, 0.32)',
    shape: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
    speed: 0.045, drift: 1.0, blend: 'screen', blur: 2,
  },
  {
    x: 42, y: 62, size: 180, rotation: -8,
    color: 'rgba(138, 58, 98, 0.28)',
    shape: 'polygon(30% 5%, 70% 0%, 95% 30%, 100% 70%, 75% 95%, 25% 100%, 0% 65%, 5% 25%)',
    speed: 0.022, drift: 0.5, blend: 'screen', blur: 4,
  },
  {
    x: 58, y: 30, size: 150, rotation: 60,
    color: 'rgba(72, 142, 104, 0.25)',
    shape: 'polygon(15% 0%, 85% 20%, 60% 100%)',
    speed: 0.05, drift: 0.95, blend: 'screen', blur: 2.5,
  },
  {
    x: 70, y: 48, size: 120, rotation: -20,
    color: 'rgba(200, 170, 50, 0.3)',
    shape: 'polygon(20% 0%, 100% 10%, 80% 100%, 0% 90%)',
    speed: 0.04, drift: 0.75, blend: 'screen', blur: 3,
  },
  {
    x: 38, y: 46, size: 160, rotation: 0,
    color: 'rgba(160, 42, 35, 0.2)',
    shape: 'circle(48% at 50% 50%)',
    speed: 0.018, drift: 0.4, blend: 'screen', blur: 5,
  },
];

// ─── Particle data: small floating dots ───

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  phase: number;
}

const PARTICLE_COLORS = [
  'rgba(204, 61, 41, 0.3)',
  'rgba(42, 98, 154, 0.25)',
  'rgba(218, 135, 42, 0.28)',
  'rgba(138, 58, 98, 0.22)',
  'rgba(72, 142, 104, 0.22)',
  'rgba(200, 170, 50, 0.25)',
];

const LINE_COLORS = [
  'rgba(204,61,41,0.12)',
  'rgba(42,98,154,0.1)',
  'rgba(218,135,42,0.1)',
  'rgba(138,58,98,0.08)',
  'rgba(72,142,104,0.08)',
  'rgba(200,170,50,0.1)',
];

// Use a stable seed for particles so SSR matches client
const PARTICLES: Particle[] = Array.from({ length: 35 }, (_, i) => ({
  x: ((i * 37 + 13) % 100),
  y: ((i * 53 + 7) % 100),
  size: (i % 5) * 0.5 + 0.8,
  speed: (i % 7) * 0.003 + 0.008,
  color: PARTICLE_COLORS[i % 6],
  phase: (i * 0.9) % (Math.PI * 2),
}));

// ─── Component ───

export function BoccioniBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const timeRef = useRef(0);
  const animRef = useRef<number>(0);
  const [loaded, setLoaded] = useState(false);
  const [time, setTime] = useState(0);

  // Check reduced motion preference
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setLoaded(true);

    if (prefersReducedMotion.current) return;

    const animate = () => {
      timeRef.current += 0.016;
      setTime(timeRef.current);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  }, []);

  const mouse = mouseRef.current;

  const getFragmentStyle = (f: Fragment, i: number): CSSProperties => {
    const dx = (mouse.x - 0.5) * f.drift * 40;
    const dy = (mouse.y - 0.5) * f.drift * 40;
    const pulse = Math.sin(time * f.speed * 10 + i * 1.3) * 5;
    const rot = f.rotation + Math.sin(time * f.speed * 8 + i * 0.7) * 10 + (mouse.x - 0.5) * 12;
    const scale = 1 + Math.sin(time * f.speed * 6 + i * 0.9) * 0.06;
    return {
      position: 'absolute',
      left: `${f.x + dx + pulse * 0.3}%`,
      top: `${f.y + dy + pulse * 0.2}%`,
      width: `${f.size}px`,
      height: `${f.size}px`,
      background: f.color,
      clipPath: f.shape,
      transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${scale})`,
      filter: `blur(${f.blur + Math.sin(time + i) * 0.5}px)`,
      mixBlendMode: f.blend as CSSProperties['mixBlendMode'],
      transition: 'left 0.15s ease-out, top 0.15s ease-out',
      opacity: loaded ? 0.7 : 0,
      transitionDelay: `${i * 0.12}s`,
    };
  };

  const getParticleStyle = (p: Particle): CSSProperties => {
    const dx = (mouse.x - 0.5) * 15;
    const dy = (mouse.y - 0.5) * 15;
    const floatX = Math.sin(time * p.speed * 15 + p.phase) * 3;
    const floatY = Math.cos(time * p.speed * 12 + p.phase) * 3;
    return {
      position: 'absolute',
      left: `${p.x + dx * p.speed * 20 + floatX}%`,
      top: `${p.y + dy * p.speed * 20 + floatY}%`,
      width: `${p.size}px`,
      height: `${p.size}px`,
      borderRadius: '50%',
      background: p.color,
      opacity: loaded ? 0.35 + Math.sin(time * 2 + p.phase) * 0.2 : 0,
      transition: 'opacity 1.5s ease-out',
    };
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        cursor: 'crosshair',
        background:
          'radial-gradient(ellipse at 38% 38%, #1e3348 0%, #142438 30%, #0d1a2c 55%, #080c12 100%)',
      }}
    >
      {/* Atmospheric color washes — mouse-reactive */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at ${25 + mouse.x * 25}% ${25 + mouse.y * 25}%, rgba(42, 98, 154, 0.28) 0%, transparent 55%),
            radial-gradient(ellipse at ${65 - mouse.x * 15}% ${55 - mouse.y * 10}%, rgba(204, 61, 41, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 55% 75%, rgba(218, 135, 42, 0.15) 0%, transparent 45%),
            radial-gradient(ellipse at 20% 70%, rgba(138, 58, 98, 0.12) 0%, transparent 40%),
            radial-gradient(ellipse at 75% 30%, rgba(72, 142, 104, 0.1) 0%, transparent 40%)
          `,
          transition: 'background 0.3s ease-out',
        }}
      />

      {/* Secondary deep color wash */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at ${40 + mouse.x * 10}% ${40 + mouse.y * 10}%, rgba(160, 42, 35, 0.1) 0%, transparent 35%),
            radial-gradient(circle at ${60 - mouse.x * 8}% ${60 - mouse.y * 8}%, rgba(42, 70, 120, 0.12) 0%, transparent 35%)
          `,
          transition: 'background 0.3s ease-out',
        }}
      />

      {/* Energy lines — rotating from center */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * 360 + time * 8 + mouse.x * 15;
        const length = 280 + Math.sin(time * 0.5 + i) * 100;
        return (
          <div
            key={`line-${i}`}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: `${length}px`,
              height: '1px',
              background: `linear-gradient(90deg, transparent, ${LINE_COLORS[i]}, transparent)`,
              transform: `rotate(${angle}deg)`,
              transformOrigin: '0% 50%',
              opacity: 0.4 + Math.sin(time + i) * 0.2,
            }}
          />
        );
      })}

      {/* Main geometric fragments */}
      {FRAGMENTS.map((f, i) => (
        <div key={`frag-${i}`} style={getFragmentStyle(f, i)} />
      ))}

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <div key={`particle-${i}`} style={getParticleStyle(p)} />
      ))}

      {/* Central glow pulse */}
      <div
        style={{
          position: 'absolute',
          left: `${48 + (mouse.x - 0.5) * 10}%`,
          top: `${46 + (mouse.y - 0.5) * 10}%`,
          width: `${320 + Math.sin(time * 0.8) * 40}px`,
          height: `${320 + Math.sin(time * 0.8) * 40}px`,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(204, 61, 41, 0.08) 0%, rgba(218, 135, 42, 0.04) 40%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(30px)',
          transition: 'left 0.2s, top 0.2s',
        }}
      />

      {/* Noise texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
          opacity: 0.5,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
      />

      {/* Vignette — darkened edges to focus attention */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, transparent 45%, rgba(8, 12, 18, 0.5) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Dark overlay to ensure text readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(8, 12, 18, 0.2) 0%, rgba(8, 12, 18, 0.35) 50%, rgba(8, 12, 18, 0.5) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
