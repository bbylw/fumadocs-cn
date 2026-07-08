---
title: 主题
---

# 主题

为 Fumadocs UI 添加主题。

## 概览

Fumadocs UI 通过 Tailwind CSS preset 添加了自己的颜色、动画和工具类。

## 设置

仅支持 Tailwind CSS v4，该 preset 还会包含 Fumadocs UI 自身的源码：

```css title="Tailwind CSS"
@import 'tailwindcss';
@import 'fumadocs-ui/css/neutral.css';
@import 'fumadocs-ui/css/preset.css';
```

对于 **Shadcn UI**，你可以使用 `shadcn` preset 替代。Fumadocs UI 将采用你 Shadcn UI 主题中的颜色。

```css
@import 'tailwindcss';
@import 'fumadocs-ui/css/shadcn.css';
@import 'fumadocs-ui/css/preset.css';
```

详见 [颜色](#颜色)。

## Preflight 变更

通过使用 Tailwind CSS 插件或预构建样式表，你的默认边框、文本和背景颜色会被更改。

## 浅色/深色模式

Fumadocs 通过 [`next-themes`](https://github.com/pacocoursey/next-themes) 支持浅色/深色模式，它已包含在 Root Provider 中。

详见 [Root Provider](https://fumadocs.dev/docs/ui/layouts/root-provider#theme-provider)。

## RTL 布局

支持 RTL（从右到左）布局。

要启用 RTL，请在 body 和 root provider 中将 `dir` 属性设置为 `rtl`。

```tsx
import { RootProvider } from 'fumadocs-ui/provider/<framework>';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body dir="rtl">
        <RootProvider dir="rtl">{children}</RootProvider>
      </body>
    </html>
  );
}
```

## 布局宽度

通过 CSS 变量自定义文档布局的最大宽度。

```css
:root {
  --fd-layout-width: 1400px;
}
```

## 颜色

它开箱即带有许多预设，你可以挑选喜欢的那个。

```css
@import 'fumadocs-ui/css/<theme>.css';
@import 'fumadocs-ui/css/preset.css';
```

可用主题包括：`neutral`、`black`、`vitepress`、`dusk`、`catppuccin`、`ocean`、`purple`、`solar`、`emerald`、`ruby`、`aspen`。

设计系统受 [Shadcn UI](https://ui.shadcn.com) 启发，你也可以使用 [CSS/主题变量](https://tailwindcss.com/docs/theme) 自定义颜色。

```css title="global.css"
@theme {
  --color-fd-background: hsl(0, 0%, 96%);
  --color-fd-foreground: hsl(0, 0%, 3.9%);
  --color-fd-muted: hsl(0, 0%, 96.1%);
  --color-fd-muted-foreground: hsl(0, 0%, 45.1%);
  --color-fd-popover: hsl(0, 0%, 98%);
  --color-fd-popover-foreground: hsl(0, 0%, 15.1%);
  --color-fd-card: hsl(0, 0%, 94.7%);
  --color-fd-card-foreground: hsl(0, 0%, 3.9%);
  --color-fd-border: hsla(0, 0%, 80%, 50%);
  --color-fd-primary: hsl(0, 0%, 9%);
  --color-fd-primary-foreground: hsl(0, 0%, 98%);
  --color-fd-secondary: hsl(0, 0%, 93.1%);
  --color-fd-secondary-foreground: hsl(0, 0%, 9%);
  --color-fd-accent: hsla(0, 0%, 82%, 50%);
  --color-fd-accent-foreground: hsl(0, 0%, 9%);
  --color-fd-ring: hsl(0, 0%, 63.9%);
}

.dark {
  --color-fd-background: hsl(0, 0%, 7.04%);
  --color-fd-foreground: hsl(0, 0%, 92%);
  --color-fd-muted: hsl(0, 0%, 12.9%);
  --color-fd-muted-foreground: hsla(0, 0%, 70%, 0.8);
  --color-fd-popover: hsl(0, 0%, 11.6%);
  --color-fd-popover-foreground: hsl(0, 0%, 86.9%);
  --color-fd-card: hsl(0, 0%, 9.8%);
  --color-fd-card-foreground: hsl(0, 0%, 98%);
  --color-fd-border: hsla(0, 0%, 40%, 20%);
  --color-fd-primary: hsl(0, 0%, 98%);
  --color-fd-primary-foreground: hsl(0, 0%, 9%);
  --color-fd-secondary: hsl(0, 0%, 12.9%);
  --color-fd-secondary-foreground: hsl(0, 0%, 92%);
  --color-fd-accent: hsla(0, 0%, 40.9%, 30%);
  --color-fd-accent-foreground: hsl(0, 0%, 90%);
  --color-fd-ring: hsl(0, 0%, 54.9%);
}
```

## 排版

我们有一个从 [Tailwind CSS Typography](https://tailwindcss.com/docs/typography-plugin) fork 来的内置插件。

该插件添加了 `prose` 类及其变体来自定义它。

```tsx
<div className="prose">
  <h1>好的标题</h1>
</div>
```

> 该插件应该与 Fumadocs UI 的 MDX 组件一起使用，它可能与 `@tailwindcss/typography` 冲突。
>
> 如果你需要使用 `@tailwindcss/typography` 替代默认插件，[设置一个 `className` 选项](https://github.com/tailwindlabs/tailwindcss-typography/blob/main/README.md#changing-the-default-class-name) 以避免冲突。
