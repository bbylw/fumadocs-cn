'use client';
import type * as PageTree from 'fumadocs-core/page-tree';
import type { TOCItemType } from 'fumadocs-core/toc';
import type { BaseLayoutProps, LinkItemType, NavOptions } from 'fumadocs-ui/layouts/shared';
import { Callout } from 'fumadocs-ui/components/callout';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import { Heading } from 'fumadocs-ui/components/heading';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { usePathname } from 'fumadocs-core/framework';
import { Book, LayoutTemplate, Palette, Rocket, Server, Terminal } from 'lucide-react';
import type { FC, ReactNode } from 'react';

/** layout options shared by the previews */
export interface PreviewProps {
  nav?: Pick<NavOptions, 'transparentMode'> & {
    title?: string;
  };
  themeSwitch?: Pick<NonNullable<BaseLayoutProps['themeSwitch']>, 'enabled' | 'mode'>;
  searchToggle?: Pick<NonNullable<BaseLayoutProps['searchToggle']>, 'enabled'>;
}

/** pass the options to layout, with the navbar title & links */
export function getLayoutOptions<P extends PreviewProps>(base: string, { nav, ...rest }: P) {
  return {
    ...rest,
    nav: {
      ...nav,
      url: base,
      title: (
        <>
          <span className="size-5 rounded-full border bg-linear-to-br from-fd-primary/60 to-fd-background bg-origin-border" />
          <span className="font-medium">{nav?.title ?? '我的文档'}</span>
        </>
      ),
    },
    links: [
      {
        text: '案例',
        url: 'https://www.fumadocs.dev/showcase',
        icon: <LayoutTemplate />,
        external: true,
      },
      {
        type: 'icon',
        url: 'https://github.com/fuma-nama/fumadocs',
        label: 'GitHub',
        text: 'GitHub',
        icon: (
          <svg role="img" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        ),
        external: true,
      },
    ] satisfies LinkItemType[],
  };
}

export function createTree(base: string): PageTree.Root {
  function page(name: string, path: string, description: string, icon?: PageTree.Item['icon']) {
    return {
      type: 'page',
      name,
      url: path ? `${base}/${path}` : base,
      description,
      icon,
    } satisfies PageTree.Item;
  }

  return {
    name: '文档',
    children: [
      {
        type: 'folder',
        name: '核心框架',
        description: '构建现代文档站点',
        root: true,
        icon: <Book />,
        children: [
          { type: 'separator', name: '基础入门' },
          page('概览', '', '全面了解 Fumadocs 的核心能力。', <Book />),
          page('快速开始', 'quick-start', '在数分钟内搭建你的首个文档站点。', <Rocket />),
          page('主题定制', 'themes', '自由调整站点的配色与视觉风格。', <Palette />),
          { type: 'separator', name: '内容创作' },
          page('Markdown', 'markdown', '支持的 Markdown 与 MDX 扩展语法。'),
          page('全文搜索', 'search', '让你的文档内容支持毫秒级检索。'),
          {
            type: 'folder',
            name: 'UI 组件',
            children: [
              page('提示框 Callout', 'components/callout', '高亮展示关键说明与提示信息。'),
              page('导航卡片 Cards', 'components/cards', '快速引导读者跳转至关联文档。'),
              page('选项卡 Tabs', 'components/tabs', '在不同代码与内容面板间无缝切换。'),
            ],
          },
          {
            type: 'folder',
            name: '部署上线',
            children: [
              page('静态导出', 'deployment/static', '生成可托管于任意 CDN 的静态产物。'),
              page('Docker', 'deployment/docker', '通过容器化镜像快速部署服务。'),
            ],
          },
        ],
      },
      {
        type: 'folder',
        name: 'API 参考',
        description: 'REST API 接口文档',
        root: true,
        icon: <Server />,
        children: [
          page('接口说明', 'api', '快速了解 REST API 接入方式。', <Terminal />),
          page('身份认证', 'api/authentication', '配置 API 密钥与请求鉴权。'),
          {
            type: 'folder',
            name: '页面资源',
            defaultOpen: true,
            children: [
              page('获取页面列表', 'api/pages', '列出站点中的所有文档页面。'),
              page('获取单个页面', 'api/pages/get', '读取指定文档页面的完整数据。'),
              page('删除页面', 'api/pages/delete', '移除指定的文档页面。'),
            ],
          },
        ],
      },
    ],
  };
}

