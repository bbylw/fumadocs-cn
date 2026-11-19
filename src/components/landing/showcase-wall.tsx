import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { vercel } from '@/lib/showcases';
import { kinds } from './showcase-data';

const leader =
  'h-px min-w-4 flex-1 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px)] bg-size-[4px_1px] opacity-60';

/** Vercel's mark and name, the title of its SDKs */
export function VercelTitle({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <svg aria-hidden viewBox="0 0 74 64" className="h-2.5 w-3 fill-current">
        <path d="M37.59.25 74.54 64.25H.64L37.59.25Z" />
      </svg>
      Vercel
    </span>
  );
}

/** a row for the docs of each of Vercel's SDKs: its name, a dotted leader, what it is */
export function VercelLinks() {
  const rows: ReactNode[] = [];
  for (const item of vercel) {
    rows.push(
      <li key={item.url} className="flex flex-1 flex-col border-b border-lp-line last:border-b-0">
        <a
          href={item.url}
          target="_blank"
          rel="noreferrer noopener"
          className="group flex min-h-9 flex-1 items-center px-3 text-xs font-medium transition-none hover:bg-lp-ink hover:text-lp-paper focus-visible:bg-lp-ink focus-visible:text-lp-paper focus-visible:outline-none"
        >
          <span className="flex flex-1 items-baseline gap-2">
            <span className="text-[15px]">{item.name}</span>
            <span aria-hidden className={leader} />
            <span className="inline-flex items-center gap-1 text-lp-ink-2 group-hover:text-lp-paper group-focus-visible:text-lp-paper">
              {kinds[item.url]}
              <ArrowUpRight aria-hidden className="size-3.5" />
            </span>
          </span>
        </a>
      </li>,
    );
  }
  return rows;
}
