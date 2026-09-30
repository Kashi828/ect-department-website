import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { listSnapshots, getSnapshot, writeData } from "@/lib/content-store";

export async function GET() {
  if (!isAuthed()) return NextResponse.json({ ok: false }, { status: 401 });
  const snapshots = await listSnapshots();
  return NextResponse.json({ ok: true, snapshots });
}

// Restore: replace ALL live content with a snapshot's content.
export async function POST(req) {
  if (!isAuthed()) return NextResponse.json({ ok: false, error: "Not authorised" }, { status: 401 });
  const { index } = await req.json().catch(() => ({}));
  const data = await getSnapshot(index);
  if (!data) return NextResponse.json({ ok: false, error: "Snapshot not found" }, { status: 404 });
  await writeData(data);
  return NextResponse.json({ ok: true, data });
}
