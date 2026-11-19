import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

/** Framed container for live component previews in documentation pages */
export function Wrapper(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        'my-4 rounded-lg border border-fd-primary/10 bg-radial-[at_bottom] from-blue-500/20 bg-origin-border p-4 prose-no-margin dark:bg-black/20',
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
