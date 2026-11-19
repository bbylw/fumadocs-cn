/** 页面摘要：用于搜索引擎结果与链接预览 */
export const summary =
  'Fumadocs 是一款由 Fuma Nama 精心设计的、面向开发者的 React 文档框架。';

/** 标题文本片段，或高亮关键词 */
export type Run = string | { term: string };

/** 将标题片段还原为纯文本 */
export function plain(title: readonly Run[]): string {
  let text = '';
  for (const run of title) text += typeof run === 'string' ? run : run.term;
  return text.replaceAll('\u00a0', ' ').replaceAll('\n', ' ');
}

/**
 * 落地页各板块文案：
 * 每个标题为一句完整描述并标注核心关键词（橙色高亮），\n 控制换行。
 */
export const copy = {
  hero: {
    title: ['数秒内，构建', { term: '更好的文档' }, '。'],
    /** 月亮上的吉祥物轮播气泡：两行一组，最后回到第一组 */
    says: [
      ['把你的 Markdown 变成', '精美优雅的文档站点！'],
      ['Fumadocs 完全开源，', '由社区共同构建与维护 :D'],
      ['我正在努力打造', '最理想的文档框架 :3'],
      ['是时候掌控你的文档了，', 'Fumadocs 将持续演进！'],
    ],
  },
  parts: {
    title: ['为', { term: '可组合' }, '而生，\n按清晰层级解耦。'],
  },
  write: {
    title: ['用你已熟悉的 ', { term: 'Markdown' }, '，\n事半功倍地清晰表达。'],
  },
  automate: {
    lead: '始终保持最新。',
    title: ['从你的', { term: '代码' }, '直接生成内容，\n保持单一', { term: '事实来源' }, '。'],
  },
  style: {
    title: [
      'Fumadocs 是一款由 ',
      { term: 'Fuma Nama' },
      ' 精心设计的、面向',
      { term: '开发者' },
      '的 ',
      { term: 'React' },
      ' 文档框架。',
    ],
    claims: [
      '为你的文档工作流注入强大能力。',
      '高度可定制，贴合你的每一处偏好。',
      '与任意 React 框架、CMS 或任意数据源无缝协作。',
    ],
    tabs: {
      layouts: {
        label: '布局',
        line: '6 套布局与 12 款主题，随时自由切换组合。',
        href: '/docs/ui/layouts',
      },
      story: {
        label: 'Story',
        line: '组件实时交互预览，附带属性控制面板。',
        href: '/docs/next/integrations/story',
      },
      openapi: {
        label: 'OpenAPI',
        line: '自动生成 API 文档页、调试台与代码示例。',
        href: '/docs/next/integrations/openapi',
      },
      graphql: {
        label: 'GraphQL',
        line: '每个操作独立成页，附带类型说明与调试台。',
        href: '/docs/next/integrations/graphql',
      },
      asyncapi: {
        label: 'AsyncAPI',
        line: '频道与消息文档，内置 WebSocket 调试台。',
        href: '/docs/next/integrations/asyncapi',
      },
    },
  },
  cli: {
    lead: '需要更高掌控力？',
    title: ['使用 ', { term: 'Fumadocs CLI' }, ' 安装组件，\n将整套 UI ', { term: '源码' }, '收入仓库。'],
  },
  integrations: {
    title: ['丰富的', { term: '集成生态' }, '，\n轻松扩展你的文档站点。'],
  },
  proof: {
    title: [{ term: '久经考验' }, '，\n稳定运行于生产环境。'],
  },
  feedback: {
    title: ['备受顶尖', { term: '开发者' }, '与', { term: '团队' }, '青睐。'],
  },
  start: {
    title: ['距离上线你的文档，\n只需 ', { term: '1 条命令' }, '。'],
  },
};

export const command = 'pnpm create fumadocs-app';

export const frameworks = [
  { name: 'Next.js', href: '/docs/next/manual-installation', external: false },
  { name: 'React Router', href: '/docs/react-router/manual-installation', external: false },
  { name: 'TanStack Start', href: '/docs/tanstack-start/manual-installation', external: false },
  { name: 'Waku', href: '/docs/waku/manual-installation', external: false },
  { name: 'Astro', href: '/docs/astro/manual-installation', external: false },
];

export interface Quote {
  name: string;
  /** GitHub username */
  handle: string;
  role: string;
  /** GitHub avatar URL */
  avatar: string;
  message: string;
}

/** 开发者与团队真实评价 */
export const quotes: Quote[] = [
  {
    name: 'shadcn',
    handle: 'shadcn',
    role: 'Shadcn UI 作者',
    avatar: 'https://avatars.githubusercontent.com/u/124599',
    message:
      '你一定有过每次开启新项目都要重头搭建一套文档站的经历吧？Fumadocs 彻底解决了这个问题——它提供所有趁手的积木让你自由组合，就像无头文档引擎一样，精准搭出你想要的样子。',
  },
  {
    name: 'Anthony Shew',
    handle: 'anthonyshew',
    role: 'Vercel Turbo DX 负责人',
    avatar: 'https://avatars.githubusercontent.com/u/35677084',
    message:
      '向打造出 Fumadocs 的 @fuma_nama 致敬！这是一个极其惊艳的文档框架，与 App Router 的组合体验顺滑无比。',
  },
  {
    name: 'Aiden Bai',
    handle: 'aidenybai',
    role: 'Million.js 作者',
    avatar: 'https://avatars.githubusercontent.com/u/38025074',
    message: 'Fumadocs 是目前最好的 Next.js 文档框架。',
  },
  {
    name: 'David Blass',
    handle: 'ssalbdivad',
    role: 'ArkType 作者',
    avatar: 'https://avatars.githubusercontent.com/u/10645823',
    message: '如果没有 Fumadocs，我绝对搭不出像 @arktypeio 文档一半这么好看的站点 😍',
  },
];
