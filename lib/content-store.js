import fs from "fs";
import path from "path";
import {
  siteSettings as seedSettings,
  events as seedEvents,
  achievements as seedAchievements,
  toppers as seedToppers,
  faculty as seedFaculty,
  alumni as seedAlumni,
  galleryImages as seedGallery,
  syllabus as seedSyllabus,
} from "@/content/sample-data";

// File-based content store. All site content lives in content/data.json.
// The admin panel edits this file; every page reads it fresh at request time.

const DATA_FILE = path.join(process.cwd(), "content", "data.json");
const SNAPSHOTS_FILE = path.join(process.cwd(), "content", "snapshots.json");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");
const UPLOADS_PREFIX = "/uploads";
const BLOB_DATA_PATH = "content/data.json";
const BLOB_SNAPSHOTS_PATH = "content/snapshots.json";
const MAX_SNAPSHOTS = 20;

// When a Vercel Blob store is connected, either a static BLOB_READ_WRITE_TOKEN
// or the OIDC pair (BLOB_STORE_ID + runtime VERCEL_OIDC_TOKEN) is present:
// content and uploads are stored in Blob and survive redeploys.
// Without either (local development) we fall back to the local filesystem.
export function hasBlob() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

// Some deployments (e.g. plain serverless without Blob) have a read-only
// filesystem. Creating directories is best-effort: on read-only disks we
// silently skip it, and write attempts fail with a clear error.
function ensureDirs() {
  try {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  } catch {
    /* read-only filesystem — writes will fail with a clear error */
  }
}

function seed() {
  return {
    siteSettings: seedSettings,
    events: seedEvents,
    achievements: seedAchievements,
    toppers: seedToppers,
    faculty: seedFaculty,
    alumni: seedAlumni,
    gallery: seedGallery,
    syllabus: seedSyllabus,
  };
}

// Top-level sections come from data.json, but settings merge with the seed so
// keys added to sample-data later (e.g. heroFacts, quote fields) are never
// lost to older saves.
function mergeWithSeed(saved) {
  return {
    ...seed(),
    ...saved,
    siteSettings: { ...seedSettings, ...(saved.siteSettings || {}) },
  };
}

/* ---------- blob backend ---------- */

async function blobReadJson(blobPath = BLOB_DATA_PATH) {
  try {
    const { head } = await import("@vercel/blob");
    const meta = await head(blobPath);
    const res = await fetch(`${meta.url}${meta.url.includes("?") ? "&" : "?"}cb=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    const msg = String(err?.message || err);
    // "not found" just means the store is still empty → seed content.
    if (!/not found|no blob|404/i.test(msg)) console.error("Blob read failed:", msg);
    return null;
  }
}

async function blobWriteJson(data, blobPath = BLOB_DATA_PATH) {
  const { put } = await import("@vercel/blob");
  await put(blobPath, JSON.stringify(data), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

/* ---------- public API ---------- */

export async function readData() {
  if (hasBlob()) {
    const saved = await blobReadJson();
    return mergeWithSeed(saved || {});
  }
  ensureDirs();
  try {
    return mergeWithSeed(JSON.parse(fs.readFileSync(DATA_FILE, "utf8")));
  } catch {
    return seed();
  }
}

export async function writeData(next) {
  if (hasBlob()) return blobWriteJson(next);
  ensureDirs();
  fs.writeFileSync(DATA_FILE, JSON.stringify(next, null, 2));
}

export async function updateSection(key, value) {
  const data = await readData();
  // Snapshot the CURRENT state (before this change lands) so any bad save can
  // be rolled back from the admin panel. Keep only the most recent few.
  await recordSnapshot(data);
  data[key] = value;
  await writeData(data);
  return data;
}

/* ---------- snapshots (undo history) ---------- */

// Best-effort: a failed snapshot must never block a content save.
async function recordSnapshot(previousData) {
  try {
    const entry = {
      at: new Date().toISOString(),
      section: "auto",
      data: previousData,
    };
    let list = await readSnapshots();
    list.unshift(entry);
    list = list.slice(0, MAX_SNAPSHOTS);
    if (hasBlob()) await blobWriteJson(list, BLOB_SNAPSHOTS_PATH);
    else {
      ensureDirs();
      fs.writeFileSync(SNAPSHOTS_FILE, JSON.stringify(list, null, 2));
    }
  } catch (err) {
    console.error("Snapshot skipped:", String(err?.message || err));
  }
}

async function readSnapshots() {
  try {
    if (hasBlob()) return (await blobReadJson(BLOB_SNAPSHOTS_PATH)) || [];
    return JSON.parse(fs.readFileSync(SNAPSHOTS_FILE, "utf8"));
  } catch {
    return [];
  }
}

export async function listSnapshots() {
  return (await readSnapshots()).map(({ at, section }) => ({ at, section }));
}

export async function getSnapshot(index) {
  const list = await readSnapshots();
  const snap = list[Number(index)];
  return snap ? snap.data : null;
}

export function isReadOnly() {
  if (hasBlob()) return false;
  try {
    fs.accessSync(path.dirname(DATA_FILE), fs.constants.W_OK);
    return false;
  } catch {
    return true;
  }
}

export async function saveUpload(file) {
  const ext = (file.name.match(/\.(jpe?g|png|webp|gif|avif)$/i) || [])[0] || ".jpg";
  const safe = (file.name.replace(/\.[^.]+$/, "").replace(/[^a-z0-9-_]+/gi, "-").toLowerCase() || "image").slice(0, 60);
  const name = `${safe}-${Date.now()}${ext}`;
  const buf = Buffer.from(await file.arrayBuffer());

  if (hasBlob()) {
    const { put } = await import("@vercel/blob");
    const { url } = await put(`uploads/${name}`, buf, { access: "public" });
    return url;
  }

  ensureDirs();
  fs.writeFileSync(path.join(UPLOADS_DIR, name), buf);
  return `${UPLOADS_PREFIX}/${name}`;
}

export const SECTIONS = ["siteSettings", "events", "achievements", "toppers", "faculty", "alumni", "gallery", "syllabus"];
