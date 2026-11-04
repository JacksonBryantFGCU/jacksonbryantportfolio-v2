// Pre-renders the home page into dist/index.html so the content appears
// before any JavaScript runs, and inlines the (small) stylesheet so the
// first paint doesn't wait on a separate CSS request.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const distDir = path.join(root, "dist");
const serverDir = path.join(root, "dist-server");
const htmlPath = path.join(distDir, "index.html");

const entry = fs.readdirSync(serverDir).find((f) => /^entry-server\.(m?js)$/.test(f));
if (!entry) throw new Error("[prerender] entry-server build not found in dist-server/");

const { render } = await import(pathToFileURL(path.join(serverDir, entry)).href);
const appHtml = render("/");

let html = fs.readFileSync(htmlPath, "utf8");
if (!html.includes('<div id="root"></div>')) throw new Error("[prerender] #root placeholder not found");
html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

// Inline the stylesheet
html = html.replace(/<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/, (tag, href) => {
  const css = fs.readFileSync(path.join(distDir, href), "utf8");
  return `<style>${css}</style>`;
});

fs.writeFileSync(htmlPath, html);
fs.rmSync(serverDir, { recursive: true, force: true });
console.log(`[prerender] wrote ${path.relative(root, htmlPath)} (${(Buffer.byteLength(html) / 1024).toFixed(1)} KB)`);
