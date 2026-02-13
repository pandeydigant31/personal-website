import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-serif italic text-sm text-[var(--color-text-tertiary)]">
        &ldquo;To know and not to do is not yet to know.&rdquo;
      </p>
      <h1 className="mt-8 font-serif text-[clamp(2rem,5vw,3rem)] leading-tight tracking-tight text-[var(--color-text-primary)]">
        This page doesn&apos;t exist yet.
      </h1>
      <p className="mt-4 max-w-[24rem] text-[var(--color-text-secondary)]">
        Perhaps it will someday. For now, the work is elsewhere.
      </p>
      <Link
        href="/"
        className="mt-10 text-sm text-[var(--color-accent-amber)] transition-colors duration-150 hover:text-[var(--color-accent-amber-light)]"
      >
        &larr; Back to home
      </Link>
    </div>
  );
}
