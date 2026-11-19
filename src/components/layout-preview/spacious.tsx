'use client';
import type * as PageTree from 'fumadocs-core/page-tree';
import { Book, Search, Sun } from 'lucide-react';
import { cn } from '@/lib/cn';
import { createTree, DemoContent, demoToc, type PreviewProps } from './demo';

const base = '/story/spacious';
const tree = createTree(base);

function SidebarNode({ node, active }: { node: PageTree.Node; active?: boolean }) {
  if (node.type === 'separator') {
    return (
      <p className="mt-4 mb-1.5 px-2 text-xs font-medium text-fd-muted-foreground first:mt-0">
        {node.name}
      </p>
    );
  }
  if (node.type === 'page') {
    return (
      <span
        className={cn(
          'flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm transition-colors',
          active
            ? 'bg-fd-primary/10 font-medium text-fd-primary'
            : 'text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground',
        )}
      >
        {node.icon && <span className="[&_svg]:size-3.5">{node.icon}</span>}
        <span className="truncate">{node.name}</span>
      </span>
    );
  }
  return (
    <div className="mt-2">
      <p className="px-2.5 py-1 text-sm font-medium text-fd-foreground">{node.name}</p>
      <div className="ms-2 flex flex-col gap-0.5 border-s border-fd-border ps-2">
        {node.children.map((child, idx) => (
          <SidebarNode key={idx} node={child} />
        ))}
      </div>
    </div>
  );
}

/** Spacious editorial docs layout styled with Fumadocs --color-fd-* design tokens */
export function SpaciousLayoutPreview(props: PreviewProps) {
  const rootFolder = tree.children[0];
  const sidebarNodes = rootFolder?.type === 'folder' ? rootFolder.children : tree.children;

  return (
    <div className="flex min-h-screen flex-col bg-fd-background text-fd-foreground">
      <header className="sticky top-0 z-20 border-b border-fd-border bg-fd-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-6">
          <div className="flex items-center gap-3">
            <span className="size-5 rounded-full border border-fd-border bg-linear-to-br from-fd-primary/70 to-fd-background" />
            <span className="font-semibold tracking-tight">{props.nav?.title ?? '我的文档'}</span>
            <span className="rounded-full border border-fd-border bg-fd-secondary px-2 py-0.5 text-xs text-fd-secondary-foreground">
              v16.19
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden h-9 w-56 items-center gap-2 rounded-full border border-fd-border bg-fd-card px-3 text-sm text-fd-muted-foreground sm:flex">
              <Search className="size-3.5" />
              <span className="flex-1">搜索文档...</span>
              <kbd className="rounded border border-fd-border bg-fd-muted px-1.5 text-[11px]">⌘K</kbd>
            </div>
            <span className="flex size-8 items-center justify-center rounded-full border border-fd-border bg-fd-card text-fd-muted-foreground">
              <Sun className="size-4" />
            </span>
          </div>
        </div>
      </header>
      <div className="mx-auto grid w-full max-w-[1400px] flex-1 grid-cols-1 gap-8 px-6 md:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)_240px]">
        <aside className="hidden py-10 pe-4 md:block">
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-fd-border bg-fd-card px-3 py-2 text-sm font-medium text-fd-card-foreground">
            <Book className="size-4 text-fd-primary" />
            <span>核心框架</span>
          </div>
          <nav aria-label="文档目录" className="flex flex-col gap-0.5">
            {sidebarNodes.map((node, i) => (
              <SidebarNode key={i} node={node} active={node.type === 'page' && node.name === '概览'} />
            ))}
          </nav>
        </aside>
        <main className="min-w-0 py-10 md:px-6">
          <div className="mx-auto max-w-[760px]">
            <h1 className="mb-3 text-4xl font-semibold tracking-tight">概览</h1>
            <p className="mb-8 text-lg text-fd-muted-foreground">
              宽敞留白与大字号排版，专为长篇技术阅读体验打造的现代文档布局。
            </p>
            <div className="prose max-w-none">
              <DemoContent />
            </div>
          </div>
        </main>
        <aside className="hidden py-10 xl:block">
          <p className="mb-3 text-xs font-medium tracking-wide text-fd-muted-foreground uppercase">
            本页目录
          </p>
          <ul className="flex flex-col gap-2 border-s border-fd-border ps-3 text-sm">
            {demoToc.map((item, idx) => (
              <li
                key={item.url}
                className={cn(
                  item.depth > 2 && 'ps-3',
                  idx === 0 ? 'font-medium text-fd-primary' : 'text-fd-muted-foreground',
                )}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
