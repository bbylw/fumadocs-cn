---
title: Fumadocs CLI
---

# Fumadocs CLI

用于自动化设置并安装组件的 CLI 工具。

## 安装

为 CLI 初始化配置：

```bash
npx @fumadocs/cli
```

你可以在配置中更改组件的输出路径。

## 组件

选择并安装组件。

```bash
npx @fumadocs/cli add
```

你可以直接传入组件名称。

```bash
npx @fumadocs/cli add banner files
```

### 魔法是如何工作的？

CLI 从 Fumadocs 的 GitHub 仓库获取组件的最新版本。当你安装一个组件时，它保证是最新的。

此外，它还会转换导入路径。请务必使用最新版本的 CLI。

> 这深受 Shadcn UI 的启发。

## 自定义

一种自定义 Fumadocs 布局的简单方式。

```bash
npx @fumadocs/cli customize
```

## 文件树

为 Fumadocs UI 的 `Files` 组件生成文件树，使用你终端中的 `tree` 命令。

```bash
npx @fumadocs/cli tree ./my-dir ./output.tsx
```

你也可以输出 MDX 文件：

```bash
npx @fumadocs/cli tree ./my-dir ./output.mdx
```

查看帮助以获取更多细节：

```bash
npx @fumadocs/cli tree -h
```

### 示例输出

```tsx title="output.tsx"
import { File, Folder, Files } from 'fumadocs-ui/components/files';

export default (
  <Files>
    <Folder name="app">
      <File name="layout.tsx" />
      <File name="page.tsx" />
      <File name="global.css" />
    </Folder>
    <Folder name="components">
      <File name="button.tsx" />
      <File name="tabs.tsx" />
      <File name="dialog.tsx" />
    </Folder>
    <File name="package.json" />
  </Files>
);
```
