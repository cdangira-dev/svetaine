// Vercel kūrimas: index.html be komentarų į dist/ (2026-10-26, eksperto pastaba A6 —
// komentaruose vidiniai užrašai ir vardai neturi matytis per „Rodyti šaltinį“).
// Šaltinis su komentarais lieka index.html.
const fs = require("fs");

let html = fs.readFileSync("index.html", "utf8");

html = html.replace(/(<style[^>]*>)([\s\S]*?)(<\/style>)/g, (_, a, css, b) =>
  a + css.replace(/\/\*[\s\S]*?\*\//g, "") + b);

html = html.replace(/(<script[^>]*>)([\s\S]*?)(<\/script>)/g, (_, a, js, b) =>
  a + js.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^[ \t]*\/\/.*$/gm, "").replace(/[ \t]+\/\/ .*$/gm, "") + b);

html = html.replace(/<!--[\s\S]*?-->/g, "");
html = html.replace(/^[ \t]*\r?\n/gm, "");

fs.rmSync("dist", { recursive: true, force: true });
fs.mkdirSync("dist");
fs.writeFileSync("dist/index.html", html);
fs.cpSync("vaizdai", "dist/vaizdai", { recursive: true });
console.log("dist/index.html", html.length, "baitu");
