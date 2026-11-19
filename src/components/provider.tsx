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
    <RootProvider pathname={pathname} params={params} navigate={navigate} search={{ SearchDialog }}>
      <MetaColorSchemeSync />
      {children}
    </RootProvider>
  );
}
