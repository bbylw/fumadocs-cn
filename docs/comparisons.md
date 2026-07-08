---
title: 框架对比
---

# 框架对比

Fumadocs 与其他现有框架有何不同？

## Nextra

Fumadocs 深受 Nextra 的启发。例如，路由约定。这也是为什么 Fumadocs 中也存在 `meta.json`。

Nextra 比 Fumadocs 更固执己见（opinionated），作为一个副作用，相比于简单地编辑配置文件，你不得不手动配置一些东西。

如果你希望对一切都拥有更多控制权，例如将其添加到现有代码库或实现高级路由，Fumadocs 会表现得很好。

### 特性对比表

| 特性 | Fumadocs | Nextra |
| --- | --- | --- |
| 静态生成 | 是 | 是 |
| 缓存 | 是 | 是 |
| 浅色/深色模式 | 是 | 是 |
| 语法高亮 | 是 | 是 |
| 目录（TOC） | 是 | 是 |
| 全文搜索 | 是 | 是 |
| i18n | 是 | 是 |
| 最后 Git 编辑时间 | 是 | 是 |
| 页面图标 | 是 | 是（通过 `_meta.js` 文件） |
| RSC | 是 | 是 |
| 远程源 | 是 | 是 |
| SEO | 通过 Metadata | 是 |
| 内置组件 | 是 | 是 |
| RTL 布局 | 是 | 是 |

### 额外特性

通过第三方库（如 [TypeDoc](https://typedoc.org)）支持的特性不在此列出。

| 特性 | Fumadocs | Nextra |
| --- | --- | --- |
| OpenAPI 集成 | 是 | 否 |
| TypeScript 文档生成 | 是 | 否 |
| TypeScript Twoslash | 是 | 是 |

## Mintlify

Mintlify 是一个文档服务，与 Fumadocs 相比，它提供免费套餐，但不是完全免费和开源的。

Fumadocs 不如 Mintlify 强大，例如 Mintlify 的 OpenAPI 集成。作为 Fumadocs 的创建者，如果你对当前构建文档的方式感到满意，我不建议从 Mintlify 切换到 Fumadocs。不过，我相信 Fumadocs 对所有希望拥有优雅文档的 React.js 开发者来说都是一个合适的工具。

## Docusaurus

Docusaurus 是一个基于 React.js 的强大框架。它通过插件和自定义主题提供了许多很酷的特性。

### 更低的复杂度

由于 Fumadocs 被设计为与 React 框架集成，你可能需要更多 React.js 知识才能上手。作为回报，Fumadocs 具有更好的可定制性。

对于简单的文档，如果你不需要任何框架特定的功能，Docusaurus 可能是更好的选择。

### 插件

你可以轻松通过插件实现许多功能，它们的生态系统确实更大，并由许多贡献者维护。

相比之下，Fumadocs 的灵活性允许你自己去实现它们，可能需要更长时间才能调到你满意的程度。
