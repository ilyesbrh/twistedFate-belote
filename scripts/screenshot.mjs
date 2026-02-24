/**
 * Screenshot tool for visual regression during dev.
 * Usage: node scripts/screenshot.mjs [label] [width] [height]
 * Default: 844x390 (landscape phone — matches manifesto baseline)
 */
import { chromium } from "playwright";
import { mkdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, "..");

const label = process.argv[2] ?? "snap";
const width = Number(process.argv[3] ?? 844);
const height = Number(process.argv[4] ?? 390);
const url = process.argv[5] ?? "http://localhost:5173";

const outDir = join(ROOT, "docs", "screenshots");
await mkdir(outDir, { recursive: true });

const ts = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const file = join(outDir, `${ts}-${label}-${width}x${height}.png`);

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width, height },
  deviceScaleFactor: 2,
});
const page = await context.newPage();

await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(400); // allow CSS transitions to settle

await page.screenshot({ path: file, fullPage: false });
await browser.close();

console.log(`Screenshot saved: ${file}`);
