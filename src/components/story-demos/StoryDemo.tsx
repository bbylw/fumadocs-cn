'use client';
import { useState } from 'react';
import { Info, AlertTriangle, XCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Screen } from './Screen';

type CalloutType = 'info' | 'warn' | 'error' | 'success';

const TYPES: { id: CalloutType; label: string; icon: typeof Info; accent: string }[] = [
  { id: 'info', label: 'info', icon: Info, accent: 'border-fd-primary/40 bg-fd-primary/10 text-fd-primary' },
  { id: 'warn', label: 'warn', icon: AlertTriangle, accent: 'border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  { id: 'error', label: 'error', icon: XCircle, accent: 'border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-400' },
  { id: 'success', label: 'success', icon: CheckCircle2, accent: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
];

export function StoryDemo() {
  const [type, setType] = useState<CalloutType>('info');
  const [title, setTitle] = useState('使用提示');
  const [message, setMessage] = useState('在 MDX 中直接交互预览组件并实时调节 Props 参数。');

  const meta = TYPES.find((t) => t.id === type) ?? TYPES[0];
  const Icon = meta.icon;

  return (
    <Screen title="Callout 组件 Story" docs="/docs/next/integrations/story">
      <div className="grid h-full min-h-0 gap-4 @2xl:grid-cols-2">
        <div className="flex flex-col gap-3 rounded-xl border border-fd-border bg-fd-card p-4 text-fd-card-foreground">
          <div className="flex items-center justify-between border-b border-fd-border pb-2">
            <span className="font-mono text-xs font-medium text-fd-muted-foreground">
              props 控制面板
            </span>
            <span className="rounded bg-fd-primary/15 px-1.5 py-0.5 font-mono text-[11px] text-fd-primary">
              CalloutProps
            </span>
          </div>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">type</span>
            <div className="grid grid-cols-4 gap-1.5">
              {TYPES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setType(item.id)}
                  className={cn(
                    'rounded-lg border px-2 py-1 font-mono text-xs transition-colors',
                    type === item.id
                      ? 'border-fd-primary bg-fd-primary text-fd-primary-foreground'
                      : 'border-fd-border bg-fd-background text-fd-muted-foreground hover:bg-fd-accent',
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">title</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-lg border border-fd-border bg-fd-background px-2.5 py-1.5 text-sm text-fd-foreground outline-none focus:border-fd-primary"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">children</span>
            <textarea
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="resize-none rounded-lg border border-fd-border bg-fd-background px-2.5 py-1.5 text-sm text-fd-foreground outline-none focus:border-fd-primary"
            />
          </label>
        </div>
        <div className="flex flex-col gap-3">
          <div className="rounded-xl border border-fd-border bg-fd-card p-4">
            <p className="mb-2.5 font-mono text-xs text-fd-muted-foreground">实时组件渲染</p>
            <div className={cn('flex gap-2.5 rounded-xl border p-3.5 text-sm', meta.accent)}>
              <Icon className="mt-0.5 size-4 shrink-0" />
              <div className="min-w-0 flex-1">
                {title && <p className="font-semibold text-fd-foreground">{title}</p>}
                <p className="mt-0.5 text-fd-muted-foreground">{message}</p>
              </div>
            </div>
          </div>
          <div className="hidden rounded-xl border border-fd-border bg-fd-card p-4 @sm:block">
            <p className="mb-2 font-mono text-xs text-fd-muted-foreground">生成的 JSX 代码</p>
            <pre className="overflow-x-auto rounded-lg border border-fd-border bg-fd-muted/60 p-3 font-mono text-xs leading-relaxed text-fd-foreground">
              {`<Callout type="${type}" title="${title}">\n  ${message}\n</Callout>`}
            </pre>
          </div>
        </div>
      </div>
    </Screen>
  );
}
