"use strict";

/**
 * Building blocks for post thumbnails.
 *
 * Every thumbnail is a 1600 × 1000 HTML page that the generator screenshots.
 * Use `simpleThumbnail()` for a new post, or `page()` plus the helpers below
 * when you want a custom layout.
 */

const FONTS_URL =
    "https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@500;700;800;900&family=JetBrains+Mono:wght@500;700&display=block";

const STYLES = `
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 1600px; height: 1000px; overflow: hidden; }
body { --a: var(--accent); background: #0a0e13; color: #fff; font-family: Inter, sans-serif; position: relative; }
.glow { position: absolute; inset: 0; background:
    radial-gradient(900px 700px at 88% 30%, color-mix(in srgb, var(--a) 34%, transparent), transparent 65%),
    radial-gradient(700px 500px at 0% 100%, color-mix(in srgb, var(--a) 12%, transparent), transparent 70%); }
.grid { position: absolute; inset: 0; background-size: 64px 64px; background-image:
    linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px); }
.wrap { position: absolute; inset: 0; padding: 72px 80px; }
.badge { display: inline-flex; align-items: center; gap: 14px; background: var(--a); color: #0a0e13; font: 800 30px Inter; letter-spacing: .08em; padding: 12px 24px; border-radius: 10px; text-transform: uppercase; }
.t { font-family: Anton, Impact, sans-serif; text-transform: uppercase; line-height: .98; letter-spacing: .005em; }
.hl { background: var(--a); color: #0a0e13; padding: 0 18px; display: inline-block; transform: rotate(-1.5deg); box-shadow: 8px 8px 0 rgba(0,0,0,.4); }
.acc { color: var(--a); }
.win { background: #121a22; border: 3px solid #2a3642; border-radius: 22px; box-shadow: 0 40px 80px rgba(0,0,0,.55); overflow: hidden; }
.win .bar { height: 56px; background: #1a242e; display: flex; align-items: center; gap: 12px; padding: 0 22px; }
.win .bar i { width: 18px; height: 18px; border-radius: 50%; display: block; }
.win pre { font: 500 34px/1.6 "JetBrains Mono", monospace; padding: 28px 34px; color: #e6edf3; white-space: pre; font-variant-ligatures: none; }
.k { color: #c792ea; } .s { color: #c3e88d; } .n { color: #f78c6c; } .c { color: #6b7d8f; } .f { color: #82aaff; } .r { color: #ff6b6b; } .g { color: #5eead4; }
.list { list-style: none; display: grid; gap: 18px; }
.list li { font: 800 38px Inter; display: flex; align-items: center; gap: 18px; text-transform: uppercase; letter-spacing: .01em; }
.list li b { width: 46px; height: 46px; border-radius: 50%; border: 4px solid var(--a); display: grid; place-items: center; color: var(--a); font-size: 26px; flex: none; }
.brand { position: absolute; left: 80px; bottom: 56px; display: flex; align-items: center; gap: 16px; font: 700 28px Inter; color: rgba(255,255,255,.8); }
.brand span { width: 52px; height: 52px; border-radius: 12px; background: #fff; color: #0a0e13; display: grid; place-items: center; font: 700 22px "JetBrains Mono"; }
.meta { position: absolute; right: 80px; bottom: 56px; font: 800 30px Inter; letter-spacing: .06em; color: #0a0e13; background: #fff; padding: 10px 22px; border-radius: 10px; }
.abs { position: absolute; }
`;

/** Escapes text so it can be placed inside HTML safely. */
function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}

/** Wraps thumbnail markup in the shared page, background, and brand footer. */
function page(accent, body) {
    return `<!doctype html><html><head><meta charset="utf-8">
<link href="${FONTS_URL}" rel="stylesheet">
<style>${STYLES}</style></head>
<body style="--accent:${accent}"><div class="glow"></div><div class="grid"></div>
<div class="wrap">${body}</div>
<div class="brand"><span>&lt;/&gt;</span>Nnamdi's Dev Notes</div></body></html>`;
}

/** The three traffic-light dots at the top of a code window. */
const windowBar =
    '<div class="bar"><i style="background:#ff5f57"></i><i style="background:#febc2e"></i><i style="background:#28c840"></i></div>';

/** A red YouTube-style play button for video posts (top-right corner). */
const playButton = `<div class="abs" style="right:80px;top:72px;width:120px;height:120px;border-radius:50%;background:#ff0033;display:grid;place-items:center;box-shadow:0 12px 30px rgba(255,0,51,.45)"><div style="width:0;height:0;border-left:42px solid #fff;border-top:26px solid transparent;border-bottom:26px solid transparent;margin-left:10px"></div></div>`;

/** A checklist of short selling points. */
function checklist(items, style = "margin-top:56px") {
    return `<ul class="list" style="${style}">${items.map((item) => `<li><b>✓</b>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

/**
 * The quickest way to make a thumbnail for a new post.
 *
 * @param {object} options
 * @param {string} options.accent     Accent colour, e.g. "#f7df1e".
 * @param {string} options.badge      Label in the top-left, e.g. "Article · CSS".
 * @param {string} options.title      Big headline (white).
 * @param {string} options.highlight  Second line, shown on an accent band.
 * @param {string[]} [options.points] Up to three checklist items.
 * @param {string} [options.code]     Plain-text code for the window on the right.
 * @param {string} [options.meta]     Bottom-right label, e.g. "6 MIN READ" or "▶ 12:30".
 * @param {boolean} [options.video]   Adds a play button.
 */
function simpleThumbnail({ accent, badge, title, highlight, points = [], code = "", meta = "", video = false }) {
    return page(accent, `
        <div class="badge">${escapeHtml(badge)}</div>
        ${video ? playButton : ""}
        <h1 class="t" style="font-size:150px;margin-top:40px;max-width:${code ? 860 : 1400}px">${escapeHtml(title)}</h1>
        <h1 class="t" style="font-size:130px;margin-top:10px"><span class="hl">${escapeHtml(highlight)}</span></h1>
        ${points.length ? checklist(points.slice(0, 3), "margin-top:50px") : ""}
        ${code ? `<div class="win abs" style="right:80px;top:${video ? 240 : 170}px;width:620px;transform:rotate(2deg)">${windowBar}<pre style="font-size:30px">${escapeHtml(code)}</pre></div>` : ""}
        ${meta ? `<div class="meta">${escapeHtml(meta)}</div>` : ""}
    `);
}

module.exports = { page, windowBar, playButton, checklist, simpleThumbnail, escapeHtml };
