import OpenCC from 'opencc';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const { OpenCC: OC } = await import('opencc');
const cc = new OC('t2s.json');
const convert = (s) => new Promise((res, rej) => cc.convert(s, (e, o) => (e ? rej(e) : res(o))));
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const UP = 'upstream/dev:apps/docs/content/docs';

function gitShow(upPath) {
  try { return execFileSync('git', ['show', `${UP}/${upPath}`], { cwd: root, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }); }
  catch { return null; }
}

const MAP = [
  ['(framework)/[framework]/integrations/og/next.zh-TW.mdx', 'content/docs/integrations/og/next.mdx'],
  ['(framework)/[framework]/integrations/og/takumi.zh-TW.mdx', 'content/docs/integrations/og/takumi.mdx'],
  ['ui/layouts/spacious.zh-TW.mdx', 'content/docs/ui/layouts/spacious.mdx'],
];

function splitFences(text) { return text.split(/(```[\s\S]*?(?:```|$))/g); }
const KEEP_TAGS = new Set(['Callout','Cards','Card','Tabs','Tab','Steps','Step','Accordion','Accordions','Files','File','Folder','Banner','TypeTable','AutoTypeTable','ImageZoom','InlineTOC','DevClient']);
function cleanBody(body) {
  body = body.replace(/<show when=\{([^}]+)\}>([\s\S]*?)<\/show>/g, (m, cond, inner) => {
    const hasAstroEq = /'astro'\s*===/.test(cond) || /"astro"\s*===/.test(cond);
    const hasAstroNe = /'astro'\s*!==/.test(cond) || /"astro"\s*!==/.test(cond);
    if (hasAstroEq && !hasAstroNe) return `\n${inner.trim()}\n`;
    return '';
  });
  body = body.replace(/<[A-Z][A-Za-z0-9_.]*\b[^>]*\/>/g, (m) => {
    const tag = m.match(/<([A-Z][A-Za-z0-9_.]*)/)[1];
    return KEEP_TAGS.has(tag) ? m : '';
  });
  const UNKNOWN = ['DocsCategory','Installation','FrameworkLogo','Wrapper','RootProvider','Customization','OperationProvider','TOCStyle','DevClient','SchemaUIProvider','StoryProvider','AsyncAPIProvider','AsyncAPIPage','OpenAPIPage','GraphQLPage','GraphQLProvider','Feedback','FeedbackText','OperationPlayground','SchemaUI','Lightbox','SearchDialog','Link','Mermaid','SanityLive','AsyntaiChatbot','PrivatusAnalyticsTag','AgentInstructions','DocsLayout','Steps'];
  for (const tag of UNKNOWN) {
    const re = new RegExp(`</?${tag}(?:\\s[^>]*)?>`, 'g');
    body = body.replace(re, '');
  }
  return body;
}
function stripTopImports(body) {
  return body.split('\n').filter((line) => {
    const t = line.trimStart();
    if (/^import\s+/.test(t) && /from\s+['"]/.test(t)) return false;
    if (/^export\s+const\s+frontmatter/.test(t)) return false;
    return true;
  }).join('\n');
}

for (const [up, local] of MAP) {
  const raw = gitShow(up);
  if (!raw) { console.log('MISS', up); continue; }
  const t2s = await convert(raw);
  const fmMatch = t2s.match(/^---\n([\s\S]*?)\n---\n/);
  let fm = '---\n'; let body = t2s;
  if (fmMatch) {
    const keep = fmMatch[1].split('\n').filter((l) => /^(title|description)\s*:/.test(l.trim()));
    fm = '---\n' + (keep.join('\n') || 'title: 未命名') + '\n---\n\n';
    body = t2s.slice(fmMatch[0].length);
  }
  const parts = splitFences(body);
  for (let i = 0; i < parts.length; i += 2) {
    let seg = parts[i];
    seg = stripTopImports(seg);
    seg = cleanBody(seg);
    seg = seg.replace(/^\s*\n?#[^\n]*\n\s*\n?/, '\n');
    parts[i] = seg;
  }
  let out = fm + parts.join('');
  out = out.replace(/\n{3,}/g, '\n\n').trim() + '\n';
  const dest = path.join(root, local);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, out, 'utf8');
  console.log('OK', local);
}
