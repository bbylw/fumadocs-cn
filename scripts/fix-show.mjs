import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const DOCS = path.join(root, 'content/docs');

function evalCond(cond) {
  // props.framework === 'astro' evaluation with framework = 'astro'
  let expr = cond.replace(/props\.framework/g, "'astro'");
  // only allow safe chars; otherwise default keep
  if (!/^[a-zA-Z0-9\s'"|&!()=]+$/.test(expr)) return true;
  try {
    return Boolean(eval(expr));
  } catch { return true; }
}

// Process one outside-fence chunk: resolve nested <show> innermost-first
function resolveShow(chunk) {
  let s = chunk;
  for (let iter = 0; iter < 200; iter++) {
    // find innermost <show ...>...</show> (inner has no <show)
    const re = /<show when=\{([^{}]+)\}>([\s\S]*?)<\/show>/g;
    let m; let found = null;
    while ((m = re.exec(s)) !== null) {
      if (!m[2].includes('<show')) { found = m; break; }
    }
    if (!found) break;
    const keep = evalCond(found[1]);
    const inner = found[2].trim() ? `\n${found[2]}\n` : '';
    s = s.slice(0, found.index) + (keep ? inner : '') + s.slice(found.index + found[0].length);
  }
  // any leftover stray <show ...> or </show> (unbalanced) -> strip tags, keep inner
  s = s.replace(/<show when=\{[^}]*\}>/g, '');
  s = s.replace(/<\/show>/g, '');
  return s;
}

function processFile(file) {
  const text = fs.readFileSync(file, 'utf8');
  const parts = text.split(/(```[\s\S]*?(?:```|$))/g);
  let changed = false;
  for (let i = 0; i < parts.length; i += 2) {
    let seg = parts[i];
    let next = resolveShow(seg);
    // framework helpers -> Astro text
    next = next.replace(/\{frameworkName\(props\.framework\)\}/g, 'Astro');
    next = next.replace(/props\.framework/g, "'astro'");
    if (next !== seg) { parts[i] = next; changed = true; }
  }
  if (changed) {
    fs.writeFileSync(file, parts.join(''), 'utf8');
    return true;
  }
  return false;
}

let files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.mdx')) files.push(p);
  }
})(DOCS);

let fixed = 0;
for (const f of files) if (processFile(f)) { fixed++; console.log('FIXED', path.relative(root, f)); }
console.log(`show/framework fix: ${fixed}/${files.length} files`);

// also fix the two previously corrupted files' <show> leftovers are handled by above;
// fix Accordions mismatch in index.mdx if still present (inspect)
const idx = path.join(DOCS, 'index.mdx');
let t = fs.readFileSync(idx, 'utf8');
console.log('index Accordions open:', (t.match(/<Accordions/g) || []).length, 'close:', (t.match(/<\/Accordions>/g) || []).length,
  'Accordion open:', (t.match(/<Accordion(?![a-zA-Z])/g) || []).length, 'close:', (t.match(/<\/Accordion>/g) || []).length);
