import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Digant Pandey — AI Product Manager';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
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

        {/* Epigraph */}
        <p
          style={{
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            fontSize: '18px',
            color: '#6b6660',
            marginBottom: '40px',
          }}
        >
          &ldquo;To know and not to do is not yet to know.&rdquo;
        </p>

        {/* Headline */}
        <h1
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '56px',
            lineHeight: 1.1,
            color: '#e8e2d9',
            letterSpacing: '-0.02em',
            maxWidth: '800px',
          }}
        >
          I build AI products for the physical world.
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
            color: '#c8804a',
            marginTop: '8px',
          }}
        >
          digantpandey.com
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
