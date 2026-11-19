---
title: OpenAPI
---

# OpenAPI

为 OpenAPI schema 生成文档。

## 设置

安装所需的包。

```bash
npm i fumadocs-openapi shiki
```

## 生成样式

添加以下一行：

```css title="Tailwind CSS"
@import 'tailwindcss';
@import 'fumadocs-ui/css/neutral.css';
@import 'fumadocs-ui/css/preset.css';
/* [!code ++] */
@import 'fumadocs-openapi/css/preset.css';
```

## 配置插件

创建 OpenAPI 服务端实例与 `<OpenAPIPage />` 组件。

```ts title="lib/openapi.ts"
import { createOpenAPI } from 'fumadocs-openapi/server';

// 注意：这是一个服务端 API
export const openapi = createOpenAPI({
  // OpenAPI schema，你也可以给它一个外部 URL
  input: ['./openapi.json'],
});
```

```tsx title="components/api-page.tsx"
'use client';
import { createOpenAPIPage } from 'fumadocs-openapi/ui';

export const OpenAPIPage = createOpenAPIPage();
```

```ts title="lib/source.ts"
import { openapiPlugin } from 'fumadocs-openapi/server';
import { loader } from 'fumadocs-core/source';

export const source = loader({
  // [!code ++] 可选：为页面树中的每一项添加徽章
  plugins: [openapiPlugin()],
});
```

详见 [`createOpenAPI()`](https://fumadocs.dev/docs/integrations/openapi/server) 与 [`createOpenAPIPage()`](https://fumadocs.dev/docs/integrations/openapi/api-page) 的可用选项。

## 生成页面

### MDX 文件

你可以直接从 OpenAPI schema 生成 MDX 文件。

创建脚本：

```js title="scripts/generate-docs.ts"
import { generateFiles } from 'fumadocs-openapi';
import { openapi } from '@/lib/openapi';

void generateFiles({
  input: openapi,
  output: './content/docs',
  // 我们建议启用它
  // 确保你的端点描述不会破坏 MDX 语法
  includeDescription: true,
});
```

通过脚本生成文档：

```bash
bun ./scripts/generate-docs.ts
```

把 `OpenAPIPage` 组件添加到你的 MDX 组件中。

```tsx title="app/docs/[[...slug]]/page.tsx"
import { source } from '@/lib/source';
import { openapi } from '@/lib/openapi';
import { OpenAPIPage } from '@/components/api-page';
import { getMDXComponents } from '@/components/mdx';

export default function Page({ slug }) {
  const page = source.getPage(slug);
  const MdxContent = page.data.body;

  return (
    <MdxContent
      components={getMDXComponents({
        // [!code ++:3] 添加 MDX 组件
        OpenAPIPage: async (props) => (
          <OpenAPIPage {...await openapi.preloadOpenAPIPage(page)} {...props} />
        ),
      })}
    />
  );
}
```

### 虚拟文件

你也可以通过集成到 [Loader API](https://fumadocs.dev/docs/headless/source-api/source) 来在不生成真实文件的情况下使用它。

```ts title="lib/source.ts"
import { loader } from 'fumadocs-core/source';
import { docs } from 'collections/server';
import { openapi } from '@/lib/openapi';

export const source = loader(
  // [!code ++:6]
  {
    docs: docs.toFumadocsSource(),
    openapi: await openapi.staticSource({
      baseDir: 'openapi',
    }),
  },
  {
    baseUrl: '/docs',
    plugins: [openapi.loaderPlugin()],
    // ...
  },
);
```

`staticSource()` 是一个服务端 API，它直接把页面生成到你的 `loader()` 中，因此允许动态内容生成，例如随着 schema 变化重新生成页面树。

**它会改变你页面的类型**，请确保更新所有对 `source` 的引用。

## 特性

官方的 OpenAPI 集成支持：

- 基本的 API 端点信息
- 交互式 API playground
- 发送请求的示例代码（不同编程语言）
- 响应示例和 TypeScript 定义
- 由 schema 生成的请求参数和请求体

## 演示

查看 [演示](https://fumadocs.dev/docs/openapi)。
