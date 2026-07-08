---
title: Markdown
---

# Markdown

如何编写文档。

## 介绍

Fumadocs 为 MDX（一种标记语言）提供了许多实用的扩展。下面是 Fumadocs 默认 MDX 语法的简要介绍。

> MDX 并不是 Fumadocs 唯一支持的格式。事实上，你可以使用任何渲染器，例如无头 CMS。详见 [自定义内容源](https://fumadocs.dev/docs/integrations/content/custom)。

## MDX

我们推荐使用 MDX，它是 Markdown 的超集，带有 JSX 语法。它允许你导入组件，在文档中使用它们，甚至可以编写 JavaScript。

- [MDX 语法](https://mdxjs.com/docs/what-is-mdx/#mdx-syntax)。
- GFM（GitHub Flavored Markdown）同样受支持，参见 [GFM 规范](https://github.github.com/gfm)。

```mdx
import { Component } from './component';

<Component name="Hello" />

## 标题

Hello World, **加粗**, _斜体_, ~~删除线~~

1. 第一
2. 第二
3. 第三

- 项目 1
- 项目 2

> 引用内容

![alt](/image.png)

| 表格 | 描述 |
| --- | --- |
| Hello | World |
```

## Frontmatter

Fumadocs 默认支持基于 YAML 的 frontmatter，`title` 代表 Fumadocs UI 中的页面标题（`h1`）。

```mdx
---
title: This is a document
---

...
```

因此，在编写 Markdown/MDX 时通常不会使用 `h1` 标题（`# 标题`），除非你对页面标题渲染有自定义逻辑。

## 自动链接

内部链接使用你 React 框架的 `<Link />` 组件（例如 `next/link`），以允许预取并避免硬刷新。

外部链接会获得默认的 `rel="noreferrer noopener" target="_blank"` 属性以确保安全。

```mdx
[我的链接](https://github.github.com/gfm)

这样也行：https://github.github.com/gfm。
```

## 卡片（Cards）

用于添加链接。

```mdx
import { HomeIcon } from 'lucide-react';

<Cards>
  <Card
    href="https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating"
    title="Fetching, Caching, and Revalidating"
  >
    了解 Next.js 中的缓存
  </Card>
  <Card title="href 是可选的">了解 Next.js 中的 `fetch`。</Card>
  <Card icon={<HomeIcon />} href="/" title="Home">
    你也可以包含图标。
  </Card>
</Cards>
```

## 标注（Callouts）

用于添加提示/警告，默认包含在内。你可以指定标注的类型：

- `info`（默认）
- `warn`/`warning`
- `error`
- `success`
- `idea`

```mdx
<Callout>Hello World</Callout>

<Callout title="标题" type="warn">
  Hello World
</Callout>
```

## 标题（Headings）

每个标题都会自动应用锚点，它会清理空格等无效字符（例如 `Hello World` 变为 `hello-world`）。

```md
# Hello `World`
```

### TOC 设置

目录（TOC）会根据标题生成，你也可以自定义标题的效果：

```md
# Heading [!toc]

此标题将从 TOC 中隐藏。

# Another Heading [toc]

此标题将**仅**在 TOC 中可见，你可以用它来添加额外的 TOC 项。
```

### 自定义锚点

你可以添加 `[#slug]` 来自定义标题锚点。

```md
# heading [#my-heading-id]
```

要链接到特定标题，请将标题 id 添加到哈希片段：`/page#my-heading-id`。

## 代码块

默认使用 [Rehype Code](https://fumadocs.dev/docs/headless/mdx/rehype-code) 支持语法高亮。

````mdx
```js
console.log('Hello World');
```

```js title="My Title"
console.log('Hello World');
```
````

### 行号

显示行号：

````mdx
```ts twoslash lineNumbers
const a = 'Hello World';
//    ^?
console.log(a); // [!code highlight]
```
````

你也可以设置行号的初始值：

````mdx
```js lineNumbers=4
function main() {
  console.log('starts from 4');

  return 0;
}
```
````

### Shiki 转换器

我们支持部分 [Shiki 转换器](https://shiki.style/packages/transformers)，允许你高亮/样式化特定行。

````md
```tsx
// 高亮一行
<div>Hello World</div> // [!code highlight]

// 高亮一个词
// [!code word:Fumadocs]
<div>Fumadocs</div>

// diff 样式
console.log('hewwo'); // [!code --]
console.log('hello'); // [!code ++]

// 聚焦
return new ResizeObserver(() => {}) // [!code focus]
```
````

## 标签页组（Tab Groups）

````mdx
```ts tab="Tab 1"
console.log('A');
```

```ts tab="Tab 2"
console.log('B');
```
````

要在第一个代码块中定义持久 ID，请在第一个代码块添加 `tab-group`：

````mdx
```ts tab="Tab 1" tab-group="my-custom-group"
console.log('A');
```

```ts tab="Tab 2"
console.log('B');
```
````

## 包含（Include）

> 此功能仅在 **Fumadocs MDX** 中可用。

引用另一个文件（也可以是 Markdown/MDX 文档）。在 `<include>` 标签中指定目标文件路径（相对于 MDX 文件本身）。

```mdx title="page.mdx"
<include>./another.mdx</include>
```

## NPM 命令

用于生成不同包管理器的安装命令。

````md
```npm
npm i next -D
```
````

详见 [`remark-npm`](https://fumadocs.dev/docs/headless/mdx/remark-npm)。

## 步骤（Steps）

用于标记指南中的步骤，详见 [`remark-steps`](https://fumadocs.dev/docs/headless/mdx/remark-steps) 以启用和配置。

```md
### Installation [step]

### Write Code [step]

### Deploy [step]
```

## 其他组件

你可以在 MDX 文档中配置并使用[内置组件](https://fumadocs.dev/docs/ui/components)，例如 Tabs、Accordions 和可缩放图片。
