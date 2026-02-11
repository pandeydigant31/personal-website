import type { MDXComponents } from 'mdx/types';

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-16 mb-4 font-serif text-xl tracking-tight text-[var(--color-text-primary)]"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-10 mb-3 font-serif text-lg text-[var(--color-text-primary)]"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-2 border-[var(--color-accent-amber)] pl-4 font-serif italic text-[var(--color-text-secondary)]"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="text-[var(--color-accent-teal)] underline underline-offset-2 decoration-[var(--color-accent-teal)]/30 transition-colors duration-150 hover:text-[var(--color-accent-teal-light)] hover:decoration-[var(--color-accent-teal-light)]/50"
      {...props}
    />
  ),
};
