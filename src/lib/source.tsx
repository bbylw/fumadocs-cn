import { getCollection } from 'astro:content';
import type { ComponentProps } from 'react';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { findSiblings, type Item } from 'fumadocs-core/page-tree';
import { asMarkdown } from 'fumadocs-core/server';
import { llms, loader, PathUtils, type LoaderPlugin } from 'fumadocs-core/source';
import { toFumadocsSource } from '@fumadocs/astro/source';
import { FrameworkLogo } from '@/components/framework-logo';
import { getMDXComponents } from '@/components/mdx';
import { defaultFramework, type Framework, frameworks, isFramework } from './framework';
import { frameworkLink } from './remark-framework-links';
import { getSection } from './section';
import { docsRoute } from './shared';

function pageTreeCodeTitles(): LoaderPlugin {
  return {
    transformPageTree: {
      file(node) {
        if (
          typeof node.name === 'string' &&
          (node.name.endsWith('()') || /^<\w+ \/>$/.test(node.name))
        ) {
          return {
            ...node,
            name: (
              <code key="0" className="text-[0.8125rem]">
                {node.name}
              </code>
            ),
          };
        }
        return node;
      },
    },
  };
}

export const source = loader(
  toFumadocsSource(await getCollection('docs'), await getCollection('meta')),
  {
    baseUrl: docsRoute,
    icon(icon) {
      if (!icon) return;
      if (isFramework(icon)) return <FrameworkLogo framework={icon} />;
      return <span aria-hidden className="contents" dangerouslySetInnerHTML={{ __html: icon }} />;
    },
    plugins: [pageTreeCodeTitles()],
  },
);

export type DocsPage = (typeof source)['$inferPage'];

/** Per-page SSR components providing `DocsCategory` (and resolved links for Markdown export) */
export function createPageSlotComponents(page: DocsPage, includeLinks = false) {
  const framework = page.params?.framework as Framework | undefined;
  const pageTree = source.getPageTree();

  function resolveLink(href: string) {
    const found = source.getPageByHref((framework && frameworkLink(href, framework)) || href, {
      dir: PathUtils.dirname(page.path),
    });
    if (!found) return;
    return {
      page: found.page,
      href: found.hash ? `${found.page.url}#${found.hash}` : found.page.url,
    };
  }

  return {
    ...(includeLinks
      ? {
          a: ({ href, rel, target, ...props }: ComponentProps<'a'>) => {
            const resolved = href ? (resolveLink(href)?.href ?? href) : undefined;
            const isExternal = resolved ? /^(?:\w+:|\/\/)/.test(resolved) : false;
            return (
              <a
                href={resolved}
                rel={isExternal ? (rel ?? 'noreferrer noopener') : rel}
                target={isExternal ? (target ?? '_blank') : target}
                {...props}
              />
            );
          },
          Card: ({ href, ...props }: ComponentProps<typeof Card>) => (
            <Card href={href ? (resolveLink(href)?.href ?? href) : undefined} {...props} />
          ),
        }
      : {}),
    DocsCategory: ({ url = page.url }: { url?: string }) => {
      const items: Item[] = [];
      for (const item of findSiblings(pageTree, url)) {
        if (item.type === 'page') items.push(item);
        else if (item.type === 'folder' && item.index) items.push(item.index);
      }

      if (asMarkdown()) {
        return (
          <ul>
            {items.map((item) => (
              <li key={item.url}>
                <a href={item.url}>{item.name}</a>
                {item.description && <>: {item.description}</>}
              </li>
            ))}
          </ul>
        );
      }

      return (
        <Cards>
          {items.map((item) => (
            <Card key={item.url} title={item.name} href={item.url}>
              {item.description}
            </Card>
          ))}
        </Cards>
      );
    },
  };
}

export const docsLlms = llms(source, {
  section: (folder) => {
    if (folder.root === 'framework') return { collapse: true };
    return !folder.children.some((child) => child.type === 'folder' && child.root);
  },
  renderPage: async (page) => {
    const section = getSection(page.slugs[0]);
    const framework = frameworks.find((item) => item.value === page.params?.framework);
    const category =
      {
        framework: `Fumadocs（框架模式${framework ? `，${framework.name}` : ''}）`,
        ui: 'Fumadocs UI（默认主题与组件）',
        headless: 'Fumadocs Core（无头核心库）',
        mdx: 'Fumadocs MDX（官方内容源）',
        cli: 'Fumadocs CLI（自动化命令行工具）',
      }[section] ?? section;

    let processed: string;
    try {
      processed = await page.data.getText('processed', {
        components: getMDXComponents(createPageSlotComponents(page, true)),
      });
    } catch {
      return '';
    }

    return `# ${category}: ${page.data.title}
URL: ${page.url}

${page.data.description ?? ''}

${processed}`;
  },
});

export const frameworkNote = `\`/docs/${defaultFramework}\` 下的每篇文档均对应 \`/docs/<framework>\` 多框架版本，\`<framework>\` 可选值：${frameworks.map((item) => `\`${item.value}\``).join('、')}。`;
