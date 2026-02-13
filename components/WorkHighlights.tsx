'use client';

import Link from 'next/link';
import { ScrollAnimation } from './ScrollAnimation';

const highlights = [
  {
    label: 'Hydrogen Operations AI',
    slug: 'hydrogen-ai',
    summary:
      'Multi-agent system for autonomous monitoring and operations at hydrogen refueling infrastructure. Built the AI operations assistant, Grafana dashboards, and CFD simulation integrations.',
    role: 'AI Product Manager, CSH2',
    featured: true,
  },
  {
    label: 'Robotics Workflow Optimization',
    slug: 'amazon-robotics',
    summary:
      'Computer vision and ML system deployed at Amazon\'s 60,000-package/day facility. Designed for reliability in a physical environment where model errors have real-world consequences.',
    role: 'Product Manager, Amazon',
  },
  {
    label: 'National-Scale Government Analytics',
    slug: 'government-analytics',
    summary:
      'Led a 15-person team building data analytics platforms used by India\'s Cabinet Ministers for $360B+ budget decisions. Designed for trust and explainability in the highest-stakes decision environment.',
    role: 'Analyst, PM\'s Office of India',
  },
  {
    label: 'Satellite Data Products',
    slug: 'satellite-data',
    summary:
      'Built data pipeline and product infrastructure for satellite-derived atmospheric data, processing billions of observations for weather forecasting and climate applications.',
    role: 'Product Manager, PlanetIQ',
  },
];

export function WorkHighlights() {
  return (
    <section className="mx-auto max-w-[64rem] px-6 py-32">
      <ScrollAnimation>
        <h2 className="font-serif text-2xl tracking-tight text-[var(--color-text-primary)]">
          What I&apos;ve Shipped
        </h2>
      </ScrollAnimation>

      <div className="mt-16 grid gap-5 md:grid-cols-3">
        {highlights.map((item, i) => (
          <ScrollAnimation key={item.slug} delay={i * 0.08} className={item.featured ? 'md:col-span-3' : ''}>
            <Link
              href={`/case-studies/${item.slug}`}
              className="group block h-full rounded-lg bg-[var(--color-bg-secondary)] p-6 transition-all duration-300 hover:bg-[var(--color-bg-tertiary)]"
              style={{
                boxShadow:
                  '0 0 0 1px rgba(42, 39, 37, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  '0 0 0 1px rgba(200, 128, 74, 0.15), 0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(200, 128, 74, 0.06)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  '0 0 0 1px rgba(42, 39, 37, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)';
              }}
            >
              <span className="text-xs font-medium uppercase tracking-widest text-[var(--color-accent-amber-dim)]">
                {item.role}
              </span>
              <h3 className="mt-2 font-serif text-xl text-[var(--color-text-primary)] transition-colors duration-150 group-hover:text-[var(--color-accent-amber)]">
                {item.label}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {item.summary}
              </p>
              <span className="mt-4 inline-block text-xs text-[var(--color-accent-teal)] transition-transform duration-300 group-hover:translate-x-1">
                Read case study &rarr;
              </span>
            </Link>
          </ScrollAnimation>
        ))}
      </div>
    </section>
  );
}
