import { createGetUrl } from 'fumadocs-core/source';

export const appName = 'Fumadocs';
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';

// GitHub 仓库信息（用于「在 GitHub 查看」等链接）
export const gitConfig = {
  user: 'bbylw',
  repo: 'fumadocs-cn',
  branch: 'main',
};

const getImageUrl = createGetUrl(docsImageRoute);

export function getPageImageUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'image.webp'];

  return { segments, url: getImageUrl(segments, page.locale) };
}
