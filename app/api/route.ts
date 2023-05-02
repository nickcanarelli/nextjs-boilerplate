import { NextResponse } from "next/server";
import getCurrentServerSession from "@actions/getCurrentServerSession";

export async function GET(request: Request) {
  const session = await getCurrentServerSession();

  return NextResponse.json({ authenticated: !!session });
}
