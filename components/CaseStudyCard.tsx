import Link from 'next/link';
import type { CaseStudyMeta } from '@/lib/content';

interface CaseStudyCardProps {
  study: CaseStudyMeta;
}

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group block border-b border-[var(--color-border-subtle)] py-7 first:pt-0 last:border-b-0"
    >
      <span className="text-xs font-medium uppercase tracking-widest text-[var(--color-accent-amber-dim)]">
        {study.role} &middot; {study.company}
      </span>
      <h3 className="mt-2 font-serif text-xl text-[var(--color-text-primary)] transition-colors duration-150 group-hover:text-[var(--color-accent-amber)]">
        {study.title}
      </h3>
      {study.takeaway && (
        <p className="mt-3 border-l-2 border-[var(--color-accent-amber-dim)] pl-4 font-serif italic text-sm text-[var(--color-text-secondary)]">
          {study.takeaway}
        </p>
      )}
      <div className="mt-3 flex items-center gap-3 text-xs text-[var(--color-text-tertiary)]">
        <span>{study.readingTime}</span>
        <span>&middot;</span>
        <span>{study.date}</span>
      </div>
    </Link>
  );
}
