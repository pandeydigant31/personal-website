'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useCallback, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50);
  });

  // Listen for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains('light'));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    setIsLight(document.documentElement.classList.contains('light'));
    return () => observer.disconnect();
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const links = [
    { href: '/', label: 'Home' },
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/about', label: 'About' },
  ];

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Theme-aware nav background
  const bgScrolled = isLight ? 'rgba(245, 240, 234, 0.85)' : 'rgba(15, 15, 15, 0.85)';
  const bgTransparent = isLight ? 'rgba(245, 240, 234, 0)' : 'rgba(15, 15, 15, 0)';
  const borderScrolled = isLight ? 'rgba(196, 187, 176, 0.6)' : 'rgba(42, 39, 37, 0.6)';
  const borderTransparent = isLight ? 'rgba(196, 187, 176, 0)' : 'rgba(42, 39, 37, 0)';

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
        animate={{
          backgroundColor: scrolled ? bgScrolled : bgTransparent,
          borderBottomColor: scrolled ? borderScrolled : borderTransparent,
        }}
        style={{
          backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
        }}
      >
        <div className="mx-auto max-w-5xl px-6 py-5">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="font-serif text-lg tracking-tight text-[var(--color-text-primary)] transition-colors duration-150 hover:text-[var(--color-accent-amber)]"
            >
              Digant Pandey
            </Link>

            {/* Desktop links */}
            <div className="hidden items-center gap-6 md:flex">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm transition-colors duration-150 ${
                    isActive(link.href)
                      ? 'text-[var(--color-text-primary)]'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-[var(--color-accent-amber)]"
                      style={{
                        boxShadow: '0 0 8px rgba(200, 128, 74, 0.3)',
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
              <ThemeToggle />
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="relative z-[60] flex flex-col gap-1.5 md:hidden"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block h-px w-6 bg-[var(--color-text-primary)]"
                transition={{ duration: 0.3 }}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-px w-6 bg-[var(--color-text-primary)]"
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block h-px w-6 bg-[var(--color-text-primary)]"
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Spacer to prevent content from hiding behind fixed nav */}
      <div className="h-[68px]" />

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[var(--color-bg-primary)]/95 backdrop-blur-lg md:hidden"
          >
            <nav className="flex flex-col items-center gap-10">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMobile}
                    className={`font-serif text-3xl transition-colors duration-150 ${
                      isActive(link.href)
                        ? 'text-[var(--color-accent-amber)]'
                        : 'text-[var(--color-text-primary)] hover:text-[var(--color-accent-amber)]'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <ThemeToggle />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
