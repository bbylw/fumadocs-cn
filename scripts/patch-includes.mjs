import OpenCC from 'opencc';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const { OpenCC: OC } = await import('opencc');
const cc = new OC('t2s.json');
const convert = (s) => new Promise((res, rej) => cc.convert(s, (e, o) => (e ? rej(e) : res(o))));
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

function gitShow(ref) {
  try { return execFileSync('git', ['show', ref], { cwd: root, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }); }
  catch { return null; }
}
function decodeEnt(s) { return s.replace(/&#x22;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'").replace(/&#91;/g, '[').replace(/&#93;/g, ']'); }
function langFor(file) { if (file.endsWith('.tsx')) return 'tsx'; if (file.endsWith('.ts')) return 'ts'; if (file.endsWith('.css')) return 'css'; return 'txt'; }

// local md -> upstream zh-TW path (for reading original includes in order)
function upstreamZh(localRel) {
  const FW = '(framework)/[framework]';
  if (/^(index|what-is-fumadocs|comparisons|manual-installation|upgrade|page-conventions|navigation|internationalization|editor)\.mdx$/.test(localRel))
    return `${FW}/${localRel.replace(/\.mdx$/, '')}.zh-TW.mdx`;
  const m = localRel.match(/^(markdown|deploying|search|guides|integrations|community)\/(.*)$/);
  if (m) return `${FW}/${localRel.replace(/\.mdx$/, '')}.zh-TW.mdx`;
  if (localRel.startsWith('ui/')) return localRel.replace(/\.mdx$/, '.zh-TW.mdx');
  if (localRel.startsWith('cli/')) return localRel.replace(/\.mdx$/, '.zh-TW.mdx');
  return localRel.replace(/\.mdx$/, '.zh-TW.mdx'); // headless/mdx direct
}

function resolveUpstream(inner, attrs) {
  inner = decodeEnt(inner.trim());
  const hasCwd = /cwd/.test(attrs);
  if (inner.startsWith('../../examples/')) return 'examples/' + inner.slice(15);
  if (hasCwd && inner.startsWith('./')) {
    let p = inner.slice(2);
    p = p.split('#')[0]; // strip anchor like #pele
    return 'apps/docs/' + p;
  }
  return null;
}

const PLACEHOLDER = '（示例代码见上游文档，当前仅作摘录。）';
let done = 0;
const files = [];(function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);if(e.isDirectory())walk(p);else if(e.name.endsWith('.mdx'))files.push(path.relative(root,p));}})(path.join(root,'content/docs'));
for (const localFile of files) {
  const abs = path.join(root, localFile);
  if (!fs.existsSync(abs)) continue;
  let text = fs.readFileSync(abs, 'utf8');
  if (!text.includes(PLACEHOLDER)) continue;
  const localRel = localFile.replace(/\\/g, '/').replace(/^content\/docs\//, '');
  const upZh = upstreamZh(localRel);
  const orig = gitShow(`upstream/dev:apps/docs/content/docs/${upZh}`);
  if (!orig) { console.log('NOORIG', localFile); continue; }
  const includes = [...orig.matchAll(/<include\b([^>]*)>([\s\S]*?)<\/include>/g)].map((m) => ({ attrs: decodeEnt(m[1]), inner: decodeEnt(m[2].trim()) }));
  // placeholders in same order; some includes were already resolved (not placeholders) - those were the sibling ones; missed ones are cwd/examples ones.
  // Pair: iterate includes, if its inner resolves to examples/cwd, it corresponds to next placeholder.
  let placeholders = text.split(PLACEHOLDER).length - 1;
  let needs = includes.filter((inc) => resolveUpstream(inc.inner, inc.attrs));
  console.log(`${localFile}: placeholders=${placeholders} needs=${needs.length}`);
  for (const inc of needs) {
    const up = resolveUpstream(inc.inner, inc.attrs);
    const content = gitShow(`upstream/dev:${up}`);
    if (!content) { console.log('  MISS FETCH', up); continue; }
    const titleM = inc.attrs.match(/title=\\?["']([^"']+)["']/);
    const title = titleM ? titleM[1] : null;
    const lang = langFor(inc.inner);
    const t = title ? ` title="${title.replace(/"/g, "'")}"` : '';
    const block = `\n\`\`\`${lang}${t}\n${content.trim()}\n\`\`\`\n`;
    const idx = text.indexOf(PLACEHOLDER);
    if (idx === -1) break;
    text = text.slice(0, idx) + block + text.slice(idx + PLACEHOLDER.length);
    done++;
    console.log('  OK ->', up);
  }
  fs.writeFileSync(abs, text, 'utf8');
}
console.log(`patched ${done} includes`);
