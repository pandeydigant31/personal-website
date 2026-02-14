'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { BoccioniBackground } from './BoccioniBackground';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[85vh] items-center overflow-hidden"
    >
      {/* Boccioni animated art — background layer */}
      <BoccioniBackground />

      {/* Text content — floats above the art */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto w-full max-w-[42rem] px-6"
      >
        {/* Epigraph — slow ethereal fade, no positional shift */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="mb-16 font-serif italic text-lg text-[rgba(180,195,210,0.6)]"
        >
          &ldquo;To know and not to do is not yet to know.&rdquo;
        </motion.p>

        {/* Headline — clip-path mask reveal from bottom */}
        <motion.h1
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0 0 0 0)' }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[clamp(2.5rem,6vw,3.75rem)] leading-[1.08] tracking-tight text-[rgba(255,248,240,0.95)]"
          style={{
            textShadow: '0 2px 30px rgba(0, 0, 0, 0.5)',
          }}
        >
          I build AI products for the physical world.
        </motion.h1>

        {/* Subtext — standard fade-up */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-[36rem] text-lg leading-relaxed text-[rgba(180,195,210,0.8)]"
        >
          I&apos;ve deployed AI systems where failure isn&apos;t a bad UX, it&apos;s a safety
          incident. From robotics at Amazon to satellite data platforms to
          autonomous hydrogen operations, I build products where reliability,
          explainability, and human trust are the product requirements that
          matter most.
        </motion.p>

        {/* CTAs — slide in from left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex gap-6"
        >
          <a
            href="mailto:digant.pandey@kellogg.northwestern.edu"
            className="text-sm text-[var(--color-accent-amber)] transition-colors duration-150 hover:text-[var(--color-accent-amber-light)]"
          >
            Email
          </a>
          <a
            href="https://linkedin.com/in/digantpandey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--color-accent-amber)] transition-colors duration-150 hover:text-[var(--color-accent-amber-light)]"
          >
            LinkedIn
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
