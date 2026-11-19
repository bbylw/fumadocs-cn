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
  try {
    return execFileSync('git', ['show', `${UP}/${upPath}`], { cwd: root, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
  } catch {
    return null;
  }
}

// upstream zh-TW path -> local path (flattened Astro site)
const MAP = [];
function add(up, local) { MAP.push([up, local]); }

const FW = '(framework)/[framework]';
// framework core
add(`${FW}/index.zh-TW.mdx`, 'content/docs/index.mdx');
add(`${FW}/what-is-fumadocs.zh-TW.mdx`, 'content/docs/what-is-fumadocs.mdx');
add(`${FW}/comparisons.zh-TW.mdx`, 'content/docs/comparisons.mdx');
add(`${FW}/manual-installation.zh-TW.mdx`, 'content/docs/manual-installation.mdx');
add(`${FW}/upgrade.zh-TW.mdx`, 'content/docs/upgrade.mdx');
add(`${FW}/page-conventions.zh-TW.mdx`, 'content/docs/page-conventions.mdx');
add(`${FW}/navigation.zh-TW.mdx`, 'content/docs/navigation.mdx');
add(`${FW}/internationalization.zh-TW.mdx`, 'content/docs/internationalization.mdx');
add(`${FW}/editor.zh-TW.mdx`, 'content/docs/editor.mdx');
add(`${FW}/markdown/index.zh-TW.mdx`, 'content/docs/markdown/index.mdx');
add(`${FW}/markdown/math.zh-TW.mdx`, 'content/docs/markdown/math.mdx');
add(`${FW}/markdown/mermaid.zh-TW.mdx`, 'content/docs/markdown/mermaid.mdx');
add(`${FW}/markdown/twoslash.zh-TW.mdx`, 'content/docs/markdown/twoslash.mdx');
add(`${FW}/markdown/typescript.zh-TW.mdx`, 'content/docs/markdown/typescript.mdx');
add(`${FW}/markdown/validate-links.zh-TW.mdx`, 'content/docs/markdown/validate-links.mdx');
add(`${FW}/deploying/index.zh-TW.mdx`, 'content/docs/deploying/index.mdx');
add(`${FW}/deploying/static.zh-TW.mdx`, 'content/docs/deploying/static.mdx');
add(`${FW}/search/index.zh-TW.mdx`, 'content/docs/search/index.mdx');
for (const s of ['algolia','flexsearch','meilisearch','mixedbread','orama','orama-cloud','typesense','custom']) {
  add(`${FW}/search/${s}.zh-TW.mdx`, `content/docs/search/${s}.mdx`);
}
add(`${FW}/guides/index.zh-TW.mdx`, 'content/docs/guides/index.mdx');
for (const s of ['customize-ui','access-control','export-pdf','export-epub','rss']) {
  add(`${FW}/guides/${s}.zh-TW.mdx`, `content/docs/guides/${s}.mdx`);
}
add(`${FW}/integrations/feedback.zh-TW.mdx`, 'content/docs/integrations/feedback.mdx');
add(`${FW}/integrations/llms.zh-TW.mdx`, 'content/docs/integrations/llms.mdx');
add(`${FW}/integrations/blog.zh-TW.mdx`, 'content/docs/integrations/blog.mdx');
add(`${FW}/integrations/changelog.zh-TW.mdx`, 'content/docs/integrations/changelog.mdx');
add(`${FW}/integrations/og/index.zh-TW.mdx`, 'content/docs/integrations/og/index.mdx');
add(`${FW}/integrations/openapi/index.zh-TW.mdx`, 'content/docs/integrations/openapi/index.mdx');
for (const s of ['api-page','generate-files','headless','server','standalone']) {
  add(`${FW}/integrations/openapi/${s}.zh-TW.mdx`, `content/docs/integrations/openapi/${s}.mdx`);
}
add(`${FW}/integrations/asyncapi/index.zh-TW.mdx`, 'content/docs/integrations/asyncapi/index.mdx');
for (const s of ['api-page','generate-files','headless','server']) {
  add(`${FW}/integrations/asyncapi/${s}.zh-TW.mdx`, `content/docs/integrations/asyncapi/${s}.mdx`);
}
add(`${FW}/integrations/graphql/index.zh-TW.mdx`, 'content/docs/integrations/graphql/index.mdx');
for (const s of ['api-page','headless','server']) {
  add(`${FW}/integrations/graphql/${s}.zh-TW.mdx`, `content/docs/integrations/graphql/${s}.mdx`);
}
add(`${FW}/integrations/content/index.zh-TW.mdx`, 'content/docs/integrations/content/index.mdx');
for (const s of ['custom','local-html','local-md','mdx-remote','notion','obsidian','python','sanity','satteri-local-md']) {
  add(`${FW}/integrations/content/${s}.zh-TW.mdx`, `content/docs/integrations/content/${s}.mdx`);
}
add(`${FW}/integrations/story/index.zh-TW.mdx`, 'content/docs/integrations/story/index.mdx');
add(`${FW}/integrations/story/headless.zh-TW.mdx`, 'content/docs/integrations/story/headless.mdx');
// ui
add('ui/index.zh-TW.mdx', 'content/docs/ui/index.mdx');
add('ui/theme.zh-TW.mdx', 'content/docs/ui/theme.mdx');
add('ui/component-library.zh-TW.mdx', 'content/docs/ui/component-library.mdx');
add('ui/translations.zh-TW.mdx', 'content/docs/ui/translations.mdx');
add('ui/components/index.zh-TW.mdx', 'content/docs/ui/components/index.mdx');
for (const s of ['accordion','auto-type-table','banner','codeblock','dynamic-codeblock','files','github-info','graph-view','image-zoom','inline-toc','steps','tabs','type-table']) {
  add(`ui/components/${s}.zh-TW.mdx`, `content/docs/ui/components/${s}.mdx`);
}
add('ui/layouts/index.zh-TW.mdx', 'content/docs/ui/layouts/index.mdx');
for (const s of ['docs','home-layout','page','nav','links','root-provider','flux','glass','notebook']) {
  add(`ui/layouts/${s}.zh-TW.mdx`, `content/docs/ui/layouts/${s}.mdx`);
}
// cli
add('cli/index.zh-TW.mdx', 'content/docs/cli/index.mdx');
add('cli/create-fumadocs-app.zh-TW.mdx', 'content/docs/cli/create-fumadocs-app.mdx');
add('cli/preview.zh-TW.mdx', 'content/docs/cli/preview.mdx');

// headless + mdx + top-level libs: auto-discovered below (strip .zh-TW suffix)

// ---- helpers: operate only outside code fences ----
function splitFences(text) {
  const parts = text.split(/(```[\s\S]*?(?:```|$))/g);
  return parts; // odd indices are fences
}

