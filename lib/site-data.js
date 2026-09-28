import { readData } from "@/lib/content-store";
import { resolveImage } from "@/lib/sanity";

// Server-side helpers used by the public pages. Everything reads from the
// content store (Vercel Blob in production, content/data.json locally) at
// request time, so admin edits appear immediately without a rebuild.
// Sanity fallbacks still resolve if the editor ever re-points an image at a
// Sanity asset.

export async function getSettings() {
  return (await readData()).siteSettings;
}

export async function getFaculty() {
  return (await readData()).faculty.map((p) => ({ ...p, photoUrl: resolveImage(p.photo, 800) }));
}

export async function getToppers() {
  return (await readData()).toppers.map((p) => ({ ...p, photoUrl: resolveImage(p.photo, 800) }));
}

export async function getEvents() {
  return (await readData()).events.map((e) => ({ ...e, poster: resolveImage(e.poster, 1400) }));
}

export async function getAchievements() {
  return (await readData()).achievements.map((a) => ({ ...a, poster: resolveImage(a.poster, 900) }));
}

export async function getAlumni() {
  return (await readData()).alumni;
}

export async function getGallery() {
  return (await readData()).gallery.map((g) => ({ ...g, src: resolveImage(g.src, 1400) }));
}

export async function getSyllabus() {
  return (await readData()).syllabus;
}
