'use client';
import { type ComponentType, type ReactNode, useEffect, useRef, useState } from 'react';
import { isSameOriginEvent } from '@/lib/origin';

interface StoryVariant<Props extends Record<string, unknown>> {
  variant?: string;
  initial?: Partial<Props>;
  fixed?: Partial<Props>;
}

interface StoryFrameConfig {
  src: string;
  Container?: ComponentType<{ children: ReactNode }>;
}

interface DefineStoryOptions<Props extends Record<string, unknown>> {
  displayName: string;
  Component: ComponentType<Props>;
  frame?: StoryFrameConfig;
  args: StoryVariant<Props> | StoryVariant<Props>[];
}

/** Create a lightweight Astro-compatible Story component (`story.WithControl`) */
export function defineStory<Props extends Record<string, unknown>>(
  options: DefineStoryOptions<Props>,
) {
  const variants = Array.isArray(options.args)
    ? options.args
    : [{ variant: '默认配置', ...options.args }];

  function WithControl() {
    const [variantIndex, setVariantIndex] = useState(0);
    const activeVariant = variants[variantIndex] ?? variants[0];
    const [args, setArgs] = useState<Record<string, unknown>>(
      () => ({ ...(activeVariant?.initial ?? {}), ...(activeVariant?.fixed ?? {}) }),
    );
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
      setArgs({ ...(activeVariant?.initial ?? {}), ...(activeVariant?.fixed ?? {}) });
    }, [variantIndex]);

    useEffect(() => {
      if (!options.frame) return;
      const frame = iframeRef.current;
      if (!frame) return;

      const sendArgs = () => {
        frame.contentWindow?.postMessage(
          { type: 'fumadocs-story:args', args },
          window.location.origin,
        );
      };

      const onMessage = (e: MessageEvent) => {
        if (!isSameOriginEvent(e) || e.source !== frame.contentWindow) return;
        if (e.data?.type === 'fumadocs-story:ready') sendArgs();
      };

      const syncTheme = () => {
        const doc = frame.contentDocument;
        if (!doc) return;
        const dark = document.documentElement.classList.contains('dark');
        doc.documentElement.classList.toggle('dark', dark);
        doc.documentElement.style.colorScheme = dark ? 'dark' : 'light';
      };

      window.addEventListener('message', onMessage);
      const observer = new MutationObserver(syncTheme);
      observer.observe(document.documentElement, { attributeFilter: ['class'] });
      frame.addEventListener('load', syncTheme);
      sendArgs();

      return () => {
        window.removeEventListener('message', onMessage);
        observer.disconnect();
        frame.removeEventListener('load', syncTheme);
      };
    }, [args]);

    if (options.frame) {
      const Container = options.frame.Container;
      const sidebar = (args.sidebar as Record<string, unknown> | undefined) ?? {};
      const themeSwitch = (args.themeSwitch as Record<string, unknown> | undefined) ?? {};
      const searchToggle = (args.searchToggle as Record<string, unknown> | undefined) ?? {};
      const hasSidebarControl = 'sidebar' in (activeVariant?.initial ?? {});

      const frameEl = (
        <div className="bg-fd-background">
          <iframe
            ref={iframeRef}
            src={options.frame.src}
            title={`${options.displayName} 交互预览`}
            loading="lazy"
            className="block h-[420px] w-full border-0 bg-fd-background"
          />
          <div className="flex flex-wrap items-center gap-3 border-t bg-fd-card px-3 py-2 text-xs text-fd-card-foreground">
            <span className="font-medium">{options.displayName} 控制项：</span>
            {hasSidebarControl && (
              <label className="inline-flex cursor-pointer items-center gap-1.5">
                <input
                  type="checkbox"
                  checked={Boolean(sidebar.collapsible ?? true)}
                  onChange={(e) =>
                    setArgs((prev) => ({
                      ...prev,
                      sidebar: { ...(prev.sidebar as object), collapsible: e.target.checked },
                    }))
                  }
                />
                可折叠侧边栏
              </label>
            )}
            <label className="inline-flex cursor-pointer items-center gap-1.5">
              <input
                type="checkbox"
                checked={Boolean(themeSwitch.enabled ?? true)}
                onChange={(e) =>
                  setArgs((prev) => ({
                    ...prev,
                    themeSwitch: { ...(prev.themeSwitch as object), enabled: e.target.checked },
                  }))
                }
              />
              主题开关
            </label>
            <label className="inline-flex cursor-pointer items-center gap-1.5">
              <input
                type="checkbox"
                checked={Boolean(searchToggle.enabled ?? true)}
                onChange={(e) =>
                  setArgs((prev) => ({
                    ...prev,
                    searchToggle: { enabled: e.target.checked },
                  }))
                }
              />
              搜索按钮
            </label>
          </div>
        </div>
      );

      return <div className="my-4 not-prose">{Container ? <Container>{frameEl}</Container> : frameEl}</div>;
    }

    const Comp = options.Component;
    return (
      <div className="my-4 overflow-hidden rounded-xl border bg-fd-card text-fd-card-foreground not-prose">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-2.5 text-xs">
          <span className="font-medium">{options.displayName} Story</span>
          {variants.length > 1 && (
            <div className="flex flex-wrap gap-1.5">
              {variants.map((item, idx) => (
                <button
                  key={item.variant ?? idx}
                  type="button"
                  onClick={() => setVariantIndex(idx)}
                  className={
                    idx === variantIndex
                      ? 'rounded-md bg-fd-primary px-2 py-1 font-medium text-fd-primary-foreground'
                      : 'rounded-md border px-2 py-1 text-fd-muted-foreground hover:bg-fd-accent'
                  }
                >
                  {item.variant ?? `变体 ${idx + 1}`}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="bg-fd-background p-4">
          <Comp {...(args as Props)} />
        </div>
        {typeof args.title === 'string' && (
          <div className="flex flex-wrap items-center gap-3 border-t px-4 py-2.5 text-xs">
            <label className="flex items-center gap-2">
              <span className="text-fd-muted-foreground">title:</span>
              <input
                type="text"
                value={args.title}
                onChange={(e) => setArgs((prev) => ({ ...prev, title: e.target.value }))}
                className="rounded-md border bg-fd-background px-2 py-1 text-fd-foreground"
              />
            </label>
          </div>
        )}
      </div>
    );
  }

  return { WithControl };
}
