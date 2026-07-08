---
title: 快速开始
---

# 快速开始

## 介绍

Fumadocs（读作 Foo-ma docs）是一个**文档框架**，旨在快速、灵活，并能无缝地组合进你的 React 框架中。它由多个层级组成：

### Fumadocs Core

负责大部分逻辑，包括文档搜索、内容源适配器以及 Markdown 扩展。

### Fumadocs UI

Fumadocs 的默认主题，为文档站点提供了美观的外观与交互式组件。

### 内容源（Content Source）

你的内容来源，可以是一个 CMS，也可以是像 [Fumadocs MDX](https://fumadocs.dev/docs/mdx)（官方内容源）这样的本地数据层。

### Fumadocs CLI

一个命令行工具，用于安装 UI 组件并自动化一些事情，对自定义布局很有帮助。

想了解更多？阅读我们深入的 [什么是 Fumadocs](/docs/what-is-fumadocs) 介绍。

## 术语

**Markdown / MDX：** Markdown 是一种用于创建格式化文本的标记语言。Fumadocs 原生支持 Markdown 和 MDX（Markdown 的超集）。

**[Bun](https://bun.sh)：** 一个 JavaScript 运行时，我们的指南中会使用它来运行脚本。如果你更喜欢 Node.js，可以尝试 [unrun](https://gugustinette.github.io/unrun/guide/getting-started.html#cli) 替代。

具备一些 React.js 的基础知识有助于后续的自定义。

喜欢 Fumadocs 但不熟悉 React？[Fumapress](https://press.fumadocs.dev) 是一个对初学者门槛更低的站点生成器。它强制使用自己的 React 框架，并因此提供更好的开发体验。

## 自动安装

要求 Node.js 最低版本为 22。

```bash
npm create fumadocs-app
```

它会询问你要使用的内置模板：

- **React.js 框架**：Next.js、Waku、React Router、Tanstack Start。
- **内容源**：Fumadocs MDX。

一个新的 Fumadocs 应用会被初始化，默认配置以下功能：

- [LLM 集成](https://fumadocs.dev/docs/integrations/llms)。
- [动态元数据图片](https://fumadocs.dev/docs/integrations/og)。

### 基于现有代码库？

你可以参考 [手动安装](/docs/manual-installation) 指南来开始。

## 开始享受吧！

在 docs 文件夹中创建你的第一个 MDX 文件。

```mdx
---
title: Hello World
---

## Yo what's up
```

以开发模式运行应用，访问 `http://localhost:3000/docs`。

```bash
npm run dev
```

## 常见问题

### 遇到缺少 API 或报错的 bug？

遇到问题或试用新特性时，请确保升级 Fumadocs：

```bash
pnpm update -i -r --latest
```

### 如何修改文档的基础路由？

路由由你的 React 框架处理，你需要先更改路由结构。

例如，在 Next.js 中，重命名路由（`/docs/*` → `/info/*`）：

```
app/docs/layout.tsx  →  app/info/layout.tsx
```

或者使用路由组将 `/docs/*` 重命名为 `/*`：

```
app/(docs)/layout.tsx
```

最后，更新 `source.ts` 中页面的基础 URL：

```ts
import { loader } from 'fumadocs-core/source';

export const source = loader({
  baseUrl: '/info', // 改为新的值
});
```

### 如何实现多文档？

我们推荐使用 [布局标签页（Layout Tabs）](https://fumadocs.dev/docs/ui/layouts/docs#layout-tabs)。

## 了解更多

刚到这里？别担心，我们欢迎你提出任何问题。

如果你觉得有任何令人困惑的地方，请在 [Github Discussion](https://github.com/fuma-nama/fumadocs/discussions) 上反馈！

### 写作内容

编写文档时，请务必阅读：

- [Markdown](/docs/markdown)：Fumadocs 在编写内容时的一些额外功能。
- [导航](/docs/navigation)：学习如何自定义导航结构。
- [页面 Slug 与页面树](/docs/page-conventions)：学习如何组织内容。
- [组件](https://fumadocs.dev/docs/ui/components)：查看所有可用组件以增强你的文档。

### 特殊需求

- [配置静态导出](https://fumadocs.dev/docs/deploying/static)：学习如何在文档上启用静态导出。
- [国际化](/docs/internationalization)：学习如何启用 i18n。
- [颜色主题](https://fumadocs.dev/docs/ui/theme)：为 Fumadocs UI 添加主题。
- [布局](https://fumadocs.dev/docs/ui/layouts)：自定义你的 Fumadocs UI 布局。
