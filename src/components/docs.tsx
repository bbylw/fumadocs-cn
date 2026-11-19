import { type CSSProperties, type ComponentProps, useMemo } from 'react';
import { Menu } from '@base-ui/react/menu';
import Link from 'fumadocs-core/link';
import { type SerializedPageTree, useFumadocsLoader } from 'fumadocs-core/source/client';
import type { TOCItemType } from 'fumadocs-core/toc';
import { SidebarTrigger } from 'fumadocs-ui/components/sidebar/base';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { useTabsGroups } from 'fumadocs-ui/contexts/tree';
import { DocsLayout, useDocsLayout } from 'fumadocs-ui/layouts/docs';
import {
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  PageLastUpdate,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { getLayoutTabs } from 'fumadocs-ui/layouts/shared';
import { CheckIcon, ChevronsUpDownIcon, SidebarIcon } from 'lucide-react';
import type { Graph } from '@/components/preview/graph-view';
import * as Preview from '@/components/preview';
import { Provider, type ProviderProps } from '@/components/provider';
import { baseOptions, linkItems } from '@/lib/layout.shared';
import { getSection } from '@/lib/section';

export interface DocsProps extends ProviderProps {
  tree: SerializedPageTree;
  title: string;
  description?: string;
  toc: TOCItemType[];
  markdownUrl: string;
  githubUrl: string;
  lastModified?: string;
  preview?: string;
  graph?: Graph;
}

function PreviewRenderer({ preview, graph }: { preview: string; graph?: Graph }) {
  if (preview === 'graphView') {
    return <Preview.graphView graph={graph} />;
  }
  if (preview in Preview) {
    const Comp = Preview[preview as keyof typeof Preview] as () => ReturnType<typeof Preview.tabs>;
    return <Comp />;
  }
  return null;
}

function FrameworkAwareMobileHeader(props: ComponentProps<'header'>) {
  const {
    slots,
    props: { tabs = [] },
  } = useDocsLayout();
  const group = useTabsGroups(tabs).find((item) => item.active?.root === 'framework');
  const selected = group?.options.find((tab) => tab.$folder?.$id === group.active?.$id);

  return (
    <header
      id="nd-subnav"
      className="sticky top-(--fd-banner-height,0px) z-30 [grid-area:header] flex h-(--fd-header-height) items-center gap-2.5 border-b bg-fd-background/80 ps-4 pe-2.5 backdrop-blur-sm md:hidden"
      {...props}
    >
      <slots.navTitle className="inline-flex items-center font-semibold [&>span]:sr-only" />
      {group && selected && (
        <Menu.Root>
          <Menu.Trigger className="flex h-8 min-w-0 items-center gap-2 rounded-lg border bg-fd-secondary/50 ps-2 pe-1.5 text-sm font-medium outline-none transition-colors hover:bg-fd-accent focus-visible:ring-2 focus-visible:ring-fd-ring data-popup-open:bg-fd-accent [&_svg]:size-4 [&_svg]:shrink-0">
            {selected.icon}
            <span className="truncate">{selected.title}</span>
            <ChevronsUpDownIcon className="size-3.5! text-fd-muted-foreground" />
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner align="start" sideOffset={8} alignOffset={-4} className="z-50">
              <Menu.Popup className="flex min-w-56 flex-col rounded-2xl border bg-fd-popover p-1 text-sm text-fd-popover-foreground shadow-lg outline-none">
                {group.options.map((tab) => (
                  <Menu.LinkItem
                    key={tab.url}
                    closeOnClick
                    render={<Link href={tab.url} />}
                    className="flex items-center gap-3 rounded-lg px-[calc(--spacing(2.5)-1px)] py-2 font-medium outline-none transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0"
                  >
                    {tab.icon}
                    <span className="flex-1">{tab.title}</span>
                    {tab === selected && <CheckIcon className="text-fd-primary" />}
                  </Menu.LinkItem>
                ))}
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      )}
      <div className="flex-1" />
      {slots.searchTrigger && <slots.searchTrigger.sm hideIfDisabled className="p-2" />}
      <SidebarTrigger
        className={buttonVariants({ variant: 'ghost', size: 'icon-sm', className: 'p-2' })}
      >
        <SidebarIcon />
      </SidebarTrigger>
    </header>
  );
}

/**
 * The React island of docs pages, the content is passed as children.
 */
export function Docs({
  tree,
  title,
  description,
  toc,
  markdownUrl,
  githubUrl,
  lastModified,
  preview,
  graph,
  children,
  ...props
}: DocsProps) {
  const data = useFumadocsLoader({ tree });
  const tabs = useMemo(
    () =>
      getLayoutTabs(data.tree, {
        transform(option, node) {
          if (node.root === 'framework' || !node.icon) return option;
          const slugSeg = option.url.replace(/^\/docs\/?/, '').split('/')[0];
          const section = getSection(slugSeg);
          const color = `var(--${section}-color, var(--color-fd-foreground))`;

          return {
            ...option,
            icon: (
              <div className="text-(--tab-color)" style={{ '--tab-color': color } as CSSProperties}>
                {node.icon}
              </div>
            ),
          };
        },
      }),
    [data.tree],
  );

  const section = getSection(props.pathname.replace(/^\/docs\/?/, ''));

  return (
    <Provider {...props}>
      <DocsLayout
        {...baseOptions()}
        tree={data.tree}
        tabs={tabs}
        links={linkItems.filter((item) => item.type === 'icon')}
        containerProps={{ className: section }}
        slots={{
          header: FrameworkAwareMobileHeader,
        }}
      >
        <DocsPage toc={toc}>
          <DocsTitle>{title}</DocsTitle>
          <DocsDescription>{description}</DocsDescription>
          <div className="flex flex-row flex-wrap items-center gap-2 border-b -mt-4 pb-6">
            <MarkdownCopyButton markdownUrl={markdownUrl} />
            <ViewOptionsPopover markdownUrl={markdownUrl} githubUrl={githubUrl} />
          </div>
          {preview && <PreviewRenderer preview={preview} graph={graph} />}
          {children}
          {lastModified && <PageLastUpdate date={new Date(lastModified)} />}
        </DocsPage>
      </DocsLayout>
    </Provider>
  );
}
