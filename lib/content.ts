import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export interface CaseStudyMeta {
  slug: string;
  title: string;
  role: string;
  company: string;
  date: string;
  takeaway: string;
  summary: string;
  readingTime: string;
  order: number;
}

export interface WritingMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  readingTime: string;
  external?: boolean;
  externalUrl?: string;
  tags?: string[];
}

function getMdxFiles(subdir: string): string[] {
  const dir = path.join(CONTENT_DIR, subdir);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''));
}

export function getAllCaseStudies(): CaseStudyMeta[] {
  const slugs = getMdxFiles('case-studies');
  const studies = slugs.map((slug) => getCaseStudyMeta(slug));
  return studies.sort((a, b) => a.order - b.order);
}

export function getCaseStudyMeta(slug: string): CaseStudyMeta {
  const filePath = path.join(CONTENT_DIR, 'case-studies', `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title,
    role: data.role,
    company: data.company,
    date: data.date,
    takeaway: data.takeaway,
    summary: data.summary,
    readingTime: stats.text,
    order: data.order ?? 99,
  };
}

export function getCaseStudySource(slug: string): string {
  const filePath = path.join(CONTENT_DIR, 'case-studies', `${slug}.mdx`);
  return fs.readFileSync(filePath, 'utf-8');
}

export function getAllWriting(): WritingMeta[] {
  const slugs = getMdxFiles('writing');
  const posts = slugs.map((slug) => getWritingMeta(slug));
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getWritingMeta(slug: string): WritingMeta {
  const filePath = path.join(CONTENT_DIR, 'writing', `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title,
    date: data.date,
    summary: data.summary,
    readingTime: stats.text,
    external: data.external ?? false,
    externalUrl: data.externalUrl,
    tags: data.tags ?? [],
  };
}

export function getWritingSource(slug: string): string {
  const filePath = path.join(CONTENT_DIR, 'writing', `${slug}.mdx`);
  return fs.readFileSync(filePath, 'utf-8');
}
