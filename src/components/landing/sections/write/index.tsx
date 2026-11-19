import {
  CodeBlock,
  CodeBlockTab,
  CodeBlockTabs,
  CodeBlockTabsList,
  CodeBlockTabsTrigger,
} from 'fumadocs-ui/components/codeblock';
import { Mermaid } from '@/components/mdx/mermaid';
import { copy } from '../../content';
import { Figure, FigureHeader } from '../../ui/figure';
import { blocks, MERMAID_CHART, steps } from './data';
import { RailBed, RailColumn } from './rail';
import { Stage } from './stage';

const FILE = 'quick-start.mdx';

export interface WriteCodeProps {
  installTabs: { label: string; html: string }[];
  twoslashHtml: string;
}

/** a figure that types an MDX file block by block, and presses each into its page */
export function Write({ code }: { code: WriteCodeProps }) {
  const slots = [
    // a block of frontmatter renders as the page's title
    <div key="frontmatter" className="not-prose flex flex-col gap-4">
      <h3 className="text-[1.75em] font-semibold">快速开始</h3>
      <p className="text-lg text-fd-muted-foreground">创建你的第一个文档站点。</p>
    </div>,
    <div key="install" className="flex flex-col gap-3">
      <h4 className="mt-0! text-base font-semibold">安装</h4>
      <CodeBlockTabs defaultValue={code.installTabs[0]?.label ?? 'npm'} className="my-0">
        <CodeBlockTabsList>
          {code.installTabs.map((tab) => (
            <CodeBlockTabsTrigger key={tab.label} value={tab.label}>
              {tab.label}
            </CodeBlockTabsTrigger>
          ))}
        </CodeBlockTabsList>
        {code.installTabs.map((tab) => (
          <CodeBlockTab key={tab.label} value={tab.label}>
            <CodeBlock allowCopy={false}>
              <div
                className="[&_pre]:m-0 [&_pre]:bg-transparent! [&_pre]:px-4 [&_pre]:py-0"
                dangerouslySetInnerHTML={{ __html: tab.html }}
              />
            </CodeBlock>
          </CodeBlockTab>
        ))}
      </CodeBlockTabs>
    </div>,
    <div key="twoslash">
      <CodeBlock
        title="page.tsx"
        allowCopy={false}
        className="my-0 overflow-visible!"
        viewportProps={{ className: 'overflow-visible! pb-24' }}
      >
        <div
          className="[&_pre]:m-0 [&_pre]:bg-transparent! [&_pre]:px-4 [&_pre]:py-0"
          dangerouslySetInnerHTML={{ __html: code.twoslashHtml }}
        />
      </CodeBlock>
    </div>,
    <div key="mermaid">
      <Mermaid chart={MERMAID_CHART} />
    </div>,
  ];

  return (
    <Figure id="write" aria-label="编写体验" status={`已编译 ${FILE}`}>
      <FigureHeader
        title={copy.write.title}
        className="px-(--lp-gutter) pt-(--lp-section) pb-10 md:pb-12"
      />
      <Stage
        file={FILE}
        steps={steps}
        sources={blocks}
        slots={slots}
        bed={<RailBed stops={steps.length} />}
        column={<RailColumn id="write" />}
      />
    </Figure>
  );
}
