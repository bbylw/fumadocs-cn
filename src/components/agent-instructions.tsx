import { asMarkdown } from 'fumadocs-core/server';
import { defaultFramework, type Framework, frameworkName, frameworks } from '@/lib/framework';
import { CopyButton } from './agent-instructions.client';

/** Generate clean Markdown instructions tailored for AI coding agents */
export function buildAgentInstructions(framework?: Framework): string {
  const active = framework ?? defaultFramework;
  const activeName = frameworkName(active) ?? 'Next.js';
  const createCmds: Record<Framework, string> = {
    next: 'npx create-fumadocs-app@latest my-docs --template +next+fuma-docs-mdx --install --yes',
    'react-router': 'npx create-fumadocs-app@latest my-docs --template react-router --install --yes',
    'tanstack-start': 'npx create-fumadocs-app@latest my-docs --template tanstack-start --install --yes',
    waku: 'npx create-fumadocs-app@latest my-docs --template waku --install --yes',
    astro: 'npx create-fumadocs-app@latest my-docs --template astro --install --yes',
  };

  const frameworkList = framework
    ? ''
    : `\n若用户指定了其他框架，请改用对应框架的指南：\n\n${frameworks.map((item) => `- ${item.name}: /docs/${item.value}.md`).join('\n')}\n`;

  return `# 配置 Fumadocs

面向 AI 编程助手的 ${activeName} 环境接入指引。不同版本配置可能变化，请直接执行下方命令并阅读对应文档，避免凭记忆生成。在任意文档 URL 末尾加上 \`.md\` 即可获取 Markdown 原文。
${frameworkList}
## 创建新文档站点

在新建目录或 Monorepo 子包中初始化站点：

\`\`\`bash
${createCmds[active]}
\`\`\`

- \`my-docs\` 为新建项目目录名称。
- \`--yes\` 可跳过交互提示，更多参数见 \`/docs/cli/create-fumadocs-app.md\`。

## 集成到现有项目

在现有项目根目录运行 CLI：

\`\`\`bash
npx @fumadocs/cli@latest init
\`\`\`

- CLI 会自动识别当前框架并添加文档路由与布局。
- 传入 \`--i18n\` 可自动启用国际化配置。
- 手动安装或合并冲突文件请参考 \`/docs/${active}/manual-installation.md\`。

## 后续步骤

- 编写页面内容：\`/docs/${active}/markdown.md\`
- 组织页面与目录结构：\`/docs/${active}/page-conventions.md\`
- 定制 UI 界面：\`/docs/${active}/guides/customize-ui.md\`
- 修改颜色主题：\`/docs/ui/theme.md\`
- 全部文档索引：\`/llms.txt\`
`;
}

/** AI agent prompt callout card shown on framework introduction pages */
export function AgentInstructions({ framework }: { framework?: Framework }) {
  const instructions = buildAgentInstructions(framework);
  if (asMarkdown()) return instructions;

  return (
    <div className="my-4! rounded-xl border bg-fd-card p-3 text-sm text-fd-card-foreground not-prose">
      <p className="font-medium">正在使用 AI 编程助手？</p>
      <p className="mt-1 mb-4 text-fd-muted-foreground">
        将指引复制给你的助手（如 Antigravity、Claude Code、Cursor、Codex 等）即可快速初始化文档站点，或参考{' '}
        <a href="/llms.txt" className="font-medium text-fd-foreground underline">
          /llms.txt
        </a>{' '}
        查看全站 Markdown 文档索引。
      </p>
      <CopyButton text={instructions} />
    </div>
  );
}
