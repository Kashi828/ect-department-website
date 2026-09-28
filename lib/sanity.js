import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.SANITY_API_VERSION || "2024-01-01";

// True once you've created a Sanity project and added the env vars (see README).
// Until then, every page quietly falls back to content/sample-data.js so the
// site always renders something sensible.
export const isSanityConfigured = Boolean(projectId);

export const client = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;

const builder = isSanityConfigured ? imageUrlBuilder(client) : null;
export function urlFor(source) {
  return builder ? builder.image(source) : { url: () => "" };
}

// Fetch helper: tries Sanity first, falls back to local sample data on any
// failure (no project configured yet, network issue, empty dataset, etc).
export async function fetchOrFallback(query, fallback) {
  if (!isSanityConfigured) return fallback;
  try {
    const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
    return Array.isArray(data) && data.length === 0 ? fallback : data ?? fallback;
  } catch (err) {
    console.warn("Sanity fetch failed, using fallback content:", err.message);
    return fallback;
  }
}

// Turns either a local path ("/posters/x.jpg") or a Sanity image object into a
// plain URL string, so components never have to care where an image came from.
export function resolveImage(source, width = 1200) {
  if (!source) return "";
  if (typeof source === "string") return source;
  if (!isSanityConfigured) return "";
  return urlFor(source).width(width).auto("format").url();
}
