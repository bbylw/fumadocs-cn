'use client';

import type { ComponentProps } from 'react';
import { PreviewCard as PreviewCardPrimitive } from '@base-ui/react/preview-card';
import Link from 'fumadocs-core/link';
import { cn } from '@/lib/cn';

export const HoverCard = PreviewCardPrimitive.Root;

/** Accessible hover preview trigger wrapping Fumadocs Link */
export function HoverCardTrigger(props: ComponentProps<typeof Link>) {
  return <PreviewCardPrimitive.Trigger render={<Link {...props} />} />;
}

/** Popover content showing linked page title and description on hover/focus */
export function HoverCardContent({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: ComponentProps<typeof PreviewCardPrimitive.Popup> &
  Pick<ComponentProps<typeof PreviewCardPrimitive.Positioner>, 'align' | 'sideOffset'>) {
  return (
    <PreviewCardPrimitive.Portal>
      <PreviewCardPrimitive.Positioner align={align} sideOffset={sideOffset} className="z-50">
        <PreviewCardPrimitive.Popup
          className={cn(
            'w-72 rounded-lg border bg-fd-popover p-4 text-fd-popover-foreground shadow-md outline-none origin-(--transform-origin) data-open:animate-fd-popover-in data-closed:animate-fd-popover-out',
            className,
          )}
          {...props}
        />
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  );
}
