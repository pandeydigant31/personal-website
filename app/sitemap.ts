import type { MetadataRoute } from 'next';
import { getAllCaseStudies } from '@/lib/content';
import { parseDateRange } from '@/lib/json-ld';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://digantpandey.com';
  const studies = getAllCaseStudies();

  const latestStudyDate = studies.reduce((latest, s) => {
    const d = parseDateRange(s.date);
    return d > latest ? d : latest;
  }, new Date(0));

  const caseStudyRoutes = studies.map((s) => ({
    url: `${baseUrl}/case-studies/${s.slug}`,
    lastModified: parseDateRange(s.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: latestStudyDate,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: latestStudyDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...caseStudyRoutes,
  ];
}
