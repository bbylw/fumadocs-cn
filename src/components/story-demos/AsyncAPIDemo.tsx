'use client';
import { useState } from 'react';
import { Radio, Send } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Screen } from './Screen';

interface EventItem {
  id: number;
  type: string;
  payload: string;
}

export function AsyncAPIDemo() {
  const [connected, setConnected] = useState(true);
  const [message, setMessage] = useState('{"channel":"docs.updates","page":"asyncapi"}');
  const [events, setEvents] = useState<EventItem[]>([
    { id: 1, type: 'SUB', payload: '已订阅频道 docs.updates' },
    { id: 2, type: 'MSG', payload: '{"event":"rebuild","pages":37}' },
  ]);

  function pushEvent() {
    if (!connected) return;
    setEvents((prev) => [
      { id: prev.length + 1, type: 'PUB', payload: message },
      ...prev.slice(0, 4),
    ]);
  }

  return (
    <Screen title="频道 docs.updates — AsyncAPI WebSocket 调试台" docs="/docs/integrations/asyncapi">
      <div className="grid h-full min-h-0 gap-4 @2xl:grid-cols-2">
        <div className="flex flex-col gap-3 rounded-xl border border-fd-border bg-fd-card p-4">
          <div className="flex items-center justify-between gap-2 rounded-lg border border-fd-border bg-fd-background px-3 py-2">
            <div className="flex items-center gap-2">
              <Radio className={cn('size-3.5', connected ? 'text-emerald-500' : 'text-fd-muted-foreground')} />
              <code className="font-mono text-xs">wss://realtime.fumadocs.dev</code>
            </div>
            <button
              type="button"
              onClick={() => setConnected((v) => !v)}
              className={cn(
                'rounded-lg px-2.5 py-1 font-mono text-xs font-medium',
                connected
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                  : 'bg-fd-secondary text-fd-secondary-foreground',
              )}
            >
              {connected ? '已连接' : '已断开'}
            </button>
          </div>
          <p className="text-fd-muted-foreground">
            用于订阅文档变更与构建事件通知的实时 WebSocket 频道，支持双向消息负载校验。
          </p>
          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-xs text-fd-muted-foreground">发布测试消息</span>
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-w-0 flex-1 rounded-lg border border-fd-border bg-fd-background px-2.5 py-1.5 font-mono text-xs text-fd-foreground outline-none focus:border-fd-primary"
              />
              <button
                type="button"
                disabled={!connected}
                onClick={pushEvent}
                className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-fd-primary px-3 py-1.5 text-xs font-medium text-fd-primary-foreground disabled:opacity-40"
              >
                <Send className="size-3" />
                发送
              </button>
            </div>
          </label>
        </div>
        <div className="flex min-h-0 flex-col rounded-xl border border-fd-border bg-fd-card p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-xs font-medium text-fd-muted-foreground">实时消息日志</span>
            <span className="font-mono text-xs text-fd-muted-foreground">
              docs.updates
            </span>
          </div>
          <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="flex items-start gap-2 rounded-lg border border-fd-border bg-fd-background px-2.5 py-2 font-mono text-xs"
              >
                <span className="rounded bg-fd-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-fd-primary">
                  {ev.type}
                </span>
                <span className="min-w-0 flex-1 break-all text-fd-foreground">{ev.payload}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Screen>
  );
}
