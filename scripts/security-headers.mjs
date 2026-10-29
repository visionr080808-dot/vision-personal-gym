import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const out = path.resolve("out");
async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? htmlFiles(full) : full.endsWith(".html") ? [full] : [];
  }))).flat();
}

// Static exports contain inline hydration scripts. Allow their exact hashes,
// rather than allowing all inline JavaScript. Recalculate on every build.
const policies = [];
for (const file of (await htmlFiles(out)).sort()) {
  const html = await readFile(file, "utf8");
  const hashes = new Set();
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)) {
    if (/\bsrc\s*=/i.test(match[1]) || !match[2].trim()) continue;
    hashes.add(`'sha256-${createHash("sha256").update(match[2]).digest("base64")}'`);
  }
  const csp = [
    "default-src 'self'",
    `script-src 'self' https://www.googletagmanager.com ${[...hashes].sort().join(" ")}`,
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self'",
    "img-src 'self' data: blob: https://images.microcms-assets.io https://*.google-analytics.com https://www.googletagmanager.com",
    "connect-src 'self' https://ah4kq0x0c7.microcms.io https://*.google-analytics.com https://analytics.google.com https://www.googletagmanager.com",
    "frame-src https://www.google.com https://maps.google.com",
    "media-src 'self' https://images.microcms-assets.io",
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
  const header = `  Content-Security-Policy: ${csp}`;
  if (Buffer.byteLength(header) > 2000) throw new Error(`CSP exceeds Cloudflare's per-line limit: ${file}`);
  const relative = path.relative(out, file).split(path.sep).join("/");
  const routes = relative === "index.html" ? ["/", "/index.html"] : [`/${relative.slice(0, -5)}`, `/${relative}`];
  for (const route of routes) policies.push(`${route}\n${header}`);
}

const base = await readFile("public/_headers", "utf8");
await writeFile(path.join(out, "_headers"), `${base.trim()}\n\n${policies.join("\n\n")}\n`);
console.log(`Generated hash-based CSP for ${policies.length} static routes.`);
