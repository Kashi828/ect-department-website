import { NextResponse } from "next/server";
import { readData } from "@/lib/content-store";

// Full live-content export. No auth on purpose: the site content is public
// anyway (it is exactly what every page renders), and this endpoint is what
// the GitHub mirror backup pulls. Contains no passwords or secrets.
export async function GET() {
  const data = await readData();
  return NextResponse.json({
    ok: true,
    exportedAt: new Date().toISOString(),
    data,
  });
}
