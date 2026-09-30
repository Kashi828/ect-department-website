// Mirrors the LIVE site content (Vercel Blob) into the GitHub repo as
// content/live-content.json, so admin edits are backed up in version control.
//
// Usage:
//   npm run backup                    # uses https://ect-department-website.vercel.app
//   CONTENT_URL=https://… npm run backup
//
// The exported file is exactly what every page renders (no secrets). Commit it
// after running so the backup lands in GitHub.

import { writeFile, mkdir } from "node:fs/promises";

const BASE = (process.env.CONTENT_URL || "https://ect-department-website.vercel.app").replace(/\/$/, "");

const res = await fetch(`${BASE}/api/content-export`, { cache: "no-store" });
if (!res.ok) {
  console.error(`Export failed: HTTP ${res.status} from ${BASE}/api/content-export`);
  process.exit(1);
}
const { ok, exportedAt, data } = await res.json();
if (!ok || !data) {
  console.error("Export payload looked wrong:", res.status, ok);
  process.exit(1);
}

await mkdir("content", { recursive: true });
const file = "content/live-content.json";
await writeFile(
  file,
  JSON.stringify({ _backupOf: BASE, exportedAt, data }, null, 2) + "\n",
  "utf8"
);

const sections = Object.entries(data)
  .map(([k, v]) => `${k}=${Array.isArray(v) ? `${v.length} items` : "settings"}`)
  .join(", ");
console.log(`✓ Backed up live content (${exportedAt}) → ${file}`);
console.log(`  ${sections}`);
console.log("  Now commit it:  git add content/live-content.json && git commit -m \"Backup live content\"");
