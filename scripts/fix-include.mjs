import OpenCC from 'opencc';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const { OpenCC: OC } = await import('opencc');
const cc = new OC('t2s.json');
const convert = (s) => new Promise((res, rej) => cc.convert(s, (e, o) => (e ? rej(e) : res(o))));
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const DOCS = path.join(root, 'content/docs');

function gitShow(ref) {
  try { return execFileSync('git', ['show', ref], { cwd: root, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }); }
  catch { return null; }
}
function decodeEnt(s) {
  return s.replace(/&#x22;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'").replace(/&#91;/g, '[').replace(/&#93;/g, ']');
}
function langFor(file) {
  if (file.endsWith('.tsx')) return 'tsx';
  if (file.endsWith('.ts')) return 'ts';
  if (file.endsWith('.mdx')) return 'mdx';
  if (file.endsWith('.md')) return 'md';
  if (file.endsWith('.css')) return 'css';
  return 'txt';
}
// local mdx dir -> upstream dir (without trailing slash)
function upstreamDirFor(localFile) {
  const rel = path.relative(DOCS, localFile).replace(/\\/g, '/'); // e.g. search/algolia.mdx
  const dir = path.posix.dirname(rel);
  const FW_PREFIXES = ['search/','markdown/','deploying/','guides/','integrations/','community/'];
  const FW_FILES = ['index.mdx','what-is-fumadocs.mdx','comparisons.mdx','manual-installation.mdx','upgrade.mdx','page-conventions.mdx','navigation.mdx','internationalization.mdx','editor.mdx'];
  if (FW_FILES.includes(path.posix.basename(rel)) || FW_PREFIXES.some((p) => dir === p.replace(/\/$/,'') || dir.startsWith(p)))
    return '(framework)/[framework]/' + (dir === '.' ? '' : dir);
  if (dir.startsWith('ui/') || dir === 'ui') return 'ui/' + (dir === 'ui' ? '' : dir.slice(3));
  if (dir.startsWith('cli/') || dir === 'cli') return 'cli/' + (dir === 'cli' ? '' : dir.slice(4));
  return dir === '.' ? '' : dir; // headless/, mdx/, etc. map directly
}

let resolved = 0, missed = 0;
function fixFile(file) {
  let text = fs.readFileSync(file, 'utf8');
  const parts = text.split(/(```[\s\S]*?(?:```|$))/g);
  let changed = false;
  for (let i = 0; i < parts.length; i += 2) {
    let seg = parts[i];
    // replace live includes (paired form)
    seg = seg.replace(/<include\b([^>]*)>([\s\S]*?)<\/include>/g, (m, attrs, innerRaw) => {
      const inner = decodeEnt(innerRaw.trim());
      const attrsD = decodeEnt(attrs);
      const titleM = attrsD.match(/title=\\?["']([^"']+)["']/);
      const title = titleM ? titleM[1] : null;
      // special-case: headless page-conventions include -> link
      if (inner.includes('headless/page-conventions')) {
        resolved++; return '\n\n查看 [无头文档的页面约定](/docs/headless/page-conventions)。\n\n';
      }
      let upstream = null;
      if (inner.startsWith('../../examples/')) {
        upstream = inner.slice(3); // -> examples/...
      } else if (inner.startsWith('./') || inner.startsWith('../') || inner.startsWith('.') || !inner.includes('/')) {
        const ud = upstreamDirFor(file);
        const base = path.posix.basename(inner);
        upstream = `apps/docs/content/docs/${ud ? ud + '/' : ''}${base}`;
        // .shared/.tag-filter are .zh-TW.mdx in upstream; for code files names match
        // if inner is like ./algolia.tsx, base is algolia.tsx (exists)
      }
      // try upstream fetch
      let content = null;
      if (upstream) {
        if (upstream.startsWith('apps/docs/')) content = gitShow(`upstream/dev:${upstream}`);
        else content = gitShow(`upstream/dev:${upstream}`);
      }
      // fallback: try upstream docs path directly
      if (!content && upstream && !upstream.startsWith('apps/')) {
        content = gitShow(`upstream/dev:apps/docs/content/docs/${upstream}`);
      }
      if (!content) { missed++; console.log('MISS', path.relative(root, file), '->', inner, '(tried', upstream + ')'); return '\n\n（示例代码见上游文档，当前仅作摘录。）\n\n'; }
      resolved++;
      if (inner.endsWith('.mdx')) {
        return `\n\n${content.trim()}\n\n`;
      }
      const lang = langFor(inner);
      const t = title ? ` title="${title.replace(/"/g, "'")}"` : '';
      return `\n\n\`\`\`${lang}${t}\n${content.trim()}\n\`\`\`\n\n`;
    });
    // self-closing includes
    seg = seg.replace(/<include\b[^>]*\/>/g, '\n\n（示例代码见上游文档。）\n\n');
    if (seg !== parts[i]) { parts[i] = seg; changed = true; }
  }
  if (changed) fs.writeFileSync(file, parts.join(''), 'utf8');
  return changed;
}

let files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.mdx')) files.push(p);
  }
})(DOCS);
for (const f of files) fixFile(f);
console.log(`includes: resolved=${resolved} missed=${missed}`);

// convert inlined .mdx fragments (shared) t2s already? They were inserted raw zh-TW; convert them now:
let convFixed = 0;
for (const f of files) {
  const t = fs.readFileSync(f, 'utf8');
  const parts = t.split(/(```[\s\S]*?(?:```|$))/g);
  let ch = false;
  for (let i = 0; i < parts.length; i += 2) {
    // only convert if contains traditional-only chars? Just convert whole outside-fence (safe, simplified -> simplified identity)
    const converted = (await convert(parts[i]));
    if (converted !== parts[i]) { parts[i] = converted; ch = true; }
  }
  if (ch) { fs.writeFileSync(f, parts.join(''), 'utf8'); convFixed++; }
}
console.log(`t2s re-converted: ${convFixed} files`);
