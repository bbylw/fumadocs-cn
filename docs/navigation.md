---
title: 导航
---

# 导航

在你的 Fumadocs 应用中配置导航。

## 概览

**Fumadocs UI** 提供了不同的布局来展示内容，你可以通过布局指定导航配置。

- **布局链接（Layout Links）**：在布局中显示**导航链接**。对于链接到常用资源（如展示页和定价页）很有用。
- **侧边栏项（Sidebar Items）**：侧边栏渲染到所有文档页面的链接。在底层，**页面树（Page Tree）** 用于表示导航结构。

## 版本控制（Versioning）

开发者工具相关文档对文档进行版本控制很常见，例如同一工具的不同文档（v1 和 v2）。

你可以使用 Fumadocs 提供的原语，以你喜欢的方式在文档中实现多版本。

### 部分版本控制

当版本控制仅适用于你文档的一部分时，你可以通过文件夹将它们分开。

例如：

```
java-sdk/
├── v1/
│   └── getting-started.mdx
└── v2/
    └── getting-started.mdx
```

::: tip 须知
使用文件夹分组时，你可以通过 [布局标签页](https://fumadocs.dev/docs/ui/layouts/docs#layout-tabs) 将它们显示为标签页。
:::

### 完整版本控制

有时你想对整个站点进行版本控制，例如 [https://v14.fumadocs.dev](https://v14.fumadocs.dev)（Fumadocs v14）和 [https://fumadocs.dev](https://fumadocs.dev)（最新 Fumadocs）。

你可以为某个版本的文档创建一个 Git 分支（例如叫 `v2`），并将其作为独立应用部署在另一个子域名上，如 `v2.my-site.com`。

你可以选择从你的文档链接到其他版本。与部分版本控制相比，这种设计有一些优势：

- 易于维护：当你迭代或升级依赖时，旧的文档/分支不会受影响。
- 更好的一致性：不仅是文档本身，你的着陆页（和其他页面）也会被版本化。
