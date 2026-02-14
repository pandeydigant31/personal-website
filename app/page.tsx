import { Hero } from '@/components/Hero';
import { PhilosophySection } from '@/components/PhilosophySection';
import { WorkHighlights } from '@/components/WorkHighlights';
import { personJsonLd } from '@/lib/json-ld';

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />
      <Hero />
      <PhilosophySection />
      <WorkHighlights />
    </>
  );
}
