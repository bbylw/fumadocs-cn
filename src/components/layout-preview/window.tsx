'use client';
import type { ReactNode } from 'react';

/** Framed macOS preview window backdrop for interactive layout stories */
export function StoryWindow({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-xl border px-4 pt-6 pb-8 sm:px-8">
      <img
        src="/story.png"
        alt=""
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 size-full object-cover"
      />
      <div className="relative overflow-hidden rounded-xl border bg-fd-background shadow-xl">
        <div className="flex h-8 items-center gap-1.5 border-b bg-fd-card px-3">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        {children}
      </div>
    </div>
  );
}
