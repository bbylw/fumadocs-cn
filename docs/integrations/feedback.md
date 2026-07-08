---
title: 反馈
---

# 反馈

从你的用户那里接收反馈。

## 概览

反馈对于了解读者想法、帮助你进一步改进文档内容至关重要。

你可以用 Fumadocs 集成一个简单的反馈系统。

## 安装

使用 **Fumadocs CLI** 安装。

```bash
npx @fumadocs/cli@latest add feedback
```

## 页面反馈

要创建页面级的反馈 UI，把 `<Feedback />` 组件添加到你的文档页面：

```tsx
import { DocsPage } from 'fumadocs-ui/layout/docs/page';
import { Feedback } from '@/components/feedback/client';

export default async function Page() {
  return (
    <DocsPage>
      {/* 在页面底部 */}
      <Feedback
        onSendAction={async (feedback) => {
          'use server';

          console.log(feedback);
        }}
      />
    </DocsPage>
  );
}
```

- `onSendAction`：用户提交反馈时触发。

你可以指定一个 server action，或任意函数（在客户端组件中）来处理用户反馈。例如，把用户反馈作为 `on_rate_docs` 事件上报到 PostHog。

## 区块反馈

你也可以配置区块级的反馈（例如用户选中文本时弹出反馈气泡）。

添加 `remark-block-id` Remark 插件：

```tsx title="source.config.ts (Fumadocs MDX)"
import {
  remarkBlockId,
  type RemarkBlockIdOptions,
} from 'fumadocs-core/mdx-plugins/remark-block-id';
import { defineConfig } from 'fumadocs-mdx/config';

const blockIdOptions: RemarkBlockIdOptions = {
  addDataAttribute: 'feedback',
};

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [
      // [!code ++]
      [remarkBlockId, blockIdOptions],
    ],
  },
});
```

然后，把你的页面内容包裹在 `FeedbackText` 组件下：

```tsx
import { DocsPage } from 'fumadocs-ui/layout/docs/page';
import { FeedbackText } from '@/components/feedback/client';

export default async function Page() {
  return (
    <DocsPage>
      <FeedbackText
        onSendAction={async (feedback) => {
          'use server';

          console.log(feedback);
        }}
      >
        {/* 页面内容 */}
      </FeedbackText>
    </DocsPage>
  );
}
```

- `onSendAction`：用户提交反馈时触发。

::: info 须知
`remark-block-id` 根据其内容和在页面中的顺序生成区块 ID，因此也可以从第三方服务追踪这些区块。
:::

## 与 GitHub Discussion 集成

要将反馈上报到 GitHub Discussion，你可以复制 [这份文件](https://fumadocs.dev/docs/integrations/feedback) 作为起点：

1. 创建你自己的 GitHub App，获取其 app ID 和私钥。
2. 填写所需的环境变量。
3. 替换 `owner`、`repo`、`DocsCategory` 等常量。
4. 在你的反馈组件中使用 `onPageFeedbackAction` 和 `onBlockFeedbackAction`。
