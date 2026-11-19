'use client';
import { type ReactElement, useState } from 'react';
import { cn } from '@/lib/cn';
import { buttonVariants } from '@/components/ui/button';

export function WidthTrigger(): ReactElement {
  const [enabled, setEnabled] = useState(false);

  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant: 'secondary' }))}
      onClick={() => {
        setEnabled((prev) => !prev);
      }}
    >
      {enabled ? <style>{`:root { --fd-layout-width: 1400px; }`}</style> : null}
      切换页面宽度：
      <span className="ms-1.5 text-fd-muted-foreground">{enabled ? '1400px' : '默认'}</span>
    </button>
  );
}
