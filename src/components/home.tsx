import { HomeLayout } from 'fumadocs-ui/layouts/home';
import {
  NavbarMenu,
  NavbarMenuContent,
  NavbarMenuLink,
  NavbarMenuTrigger,
} from 'fumadocs-ui/layouts/home/navbar';
import { DefaultNotFound } from 'fumadocs-ui/layouts/home/not-found';
import { Book, ComponentIcon, GitCompareArrows, Pencil, PlusIcon, Server } from 'lucide-react';
import { Provider, type ProviderProps } from '@/components/provider';
import { baseOptions, linkItems } from '@/lib/layout.shared';

/**
 * The React island of pages in the home layout, the content is passed as children.
 */
export function Home({ children, ...props }: ProviderProps) {
  return (
    <Provider {...props}>
      <HomeLayout {...baseOptions()}>{children}</HomeLayout>
    </Provider>
  );
}

/**
 * The full Fumadocs home layout matching upstream `apps/docs/components/layouts/home.tsx`,
 * localized in Simplified Chinese.
 */
export function SiteHomeLayout({
  className,
  children,
  ...props
}: ProviderProps & { className?: string }) {
  return (
    <Provider {...props}>
      <HomeLayout
        {...baseOptions()}
        className={className}
        links={[
          {
            type: 'menu',
            on: 'menu',
            text: '文档',
            items: [
              {
                text: '快速入门',
                url: '/docs',
                icon: <Book />,
              },
              {
                text: '组件',
                url: '/docs/ui/components',
                icon: <ComponentIcon />,
              },
              {
                text: '框架对比',
                url: '/docs/comparisons',
                icon: <GitCompareArrows />,
              },
            ],
          },
          {
            type: 'custom',
            on: 'nav',
            children: (
              <NavbarMenu>
                <NavbarMenuTrigger>文档</NavbarMenuTrigger>
                <NavbarMenuContent>
                  <NavbarMenuLink href="/docs" className="md:row-span-2">
                    <div className="-mx-3 -mt-3">
                      <img
                        src="/banner.png"
                        alt="Fumadocs 文档预览"
                        width={400}
                        height={210}
                        loading="lazy"
                        decoding="async"
                        className="w-full rounded-t-lg object-cover"
                        style={{
                          maskImage: 'linear-gradient(to bottom,white 60%,transparent)',
                        }}
                      />
                    </div>
                    <p className="font-medium">快速入门</p>
                    <p className="text-fd-muted-foreground text-sm">
                      学习如何在文档站点中使用 Fumadocs。
                    </p>
                  </NavbarMenuLink>

                  <NavbarMenuLink href="/docs/ui/components" className="lg:col-start-2">
                    <ComponentIcon className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md" />
                    <p className="font-medium">组件</p>
                    <p className="text-fd-muted-foreground text-sm">
                      为你的文档增添丰富的交互体验。
                    </p>
                  </NavbarMenuLink>

                  <NavbarMenuLink href="/docs/integrations/openapi" className="lg:col-start-2">
                    <Server className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md" />
                    <p className="font-medium">OpenAPI</p>
                    <p className="text-fd-muted-foreground text-sm">
                      为你的 OpenAPI 规范生成交互式调试台与文档。
                    </p>
                  </NavbarMenuLink>

                  <NavbarMenuLink href="/docs/markdown" className="lg:col-start-3 lg:row-start-1">
                    <Pencil className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md" />
                    <p className="font-medium">Markdown</p>
                    <p className="text-fd-muted-foreground text-sm">
                      了解 Fumadocs 的写作格式与语法扩展。
                    </p>
                  </NavbarMenuLink>

                  <NavbarMenuLink
                    href="/docs/manual-installation"
                    className="lg:col-start-3 lg:row-start-2"
                  >
                    <PlusIcon className="bg-fd-primary text-fd-primary-foreground p-1 mb-2 rounded-md" />
                    <p className="font-medium">手动安装</p>
                    <p className="text-fd-muted-foreground text-sm">
                      在现有 React / Astro 项目中集成 Fumadocs。
                    </p>
                  </NavbarMenuLink>

                  <NavbarMenuLink
                    href="/docs/comparisons"
                    className="flex-row items-center md:col-span-2 lg:col-span-3"
                  >
                    <GitCompareArrows className="bg-fd-primary text-fd-primary-foreground p-1 rounded-md" />
                    <p className="font-medium">框架对比</p>
                    <p className="text-fd-muted-foreground text-sm">
                      了解 Fumadocs 与其他文档方案的设计差异。
                    </p>
                  </NavbarMenuLink>
                </NavbarMenuContent>
              </NavbarMenu>
            ),
          },
          ...linkItems,
        ]}
      >
        {children}
      </HomeLayout>
    </Provider>
  );
}

export function NotFound(props: ProviderProps) {
  return (
    <Home {...props}>
      <DefaultNotFound />
    </Home>
  );
}
