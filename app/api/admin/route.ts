import getCurrentServerSession from "@actions/getCurrentServerSession";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await getCurrentServerSession();
  const user = session?.user;

  if (!session && user?.role !== UserRole.Admin) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
  return NextResponse.json({ authenticated: !!session });
}
