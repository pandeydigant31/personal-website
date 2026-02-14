'use client';

import { useState, useEffect, useRef, useCallback, type CSSProperties } from 'react';

// ─── Boccioni "Dynamism" inspired background ───
// Fewer, larger overlapping color fields that breathe slowly.
// Warm center (crimson/amber/gold) radiating outward, cool edges (azure/teal).
// Diagonal force-lines and layered washes — not scattered geometric fragments.

interface ColorField {
  /** Center X position (%) */
  cx: number;
  /** Center Y position (%) */
  cy: number;
  /** Base size (px) */
  size: number;
  /** Base rotation (deg) */
  rotation: number;
  /** Fill color */
  color: string;
  /** CSS clip-path */
  shape: string;
  /** Animation speed multiplier */
  speed: number;
  /** Mouse parallax strength */
  parallax: number;
  /** Gaussian blur (px) */
  blur: number;
  /** Base opacity */
  opacity: number;
}

// Just 4 large overlapping color fields — like Boccioni's intersecting planes
const COLOR_FIELDS: ColorField[] = [
  // Warm crimson mass — the "figure" at center-left, like the rearing horse
  {
    cx: 38, cy: 45, size: 420, rotation: -12,
    color: 'rgba(190, 55, 35, 0.3)',
    shape: 'polygon(20% 0%, 85% 10%, 100% 45%, 90% 85%, 35% 100%, 0% 70%, 5% 25%)',
    speed: 0.012, parallax: 0.6, blur: 18, opacity: 0.65,
  },
  // Amber-gold diagonal sweep — the dominant warm light beam
  {
    cx: 55, cy: 40, size: 500, rotation: 25,
    color: 'rgba(205, 130, 40, 0.22)',
    shape: 'polygon(10% 0%, 90% 5%, 100% 40%, 85% 100%, 15% 95%, 0% 55%)',
    speed: 0.009, parallax: 0.4, blur: 25, opacity: 0.6,
  },
  // Cool azure field — upper-right, the cold brisk air
  {
    cx: 68, cy: 30, size: 380, rotation: -8,
    color: 'rgba(40, 90, 150, 0.25)',
    shape: 'ellipse(52% 48% at 50% 50%)',
    speed: 0.015, parallax: 0.5, blur: 22, opacity: 0.55,
  },
  // Deep teal-green — lower field, like the ground plane
  {
    cx: 42, cy: 72, size: 350, rotation: 15,
    color: 'rgba(50, 120, 90, 0.2)',
    shape: 'polygon(0% 20%, 70% 0%, 100% 35%, 95% 100%, 25% 100%, 5% 65%)',
    speed: 0.01, parallax: 0.35, blur: 20, opacity: 0.5,
  },
];

export function BoccioniBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const timeRef = useRef(0);
  const animRef = useRef<number>(0);
  const [loaded, setLoaded] = useState(false);
  const [time, setTime] = useState(0);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
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

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    },
    [],
  );

  const mouse = mouseRef.current;

  const getFieldStyle = (f: ColorField, i: number): CSSProperties => {
    // Gentle parallax drift following mouse
    const dx = (mouse.x - 0.5) * f.parallax * 30;
    const dy = (mouse.y - 0.5) * f.parallax * 30;

    // Very slow breathing — scale and rotation oscillate gently
    const breathe = Math.sin(time * f.speed * 4 + i * 1.8) * 0.04;
    const rotDrift =
      f.rotation +
      Math.sin(time * f.speed * 3 + i * 2.1) * 4 +
      (mouse.x - 0.5) * 6;

    return {
      position: 'absolute',
      left: `${f.cx + dx}%`,
      top: `${f.cy + dy}%`,
      width: `${f.size}px`,
      height: `${f.size}px`,
      background: f.color,
      clipPath: f.shape,
      transform: `translate(-50%, -50%) rotate(${rotDrift}deg) scale(${1 + breathe})`,
      filter: `blur(${f.blur}px)`,
      mixBlendMode: 'screen' as CSSProperties['mixBlendMode'],
      transition: 'left 0.6s ease-out, top 0.6s ease-out',
      opacity: loaded ? f.opacity : 0,
      transitionDuration: '1.2s',
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
        background:
          'radial-gradient(ellipse at 40% 40%, #1a2a3a 0%, #121e2e 35%, #0c1420 60%, #060a10 100%)',
      }}
    >
      {/* ── Layer 1: Deep atmospheric washes — the "canvas" ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 90% 70% at ${35 + mouse.x * 12}% ${35 + mouse.y * 12}%, rgba(190, 55, 35, 0.14) 0%, transparent 60%),
            radial-gradient(ellipse 70% 90% at ${65 - mouse.x * 8}% ${60 - mouse.y * 8}%, rgba(40, 90, 150, 0.12) 0%, transparent 55%),
            radial-gradient(ellipse 80% 60% at 50% 75%, rgba(50, 120, 90, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 55% 30%, rgba(205, 130, 40, 0.1) 0%, transparent 45%)
          `,
          transition: 'background 0.8s ease-out',
        }}
      />

      {/* ── Layer 2: Diagonal force-lines — Boccioni's signature ── */}
      {/* These are wide, soft diagonal bands of light — not thin lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(
              ${135 + (mouse.x - 0.5) * 8}deg,
              transparent 10%,
              rgba(205, 130, 40, ${0.04 + Math.sin(time * 0.3) * 0.015}) 25%,
              transparent 40%,
              rgba(190, 55, 35, ${0.03 + Math.sin(time * 0.25 + 1) * 0.01}) 55%,
              transparent 70%,
              rgba(40, 90, 150, ${0.025 + Math.sin(time * 0.2 + 2) * 0.01}) 85%,
              transparent 95%
            )
          `,
          transition: 'background 0.8s ease-out',
        }}
      />

      {/* ── Layer 3: The 4 large color fields ── */}
      {COLOR_FIELDS.map((f, i) => (
        <div key={`field-${i}`} style={getFieldStyle(f, i)} />
      ))}

      {/* ── Layer 4: Central warm glow — the heart of the composition ── */}
      <div
        style={{
          position: 'absolute',
          left: `${42 + (mouse.x - 0.5) * 8}%`,
          top: `${44 + (mouse.y - 0.5) * 8}%`,
          width: `${380 + Math.sin(time * 0.4) * 30}px`,
          height: `${380 + Math.sin(time * 0.4) * 30}px`,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(200, 90, 40, 0.1) 0%, rgba(190, 55, 35, 0.05) 40%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(40px)',
          transition: 'left 0.6s, top 0.6s',
          pointerEvents: 'none',
        }}
      />

      {/* ── Layer 5: Subtle grain texture — painterly surface ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
          opacity: 0.6,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
      />

      {/* ── Layer 6: Vignette ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 85% 80% at 42% 45%, transparent 40%, rgba(6, 10, 16, 0.55) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Layer 7: Dark overlay for text readability ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(6, 10, 16, 0.15) 0%, rgba(6, 10, 16, 0.3) 50%, rgba(6, 10, 16, 0.5) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
