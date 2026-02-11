'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

export function Navigation() {
  const pathname = usePathname();
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const links = [
    { href: '/', label: 'Home' },
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/about', label: 'About' },
  ];

  return (
    <nav className="relative z-50 mx-auto max-w-5xl px-6 py-8">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-lg tracking-tight text-[var(--color-text-primary)] transition-colors duration-150 hover:text-[var(--color-accent-amber)]"
        >
          Digant Pandey
        </Link>
        <div className="flex items-center gap-6">
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
                  className="absolute -bottom-1 left-0 right-0 h-px bg-[var(--color-accent-amber)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
