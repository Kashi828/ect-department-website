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
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");
const UPLOADS_PREFIX = "/uploads";

function ensureDirs() {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
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

export function readData() {
  ensureDirs();
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    return { ...seed(), ...JSON.parse(raw) };
  } catch {
    return seed();
  }
}

export function writeData(next) {
  ensureDirs();
  fs.writeFileSync(DATA_FILE, JSON.stringify(next, null, 2));
}

export function updateSection(key, value) {
  const data = readData();
  data[key] = value;
  writeData(data);
  return data;
}

export async function saveUpload(file) {
  ensureDirs();
  const ext = (file.name.match(/\.(jpe?g|png|webp|gif|avif)$/i) || [])[0] || ".jpg";
  const safe = (file.name.replace(/\.[^.]+$/, "").replace(/[^a-z0-9-_]+/gi, "-").toLowerCase() || "image").slice(0, 60);
  const name = `${safe}-${Date.now()}${ext}`;
  const buf = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(UPLOADS_DIR, name), buf);
  return `${UPLOADS_PREFIX}/${name}`;
}

export const SECTIONS = ["siteSettings", "events", "achievements", "toppers", "faculty", "alumni", "gallery", "syllabus"];
