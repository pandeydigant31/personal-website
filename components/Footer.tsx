export function Footer() {
  return (
    <footer className="mx-auto max-w-5xl px-6 py-16">
      <div className="border-t border-[var(--color-border-subtle)] pt-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[var(--color-text-tertiary)]">
            Digant Pandey &middot; {new Date().getFullYear()}
          </p>
          <div className="flex gap-6">
            <a
              href="mailto:digant.pandey@kellogg.northwestern.edu"
              className="text-xs text-[var(--color-text-secondary)] transition-colors duration-150 hover:text-[var(--color-accent-amber)]"
            >
              Email
            </a>
            <a
              href="https://linkedin.com/in/digantpandey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--color-text-secondary)] transition-colors duration-150 hover:text-[var(--color-accent-amber)]"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
