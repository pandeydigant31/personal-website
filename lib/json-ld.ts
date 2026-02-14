import type { CaseStudyMeta } from './content';

const BASE_URL = 'https://digantpandey.com';

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Digant Pandey',
    jobTitle: 'AI Product Manager',
    url: BASE_URL,
    sameAs: ['https://linkedin.com/in/digantpandey'],
    email: 'digant.pandey@kellogg.northwestern.edu',
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Kellogg School of Management, Northwestern University',
    },
  };
}

export function articleJsonLd(meta: CaseStudyMeta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.summary,
    author: {
      '@type': 'Person',
      name: 'Digant Pandey',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: 'Digant Pandey',
      url: BASE_URL,
    },
    datePublished: parseDateRange(meta.date).toISOString(),
    url: `${BASE_URL}/case-studies/${meta.slug}`,
    mainEntityOfPage: `${BASE_URL}/case-studies/${meta.slug}`,
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; url: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Parses date strings like "2024-2025" (year ranges) or "2025-01-15" (ISO dates).
 * For ranges, returns January 1 of the end year.
 */
export function parseDateRange(dateStr: string): Date {
  const rangeMatch = dateStr.match(/^(\d{4})-(\d{4})$/);
  if (rangeMatch) {
    return new Date(`${rangeMatch[2]}-01-01`);
  }
  return new Date(dateStr);
}
