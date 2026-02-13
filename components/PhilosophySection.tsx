'use client';

import { ScrollAnimation } from './ScrollAnimation';

const principles = [
  {
    number: '01',
    title: 'Start with the constraint, not the model.',
    body: 'Physical-world AI is defined by what can go wrong, not what the model can do. I scope every product around the failure modes first, then work backward to the architecture.',
  },
  {
    number: '02',
    title: 'Design for human trust, not model accuracy.',
    body: '95% accuracy at 60,000 packages per day means 3,000 failures. The product question is never "how accurate is the model?" It\'s "does the human trust the system enough to act on it?"',
  },
  {
    number: '03',
    title: 'Ship incrementally where you can\'t A/B test on humans.',
    body: 'When your deployment environment is a hydrogen plant or a government ministry, your evaluation framework IS your product strategy. I build for environments where iteration costs are real.',
  },
];

export function PhilosophySection() {
  return (
    <section className="mx-auto max-w-[56rem] px-6 py-32">
      <ScrollAnimation>
        <h2 className="font-serif text-2xl tracking-tight text-[var(--color-text-primary)]">
          How I Think
        </h2>
      </ScrollAnimation>

      <div className="mt-16 space-y-20">
        {principles.map((p, i) => (
          <ScrollAnimation key={p.number} delay={i * 0.1}>
            <div className="grid gap-6 md:grid-cols-[8rem_1fr] md:gap-10">
              {/* Left column: oversized number */}
              <div className="flex items-start md:justify-end">
                <span
                  className="font-serif text-6xl font-light leading-none tracking-normal"
                  style={{ color: 'rgba(200, 128, 74, 0.08)' }}
                >
                  {p.number}
                </span>
              </div>

              {/* Right column: title + body */}
              <div>
                <h3 className="font-serif text-xl tracking-normal text-[var(--color-text-primary)]">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-[36rem] leading-relaxed text-[var(--color-text-secondary)]">
                  {p.body}
                </p>
              </div>
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </section>
  );
}
