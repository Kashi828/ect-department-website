import { groq } from "next-sanity";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`;
export const eventsQuery = groq`*[_type == "event"] | order(date desc){_id, title, subtitle, date, time, venue, resourcePerson, organizers, poster}`;
export const achievementsQuery = groq`*[_type == "achievement"] | order(order asc){_id, title, detail, poster}`;
export const topperQuery = groq`*[_type == "person" && category == "topper"] | order(order asc){_id, name, yearLabel, sgpa, "photo": photo}`;
export const facultyQuery = groq`*[_type == "person" && category == "faculty"] | order(order asc){_id, name, role, "photo": photo}`;
export const alumniQuery = groq`*[_type == "alumnus"] | order(batch desc){_id, name, batch, position}`;
