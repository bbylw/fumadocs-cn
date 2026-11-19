import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type {
  MdastPluginDefinition,
  MdastVisitorContext,
  MdxJsxFlowElement,
  MdxJsxTextElement,
} from 'satteri';
import type {} from './remark-feature';
import { defaultFramework, frameworkLink as resolveFrameworkLink } from './framework';

const dir = path.resolve('content/docs/(framework)/[framework]');

/** Top-level pages and folders under `[framework]` whose links omit the framework segment */
export const frameworkPages = new Set<string>();
if (existsSync(dir)) {
  for (const file of readdirSync(dir)) {
    const name = file.replace(/\.mdx$/, '');
    if (!name.includes('.') && name !== 'meta' && name !== 'index') {
      frameworkPages.add(name);
    }
  }
}

/** Resolve `/docs/<page>` to `/docs/<framework>/<page>` when targeting a `[framework]` route */
export function frameworkLink(url: string, framework: string): string | undefined {
  return resolveFrameworkLink(url, framework, frameworkPages);
}

/** Whether the current document sits inside the dynamic `[framework]` directory */
export function inFramework(ctx: MdastVisitorContext): boolean {
  return ctx.fileURL !== undefined && fileURLToPath(ctx.fileURL).startsWith(dir + path.sep);
}

/** Rewrite `[framework]` links in MDX elements, Markdown links, and extracted LLM Markdown */
export function remarkFrameworkLinks(): MdastPluginDefinition {
  function edit(ctx: MdastVisitorContext, at: number, url: string, resolved: string) {
    if (!ctx.source.startsWith(url, at)) return;
    (ctx.data._sourceEdits ??= []).push({
      start: at,
      end: at + url.length,
      text: inFramework(ctx)
        ? (s) =>
            s.expression(`"/docs/" + props.framework + ${JSON.stringify(url.slice(5))}`, resolved)
        : resolved,
    });
  }

  function element(node: MdxJsxFlowElement | MdxJsxTextElement, ctx: MdastVisitorContext) {
    for (const attr of node.attributes) {
      if (attr.type !== 'mdxJsxAttribute' || attr.name !== 'href' || typeof attr.value !== 'string')
        continue;
      const resolved = frameworkLink(attr.value, defaultFramework);
      if (!resolved) continue;
      const start = node.position?.start.offset;
      if (start !== undefined)
        edit(ctx, ctx.source.indexOf('href=', start) + 6, attr.value, resolved);
      if (!inFramework(ctx)) ctx.setAttribute(node, 'href', resolved);
    }
  }

  return {
    name: 'remark-framework-links',
    options: { position: true },
    link(node, ctx) {
      const resolved = frameworkLink(node.url, defaultFramework);
      if (!resolved) return;
      const text = node.children.at(-1)?.position?.end.offset;
      const start = node.position?.start.offset;
      if (text !== undefined) edit(ctx, text + 2, node.url, resolved);
      else if (start !== undefined) edit(ctx, start + 3, node.url, resolved);
      if (!inFramework(ctx)) ctx.setProperty(node, 'url', resolved);
    },
    mdxJsxFlowElement: element,
    mdxJsxTextElement: element,
  };
}
