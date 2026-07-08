# Fumadocs

Fumadocs（读作 Foo-ma docs）是一个**文档框架**，旨在快速、灵活，并能无缝地组合进你的 React 框架。

它由多个层级组成，更像是一种「思维框架」——每一层本身都可以是一个独立的库：

- **Fumadocs Core**：负责大部分逻辑，包括文档搜索、内容源适配器以及 Markdown 扩展。
- **Fumadocs UI**：Fumadocs 的默认主题，为文档站点提供美观的外观与交互式组件。
- **内容源（Content Source）**：内容的来源，可以是 CMS，也可以是像 [Fumadocs MDX](https://fumadocs.dev/docs/mdx)（官方内容源）这样的本地数据层。
- **Fumadocs CLI**：一个命令行工具，用于安装 UI 组件并自动化处理，对自定义布局很有帮助。

## 设计理念

- **更少的抽象**：Fumadocs 期望你编写代码并与你的软件其余部分协作，而不是通过一个配置文件来配置一切。它是一个不偏执的框架——**一个「你可以拆解」的框架**。
- **无缝集成**：与你的 React 框架紧密集成，带来实用的工具和一个美观的 UI。对 Next.js 开发者来说，依然在使用熟悉的 App Router 特性（如静态站点生成）。
- **可组合的 UI**：默认主题只提供用户界面；你可以借助 [Fumadocs CLI](https://fumadocs.dev/docs/cli)「分叉」UI 的一部分并完全自定义它（灵感来自 Shadcn UI）。
- **服务端优先**：由 React Server Component 驱动，拥有完美的服务端-客户端边界，内容变得动态且可交互。
- **极简**：专注于把基础功能做到完美且维护良好。

## 快速开始

要求 Node.js 最低版本为 22。

```bash
npm create fumadocs-app
```

它会询问你要使用的内置模板（React 框架：Next.js、Waku、React Router、Tanstack Start；内容源：Fumadocs MDX）。

在 docs 文件夹中创建第一个 MDX 文件：

```mdx
---
title: Hello World
---

## Yo what's up
```

以开发模式运行并访问 `http://localhost:3000/docs`：

```bash
npm run dev
```

## 为什么选择 Fumadocs

Fumadocs 在设计时考虑到了灵活性，并不局限于某些特定用途：

- `fumadocs-core` 是一个用于构建文档的**无头（headless）UI 库**。
- `fumadocs-mdx` 是一个用于处理 MDX 内容的有用库。

对于博客、展示页、FAQ 页等需求，Fumadocs 可以帮你以更少的样板代码更轻松地构建文档。

### 与其他框架对比

- **Nextra**：Fumadocs 受 Nextra 启发，但 Fumadocs 更不偏执，更适合需要完全控制（如加入现有代码库、实现高级路由）的场景。
- **Mintlify**：Mintlify 是文档服务（非完全开源）；Fumadocs 在 OpenAPI 集成、TypeScript 文档生成等方面更有优势。
- **Docusaurus**：基于 React 的强大框架；Fumadocs 需要更多 React 知识，但可定制性更好。

## 版本说明

Fumadocs 是 monorepo，**各子包独立发版、版本号不同**：

- `@fumadocs/asyncapi` → 0.1.1
- `fumadocs-core` / `fumadocs-ui` / `fumadocs-mdx` → 约 1.5.x
- `@fumadocs/cli` → 约 1.5.x

## 链接

- 官网文档：<https://fumadocs.dev>
- GitHub：<https://github.com/fuma-nama/fumadocs>
- 对初学者更友好的站点生成器：[Fumapress](https://press.fumadocs.dev)

## 许可证

Fumadocs 基于 MIT 许可证开源。
