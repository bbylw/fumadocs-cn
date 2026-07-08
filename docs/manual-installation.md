---
title: 手动安装
---

# 手动安装

> 本页为方便从现有代码库集成的概述性翻译，详细步骤请参考官方 [Manual Installation](https://fumadocs.dev/docs/manual-installation) 指南。

如果你是从现有的 React 框架（如 Next.js）代码库开始，需要使用手动安装方式将 Fumadocs 集成进去。

## 步骤概览

1. 安装核心依赖：
   ```bash
   npm i fumadocs-core fumadocs-ui fumadocs-mdx
   ```

2. 配置内容源（Fumadocs MDX）的 `source.config.ts`。

3. 在 `lib/source.ts` 中使用 `loader()` 创建内容源。

4. 在布局组件中引入 Fumadocs UI 的 `RootProvider` 与默认样式。

5. 创建 catch-all 路由来渲染文档页面。

由于手动安装涉及大量框架特定的文件结构（Next.js App Router、React Router 等），强烈建议参考官方文档获取与你框架匹配的最新代码。本中文站聚焦于概念性说明，具体代码以官方英文文档为准。
