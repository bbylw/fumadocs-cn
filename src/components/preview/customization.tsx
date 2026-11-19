import { asMarkdown } from 'fumadocs-core/server';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';

const command = 'npx @fumadocs/cli@latest customize';

/** CLI layout customization callout shown on Fumadocs UI layout pages */
export function Customization() {
  if (asMarkdown()) {
    return (
      <>
        <p>当内置选项无法满足进阶定制需求时，可通过 Fumadocs CLI 将布局源码安装到本地：</p>
        <pre>
          <code className="language-bash">{command}</code>
        </pre>
      </>
    );
  }

  return (
    <div className="my-4 flex flex-col gap-2 rounded-xl border bg-fd-card p-3 text-fd-card-foreground not-prose">
      <p className="text-sm font-medium">通过 Fumadocs CLI 安装</p>
      <p className="text-sm text-fd-muted-foreground">当内置选项无法满足进阶定制需求时使用。</p>
      <CodeBlock title="Bash">
        <Pre>{command}</Pre>
      </CodeBlock>
    </div>
  );
}
