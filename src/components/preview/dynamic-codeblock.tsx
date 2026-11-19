'use client';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { useState } from 'react';
import { bundledLanguages } from 'shiki';

/** Interactive DynamicCodeBlock preview allowing language and source editing */
export default function Example() {
  const [lang, setLang] = useState('js');
  const [code, setCode] = useState('console.log("这是一个预渲染的代码块示例")');

  return (
    <div className="prose flex flex-col gap-4 rounded-lg bg-fd-background p-4">
      <div className="not-prose flex flex-col rounded-lg bg-fd-secondary text-fd-secondary-foreground">
        <select
          aria-label="选择代码语言"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="w-fit bg-transparent px-4 py-2 text-sm focus-visible:outline-none"
        >
          {Object.keys(bundledLanguages).map((item) => (
            <option value={item} key={item} className="bg-fd-card text-fd-card-foreground">
              {item}
            </option>
          ))}
        </select>
        <textarea
          aria-label="输入示例代码"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="bg-transparent px-4 py-2 text-sm focus-visible:outline-none"
        />
      </div>
      <DynamicCodeBlock
        lang={lang}
        code={code}
        options={{
          themes: {
            light: 'catppuccin-latte',
            dark: 'catppuccin-mocha',
          },
        }}
      />
    </div>
  );
}
