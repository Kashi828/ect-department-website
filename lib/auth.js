import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "ect_admin";

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "admin123";
}

function token() {
  return crypto.createHash("sha256").update(`ect-admin::${getAdminPassword()}`).digest("hex");
}

export function checkPassword(pw) {
  const a = Buffer.from(String(pw || ""));
  const b = Buffer.from(getAdminPassword());
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function makeCookie() {
  return {
    name: COOKIE_NAME,
    value: token(),
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  };
}

export function clearCookie() {
  return { ...makeCookie(), value: "", maxAge: 0 };
}

export function isAuthed() {
  const jar = cookies();
  const c = jar.get(COOKIE_NAME);
  return Boolean(c && c.value === token());
}
