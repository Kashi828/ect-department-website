import { NextResponse } from "next/server";
import { clearCookie } from "@/lib/auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(clearCookie());
  return res;
}