const KEEP_TAGS = new Set(['Callout','Cards','Card','Tabs','Tab','Steps','Step','Accordion','Accordions','Files','File','Folder','Banner','TypeTable','AutoTypeTable','ImageZoom','InlineTOC','DevClient']);

function cleanBody(body) {
  // unwrap <show> for Astro: keep when mentions astro with ===; drop when !== astro without === astro
  body = body.replace(/<show when=\{([^}]+)\}>([\s\S]*?)<\/show>/g, (m, cond, inner) => {
    const hasAstroEq = /'astro'\s*===/.test(cond) || /"astro"\s*===/.test(cond);
    const hasAstroNe = /'astro'\s*!==/.test(cond) || /"astro"\s*!==/.test(cond);
    if (hasAstroEq && !hasAstroNe) return `\n${inner.trim()}\n`;
    return '';
  });
  // remove self-closing unknown components (e.g. <DocsCategory />, <AgentInstructions />)
  body = body.replace(/<[A-Z][A-Za-z0-9_.]*\b[^>]*\/>/g, (m) => {
    const tag = m.match(/<([A-Z][A-Za-z0-9_.]*)/)[1];
    return KEEP_TAGS.has(tag) ? m : '';
  });
  // strip unknown paired tags but keep inner
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

async function process(up, local) {
  const raw = gitShow(up);
  if (!raw) { console.log('MISS ', up); return false; }
  const t2s = await convert(raw);
  // frontmatter: keep title + description only (convert already applied)
  const fmMatch = t2s.match(/^---\n([\s\S]*?)\n---\n/);
  let fm = '---\n'; let body = t2s;
  if (fmMatch) {
    const lines = fmMatch[1].split('\n');
    const keep = lines.filter((l) => /^(title|description)\s*:/.test(l.trim()));
    fm = '---\n' + (keep.join('\n') || 'title: 未命名') + '\n---\n\n';
    body = t2s.slice(fmMatch[0].length);
  }
  // split code fences; only clean outside fences
  const parts = splitFences(body);
  for (let i = 0; i < parts.length; i += 2) {
    let seg = parts[i];
    seg = stripTopImports(seg);
    seg = cleanBody(seg);
    // remove leading duplicate H1 (title already from frontmatter)
    seg = seg.replace(/^\s*\n?#[^\n]*\n\s*\n?/, '\n');
    parts[i] = seg;
  }
  let out = fm + parts.join('');
  out = out.replace(/\n{3,}/g, '\n\n').trim() + '\n';
  const dest = path.join(root, local);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, out, 'utf8');
  return true;
}

let ok = 0, miss = 0;
for (const [up, local] of MAP) {
  const r = await process(up, local);
  r ? ok++ : miss++;
}
console.log(`framework/ui/cli: ok=${ok} miss=${miss}`);

// auto-discover headless + mdx + top-level libs from upstream tree
const tree = execFileSync('git', ['ls-tree', '-r', '--name-only', 'upstream/dev:apps/docs/content/docs'], { cwd: root, encoding: 'utf8' });
let ok2 = 0, miss2 = 0;
for (const f of tree.split('\n')) {
  if (!f.endsWith('.zh-TW.mdx')) continue;
  if (f.startsWith('(framework)/') || f.startsWith('ui/') || f.startsWith('cli/')) continue;
  const local = 'content/docs/' + f.replace(/\.zh-TW\.mdx$/, '.mdx');
  const r = await process(f, local);
  r ? ok2++ : miss2++;
}
console.log(`headless/mdx/libs: ok=${ok2} miss=${miss2}`);
console.log('DONE');
