import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { JSDOM } from "jsdom";

const dom = new JSDOM("");
globalThis.window = dom.window;
const { sanitizeRichHtml } = await import("../src/lib/sanitize-html.ts");

test("rich text preserves headings, paragraphs, images, tables and links", () => {
  const html = '<h2>VISION</h2><p><strong>身体づくり</strong><br>体験</p><ul><li>週1回</li></ul><img src="https://images.microcms-assets.io/test.jpg" alt="ジム"><table><tbody><tr><td>料金</td></tr></tbody></table><a href="https://pt-vision.com/" target="_blank">詳細</a>';
  assert.equal(sanitizeRichHtml(html), html);
});

test("rich text removes scripts, event handlers and executable link URLs", () => {
  const html = '<p onclick="alert(1)">本文</p><script>alert(1)</script><img src="x" onerror="alert(1)"><a href="javascript:alert(1)">危険</a><svg onload="alert(1)"></svg>';
  const clean = sanitizeRichHtml(html);
  assert.equal(clean, '<p>本文</p><img src="x"><a>危険</a>');
});

test("rich text removes embedded pages and counterfeit forms", () => {
  const clean = sanitizeRichHtml('<iframe src="https://example.invalid"></iframe><form action="https://example.invalid"><input name="password"><button>ログイン</button></form><p>本文</p>');
  assert(!/<(?:iframe|form|input|button)\b/i.test(clean));
  assert(clean.includes('<p>本文</p>'));
});

test("analytics keeps the same public measurement ID without inline JavaScript", async () => {
  const code = await readFile(new URL('../public/ga4-init.js', import.meta.url), 'utf8');
  const page = new JSDOM('<script data-ga-id="G-TEST123"></script>', { runScripts: 'outside-only' });
  Object.defineProperty(page.window.document, 'currentScript', { value: page.window.document.querySelector('script') });
  page.window.eval(code);
  assert.equal(page.window.dataLayer.length, 2);
  assert.deepEqual(Array.from(page.window.dataLayer[1]), ['config', 'G-TEST123']);
  page.window.close();
});
