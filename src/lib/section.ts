/** Resolve top-level documentation section identifier from a tree meta path or slug */
export function getSection(path: string | undefined): 'ui' | 'mdx' | 'cli' | 'headless' | 'framework' {
  if (!path) return 'framework';
  const [dir] = path.split('/', 1);
  if (!dir) return 'framework';
  return (
    {
      ui: 'ui',
      mdx: 'mdx',
      cli: 'cli',
      headless: 'headless',
    }[dir] ?? 'framework'
  ) as 'ui' | 'mdx' | 'cli' | 'headless' | 'framework';
}
