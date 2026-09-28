import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { saveUpload } from "@/lib/content-store";

export async function POST(req) {
  if (!isAuthed()) return NextResponse.json({ ok: false, error: "Not authorised" }, { status: 401 });
  const form = await req.formData();
  const file = form.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ ok: false, error: "No file" }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ ok: false, error: "Max size is 8 MB" }, { status: 400 });
  }
  const url = await saveUpload(file);
  return NextResponse.json({ ok: true, url });
}
