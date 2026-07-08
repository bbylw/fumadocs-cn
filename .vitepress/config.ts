import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Fumadocs',
  description: '一个可拆解的文档框架',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,

  themeConfig: {
    nav: [
      { text: '文档', link: '/docs/' },
      { text: '什么是 Fumadocs', link: '/docs/what-is-fumadocs' },
      { text: '对比', link: '/docs/comparisons' },
    ],

    sidebar: {
      '/docs/': [
        {
          text: '入门',
          items: [
            { text: '快速开始', link: '/docs/' },
            { text: '什么是 Fumadocs', link: '/docs/what-is-fumadocs' },
            { text: '框架对比', link: '/docs/comparisons' },
            { text: '手动安装', link: '/docs/manual-installation' },
            { text: 'Fumadocs CLI', link: '/docs/cli' },
          ],
        },
        {
          text: '写作',
          items: [
            { text: '页面 Slug 与页面树', link: '/docs/page-conventions' },
            { text: 'Markdown', link: '/docs/markdown' },
          ],
        },
        {
          text: '配置',
          items: [
            { text: '导航', link: '/docs/navigation' },
            { text: '部署', link: '/docs/deploying' },
            { text: '国际化', link: '/docs/internationalization' },
            { text: '搜索', link: '/docs/search' },
          ],
        },
        {
          text: 'UI（默认主题）',
          items: [
            { text: '概述', link: '/docs/ui/' },
            { text: '组件', link: '/docs/ui/components' },
            { text: '主题', link: '/docs/ui/theme' },
            { text: '文档布局', link: '/docs/ui/layouts-docs' },
          ],
        },
        {
          text: '集成',
          items: [
            { text: '反馈', link: '/docs/integrations/feedback' },
            { text: 'AI 与 LLM', link: '/docs/integrations/llms' },
            { text: 'OpenAPI', link: '/docs/integrations/openapi' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/fuma-nama/fumadocs' },
    ],

    footer: {
      message: '基于 VitePress 构建的 Fumadocs 中文文档',
      copyright: '翻译自 fumadocs.dev',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    outline: {
      label: '本页目录',
    },

    lastUpdatedText: '最后更新于',

    search: {
      provider: 'local',
    },
  },
})
