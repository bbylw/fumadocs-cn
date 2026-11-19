/** Docs framework values matching `[framework]` path parameters */
export const frameworks = [
  { value: 'next', name: 'Next.js' },
  { value: 'react-router', name: 'React Router' },
  { value: 'tanstack-start', name: 'TanStack Start' },
  { value: 'waku', name: 'Waku' },
  { value: 'astro', name: 'Astro' },
] as const;

export type Framework = (typeof frameworks)[number]['value'];

export const defaultFramework: Framework = 'next';

/** Human-readable display name for a framework slug */
export function frameworkName(value: string): string | undefined {
  return frameworks.find((item) => item.value === value)?.name;
}

/** Type guard checking if a route segment matches a supported framework */
export function isFramework(value: unknown): value is Framework {
  return frameworks.some((item) => item.value === value);
}

/** Top-level `[framework]` route segments whose `/docs/<page>` links resolve per framework */
export const frameworkPageNames = [
  'community',
  'comparisons',
  'deploying',
  'editor',
  'guides',
  'integrations',
  'internationalization',
  'manual-installation',
  'markdown',
  'navigation',
  'page-conventions',
  'search',
  'upgrade',
  'what-is-fumadocs',
] as const;

const defaultFrameworkPageSet = new Set<string>(frameworkPageNames);

/** Resolve `/docs/<page>` to `/docs/<framework>/<page>` when targeting a `[framework]` route */
export function frameworkLink(
  url: string,
  framework: string,
  pages: Set<string> = defaultFrameworkPageSet,
): string | undefined {
  const name = /^\/docs\/([^/#?]+)/.exec(url)?.[1];
  if (name && pages.has(name)) return `/docs/${framework}${url.slice(5)}`;
}
