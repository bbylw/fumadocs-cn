import { type Framework, frameworks } from '@/lib/framework';

export const staticParams = frameworks.map((item) => ({ framework: item.value }));

export default ({ framework }: { framework: Framework }) => ({
  title: frameworks.find((item) => item.value === framework)?.name,
  icon: framework,
  root: 'framework',
  pages: [
    '---简介---',
    'index',
    'what-is-fumadocs',
    'comparisons',
    'manual-installation',
    'upgrade',
    'guides',
    '---编写---',
    'page-conventions',
    'markdown',
    '---配置---',
    'navigation',
    'deploying',
    'internationalization',
    'search',
    '---集成---',
    'editor',
    '...integrations',
    'community',
  ],
});
