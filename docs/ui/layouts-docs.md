---
title: 文档布局
---

# 文档布局

文档页面的布局，它包含一个侧边栏以及**仅移动端**的导航栏/页头。

## 用法

把你的页面树传递给该组件。

```tsx title="layout.tsx"
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout {...baseOptions()} tree={tree}>
      {children}
    </DocsLayout>
  );
}
```

详见 [`links`](https://fumadocs.dev/docs/ui/layouts/links) 和 [`nav`](https://fumadocs.dev/docs/ui/layouts/nav) 选项的详细文档。

## 侧边栏

```tsx title="layout.tsx"
import { DocsLayout } from 'fumadocs-ui/layouts/docs';

<DocsLayout
  sidebar={{
    enabled: true,
  }}
/>;
```

### 侧边栏项

自定义侧边栏导航链接。

侧边栏项由你传给 `<DocsLayout />` 的页面树渲染。

对于来自 [`loader()`](https://fumadocs.dev/docs/headless/source-api) 的页面树，它从你的文件结构生成树，参见 [可用模式](/docs/page-conventions)。

```tsx title="layout.tsx"
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { source } from '@/lib/source';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      // 其他属性
    >
      {children}
    </DocsLayout>
  );
}
```

你也可以硬编码：

```tsx title="layout.tsx"
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={{
        name: 'docs',
        children: [],
      }}
      // 其他属性
    >
      {children}
    </DocsLayout>
  );
}
```

## 布局标签页（下拉）

布局标签页是具有标签行为的文件夹，只有打开的标签页内容可见。

默认情况下，标签页触发器会显示为**下拉**组件（除非其中一项处于活动状态，否则隐藏）。

你可以通过把文件夹标记为 [根文件夹](/docs/page-conventions#root-folder) 来添加项，在文件夹中创建 `meta.json` 文件：

```json title="content/docs/my-folder/meta.json"
{
  "title": "Name of Folder",
  "description": "The description of root folder (optional)",
  "root": true
}
```

或者显式指定：

```tsx title="/app/docs/layout.tsx"
import { DocsLayout } from 'fumadocs-ui/layouts/docs';

<DocsLayout
  tabs={[
    {
      title: 'Components',
      description: 'Hello World!',
      // 对 `/docs/components` 及子路由如 `/docs/components/button` 激活
      url: '/docs/components',

      // 可选，你可以指定一组激活该项的 url
      // urls: new Set(['/docs/test', '/docs/components']),
    },
  ]}
/>;
```

设为 `false` 以禁用：

```tsx
import { DocsLayout } from 'fumadocs-ui/layouts/docs';

<DocsLayout tabs={false} />;
```

::: tip 想要进一步的自定义？
你可以给 [文档布局](/docs/ui/layouts-docs) 组件指定一个 `banner`。

```tsx
import { DocsLayout, type DocsLayoutProps } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      {...baseOptions()}
      tree={source.getPageTree()}
      sidebar={{
        // [!code ++]
        banner: <div>Hello World</div>,
      }}
    >
      {children}
    </DocsLayout>
  );
}
```
:::

### 装饰

更改布局标签页的图标/样式。

```tsx
import { DocsLayout } from 'fumadocs-ui/layouts/docs';

<DocsLayout
  tabs={{
    transform: (option, node) => ({
      ...option,
      icon: <MyIcon />,
    }),
  }}
/>;
```

## 侧边栏组件

你可以替换某些用于渲染页面树的组件。

```tsx
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { SidebarSeparator } from './layout.client';

<DocsLayout
  sidebar={{
    enabled: true,
    components: {
      Separator: SidebarSeparator,
    },
  }}
/>;
```

## 进阶

### 预取

Fumadocs 使用你的 React 框架的 `<Link />` 组件，并保留其默认的预取行为。

在 Vercel 上，预取请求可能导致无服务器函数和 Data Cache 的更高用量，也可能触及一些其他托管平台的限额。

你可以禁用预取以减少预取请求量，或显式启用：

```tsx
import { DocsLayout } from 'fumadocs-ui/layouts/docs';

<DocsLayout sidebar={{ prefetch: false }} />;
```

### 布局系统

处理布局是具有挑战性的，Fumadocs UI 需要一种：

- **可组合**：布局组件应当轻松管理自身的位置和尺寸，最好就地完成。
- **灵活**：系统应避免依赖固定值或高度，从而无缝集成外部组件（如 AI 聊天界面）。
- **内聚**：组件应响应彼此的变化，例如动画化侧边栏的折叠。
- **可预测**：布局属性应保持集中，让最终结果能从源码直接预见。
- **兼容**：解决方案应仅使用 Baseline Widely Available CSS 特性，从而在旧浏览器上工作。

Fumadocs UI 通过网格系统实现这一点：

```css
#nd-docs-layout {
  grid-template:
    'sidebar header toc'
    'sidebar toc-popover toc'
    'sidebar main toc' 1fr / minmax(var(--fd-sidebar-col), 1fr) minmax(0, var(--fd-page-col))
    minmax(min-content, 1fr);

  --fd-docs-row-1: var(--fd-banner-height, 0px);
  --fd-docs-row-2: calc(var(--fd-docs-row-1) + var(--fd-header-height));
  --fd-docs-row-3: calc(var(--fd-docs-row-2) + var(--fd-toc-popover-height));
  --fd-sidebar-col: var(--fd-sidebar-width);
  --fd-page-col: calc(
    var(--fd-layout-width, 97rem) - var(--fd-sidebar-width) - var(--fd-toc-width)
  );
  --fd-sidebar-width: 0px;
  --fd-toc-width: 0px;

  --fd-header-height: 0px;
  --fd-toc-popover-height: 0px;
}
```

- 布局容器使用 grid 布局，`grid-template` 被设置为产生可预测的结果。
- `--fd-docs-row-*` 定义了每行的顶部偏移，允许 `position: sticky` 的元素挂钩正确的顶部偏移。
- `--fd-*-width` 和 `--fd-*-height` 由布局组件通过 CSS 设置，它们对维护网格结构或计算 `--fd-docs-row-*` 至关重要。
- `--fd-*-col` 是动态值，随状态变化而更新（例如侧边栏折叠时 `--fd-sidebar-col` 变为 `0px`）。

默认布局和笔记本（notebook）布局都使用了这个系统。
