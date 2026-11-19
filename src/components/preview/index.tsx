import { GitFork, Home, Star } from 'lucide-react';
import type { ReactNode } from 'react';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { Banner } from 'fumadocs-ui/components/banner';
import { Callout } from 'fumadocs-ui/components/callout';
import { Card } from 'fumadocs-ui/components/card';
import { File, Files, Folder } from 'fumadocs-ui/components/files';
import { Heading } from 'fumadocs-ui/components/heading';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { TypeTable } from 'fumadocs-ui/components/type-table';
import DynamicCodeBlockExample from './dynamic-codeblock';
import { type Graph, GraphView } from './graph-view';
import { Wrapper } from './wrapper';

export function heading(): ReactNode {
  return (
    <Wrapper>
      <div className="rounded-lg bg-fd-background p-4 prose-no-margin">
        <Heading id="preview" as="h3">
          Hello World
        </Heading>
        <Heading id="preview-code" as="h3">
          Hello <code>World</code> Everyone!
        </Heading>
      </div>
    </Wrapper>
  );
}

export function card(): ReactNode {
  return (
    <Wrapper>
      <div className="rounded-lg bg-fd-background">
        <Card
          href="#"
          icon={<Home />}
          title="Hello World"
          description="进一步了解缓存与按需重新验证机制"
        />
      </div>
    </Wrapper>
  );
}

export function tabs(): ReactNode {
  return (
    <Wrapper>
      <div className="prose-no-margin">
        <Tabs groupId="language" persist items={['JavaScript', 'Rust', 'TypeScript']}>
          <Tab value="JavaScript">使用 JavaScript 编写的示例内容</Tab>
          <Tab value="Rust">Rust 运行效率极高</Tab>
          <Tab value="TypeScript">即使选项卡条目不完全一致也能联动</Tab>
        </Tabs>

        <Tabs groupId="language" persist items={['JavaScript', 'Rust']}>
          <Tab value="JavaScript">选中状态会跨组共享并持久化，刷新页面后仍会保留</Tab>
          <Tab value="Rust">选中状态会跨组共享并持久化，刷新页面后仍会保留</Tab>
        </Tabs>
      </div>
    </Wrapper>
  );
}

export function typeTable(): ReactNode {
  return (
    <Wrapper>
      <div className="rounded-xl bg-fd-background">
        <TypeTable
          type={{
            percentage: {
              description: '显示返回顶部按钮所需达到的滚动进度百分比',
              type: 'number',
              default: '0.2',
            },
          }}
        />
      </div>
    </Wrapper>
  );
}

export function zoomImage(): ReactNode {
  return (
    <Wrapper>
      <ImageZoom
        alt="Fumadocs 横幅预览图"
        src="/banner.png"
        width={1200}
        height={630}
        className="my-0! rounded-xl bg-fd-background"
      />
    </Wrapper>
  );
}

export function accordion(): ReactNode {
  return (
    <Wrapper>
      <Accordions type="single">
        <Accordion id="what-is-fumadocs" title="什么是 Fumadocs？">
          一个用于构建现代文档站点的 React 文档框架。
        </Accordion>
        <Accordion id="ux" title="为什么选择 Fumadocs？">
          简洁流畅的交互体验、开箱即用的无障碍支持与高度可定制性。
        </Accordion>
      </Accordions>
    </Wrapper>
  );
}

export function callout(): ReactNode {
  return (
    <Wrapper>
      <Callout title="提示标题">你好，Fumadocs！</Callout>
    </Wrapper>
  );
}

export function files(): ReactNode {
  return (
    <Wrapper>
      <Files>
        <Folder name="app" defaultOpen>
          <Folder name="[id]" defaultOpen>
            <File name="page.tsx" />
          </Folder>
          <File name="layout.tsx" />
          <File name="page.tsx" />
          <File name="global.css" />
        </Folder>
        <Folder name="components">
          <File name="button.tsx" />
          <File name="tabs.tsx" />
          <File name="dialog.tsx" />
          <Folder name="empty" />
        </Folder>
        <File name="package.json" />
      </Files>
    </Wrapper>
  );
}

export function inlineTOC(): ReactNode {
  return (
    <Wrapper>
      <InlineTOC
        items={[
          { title: '欢迎使用', url: '#welcome', depth: 2 },
          { title: '快速入门', url: '#getting-started', depth: 3 },
          { title: '基础用法', url: '#usage', depth: 3 },
          { title: '样式定制', url: '#styling', depth: 3 },
          { title: 'API 参考', url: '#reference', depth: 2 },
          { title: '组件列表', url: '#components', depth: 3 },
          { title: '核心接口', url: '#api', depth: 3 },
          { title: '致谢', url: '#credits', depth: 2 },
        ]}
      />
    </Wrapper>
  );
}

export function steps(): ReactNode {
  return (
    <Wrapper>
      <div className="rounded-xl bg-fd-background p-3">
        <Steps>
          <Step>
            <h4>初始化项目</h4>
            <p>运行脚手架命令生成基础目录结构。</p>
          </Step>
          <Step>
            <h4>编写文档</h4>
            <p>在文档目录中添加 Markdown/MDX 页面。</p>
          </Step>
          <Step>
            <h4>发布上线</h4>
            <p>构建静态产物或部署至任意云平台。</p>
          </Step>
        </Steps>
      </div>
    </Wrapper>
  );
}

export function dynamicCodeBlock(): ReactNode {
  return (
    <Wrapper>
      <DynamicCodeBlockExample />
    </Wrapper>
  );
}

export function banner(): ReactNode {
  return (
    <Wrapper>
      <div className="flex flex-col gap-4">
        <Banner className="z-0" changeLayout={false}>
          请注意，Fumadocs 已发布全新版本特性
        </Banner>

        <Banner id="test-rainbow" className="z-0" variant="rainbow" changeLayout={false}>
          使用 <code>rainbow</code> 彩虹渐变样式
        </Banner>

        <Banner
          id="test"
          className="z-0"
          variant="rainbow"
          rainbowColors={[
            'rgba(255,100,0, 0.5)',
            'rgba(255,100,0, 0.5)',
            'transparent',
            'rgba(255,100,0, 0.5)',
            'transparent',
            'rgba(255,100,0, 0.5)',
            'transparent',
          ]}
          changeLayout={false}
        >
          自定义 <code>rainbow</code> 渐变色组
        </Banner>
      </div>
    </Wrapper>
  );
}

export function githubInfo(): ReactNode {
  return (
    <Wrapper>
      <a
        href="https://github.com/fuma-nama/fumadocs"
        rel="noreferrer noopener"
        target="_blank"
        className="flex flex-col gap-1.5 rounded-lg border bg-fd-card p-3 text-sm text-fd-foreground/80 transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground not-prose"
      >
        <p className="flex items-center gap-2 truncate font-medium">
          <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" className="size-3.5">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
          fuma-nama/fumadocs
        </p>
        <div className="flex items-center gap-1 text-xs text-fd-muted-foreground">
          <Star aria-hidden className="size-3" />
          <span>11K+</span>
          <GitFork aria-hidden className="ms-2 size-3" />
          <span>700+</span>
        </div>
      </a>
    </Wrapper>
  );
}

export function graphView({ graph }: { graph?: Graph } = {}): ReactNode {
  if (!graph || graph.nodes.length === 0) return null;
  return <GraphView graph={graph} />;
}
