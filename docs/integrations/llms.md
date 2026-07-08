---
title: AI 与 LLM
---

# AI 与 LLM

将 AI 功能集成到 Fumadocs。

## 面向 LLM 的文档

你可以为大型语言模型提供专门的文档内容，让你的文档站点对 AI 更友好。

首先，创建一个 `getLLMText` 函数，将页面转换为静态的 MDX 内容。

在 **Fumadocs MDX** 中，你可以这样做：

```ts title="lib/get-llm-text.ts"
import { source } from '@/lib/source';

export async function getLLMText(page: (typeof source)['$inferPage']) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${page.url})

${processed}`;
}
```

它需要启用 `includeProcessedMarkdown`：

```ts title="source.config.ts"
import { defineDocs } from 'fumadocs-mdx/config';

export const docs = defineDocs({
  docs: {
    // [!code ++:3]
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});
```

## `llms.txt`

你可以使用 Loader API 从页面树生成它。

```ts title="app/llms.txt/route.ts"
import { source } from '@/lib/source';
import { llms } from 'fumadocs-core/source';

// 永久缓存
export const revalidate = false;

export function GET() {
  return new Response(llms(source).index());
}
```

## `llms-full.txt`

一个供 AI 阅读的文档版本。

```ts title="app/llms-full.txt/route.ts"
import { source } from '@/lib/source';
import { getLLMText } from '@/lib/get-llm-text';

// 永久缓存
export const revalidate = false;

export async function GET() {
  const scan = source.getPages().map(getLLMText);
  const scanned = await Promise.all(scan);

  return new Response(scanned.join('\n\n'));
}
```

## `*.md` 扩展名

通过在路径末尾附加 `.md`，允许 AI 代理以 Markdown/MDX 形式获取页面内容。

```ts title="app/llms.mdx/docs/[[...slug]]/route.ts"
import { getLLMText } from '@/lib/get-llm-text';
import { source } from '@/lib/source';
import { notFound } from 'next/navigation';

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<'/llms.mdx/docs/[[...slug]]'>) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  return new Response(await getLLMText(page), {
    headers: {
      'Content-Type': 'text/markdown',
    },
  });
}
```

```ts title="next.config.ts"
import type { NextConfig } from 'next';

const config: NextConfig = {
  // [!code ++:8]
  async rewrites() {
    return [
      {
        source: '/docs/:path*.md',
        destination: '/llms.mdx/docs/:path*',
      },
    ];
  },
};
```

## 页面操作

常见的 AI 页面操作，需先实现 [`*.md`](#md-扩展名)。

通过 CLI 安装：

```bash
npx @fumadocs/cli add ai/page-actions
```

在你的文档页面中使用：

```tsx title="app/docs/[[...slug]]/page.tsx"
const markdownUrl = `${page.url}.mdx`

<div className="flex flex-row gap-2 items-center border-b pt-2 pb-6">
  <LLMCopyButton markdownUrl={markdownUrl} />
  <ViewOptions
    markdownUrl={markdownUrl}
    githubUrl={`https://github.com/${owner}/${repo}/blob/main/content/docs/${page.path}`}
  />
</div>
```

## 询问 AI

你可以使用 Fumadocs CLI 安装 AI 聊天对话框。它针对 [OpenRouter](https://openrouter.ai)（使用 Vercel AI SDK）自动配置，带有一个用于 AI 的 `/search` 工具。

```bash
npx @fumadocs/cli add ai/openrouter
```

> Fumadocs 不提供 AI 模型，这取决于你自己。
>
> 你的 AI 模型可以使用上面生成的 `llms-full.txt` 文件，或与第三方方案结合使用更多样化的信息源。

将组件和触发器添加到文档布局：

```tsx
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { AISearch, AISearchPanel, AISearchTrigger } from '@/components/ai/search';
import { MessageCircleIcon } from 'lucide-react';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DocsLayout>
      {/* [!code ++:17] */}
      <AISearch>
        <AISearchPanel />
        <AISearchTrigger
          position="float"
          className={cn(
            buttonVariants({
              variant: 'secondary',
              className: 'text-fd-muted-foreground rounded-2xl',
            }),
          )}
        >
          <MessageCircleIcon className="size-4.5" />
          Ask AI
        </AISearchTrigger>
      </AISearch>

      {children}
    </DocsLayout>
  );
}
```
