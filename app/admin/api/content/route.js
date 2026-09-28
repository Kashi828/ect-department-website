import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { readData, updateSection, isReadOnly, SECTIONS } from "@/lib/content-store";

export async function GET() {
  if (!isAuthed()) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ ok: true, data: await readData() });
}

export async function POST(req) {
  if (!isAuthed()) return NextResponse.json({ ok: false, error: "Not authorised" }, { status: 401 });
  const { section, value } = await req.json().catch(() => ({}));
  if (!SECTIONS.includes(section)) {
    return NextResponse.json({ ok: false, error: "Unknown section" }, { status: 400 });
  }
  if (isReadOnly()) {
    return NextResponse.json(
      { ok: false, error: "This deployment has a read-only filesystem, so edits cannot be saved here. Edit content locally and redeploy instead." },
      { status: 500 }
    );
  }
  const data = await updateSection(section, value);
  return NextResponse.json({ ok: true, data });
}
