import type { Metadata } from 'next';
import { getAllCaseStudies, getAllWriting } from '@/lib/content';
import { CaseStudyCard } from '@/components/CaseStudyCard';
import { ScrollAnimation } from '@/components/ScrollAnimation';

export const metadata: Metadata = {
  title: 'Case Studies & Writing',
  description:
    'Detailed case studies on shipping AI in physical-world environments, plus essays on product thinking.',
};

export default function CaseStudiesPage() {
  const caseStudies = getAllCaseStudies();
  const writing = getAllWriting();

  return (
    <div className="mx-auto max-w-[42rem] px-6 py-16">
      <ScrollAnimation>
        <h1 className="font-serif text-3xl tracking-tight">Case Studies</h1>
        <p className="mt-4 text-[var(--color-text-secondary)]">
          Each project taught me something I could not have learned any other way.
        </p>
      </ScrollAnimation>

      <div className="mt-12">
        {caseStudies.map((study, i) => (
          <ScrollAnimation key={study.slug} delay={i * 0.06}>
            <CaseStudyCard study={study} />
          </ScrollAnimation>
        ))}
      </div>

      {writing.length > 0 && (
        <>
          <ScrollAnimation className="mt-24">
            <h2 className="font-serif text-2xl tracking-tight">Writing</h2>
            <p className="mt-4 text-[var(--color-text-secondary)]">
              Longer-form thinking on product, technology, and the spaces between.
            </p>
          </ScrollAnimation>

          <div className="mt-12 space-y-6">
            {writing.map((post, i) => (
              <ScrollAnimation key={post.slug} delay={i * 0.06}>
                <a
                  href={post.external ? post.externalUrl : `/writing/${post.slug}`}
                  target={post.external ? '_blank' : undefined}
                  rel={post.external ? 'noopener noreferrer' : undefined}
                  className="group block"
                >
                  <h3 className="text-[var(--color-text-primary)] transition-colors duration-150 group-hover:text-[var(--color-accent-amber)]">
                    {post.title}
                    {post.external && (
                      <span className="ml-1 text-xs text-[var(--color-text-tertiary)]">
                        &nearr;
                      </span>
                    )}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                    {post.summary}
                  </p>
                  <span className="mt-1 text-xs text-[var(--color-text-tertiary)]">
                    {post.readingTime} &middot; {post.date}
                  </span>
                </a>
              </ScrollAnimation>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
