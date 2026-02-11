'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[85vh] items-center overflow-hidden"
    >
      <motion.div
        style={{ y, opacity }}
        className="mx-auto w-full max-w-[42rem] px-6"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-12 font-serif italic text-sm text-[var(--color-text-tertiary)]"
        >
          &ldquo;To know and not to do is not yet to know.&rdquo;
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[clamp(2.2rem,5vw,3.052rem)] leading-[1.15] tracking-tight text-[var(--color-text-primary)]"
        >
          I build AI products for the physical world.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-[36rem] text-lg leading-relaxed text-[var(--color-text-secondary)]"
        >
          I&apos;ve deployed AI systems where failure isn&apos;t a bad UX, it&apos;s a safety
          incident. From robotics at Amazon to satellite data platforms to
          autonomous hydrogen operations, I build products where reliability,
          explainability, and human trust are the product requirements that
          matter most.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
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
