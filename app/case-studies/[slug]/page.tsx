import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import {
  getAllCaseStudies,
  getCaseStudyMeta,
  getCaseStudySource,
} from '@/lib/content';
import { articleJsonLd, breadcrumbJsonLd } from '@/lib/json-ld';
import { mdxComponents } from '@/lib/mdx-components';
import { ScrollAnimation } from '@/components/ScrollAnimation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const studies = getAllCaseStudies();
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const meta = getCaseStudyMeta(slug);
    return {
      title: meta.title,
      description: meta.summary,
      alternates: {
        canonical: `/case-studies/${slug}`,
      },
      openGraph: {
        title: meta.title,
        description: meta.summary,
        url: `/case-studies/${slug}`,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: meta.title,
        description: meta.summary,
      },
    };
  } catch {
    return {};
  }
}

const BASE_URL = 'https://digantpandey.com';

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  let meta;
  let source;
  try {
    meta = getCaseStudyMeta(slug);
    source = getCaseStudySource(slug);
  } catch {
    notFound();
  }

  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: { parseFrontmatter: true },
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd(meta)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', url: BASE_URL },
              { name: 'Case Studies', url: `${BASE_URL}/case-studies` },
              { name: meta.title, url: `${BASE_URL}/case-studies/${slug}` },
            ]),
          ),
        }}
      />
      <article className="mx-auto max-w-[42rem] px-6 py-16">
        <ScrollAnimation>
          <header>
            <span className="text-xs font-medium uppercase tracking-widest text-[var(--color-accent-amber-dim)]">
              {meta.role} &middot; {meta.company}
            </span>
            <h1 className="mt-3 font-serif text-3xl leading-tight tracking-tight">
              {meta.title}
            </h1>
            <div className="mt-3 flex gap-3 text-xs text-[var(--color-text-tertiary)]">
              <span>{meta.readingTime}</span>
              <span>&middot;</span>
              <span>{meta.date}</span>
            </div>
          </header>
        </ScrollAnimation>

        <ScrollAnimation delay={0.15}>
          <div className="prose-custom prose prose-lg mt-16 max-w-none">
            {content}
          </div>
        </ScrollAnimation>
      </article>
    </>
  );
}
