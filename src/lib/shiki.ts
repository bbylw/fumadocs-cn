import { createHighlighter, type Highlighter, type ShikiTransformer } from 'shiki';

let highlighterPromise: Promise<Highlighter> | undefined;

export function getHighlighter(): Promise<Highlighter> {
  highlighterPromise ??= createHighlighter({
    themes: ['github-light', 'github-dark'],
    langs: ['tsx', 'ts', 'mdx', 'bash'],
  });
  return highlighterPromise;
}

export async function highlightCode(
  code: string,
  lang: 'tsx' | 'ts' | 'mdx' | 'bash',
  transformers?: ShikiTransformer[],
): Promise<string> {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, {
    lang,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    defaultColor: false,
    transformers,
  });
}
