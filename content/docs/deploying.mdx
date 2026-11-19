---
title: 部署
---

# 部署

部署你的 Fumadocs 应用。

## 概览

你的 Fumadocs 应用由底层的 React 框架（例如 Next.js）驱动，你需要查看你的 React 框架的相关文档以获取部署指南。

- [Next.js](https://nextjs.org/docs/app/getting-started/deploying)
- [React Router](https://reactrouter.com/start/framework/deploying)
- [Tanstack Start](https://tanstack.com/start/latest/docs/framework/react/guide/hosting)
- [Waku](https://waku.gg/#deployment)

如果你想将应用作为 SPA 应用托管（完全静态，可托管在 CDN 上），参见 [静态构建](https://fumadocs.dev/docs/deploying/static)。

一些特定组合有额外的注意事项：

### Next.js + Cloudflare

使用 [https://opennext.js.org/cloudflare](https://opennext.js.org/cloudflare)，Fumadocs 在 Edge 运行时上无法工作。

### Next.js + Docker

如果你想使用 Docker 部署 Fumadocs 应用并配置了 **Fumadocs MDX**，请确保在 Dockerfile 的 `WORKDIR` 中添加 `source.config.ts` 文件和你的 `next.config.js` 文件。以下片段取自官方 [Next.js Dockerfile 示例](https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile)：

```dockerfile title="Dockerfile"
# syntax=docker.io/docker/dockerfile:1

FROM node:18-alpine AS base

RUN apk add --no-cache libc6-compat
WORKDIR /app

FROM base AS deps
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* source.config.ts next.config.* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
```

这确保了 Fumadocs MDX 在构建期间可以访问你的配置文件。
