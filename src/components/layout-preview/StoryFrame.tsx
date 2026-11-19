'use client';
import { type ComponentProps, useCallback, useEffect, useState } from 'react';
import { FrameworkProvider } from 'fumadocs-core/framework';
import { RootProvider as BaseRootProvider } from 'fumadocs-ui/provider/base';
import { STORY_ARGS, type LayoutId } from '@/components/landing/sections/style/data';
import { DocsLayoutPreview } from './docs';
import { NotebookLayoutPreview } from './notebook';
import { FluxLayoutPreview } from './flux';
import { GlassLayoutPreview } from './glass';
import { SpaciousLayoutPreview } from './spacious';
import { HomeLayoutPreview } from './home';

type Args = Record<string, unknown>;

const LAYOUT_COMPONENTS = {
  docs: DocsLayoutPreview,
  notebook: NotebookLayoutPreview,
  flux: FluxLayoutPreview,
  glass: GlassLayoutPreview,
  spacious: SpaciousLayoutPreview,
  home: HomeLayoutPreview,
} as const;

function extractStoryId(href: string): LayoutId | null {
  const clean = href.replace(/\/$/, '');
  const match = clean.match(/^\/story\/(docs|notebook|flux|glass|spacious|home)(?:\/|$)/);
  return match ? (match[1] as LayoutId) : null;
}

/** Mounted after the story renders so parent frames know commit is complete */
function Rendered({ path }: { path: string }) {
  useEffect(() => {
    if (window.parent === window) return;
    window.parent.postMessage({ type: 'fumadocs-story:rendered', path }, window.location.origin);
  }, [path]);
  return null;
}

export function StoryFrame({ initialStory }: { initialStory: LayoutId }) {
  const [story, setStory] = useState<LayoutId>(initialStory);
  const [currentPath, setCurrentPath] = useState<string>(`/story/${initialStory}`);
  const [args, setArgs] = useState<Args | null>(() => {
    if (typeof window !== 'undefined' && window.parent === window) {
      return STORY_ARGS[initialStory] as Args;
    }
    return null;
  });

  useEffect(() => {
    if (window.parent === window) {
      setArgs(STORY_ARGS[initialStory] as Args);
      return;
    }

    const onMessage = (e: MessageEvent) => {
      if (e.source !== window.parent || e.origin !== window.location.origin) return;
      const data = e.data;
      if (!data || typeof data !== 'object') return;
      if (data.type === 'fumadocs-story:args') {
        setCurrentPath(location.pathname);
        setArgs((data.args as Args) ?? (STORY_ARGS[initialStory] as Args));
      } else if (data.type === 'fumadocs-story:navigate') {
        const href = data.href;
        if (typeof href !== 'string' || !href.startsWith('/story/')) return;
        const nextStory = extractStoryId(href);
        if (!nextStory) return;
        window.history.replaceState(null, '', href);
        setStory(nextStory);
        setCurrentPath(href);
        if (data.args) setArgs(data.args as Args);
      }
    };

    window.addEventListener('message', onMessage);
    window.parent.postMessage(
      { type: 'fumadocs-story:ready', path: location.pathname },
      window.location.origin,
    );
    return () => window.removeEventListener('message', onMessage);
  }, [initialStory]);

  const useStoryPathname = useCallback(() => currentPath, [currentPath]);
  const useStoryParams = useCallback(() => ({ name: story }), [story]);
  const push = useCallback((url: string) => {
    if (url.startsWith('/story/')) {
      const nextStory = extractStoryId(url);
      if (nextStory) setStory(nextStory);
      setCurrentPath(url);
      window.history.replaceState(null, '', url);
    } else {
      window.top?.location.assign(url);
    }
  }, []);
  const useStoryRouter = useCallback(
    () => ({
      push,
      refresh: () => {},
    }),
    [push],
  );
  const StoryLink = useCallback(
    ({ href, onClick, ...props }: ComponentProps<'a'> & { prefetch?: boolean }) => (
      <a
        {...props}
        href={href}
        onClick={(e) => {
          onClick?.(e);
          if (e.defaultPrevented || !href) return;
          if (href.startsWith('/story/')) {
            e.preventDefault();
            push(href);
          }
        }}
      />
    ),
    [push],
  );

  const Preview = LAYOUT_COMPONENTS[story];

  return (
    <FrameworkProvider
      Link={StoryLink}
      usePathname={useStoryPathname}
      useRouter={useStoryRouter}
      useParams={useStoryParams}
    >
      <BaseRootProvider theme={{ enabled: false }}>
        {args && (
          <>
            <Preview {...(args as Record<string, never>)} />
            <Rendered key={currentPath} path={currentPath} />
          </>
        )}
      </BaseRootProvider>
    </FrameworkProvider>
  );
}
