'use client';
import { HomeLayout, type HomeLayoutProps } from 'fumadocs-ui/layouts/home';
import type { LinkItemType } from 'fumadocs-ui/layouts/shared';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { Book, ComponentIcon, Rocket, Search, Server, Terminal, Zap } from 'lucide-react';
import { cn } from '@/lib/cn';
import { getLayoutOptions, type PreviewProps } from './demo';

const base = '/story/home';

const menu: LinkItemType = {
  type: 'menu',
  text: '文档中心',
  items: [
    {
      text: '快速开始',
      description: '了解如何在你的文档站点中集成与配置 Fumadocs。',
      url: '/docs',
      icon: <Book />,
    },
    {
      text: 'UI 组件库',
      description: '为你的文档页面赋予丰富的交互组件体验。',
      url: '/docs/ui/components',
      icon: <ComponentIcon />,
    },
  ],
};

const features = [
  { icon: <Rocket />, title: '极速渲染', description: '页面默认优先服务端生成，首屏响应迅速。' },
  { icon: <Search />, title: '内置搜索', description: '开箱即用的全文检索引擎，毫秒级匹配结果。' },
  { icon: <ComponentIcon />, title: '丰富组件', description: '内置选项卡、提示框、导航卡片与类型表格。' },
  { icon: <Server />, title: 'OpenAPI 支持', description: '依据规范自动构建交互式 REST API 文档。' },
  { icon: <Terminal />, title: 'CLI 工具', description: '一键将布局与组件源码安装到本地项目中定制。' },
  { icon: <Zap />, title: '高度灵活', description: '兼容多种主流 React 与内容驱动框架。' },
];

export interface HomeLayoutPreviewProps extends PreviewProps {
  nav?: PreviewProps['nav'] & Pick<NonNullable<HomeLayoutProps['nav']>, 'enableHoverToOpen'>;
}

export function HomeLayoutPreview(props: HomeLayoutPreviewProps) {
  const options = getLayoutOptions(base, props);

  return (
    <HomeLayout {...options} links={[menu, ...options.links]}>
      <div className="flex flex-col items-center gap-4 px-4 pt-24 pb-16 text-center">
        <h1 className="text-4xl font-semibold">打造出色的技术文档站点</h1>
        <p className="max-w-lg text-fd-muted-foreground">
          这是一个交互式首页布局实时预览。你可以打开顶部导航菜单、体验搜索触发或切换深浅配色主题。
        </p>
        <div className="flex gap-2">
          <a
            href="/docs"
            target="_top"
            className={cn(buttonVariants({ variant: 'primary' }), 'rounded-full px-4')}
          >
            开始使用
          </a>
          <a
            href="https://github.com/fuma-nama/fumadocs"
            target="_blank"
            rel="noreferrer noopener"
            className={cn(buttonVariants({ variant: 'secondary' }), 'rounded-full px-4')}
          >
            GitHub
          </a>
        </div>
      </div>
      <div className="mx-auto grid w-full max-w-(--fd-layout-width) grid-cols-1 gap-3 px-4 pb-24 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col gap-1 rounded-xl border bg-fd-card p-4 text-sm [&_svg]:mb-2 [&_svg]:size-5 [&_svg]:text-fd-primary"
          >
            {feature.icon}
            <p className="font-medium">{feature.title}</p>
            <p className="text-fd-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </HomeLayout>
  );
}
