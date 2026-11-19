# Fumadocs 中文文档（Astro + Bun 最新版）

> 基于 **Astro 7 + Fumadocs 16 + Bun 1.4** 构建的精美落地页 + 完整中文文档站，翻译自 [fumadocs.dev](https://fumadocs.dev)。

Fumadocs（读作 Foo-ma docs）是一个**可拆解的文档框架**：快速、灵活，无缝组合进你的 Astro + React 项目。

## 技术栈（最新版）

| 依赖 | 版本 | 说明 |
| --- | --- | --- |
| `astro` | `^7.4.13` | 静态生成、路由、构建 |
| `@fumadocs/astro` | `^0.3.0` | 官方 Astro 集成（MDX、搜索、LLMs） |
| `fumadocs-core` / `fumadocs-ui` | `^16.19.4` | 文档核心与默认主题 |
| `react` / `react-dom` | `^19.3.1` | 交互岛与文档布局 |
| `@astrojs/react` | `^7.1.9` | Astro React 集成 |
| `tailwindcss` | `^4.3.5` | 落地页与全局样式 |
| `bun` | `1.4.5` | 包管理 + 运行时（`packageManager: bun@1.4.5`） |

## 项目结构

```text
.
├── content/docs/        # 中文文档（MDX，meta.json 组织侧边栏）
├── src/
│   ├── pages/
│   │   ├── index.astro  # 精美落地页（暗色 Hero + 特性 + 代码窗 + 目录）
│   │   ├── docs/[...slug].astro  # Fumadocs 文档页（静态生成）
│   │   ├── api/search.ts         # Orama 全文搜索
│   │   └── [...path].ts          # llms.txt / *.md 输出
│   ├── components/      # Docs / Provider / Search / MDX（与官方 Astro 例程一致）
│   ├── lib/             # source、shared、layout.shared
│   ├── layouts/         # Layout.astro
│   └── styles/          # global.css（Tailwind 4 + Fumadocs UI）
├── astro.config.mjs
├── public/ (favicon.svg, CNAME)
└── .github/workflows/deploy.yml  # bun install + bun run build → GitHub Pages
```

## 本地运行（Bun）

```bash
bun install
bun run dev      # http://localhost:4321（落地页）
bun run build    # 输出 dist/
bun run preview  # 预览构建产物
```

## 设计理念

- **更少的抽象**：写代码而不是配配置，一个「你可以拆解」的框架。
- **无缝集成**：Astro 静态生成与 React 岛组合，熟悉的工作流。
- **可组合的 UI**：默认主题开箱即用，通过 Fumadocs CLI 任意分叉定制。
- **服务端优先**：清晰的服务端-客户端边界，内容可动态交互。
- **为 AI 而生**：`llms.txt`、`llms-full.txt` 与 `*.md` 结构化输出。

## 链接

- 本站文档：<https://fumadocs.ndjp.net>（`/docs`）
- 官网：<https://fumadocs.dev>
- GitHub：<https://github.com/fuma-nama/fumadocs>
- 本仓库：<https://github.com/bbylw/fumadocs-cn>

## 许可证

Fumadocs 基于 MIT 许可证开源。
