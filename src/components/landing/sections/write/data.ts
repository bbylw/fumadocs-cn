/** a block on the press: what its tab calls it, the status line while it's pressed */
export interface Step {
  tab: string;
  status: string;
}

/** each block of `quick-start.mdx` */
export const steps: Step[] = [
  { tab: 'Frontmatter', status: '正在渲染 <DocsTitle>' },
  { tab: '安装命令', status: '正在渲染 <CodeBlockTabs>' },
  { tab: '类型提示', status: '正在运行 Twoslash' },
  { tab: '流程图', status: '正在渲染 <Mermaid>' },
];

export const INSTALL_TABS = [
  { label: 'npm', code: 'npm i fumadocs-ui fumadocs-core' },
  { label: 'pnpm', code: 'pnpm add fumadocs-ui fumadocs-core' },
  { label: 'yarn', code: 'yarn add fumadocs-ui fumadocs-core' },
  { label: 'bun', code: 'bun add fumadocs-ui fumadocs-core' },
] as const;

export const TWOSLASH_SNIPPET = "import { source } from '@/lib/source';\nsource.getP;";

export const MERMAID_CHART =
  'graph LR\n  MDX --> Fumadocs\n  Fumadocs --> 页面\n  Fumadocs --> 搜索';

/** authored source of each block in `quick-start.mdx` */
export const blocks: string[] = [
  `---
title: 快速开始
description: 创建你的第一个文档站点。
---`,
  `## 安装

\`\`\`npm
npm i fumadocs-ui fumadocs-core
\`\`\``,
  `\`\`\`ts twoslash title="page.tsx"
import { source } from '@/lib/source';
// @noErrors
source.getP;
//         ^|
\`\`\``,
  `<Mermaid
  chart="
${MERMAID_CHART}
"
/>`,
];
