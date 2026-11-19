export type IntegrationId = 'search' | 'openapi' | 'ai' | 'llms' | 'i18n' | 'og';

/** the modules on the board */
export interface Module {
  id: IntegrationId;
  title: string;
  /** one line under the title */
  line: string;
  /** the package or import path that ships it */
  pkg: string;
  /** docs page; without it the cell opens the search dialog */
  href?: string;
  install: string;
}

export const modules: Module[] = [
  {
    id: 'search',
    title: '全文搜索',
    line: '内置 ZBSearch，也支持 Algolia 等多种引擎。',
    pkg: 'fumadocs-core/search',
    install: 'npx @fumadocs/cli feature search',
  },
  {
    id: 'openapi',
    title: 'OpenAPI',
    line: '基于规范自动生成 API 文档与交互调试台。',
    pkg: 'fumadocs-openapi',
    href: '/docs/next/integrations/openapi',
    install: 'npm i fumadocs-openapi shiki',
  },
  {
    id: 'ai',
    title: 'AI 问答',
    line: '智能文档助手，基于文档内容精准作答。',
    pkg: '@fumadocs/ai-chat',
    href: '/docs/next/integrations/llms#ask-ai',
    install: 'npx @fumadocs/cli feature ai',
  },
  {
    id: 'llms',
    title: 'llms.txt',
    line: '为 AI Agent 输出结构化 Markdown 页面。',
    pkg: 'fumadocs-core/source',
    href: '/docs/next/integrations/llms',
    install: 'npx @fumadocs/cli feature llms',
  },
  {
    id: 'i18n',
    title: '多语言 i18n',
    line: '原生支持多语言路由、页面树与界面文案。',
    pkg: 'fumadocs-core/i18n',
    href: '/docs/next/internationalization',
    install: 'npx @fumadocs/cli init --i18n',
  },
  {
    id: 'og',
    title: 'OG 卡片',
    line: '为每一篇文档自动生成 Open Graph 分享图。',
    pkg: 'fumadocs-ui/og',
    href: '/docs/next/integrations/og',
    install: 'npx @fumadocs/cli feature og',
  },
];

/** further integrations, in the row under the board */
export const more: { name: string; href: string }[] = [
  { name: 'AsyncAPI', href: '/docs/next/integrations/asyncapi' },
  { name: 'GraphQL', href: '/docs/next/integrations/graphql' },
  { name: 'Twoslash', href: '/docs/next/markdown/twoslash' },
  { name: '类型表格', href: '/docs/ui/components/auto-type-table' },
  { name: 'Story', href: '/docs/next/integrations/story' },
  { name: 'Obsidian', href: '/docs/next/integrations/content/obsidian' },
  { name: '更新日志', href: '/docs/next/integrations/changelog' },
  { name: '博客系统', href: '/docs/next/integrations/blog' },
  { name: '文档反馈', href: '/docs/next/integrations/feedback' },
  { name: 'MCP Server', href: '/docs/next/integrations/llms#mcp-server' },
  { name: 'WebMCP', href: '/docs/next/integrations/llms#webmcp' },
  { name: 'EPUB 导出', href: '/docs/next/guides/export-epub' },
  { name: '图谱视图', href: '/docs/ui/components/graph-view' },
  { name: '图片灯箱', href: '/docs/ui/components/image-zoom' },
  { name: '横幅公告', href: '/docs/ui/components/banner' },
  { name: 'GitHub 信息卡', href: '/docs/ui/components/github-info' },
  { name: '数学公式', href: '/docs/next/markdown/math' },
  { name: '静态导出', href: '/docs/next/deploying/static' },
  { name: 'Notion', href: '/docs/next/integrations/content/notion' },
  { name: 'Sanity', href: '/docs/next/integrations/content/sanity' },
  { name: 'Python', href: '/docs/next/integrations/content/python' },
  { name: 'Content Collections', href: '/docs/headless/content-collections' },
  { name: 'MDX Remote', href: '/docs/next/integrations/content/mdx-remote' },
  { name: '本地 Markdown', href: '/docs/next/integrations/content/local-md' },
  { name: '本地 HTML', href: '/docs/next/integrations/content/local-html' },
  { name: '独立 OpenAPI', href: '/docs/next/integrations/openapi/standalone' },
  { name: '可视化编辑器', href: '/docs/next/editor' },
  { name: 'Preview CLI', href: '/docs/cli/preview' },
];
