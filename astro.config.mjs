// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import fumadocs from '@fumadocs/astro';
import { remarkAutoTypeTable } from '@fumadocs/satteri/remark-auto-type-table';
import { remarkMdxMermaid } from '@fumadocs/satteri/remark-mdx-mermaid';
import { remarkSteps } from '@fumadocs/satteri/remark-steps';
import { remarkTs2js } from '@fumadocs/satteri/remark-ts2js';
import tailwindcss from '@tailwindcss/vite';
import { rehypeCodeDefaultOptions } from 'fumadocs-core/mdx-plugins/rehype-code.core';
import { transformerTwoslash } from 'fumadocs-twoslash';
import { createFileSystemTypesCache } from 'fumadocs-twoslash/cache-fs';
import { createFileSystemGeneratorCache, createGenerator } from 'fumadocs-typescript';
import { remarkFeature } from './src/lib/remark-feature';
import { remarkFrameworkLinks } from './src/lib/remark-framework-links';

const typeTableGenerator = createGenerator({
  cache: createFileSystemGeneratorCache('.astro/cache/fumadocs-typescript'),
});

const defaultCodeOptions = rehypeCodeDefaultOptions();

function remarkCwd() {
  const cwd = process.cwd();
  /** @param {{ data: Record<string, unknown> }} ctx */
  return (ctx) => {
    ctx.data._cwd = cwd;
    return null;
  };
}

export default defineConfig({
  site: 'https://fumadocs.ndjp.net',
  markdown: {
    processor: satteri({
      features: {
        math: true,
      },
    }),
  },
  integrations: [
    fumadocs({
      components: './src/components/mdx.tsx',
      includeProcessedMarkdown: true,
      extractLinkReferences: true,
      lastModified: true,
      remarkCodeTabOptions: {
        parseMdx: true,
      },
      remarkNpmOptions: {
        persist: {
          id: 'package-manager',
        },
      },
      rehypeCodeOptions: {
        ...defaultCodeOptions,
        themes: {
          light: 'catppuccin-latte',
          dark: 'catppuccin-mocha',
        },
        inline: 'tailing-curly-colon',
        transformers: [
          ...(defaultCodeOptions.transformers ?? []),
          transformerTwoslash({
            typesCache: createFileSystemTypesCache({
              dir: '.astro/cache/twoslash',
            }),
            twoslashOptions: {
              compilerOptions: {
                types: ['@types/node'],
              },
            },
          }),
        ],
      },
      mdastPlugins: (plugins) => [
        remarkCwd(),
        remarkFrameworkLinks(),
        remarkFeature(),
        remarkMdxMermaid(),
        ...plugins.slice(0, -1),
        remarkSteps(),
        remarkAutoTypeTable({
          generator: typeTableGenerator,
        }),
        remarkTs2js(),
        ...plugins.slice(-1),
      ],
    }),
  ],
  vite: {
    plugins: [
      tailwindcss(),
      {
        name: 'fumadocs-windows-query-resolve',
        transform(code, id) {
          if (process.platform === 'win32' && id.includes('@fumadocs/astro/dist/loaders.js')) {
            return code
              .replace(
                '`${filePath.replaceAll(path.sep, "/")}${frontmatterQuery}`',
                '`/@fs/${filePath.replaceAll(path.sep, "/")}${frontmatterQuery}`',
              )
              .replace('`${file}${metaQuery}`', '`/@fs/${file}${metaQuery}`');
          }
        },
        resolveId(id) {
          if (
            /^[A-Za-z]:[/\\]/.test(id) &&
            (id.includes('?fumadocs-meta') || id.includes('?fumadocs-frontmatter'))
          ) {
            return id;
          }
        },
      },
    ],
    resolve: { noExternal: ['fumadocs-ui'] },
  },
});
