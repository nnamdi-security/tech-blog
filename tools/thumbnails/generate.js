#!/usr/bin/env node
"use strict";

/**
 * Renders post thumbnails with a headless browser.
 *
 * Usage (from the repository root):
 *   node tools/thumbnails/generate.js                 # every thumbnail
 *   node tools/thumbnails/generate.js my-new-post     # only the ones named
 *   node tools/thumbnails/generate.js --out ./preview # write somewhere else
 *
 * For each thumbnail it writes, at 1600 × 1000:
 *   <name>.webp  small file used for cards and post covers
 *   <name>.jpg   used for og:image / twitter:image (wider platform support)
 *
 * Requires Playwright with Chromium (see tools/thumbnails/README.md).
 */

const fs = require("fs");
const path = require("path");

let chromium;
try {
    ({ chromium } = require("playwright"));
} catch {
    console.error("Playwright is not installed. Run:\n  npm install --no-save playwright\n  npx playwright install chromium");
    process.exit(1);
}

const thumbnails = require("./thumbnails.js");

const WIDTH = 1600;
const HEIGHT = 1000;
const QUALITY = 0.82;

function parseArguments(argv) {
    const options = { out: path.join(__dirname, "..", "..", "assets", "images", "posts"), names: [] };

    for (let index = 0; index < argv.length; index += 1) {
        if (argv[index] === "--out") {
            options.out = path.resolve(argv[index + 1]);
            index += 1;
        } else {
            options.names.push(argv[index]);
        }
    }

    return options;
}

async function render(page, name, html, outDir) {
    await page.setContent(html, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);

    const fontsLoaded = await page.evaluate(() => document.fonts.check("100px Anton"));
    if (!fontsLoaded) {
        console.warn(`  ! ${name}: the Anton font did not load (are you offline?). A fallback font was used.`);
    }

    const jpg = await page.screenshot({ type: "jpeg", quality: Math.round(QUALITY * 100) });
    fs.writeFileSync(path.join(outDir, `${name}.jpg`), jpg);

    // Encode WebP inside the browser, so no extra image library is needed.
    const png = await page.screenshot({ type: "png" });
    const webpBase64 = await page.evaluate(
        async ({ pngBase64, quality }) => {
            const image = new Image();
            image.src = `data:image/png;base64,${pngBase64}`;
            await image.decode();
            const canvas = document.createElement("canvas");
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;
            canvas.getContext("2d").drawImage(image, 0, 0);
            return canvas.toDataURL("image/webp", quality).split(",")[1];
        },
        { pngBase64: png.toString("base64"), quality: QUALITY }
    );
    fs.writeFileSync(path.join(outDir, `${name}.webp`), Buffer.from(webpBase64, "base64"));

    const size = (file) => `${Math.round(fs.statSync(path.join(outDir, file)).size / 1024)} KB`;
    console.log(`  ✓ ${name}.webp (${size(`${name}.webp`)}), ${name}.jpg (${size(`${name}.jpg`)})`);
}

async function main() {
    const options = parseArguments(process.argv.slice(2));
    const names = options.names.length ? options.names : Object.keys(thumbnails);
    const unknown = names.filter((name) => !thumbnails[name]);

    if (unknown.length) {
        console.error(`Unknown thumbnail(s): ${unknown.join(", ")}\nAvailable: ${Object.keys(thumbnails).join(", ")}`);
        process.exit(1);
    }

    fs.mkdirSync(options.out, { recursive: true });
    console.log(`Rendering ${names.length} thumbnail(s) to ${path.relative(process.cwd(), options.out) || "."}`);

    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } });

    try {
        for (const name of names) {
            await render(page, name, thumbnails[name], options.out);
        }
    } finally {
        await browser.close();
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
