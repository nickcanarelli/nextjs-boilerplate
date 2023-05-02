import { NextRequest, NextResponse } from "next/server";
import { ENV_URLS } from "@lib/constants";
import { getToken } from "next-auth/jwt";
import { parse } from "./utils";

export default async function HomeMiddleware(req: NextRequest) {
  const session = await getToken({ req });
  const { path } = parse(req);

  // If the user is signed in and on '/login' or '/register', redirect to the app
  if (session?.email && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(ENV_URLS.app);
  }

  return NextResponse.rewrite(new URL(`/sites/index${path}`, req.url));
}
