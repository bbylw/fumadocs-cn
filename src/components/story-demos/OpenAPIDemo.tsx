'use client';
import { useState } from 'react';
import { Play } from 'lucide-react';
import { Screen } from './Screen';

export function OpenAPIDemo() {
  const [query, setQuery] = useState('fumadocs');
  const [limit, setLimit] = useState('5');
  const [sent, setSent] = useState(1);

  const payload = JSON.stringify(
    {
      total: 2,
      query,
      limit: Number(limit) || 5,
      hits: [
        { id: 'docs/ui/layouts', title: '文档布局概览', score: 0.98 },
        { id: 'docs/integrations/openapi', title: 'OpenAPI 文档集成', score: 0.94 },
      ],
    },
    null,
    2,
  );

  return (
    <Screen title="搜索文档内容 — POST /v1/docs/search" docs="/docs/integrations/openapi">
      <div className="grid h-full min-h-0 gap-4 @2xl:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
        <div className="flex flex-col gap-3 rounded-xl border border-fd-border bg-fd-card p-4">
          <div className="flex items-center justify-between gap-2 rounded-lg border border-fd-border bg-fd-background px-3 py-2">
            <div className="flex min-w-0 items-center gap-2">
              <span className="rounded bg-fd-primary px-2 py-0.5 font-mono text-xs font-semibold text-fd-primary-foreground">
                POST
              </span>
              <code className="truncate font-mono text-xs text-fd-foreground">/v1/docs/search</code>
            </div>
            <button
              type="button"
              onClick={() => setSent((n) => n + 1)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-fd-primary px-3 py-1 text-xs font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
            >
              <Play className="size-3" />
              发送请求
            </button>
          </div>
          <p className="text-fd-muted-foreground">
            根据关键词与过滤条件实时检索文档站点索引，返回匹配页面与相关性评分。
          </p>
          <div className="grid gap-2.5 sm:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className="font-mono text-xs text-fd-muted-foreground">
                query <span className="text-fd-primary">*string</span>
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="rounded-lg border border-fd-border bg-fd-background px-2.5 py-1.5 font-mono text-xs text-fd-foreground outline-none focus:border-fd-primary"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-mono text-xs text-fd-muted-foreground">
                limit <span className="text-fd-muted-foreground">number</span>
              </span>
              <input
                type="number"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                className="rounded-lg border border-fd-border bg-fd-background px-2.5 py-1.5 font-mono text-xs text-fd-foreground outline-none focus:border-fd-primary"
              />
            </label>
          </div>
        </div>
        <div className="flex min-h-0 flex-col rounded-xl border border-fd-border bg-fd-card p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-xs font-medium text-fd-muted-foreground">响应示例</span>
            <span className="rounded bg-emerald-500/15 px-2 py-0.5 font-mono text-xs text-emerald-600 dark:text-emerald-400">
              200 OK · #{sent}
            </span>
          </div>
          <pre className="min-h-0 flex-1 overflow-auto rounded-lg border border-fd-border bg-fd-muted/60 p-3 font-mono text-xs leading-relaxed text-fd-foreground">
            {payload}
          </pre>
        </div>
      </div>
    </Screen>
  );
}
