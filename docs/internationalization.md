---
title: 国际化
---

# 国际化

在你的文档中支持多种语言。

## 概览

你需要在 React 框架和 Fumadocs 上配置 i18n 路由。

Fumadocs 并不是一个功能完备的 i18n 库，国际化应用其余部分由你自己决定。你也可以将其他库与 Fumadocs 一起使用，例如在 Next.js 上使用 [next-intl](https://github.com/amannn/next-intl)。

## i18n 路由约定

你可以为 i18n 路由定义不同的风格。

```ts title="lib/i18n.ts"
import type { I18nConfig } from 'fumadocs-core/i18n';

export const i18n: I18nConfig = {
  // 默认
  parser: 'dot',
  // 或
  parser: 'dir',
};
```

### dot 风格

通过给文件名附加 `.{locale}` 来为不同语言添加 Markdown/meta 文件，例如：

```
content/docs/
├── meta.json
├── meta.cn.json
├── get-started.mdx
└── get-started.cn.mdx
```

对于默认语言环境，语言代码是可选的。

### dir 风格

所有内容文件按语言文件夹分组：

```
content/docs/
├── en/
│   ├── meta.json
│   └── get-started.mdx
└── cn/
    ├── meta.json
    └── get-started.mdx
```
