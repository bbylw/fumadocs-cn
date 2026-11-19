import { createContext, useContext, type ComponentProps, type FC } from 'react';
import Link from 'fumadocs-core/link';
import * as Twoslash from 'fumadocs-twoslash/ui';
import { Accordions, Accordion } from 'fumadocs-ui/components/accordion';
import { Banner } from 'fumadocs-ui/components/banner';
import { Callout } from 'fumadocs-ui/components/callout';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { File, Files, Folder } from 'fumadocs-ui/components/files';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs, TabsContent, TabsList, TabsTrigger } from 'fumadocs-ui/components/tabs';
import { TypeTable } from 'fumadocs-ui/components/type-table';
import { DocsBody } from 'fumadocs-ui/layouts/docs/page';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { AgentInstructions } from '@/components/agent-instructions';
import { Mermaid } from '@/components/mdx/mermaid';
import { Customization } from '@/components/preview/customization';
import { Installation } from '@/components/preview/installation';
import { Wrapper } from '@/components/preview/wrapper';
import { TOCStyle, TOCStylePreview } from '@/components/toc-style-preview';
import { type Framework, frameworkLink } from '@/lib/framework';

const FrameworkContext = createContext<Framework | undefined>(undefined);

function useFrameworkHref(href?: string) {
  const framework = useContext(FrameworkContext);
  return href && framework ? (frameworkLink(href, framework) ?? href) : href;
}

function MdxLink({ href, ...props }: ComponentProps<'a'>) {
  return <Link href={useFrameworkHref(href)} {...props} />;
}

function MdxCard({ href, ...props }: ComponentProps<typeof Card>) {
  return <Card href={useFrameworkHref(href)} {...props} />;
}

function MdxWrapper({
  framework,
  ...props
}: ComponentProps<typeof DocsBody> & { framework?: Framework }) {
  return (
    <FrameworkContext.Provider value={framework}>
      <DocsBody {...props} />
    </FrameworkContext.Provider>
  );
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ...Twoslash,
    Files,
    File,
    Folder,
    TypeTable,
    ImageZoom,
    Tabs,
    Tab,
    TabsList,
    TabsTrigger,
    TabsContent,
    Steps,
    Step,
    Accordions,
    Accordion,
    Banner,
    a: MdxLink,
    Card: MdxCard,
    Cards,
    Mermaid,
    Wrapper,
    Installation,
    Customization,
    AgentInstructions,
    TOCStyle,
    TOCStylePreview,
    blockquote: Callout as unknown as FC<ComponentProps<'blockquote'>>,
    ...components,
  } satisfies MDXComponents;
}

// For `@fumadocs/astro`, `wrapper` gives rendered MDX content its prose styles
export default getMDXComponents({ wrapper: MdxWrapper });
