import type { Metadata } from 'next';
import { ScrollAnimation } from '@/components/ScrollAnimation';

export const metadata: Metadata = {
  title: 'About',
  description:
    "The story behind the work. From the PM's Office of India to AI product management in San Francisco.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[42rem] px-6 py-16">
      <ScrollAnimation>
        <h1 className="font-serif text-3xl tracking-tight">About</h1>
      </ScrollAnimation>

      <div className="mt-12 space-y-8 leading-relaxed text-[var(--color-text-secondary)]">
        <ScrollAnimation>
          <p>
            I started my career in a room where national budget numbers were not
            abstractions. At the Prime Minister&apos;s Office of India, I led a
            15-person team building analytics systems that tracked over $360
            billion in government expenditure. Cabinet Ministers used our
            dashboards to make allocation decisions. The work taught me that data
            only matters when it changes a decision, and that the hardest
            product problems are not technical. They are about trust.
          </p>
        </ScrollAnimation>

        <ScrollAnimation>
          <p>
            From there, I moved toward systems that operate in the physical
            world. At Attentive.ai and Amazon, I worked on computer vision and
            robotics for geospatial analysis and fulfillment operations. At
            PlanetIQ, I turned satellite radio occultation data into weather
            products used by forecasters and climate researchers. Each role
            reinforced the same lesson: AI products in physical environments
            cannot afford the iterative sloppiness that software-only products
            tolerate. When a robotic arm drops a package or a weather model
            misses a storm, the cost is not a bad review. It is concrete.
          </p>
        </ScrollAnimation>

        <ScrollAnimation>
          <p>
            Today, I am completing my MBA at Kellogg School of Management
            (Northwestern, class of 2026) and building AI operations systems at
            Clear Skies Hydrogen, a hydrogen infrastructure company based in San
            Francisco. I am designing multi-agent AI systems for infrastructure
            that barely exists yet, which means the training data I need does not
            exist either. It is the most interesting product problem I have
            worked on.
          </p>
        </ScrollAnimation>

        <ScrollAnimation>
          <div className="mt-16 border-t border-[var(--color-border-subtle)] pt-12">
            <h2 className="font-serif text-xl text-[var(--color-text-primary)]">
              Beyond the work
            </h2>
            <p className="mt-6">
              I read Soviet war novels for their treatment of moral complexity
              under pressure. Vasily Grossman&apos;s writing on individual conscience
              within vast systems has shaped how I think about building
              technology responsibly. I study Neo-Confucian philosophy,
              particularly Wang Yangming&apos;s unity of knowledge and action. His
              central claim, that knowing and doing are inseparable, is the
              closest thing I have to a professional philosophy. I believe the
              best product thinkers are those with wide peripheral vision:
              history, philosophy, and physical sciences inform how I reason
              about technology more than most business frameworks do.
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation>
          <div className="mt-16 border-t border-[var(--color-border-subtle)] pt-12">
            <h2 className="font-serif text-xl text-[var(--color-text-primary)]">
              What I am looking for
            </h2>
            <p className="mt-6">
              Exploring AI product roles at frontier companies where I can bring
              physical-world deployment experience to the next generation of AI
              products. I want to work where the models meet the constraints,
              where latency is measured in milliseconds and mistakes have
              consequences you can point to.
            </p>
            <div className="mt-8 flex gap-6">
              <a
                href="mailto:digant.pandey@kellogg.northwestern.edu"
                className="text-sm text-[var(--color-accent-amber)] transition-colors duration-150 hover:text-[var(--color-accent-amber-light)]"
              >
                Email me
              </a>
              <a
                href="https://linkedin.com/in/digantpandey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--color-accent-amber)] transition-colors duration-150 hover:text-[var(--color-accent-amber-light)]"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
}
