import { ImageResponse } from 'next/og';
import { getCaseStudyMeta } from '@/lib/content';

export const runtime = 'nodejs';
export const alt = 'Case Study — Digant Pandey';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let title = 'Case Study';
  let company = '';
  let role = '';

  try {
    const meta = getCaseStudyMeta(slug);
    title = meta.title;
    company = meta.company;
    role = meta.role;
  } catch {
    // Fall back to generic values
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          backgroundColor: '#0f0f0f',
          position: 'relative',
        }}
      >
        {/* Amber accent line at top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '80px',
            width: '120px',
            height: '4px',
            backgroundColor: '#c8804a',
          }}
        />

        {/* Role and company */}
        <p
          style={{
            fontFamily: 'system-ui, sans-serif',
            fontSize: '16px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#c8804a',
            marginBottom: '24px',
          }}
        >
          {role} · {company}
        </p>

        {/* Title */}
        <h1
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '48px',
            lineHeight: 1.15,
            color: '#e8e2d9',
            letterSpacing: '-0.02em',
            maxWidth: '900px',
          }}
        >
          {title}
        </h1>

        {/* Name */}
        <p
          style={{
            fontFamily: 'system-ui, sans-serif',
            fontSize: '20px',
            color: '#a39e95',
            marginTop: '40px',
          }}
        >
          Digant Pandey
        </p>

        {/* Domain */}
        <p
          style={{
            fontFamily: 'system-ui, sans-serif',
            fontSize: '16px',
            color: '#6b6660',
            marginTop: '8px',
          }}
        >
          digantpandey.com
        </p>
      </div>
    ),
    {
      ...size,
    },
  );
}
