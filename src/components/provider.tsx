import { navigate } from 'astro:transitions/client';
import { useEffect, type ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider/astro';
import { useTheme } from 'fumadocs-ui/provider/base';
import SearchDialog from '@/components/search';

export interface ProviderProps {
  /** `Astro.url.pathname` */
  pathname: string;
  /** `Astro.params` */
  params: Record<string, string | undefined>;
  children?: ReactNode;
}

const zhTranslations: Record<string, string> = {
  displayName: '简体中文',
  'Search(search dialog)': '搜索文档…',
  'Search(search trigger)': '搜索',
  'Open Search(search trigger)(aria-label)': '打开搜索',
  'Close Search(search dialog)(aria-label)': '关闭搜索',
  'No results found(search dialog)': '未找到相关结果',
  'Search failed(search dialog)': '搜索请求失败',
  'Search failed, showing results for {query}(search dialog)': '搜索失败，正在显示 “{query}” 的结果',
  'On this page(table of contents)': '本页目录',
  'Table of Contents(inline table of contents)': '目录',
  'No Headings(table of contents)': '无标题目录',
  'Last updated on(page footer)': '最后更新于',
  'Previous Page(pagination)': '上一页',
  'Next Page(pagination)': '下一页',
  'Edit on GitHub(edit page)': '在 GitHub 上编辑',
  'Copy Markdown(page actions)': '复制 Markdown',
  'Copied Markdown(page actions)': '已复制 Markdown',
  'Open(page actions)': '打开方式',
  'View as Markdown(page actions)': '查看 Markdown 原文',
  'Open in GitHub(page actions)': '在 GitHub 中打开',
  'Open in ChatGPT(page actions)': '在 ChatGPT 中打开',
  'Open in Claude(page actions)': '在 Claude 中打开',
  'Open in Cursor(page actions)': '在 Cursor 中打开',
  'Open in Scira AI(page actions)': '在 Scira AI 中打开',
  'Read {url}, I want to ask questions about it.(page actions)': '请阅读 {url}，我想就其中内容提问。',
  'Ask AI(AI chat button)': '询问 AI',
  'Prop(type table)': '属性',
  'Type(type table)': '类型',
  'Default(type table)': '默认值',
  'Parameters(type table)': '参数',
  'Returns(type table)': '返回值',
  'Collapse Sidebar(sidebar)(aria-label)': '收起侧边栏',
  'Show Sidebar(sidebar)': '展开侧边栏',
  'Hide Sidebar(sidebar)': '隐藏侧边栏',
  'Open Sidebar(sidebar)(aria-label)': '打开侧边栏',
  'Close Sidebar(sidebar)(aria-label)': '关闭侧边栏',
  'Close Sidebar(aria-label)': '关闭侧边栏',
  'Layout Tab(layout tab trigger)': '切换文档分类',
  'Toggle Theme(theme switcher)(aria-label)': '切换主题',
  'Light(theme switcher)(aria-label)': '浅色模式',
  'Dark(theme switcher)(aria-label)': '深色模式',
  'System(theme switcher)(aria-label)': '跟随系统',
  'Choose a language(language switcher)': '选择语言',
  'Choose a language(language switcher)(aria-label)': '选择语言',
  'Toggle Menu(mobile menu)(aria-label)': '切换菜单',
  'Skip to Content(skip link)': '跳至正文内容',
  'Copy Text(code block)(aria-label)': '复制代码',
  'Copied Text(code block)(aria-label)': '已复制代码',
  'Copy Anchor Link(heading anchor)(aria-label)': '复制章节链接',
  'Copied Anchor Link(heading anchor)(aria-label)': '已复制章节链接',
  'Copy Link(accordion)(aria-label)': '复制链接',
  'Copied Link(accordion)(aria-label)': '已复制链接',
  'Close Banner(banner)(aria-label)': '关闭公告',
  'Image Viewer(image zoom)(aria-label)': '图片预览',
  'Close(image zoom)(aria-label)': '关闭预览',
  'Previous Image(image zoom)(aria-label)': '上一张图片',
  'Next Image(image zoom)(aria-label)': '下一张图片',
  'Page Not Found(404 page)': '页面未找到',
  'Back to Home(404 page)': '返回首页',
  'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.(404 page)':
    '你访问的页面可能已被移除、重命名或暂时不可用。',
};

function MetaColorSchemeSync() {
  const { theme } = useTheme();
  useEffect(() => {
    const meta = document.querySelector('meta[name="color-scheme"]');
    if (!meta) return;
    meta.setAttribute(
      'content',
      theme === 'dark' ? 'dark' : theme === 'light' ? 'light' : 'light dark',
    );
  }, [theme]);
  return null;
}

export function Provider({ pathname, params, children }: ProviderProps) {
  return (
    <RootProvider
      pathname={pathname}
      params={params}
      navigate={navigate}
      search={{ SearchDialog }}
      i18n={{ locale: 'zh-CN', translations: zhTranslations }}
    >
      <MetaColorSchemeSync />
      {children}
    </RootProvider>
  );
}
