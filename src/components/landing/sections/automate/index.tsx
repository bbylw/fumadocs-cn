import type { ReactNode } from 'react';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { CodeBlock } from 'fumadocs-ui/components/codeblock';
import { TypeTable, type TypeNode } from 'fumadocs-ui/components/type-table';
import { copy } from '../../content';
import { DITHER_MASKS } from '../../lib/dither';
import { Figure, FigureHeader, Status } from '../../ui/figure';
import { Button } from './content/button';
import { FILE, type Output, OUTPUTS, PAGE, RELEASES } from './data';
import { type Made, Stage } from './stage';

export interface AutomateCodeProps {
  sourceHtml: string;
  includedBeforeHtml: string;
  includedAfterHtml: string;
}

/** framed Shiki code block inside a desktop window */
function FramedCode({ html }: { html: string }) {
  return (
    <CodeBlock
      allowCopy={false}
      className="my-0 rounded-none border-0 bg-transparent shadow-none"
      viewportProps={{
        className: 'py-2.5 text-[11px]/4 lg:text-xs/4.5 overflow-hidden [&_.line]:px-3!',
      }}
    >
      <div
        className="[&_pre]:m-0 [&_pre]:bg-transparent! [&_pre]:p-0"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </CodeBlock>
  );
}

/** `text` with its last two words held together, so it never wraps to one alone */
function bound(text: string): string {
  return text.replace(/ (?=\S+$)/, '\u00a0');
}

const markdownRows: { name: string; desc: string }[] = [
  { name: 'label: string', desc: '按钮内显示的文本。' },
  { name: 'href?: string', desc: '传入时将渲染为链接。' },
  { name: 'color?: string', desc: '' },
  { name: 'onPress?: () => void', desc: '点击按钮时触发的回调。' },
];

/** the page's Markdown for agents, its props as a list read from the type, a deprecated one marked */
function markdown(deprecated: boolean): ReactNode {
  const lines: ReactNode[] = [];
  for (const entry of markdownRows) {
    if (lines.length > 0) lines.push('\n');
    if (entry.name === 'color?: string' && deprecated) {
      lines.push(
        <span key={entry.name} data-mark="">
          {bound(`- ${entry.name}，已废弃：请改用 className。`)}
        </span>,
      );
    } else {
      lines.push(bound(`- ${entry.name}${entry.desc ? `：${entry.desc}` : ''}`));
    }
  }
  return (
    <pre className="px-3 py-2.5 font-mono text-[11px]/4 text-pretty whitespace-pre-wrap text-lp-ink lg:text-xs/4.5">
      <span className="max-lg:hidden">{`# ${PAGE.title}\n\n${PAGE.description}\n\n## Props\n\n`}</span>
      {lines}
    </pre>
  );
}

/**
 * the docs page: its title, the component on a stage, and its props' source included from it, cut
 * below 1024px to the lines round the edit
 */
function page(html: string): ReactNode {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-1 px-3 pt-3">
        <p className="text-lg font-semibold">{PAGE.title}</p>
        <p className="text-sm text-fd-muted-foreground">{PAGE.description}</p>
      </div>
      <div className="flex flex-col items-center gap-2 py-4">
        <div className="flex gap-2">
          <Button label="保存" />
          <Button label="阅读文档" href="/docs" />
        </div>
        <span aria-hidden className="w-3/5 border-t border-lp-line-strong">
          <span className="block h-1.5 bg-lp-ink-2" style={{ maskImage: DITHER_MASKS[4] }} />
        </span>
      </div>
      <div className="border-t border-lp-line">
        <FramedCode html={html} />
      </div>
    </div>
  );
}

/** the changelog over the last release: the next one's slot, filled once the edit ships */
function releases(shipped: boolean): ReactNode {
  const [next, last] = RELEASES;
  return (
    <Cards className="m-3 grid-cols-1! gap-2">
      {shipped ? (
        <Card data-mark="" title={next.title} description={next.description} />
      ) : (
        // as tall as the release that fills it
        <Card
          title={<span className="text-lp-ink-2">未发布</span>}
          description={<span className="invisible">{next.description}</span>}
          className="border-dashed border-lp-line-strong bg-transparent"
        />
      )}
      <Card title={last.title} description={last.description} />
    </Cards>
  );
}

/** the page's link preview as the docs draw it: its title and description, the version, marked once new */
function image(version: string, changed = false): ReactNode {
  return (
    <div className="flex aspect-og flex-col justify-between bg-lp-ink p-4 text-lp-paper">
      <span className="flex items-center gap-2 text-xs font-medium">
        <span className="size-3 rounded-full bg-lp-sun" />
        Fumadocs
      </span>
      <span className="flex flex-col gap-1">
        <span className="text-2xl leading-none font-semibold">{PAGE.title}</span>
        <span className="text-xs text-lp-paper/70">{PAGE.description}</span>
      </span>
      <span
        data-mark={changed ? '' : undefined}
        className="self-start border border-lp-paper/40 px-1.5 font-mono text-[11px]"
      >
        v{version}
      </span>
    </div>
  );
}

function propsTable(deprecated: boolean): ReactNode {
  const type: Record<string, TypeNode> = {
    label: {
      description: '按钮内显示的文本。',
      type: 'string',
      required: true,
    },
    href: {
      description: '传入时将渲染为链接。',
      type: 'string',
    },
    color: {
      ...(deprecated ? { description: '已废弃：请改用 className。', deprecated: true } : {}),
      type: 'string',
    },
    onPress: {
      description: '点击按钮时触发的回调。',
      type: '() => void',
    },
  };
  return <TypeTable type={type} className="my-0 rounded-none border-0" />;
}

export function Automate({ code }: { code: AutomateCodeProps }) {
  const outputs: Record<Output, Made> = {
    props: { before: propsTable(false), after: propsTable(true) },
    page: { before: page(code.includedBeforeHtml), after: page(code.includedAfterHtml) },
    releases: { before: releases(false), after: releases(true) },
    llms: { before: markdown(false), after: markdown(true) },
    og: { before: image(RELEASES[1].title), after: image(RELEASES[0].title, true) },
  };

  return (
    <Figure id="automate" aria-label="自动化同步" status="5 项产物已同步">
      <FigureHeader
        lead={<Status>{copy.automate.lead}</Status>}
        title={copy.automate.title}
        className="px-(--lp-gutter) pt-(--lp-section) pb-10 md:pb-12"
      />
      <Stage file={FILE} source={<FramedCode html={code.sourceHtml} />} outputs={outputs} />
    </Figure>
  );
}
