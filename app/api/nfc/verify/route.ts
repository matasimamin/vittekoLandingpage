// app/api/nfc/verify/route.ts
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const e = request.nextUrl.searchParams.get("e");

  if (!e) {
    return NextResponse.json({ error: "Missing parameter" }, { status: 400 });
  }

  return NextResponse.redirect(new URL(`/r/${encodeURIComponent(e)}`, request.url));
}