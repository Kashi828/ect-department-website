import { readData } from "@/lib/content-store";
import { resolveImage } from "@/lib/sanity";

// Server-side helpers used by the public pages. Everything reads from the
// file store (content/data.json) at request time, so admin edits appear
// immediately without a rebuild. Sanity fallbacks still resolve if the
// editor ever re-points an image at a Sanity asset.

export async function getSettings() {
  return readData().siteSettings;
}

export async function getFaculty() {
  return readData().faculty.map((p) => ({ ...p, photoUrl: resolveImage(p.photo, 800) }));
}

export async function getToppers() {
  return readData().toppers.map((p) => ({ ...p, photoUrl: resolveImage(p.photo, 800) }));
}

export async function getEvents() {
  return readData().events.map((e) => ({ ...e, poster: resolveImage(e.poster, 1400) }));
}

export async function getAchievements() {
  return readData().achievements.map((a) => ({ ...a, poster: resolveImage(a.poster, 900) }));
}

export async function getAlumni() {
  return readData().alumni;
}

export async function getGallery() {
  return readData().gallery.map((g) => ({ ...g, src: resolveImage(g.src, 1400) }));
}

export async function getSyllabus() {
  return readData().syllabus;
}
