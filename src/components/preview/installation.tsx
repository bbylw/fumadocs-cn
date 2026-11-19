import { asMarkdown } from 'fumadocs-core/server';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';

/** CLI installation card shown on Fumadocs UI component pages */
export function Installation({ name }: { name: string }) {
  const command = `npx @fumadocs/cli@latest add ${name}`;
  if (asMarkdown()) {
    return (
      <>
        <p>安装到你的代码库：</p>
        <pre>
          <code className="language-bash">{command}</code>
        </pre>
      </>
    );
  }

  return (
    <div className="my-4! rounded-xl border bg-fd-card p-3 text-sm text-fd-card-foreground not-prose">
      <p className="font-medium">安装到你的代码库</p>
      <p className="mt-1 mb-4 text-fd-muted-foreground">便于深度定制与完全掌控。</p>
      <CodeBlock title="Bash">
        <Pre>{command}</Pre>
      </CodeBlock>
    </div>
  );
}
