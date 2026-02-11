import type { Metadata } from 'next';
import { inter, sourceSerif } from '@/lib/fonts';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://digantpandey.com'),
  title: {
    default: 'Digant Pandey | AI Product Manager',
    template: '%s | Digant Pandey',
  },
  description:
    'I build AI products for the physical world. From Amazon robotics to hydrogen infrastructure, I ship AI where failure is not an abstraction.',
  openGraph: {
    title: 'Digant Pandey | AI Product Manager',
    description: 'I build AI products for the physical world.',
    url: 'https://digantpandey.com',
    siteName: 'Digant Pandey',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digant Pandey | AI Product Manager',
    description: 'I build AI products for the physical world.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceSerif.variable}`}
    >
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-[var(--color-accent-amber)] focus:p-3 focus:text-[var(--color-text-inverse)] focus:rounded"
        >
          Skip to content
        </a>
        <Navigation />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
