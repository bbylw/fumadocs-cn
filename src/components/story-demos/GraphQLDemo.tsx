'use client';
import { useState } from 'react';
import { Play } from 'lucide-react';
import { Screen } from './Screen';

export function GraphQLDemo() {
  const [slug, setSlug] = useState('integrations/graphql');
  const [ran, setRan] = useState(1);

  const response = JSON.stringify(
    {
      data: {
        page: {
          slug,
          title: 'GraphQL 文档生成器',
          locale: 'zh-CN',
          headings: ['Schema 加载', '操作生成', '内置调试台'],
        },
      },
    },
    null,
    2,
  );

  return (
    <Screen title="query GetDoc — GraphQL 操作预览" docs="/docs/integrations/graphql">
      <div className="grid h-full min-h-0 gap-4 @2xl:grid-cols-2">
        <div className="flex flex-col gap-3 rounded-xl border border-fd-border bg-fd-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="rounded bg-fd-primary/15 px-2 py-0.5 font-mono text-xs font-semibold text-fd-primary">
                QUERY
              </span>
              <code className="font-mono text-xs font-medium">GetDoc</code>
            </div>
            <button
              type="button"
              onClick={() => setRan((n) => n + 1)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-fd-primary px-3 py-1 text-xs font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
            >
              <Play className="size-3" />
              执行查询
            </button>
          </div>
          <pre className="rounded-lg border border-fd-border bg-fd-muted/60 p-3 font-mono text-xs leading-relaxed text-fd-foreground">
            {`query GetDoc($slug: String!) {\n  page(slug: $slug) {\n    slug\n    title\n    locale\n    headings\n  }\n}`}
          </pre>
          <label className="flex flex-col gap-1">
            <span className="font-mono text-xs text-fd-muted-foreground">变量 $slug (String!)</span>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="rounded-lg border border-fd-border bg-fd-background px-2.5 py-1.5 font-mono text-xs text-fd-foreground outline-none focus:border-fd-primary"
            />
          </label>
        </div>
        <div className="flex min-h-0 flex-col rounded-xl border border-fd-border bg-fd-card p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-xs text-fd-muted-foreground">查询结果</span>
            <span className="font-mono text-xs text-fd-primary">14ms · 运行 #{ran}</span>
          </div>
          <pre className="min-h-0 flex-1 overflow-auto rounded-lg border border-fd-border bg-fd-muted/60 p-3 font-mono text-xs leading-relaxed text-fd-foreground">
            {response}
          </pre>
        </div>
      </div>
    </Screen>
  );
}
