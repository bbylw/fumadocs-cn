---
title: 页面 Slug 与页面树
---

# 页面 Slug 与页面树

用于组织文档的通用约定。

> 本指南仅适用于使用 `loader()` API 的内容源，例如 **Fumadocs MDX**。

## 概览

Fumadocs 通过 [`loader()`](https://fumadocs.dev/docs/headless/source-api)，从你的内容目录生成**页面 slug** 和**页面树**（侧边栏项），路由功能由你的 React 框架处理。

你可以像基于文件系统的路由一样定义文件夹和页面。

```
content/docs (内容目录)
├── index.mdx
└── getting-started.mdx
```

要进一步自定义输出，可以使用 [Loader 插件](https://fumadocs.dev/docs/headless/source-api/plugins)。

## 文件

对于 [MDX](https://mdxjs.com) 和 Markdown 文件，你可以从 frontmatter 自定义页面信息。

```mdx
---
title: My Page
description: Best document ever
icon: HomeIcon
---

## Learn More
```

Fumadocs 通过以下属性来构建页面树：

| 名称 | 描述 |
| --- | --- |
| `title` | 页面标题 |
| `description` | 页面描述 |
| `icon` | 图标名称，参见 [图标](#图标) |

## Slug

页面的 slug 由其文件路径生成。

| 路径（相对于内容目录） | slug |
| --- | --- |
| `./dir/page.mdx` | `['dir', 'page']` |
| `./dir/index.mdx` | `['dir']` |

### 文件夹组

默认情况下，将文件放入文件夹会改变其 slug。你可以用括号包裹文件夹名称，以避免影响子文件的 slug。

| 路径（相对于内容目录） | slug |
| --- | --- |
| `./(group-name)/page.mdx` | `['page']` |

### 根文件夹

将文件夹标记为根文件夹，只有打开的根文件夹中的项才会可见。

```json title="meta.json"
{
  "title": "Name of Folder",
  "description": "The description of root folder (optional)",
  "root": true
}
```

例如，当你打开根文件夹 `framework` 时，其他文件夹（如 `headless`）不会显示在侧边栏和其他导航元素中。

## Meta

通过在文件夹中创建 `meta.json` 文件来自定义文件夹。

```json title="meta.json"
{
  "title": "Display Name",
  "icon": "MyIcon",
  "pages": ["index", "getting-started"],
  "defaultOpen": true
}
```

| 名称 | 描述 |
| --- | --- |
| `title` | 显示名称 |
| `icon` | 图标名称，参见 [图标](#图标) |
| `defaultOpen` | 默认展开文件夹 |
| `collapsible` | 文件夹内容是否可折叠（默认：`true`） |
| `pages` | 文件夹项（见下文） |
| `pagesIndex` | 索引项（见下文） |

### 页面顺序

文件夹项默认按字母顺序排序，你可以使用 `pages` 添加或控制项的顺序。

```json title="meta.json"
{
  "pages": ["index", "getting-started"]
}
```

> 指定后，未列出的项将不会包含进来。

| 类型 | 语法 | 描述 |
| --- | --- | --- |
| **路径** | `./path/to/page` | 指向页面或文件夹的路径。 |
| **分隔符** | `---Label---`<br />`---[Icon]Label---` | 两个区块之间的分隔符（支持图标）。 |
| **链接** | `[Text](url)`<br />`[Icon][Text](url)`<br />`external:[Text](url)` | 插入链接（支持图标）；添加 `external:` 前缀将链接标记为外部。 |
| **其余** | `...` | 包含剩余页面（按字母排序）。 |
| **倒序其余** | `z...a` | 倒序的**其余**项。 |
| **提取** | `...folder` | 从文件夹中提取项。 |
| **排除** | `!item` | 从 `...` 或 `z...a` 中排除某项。 |

```json title="meta.json"
{
  "pages": [
    "components",
    "---My Separator---",
    "...folder",
    "...",
    "!file",
    "!otherFolder",
    "[Vercel](https://vercel.com)",
    "[Triangle][Vercel](https://vercel.com)"
  ]
}
```

::: warning 不要有重复 URL
同一页面 URL 在整个页面树中绝不能出现多次。出于同样的原因，不允许重复的页面项。

这是有意为之的，这样 Fumadocs 才能纯粹基于当前路径名定位活动树项。
:::

## 图标

由于 Fumadocs 不包含图标库，你必须在运行时将图标名称转换为 JSX 元素，并作为组件渲染。

你可以向 `loader()` 添加一个 [`icon` 处理器](https://fumadocs.dev/docs/headless/source-api#icons)。
