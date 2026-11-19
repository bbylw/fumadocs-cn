'use client';

import { Check, Copy } from 'lucide-react';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { useCopyFeedback } from '@/lib/use-copy';

/** Accessible copy button for AI agent setup instructions */
export function CopyButton({ text }: { text: string }) {
  const { copied, announcement, onCopy } = useCopyFeedback(() => text);

  return (
    <span className="inline-flex items-center">
      <button
        type="button"
        onClick={onCopy}
        className={buttonVariants({
          variant: 'secondary',
          size: 'sm',
          className: 'gap-2 [&_svg]:size-3.5 [&_svg]:text-fd-muted-foreground',
        })}
      >
        {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
        {copied ? '已复制' : '复制指引'}
      </button>
      <span role="status" className="sr-only">
        {announcement}
      </span>
    </span>
  );
}
