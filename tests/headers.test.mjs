import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const text = await readFile("out/_headers", "utf8");
const rules = new Map();
let route;
for (const line of text.split("\n")) {
  if (!line.trim() || line.trimStart().startsWith("#")) continue;
  if (!/^\s/.test(line)) { route = line; rules.set(route, new Map()); }
  else { const split = line.indexOf(":"); rules.get(route).set(line.slice(0, split).trim(), line.slice(split + 1).trim()); }
}
async function htmlFiles(dir) {
  return (await Promise.all((await readdir(dir, { withFileTypes: true })).map(e => {
    const file = path.join(dir, e.name);
    return e.isDirectory() ? htmlFiles(file) : e.name.endsWith(".html") ? [file] : [];
  }))).flat();
}
test("every static HTML document permits only its exact inline script hashes", async () => {
  for (const file of await htmlFiles("out")) {
    const rel = path.relative("out", file).split(path.sep).join("/");
    const route = rel === "index.html" ? "/" : `/${rel.slice(0, -5)}`;
    const csp = rules.get(route)?.get("Content-Security-Policy");
    assert(csp, `missing CSP: ${route}`);
    const scriptPolicy = csp.split(";").find(v => v.trim().startsWith("script-src "));
    assert(!scriptPolicy.includes("unsafe-inline"));
    assert(!scriptPolicy.includes("unsafe-eval"));
    for (const match of (await readFile(file, "utf8")).matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)) {
      if (/\bsrc\s*=/i.test(match[1]) || !match[2].trim()) continue;
      const hash = createHash("sha256").update(match[2]).digest("base64");
      assert(scriptPolicy.includes(`'sha256-${hash}'`), `missing hash: ${route}`);
    }
    assert(csp.includes("frame-ancestors 'none'"));
    assert(csp.includes("https://www.google.com"));
    assert(csp.includes("https://ah4kq0x0c7.microcms.io"));
  }
});
test("generated rules respect Cloudflare header limits", () => {
  assert(rules.size <= 100);
  for (const line of text.split("\n")) assert(Buffer.byteLength(line) <= 2000);
});
test("public pages disable framing and MIME sniffing", () => {
  assert.equal(rules.get("/*").get("X-Frame-Options"), "DENY");
  assert.equal(rules.get("/*").get("X-Content-Type-Options"), "nosniff");
});
