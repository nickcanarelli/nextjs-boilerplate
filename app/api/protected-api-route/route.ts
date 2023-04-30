import getCurrentServerSession from "@actions/getCurrentServerSession";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await getCurrentServerSession();

  if (!session) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
  return NextResponse.json({ authenticated: !!session });
}
