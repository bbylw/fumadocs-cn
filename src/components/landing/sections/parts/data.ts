import type { Layer } from '../../ui/chip';

/** the layers top down: the order of the stack and of its labels */
export const LAYERS: Layer[] = ['ui', 'core', 'content', 'framework'];

/** each layer's name in a sentence */
export const NAMES: Record<Layer, string> = {
  ui: 'UI 界面',
  core: 'Core 核心',
  content: '内容源',
  framework: '框架',
};

/** what each layer does, beside its name in the panel */
export const ROLES: Record<Layer, string> = {
  ui: '文档布局与交互组件',
  core: '搜索、页面树、目录与国际化',
  content: '你的文档页面数据来源',
  framework: '驱动文档站运行的基础框架',
};

export type SwapLayer = Exclude<Layer, 'core'>;

/** how a module looks on the stack: the UI's screen, the content's bay, the framework's case */
export type Look = 'styled' | 'plain' | 'edited' | 'files' | 'blocks' | 'ink' | 'paper' | 'grey';

export interface Option {
  /** its name in prose, as the docs spell it */
  title: string;
  /** its name on a plate too narrow for the title */
  short: string;
  /** the package */
  name: string;
  /** what it does, told as the arm sets it */
  line: string;
  /** what a caption calls it, where not its title */
  caption?: string;
  look: Look;
  /** a content source's three pages, and what Core's search types to find the second */
  pages?: Page[];
  query?: string;
}

/** a page a content source brings: its title, and its file for one read from files */
export interface Page {
  title: string;
  file?: string;
}

/** the core never swaps: every other layer plugs into it */
export const CORE: Omit<Option, 'look'> = {
  title: 'Fumadocs Core',
  short: 'Core',
  name: 'fumadocs-core',
  line: '每个页面共享的核心能力：全文搜索、页面树、目录与多语言支持。',
};

export const OPTIONS: Record<SwapLayer, Option[]> = {
  ui: [
    {
      title: 'Fumadocs UI',
      short: 'UI',
      name: 'fumadocs-ui',
      line: '默认预设主题：精致的文档布局与交互组件。',
      look: 'styled',
    },
    {
      title: 'Headless',
      caption: '自定义 UI',
      short: 'Headless',
      name: 'fumadocs-core',
      line: '保留核心逻辑，自由定制专属界面风格。',
      look: 'plain',
    },
    {
      title: '自托管副本',
      caption: '本地副本 Fumadocs UI',
      short: '本地副本',
      name: '@/layouts/docs',
      line: '将 UI 代码安装进你的仓库，随心编辑每一行。',
      look: 'edited',
    },
  ],
  content: [
    {
      title: 'Fumadocs MDX',
      short: 'MDX',
      name: 'fumadocs-mdx',
      line: '将 Markdown 与 MDX 文件直接编译为页面。',
      look: 'files',
      pages: [
        { title: 'Introduction', file: 'index.mdx' },
        { title: 'Install', file: 'install.mdx' },
        { title: 'API', file: 'api.mdx' },
      ],
      query: 'ins',
    },
    {
      title: 'Notion',
      short: 'Notion',
      name: '@fumadocs/notion',
      line: '直接在 Notion 中编写并发布文档页面。',
      look: 'blocks',
      pages: [{ title: 'Welcome' }, { title: 'Setup' }, { title: 'Reference' }],
      query: 'set',
    },
    {
      title: 'Content Collections',
      short: 'Collections',
      name: '@fumadocs/content-collections',
      line: '通过 Content Collections 加载本地 Markdown。',
      look: 'files',
      pages: [
        { title: 'Introduction', file: 'index.md' },
        { title: 'Install', file: 'install.md' },
        { title: 'API', file: 'api.md' },
      ],
      query: 'ins',
    },
    {
      title: 'Sanity',
      short: 'Sanity',
      name: '@fumadocs/sanity',
      line: '从无头 CMS Sanity 实时拉取文档内容。',
      look: 'blocks',
      pages: [{ title: 'Home' }, { title: 'Setup' }, { title: 'Reference' }],
      query: 'set',
    },
    {
      title: 'Obsidian',
      short: 'Obsidian',
      name: 'fumadocs-obsidian',
      line: '将你的 Obsidian 知识库一键发布为文档。',
      look: 'files',
      pages: [
        { title: 'Introduction', file: 'Index.md' },
        { title: 'Install', file: 'Install.md' },
        { title: 'API', file: 'API.md' },
      ],
      query: 'ins',
    },
  ],
  framework: [
    {
      title: 'Next.js',
      short: 'Next.js',
      name: 'next',
      line: '基于 Next.js 运行你的文档站点。',
      look: 'ink',
    },
    {
      title: 'React Router',
      short: 'Router',
      name: 'react-router',
      line: '一套文档源码，无缝运行于 React Router。',
      look: 'paper',
    },
    {
      title: 'TanStack Start',
      short: 'TanStack',
      name: '@tanstack/react-start',
      line: '一套文档源码，无缝运行于 TanStack Start。',
      look: 'grey',
    },
    { title: 'Waku', short: 'Waku', name: 'waku', line: '一套文档源码，轻量运行于 Waku。', look: 'paper' },
    {
      title: 'Astro',
      short: 'Astro',
      name: 'astro',
      line: '一套文档源码，高性能构建于 Astro。',
      look: 'grey',
    },
  ],
};
