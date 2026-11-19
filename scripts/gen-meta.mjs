import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const DOCS = path.join(root, 'content/docs');

function readTitle(file) {
  try {
    const t = fs.readFileSync(file, 'utf8');
    const m = t.match(/^---\n([\s\S]*?)\n---\n/);
    if (m) {
      const tm = m[1].match(/^title\s*:\s*(.+)$/m);
      if (tm) return tm[1].trim().replace(/^["']|["']$/g, '');
    }
  } catch {}
  return null;
}

function listDirs(dir) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith('.'))
    .map((e) => e.name)
    .sort();
}
function listMdx(dir) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith('.mdx'))
    .map((e) => e.name.replace(/\.mdx$/, ''))
    .sort();
}

// curated root order (framework-first, then library sections)
const ROOT_ORDER = ['index','what-is-fumadocs','comparisons','manual-installation','upgrade','page-conventions','markdown','navigation','deploying','internationalization','search','editor','guides','integrations','ui','cli','headless','mdx'];

function pagesFor(dir, isRoot) {
  const files = listMdx(dir);
  const subdirs = listDirs(dir).filter((d) => fs.existsSync(path.join(dir, d, 'index.mdx')) || listMdx(path.join(dir, d)).length > 0);
  let entries = [];
  if (files.includes('index')) entries.push('index');
  for (const f of files) if (f !== 'index') entries.push(f);
  for (const d of subdirs) if (!entries.includes(d)) entries.push(d);
  if (isRoot) {
    const ordered = [];
    for (const k of ROOT_ORDER) if (entries.includes(k)) ordered.push(k);
    for (const k of entries) if (!ordered.includes(k)) ordered.push(k);
    // 'index' at top-level stays first in ROOT_ORDER already
    return ordered;
  }
  return entries;
}

const counts = { created: 0, updated: 0 };
function ensureMeta(dir, isRoot = false) {
  const files = listMdx(dir);
  const subdirs = listDirs(dir);
  const hasContent = files.length > 0;
  const hasSub = subdirs.some((d) => { try { return listMdx(path.join(dir, d)).length > 0; } catch { return false; } });
  if (!hasContent && !hasSub) return;
  const metaPath = path.join(dir, 'meta.json');
  const indexFile = path.join(dir, 'index.mdx');
  let title = null;
  if (fs.existsSync(indexFile)) title = readTitle(indexFile);
  if (!title) {
    const base = path.basename(dir);
    title = base.charAt(0).toUpperCase() + base.slice(1);
  }
  if (isRoot) title = 'Fumadocs 中文文档';
  const pages = pagesFor(dir, isRoot);
  const meta = { title, pages };
  const json = JSON.stringify(meta, null, 2) + '\n';
  const exists = fs.existsSync(metaPath);
  if (exists && fs.readFileSync(metaPath, 'utf8') === json) return;
  fs.writeFileSync(metaPath, json, 'utf8');
  exists ? counts.updated++ : counts.created++;
  console.log((exists ? 'UPDATE ' : 'CREATE ') + path.relative(DOCS, metaPath) + ' -> ' + JSON.stringify(pages));
}

function walk(dir, isRoot = false) {
  ensureMeta(dir, isRoot);
  for (const d of listDirs(dir)) walk(path.join(dir, d));
}
walk(DOCS, true);
console.log(`meta: created=${counts.created} updated=${counts.updated}`);