function normPath(url: string): string {
  return url.replace(/\/$/, '') || '/';
}

function findPage(nodes: PageTree.Node[], url: string): PageTree.Item | undefined {
  const target = normPath(url);
  for (const node of nodes) {
    if (node.type === 'page' && normPath(node.url) === target) return node;
    if (node.type === 'folder') {
      const result = findPage(node.children, target);
      if (result) return result;
    }
  }
}

export const demoToc: TOCItemType[] = [
  { title: '概览介绍', url: '#introduction', depth: 2 },
  { title: '安装依赖', url: '#installation', depth: 2 },
  { title: '基本用法', url: '#usage', depth: 2 },
  { title: '布局配置', url: '#configuration', depth: 3 },
  { title: '部署上线', url: '#deployment', depth: 2 },
];

/** the page components of a layout */
interface PageComponents {
  DocsPage: FC<{ toc?: TOCItemType[]; children?: ReactNode }>;
  DocsTitle: FC<{ children?: ReactNode }>;
  DocsDescription: FC<{ children?: ReactNode }>;
  DocsBody: FC<{ children?: ReactNode }>;
}

/** the page of tree at the current pathname */
export function DemoPage({
  tree,
  components: { DocsPage, DocsTitle, DocsDescription, DocsBody },
}: {
  tree: PageTree.Root;
  components: PageComponents;
}) {
  const page = findPage(tree.children, usePathname());

  return (
    <DocsPage toc={demoToc}>
      <DocsTitle>{page?.name ?? '概览'}</DocsTitle>
      <DocsDescription>{page?.description ?? '全面了解 Fumadocs 的核心能力。'}</DocsDescription>
      <DocsBody>
        <DemoContent />
      </DocsBody>
    </DocsPage>
  );
}

const usageCode = `import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { source } from '@/lib/source';

export default function Layout({ children }) {
  return <DocsLayout tree={source.getPageTree()}>{children}</DocsLayout>;
}`;

function Snippet({ title, code }: { title?: string; code: string }) {
  return (
    <CodeBlock title={title} allowCopy={false}>
      <Pre className="px-4 font-mono text-[0.8125rem]">{code}</Pre>
    </CodeBlock>
  );
}

export function DemoContent() {
  return (
    <>
      <Heading as="h2" id="introduction">
        概览介绍
      </Heading>
      <p>
        这是一个交互式文档布局实时预览窗口。你可以在侧边栏切换文档目录、检索内容或自由组合不同配色主题。
      </p>
      <Cards>
        <Card
          icon={<Rocket />}
          title="快速开始"
          description="数分钟内完成初始化，立即启动你的文档站点。"
        />
        <Card
          icon={<Palette />}
          title="丰富主题"
          description="内置 12 套精选设计主题，轻松定制专属视觉规范。"
        />
      </Cards>
      <Heading as="h2" id="installation">
        安装依赖
      </Heading>
      <p>使用你常用的包管理器安装核心依赖包：</p>
      <Tabs items={['npm', 'pnpm', 'yarn']}>
        <Tab value="npm">
          <Snippet code="npm i fumadocs-ui fumadocs-core" />
        </Tab>
        <Tab value="pnpm">
          <Snippet code="pnpm add fumadocs-ui fumadocs-core" />
        </Tab>
        <Tab value="yarn">
          <Snippet code="yarn add fumadocs-ui fumadocs-core" />
        </Tab>
      </Tabs>
      <Heading as="h2" id="usage">
        基本用法
      </Heading>
      <p>
        使用布局组件包裹文档页面，并传入由内容文件自动生成的页面树对象（Page Tree）。
      </p>
      <Snippet title="app/docs/layout.tsx" code={usageCode} />
      <p>
        侧边栏与根文件夹选项卡会自动高亮当前阅读页面，并将不同模块的文档结构清晰隔离。
      </p>
      <Heading as="h3" id="configuration">
        布局配置
      </Heading>
      <p>
        所有布局均支持自定义导航栏、主题切换开关与搜索触发器；各布局的专属配置可在对应文档页中查看。
      </p>
      <Callout title="实用提示">
        如需掌控每一处 UI 细节，可使用 Fumadocs CLI 将布局源码安装至本地仓库中直接定制编辑。
      </Callout>
      <Heading as="h2" id="deployment">
        部署上线
      </Heading>
      <p>
        你的文档站就是一个标准的 React 应用，可按常规框架方式部署，并原生兼容纯静态站点导出。
      </p>
    </>
  );
}
