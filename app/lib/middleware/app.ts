import { NextRequest, NextResponse } from "next/server";
import { ENV_URLS } from "@lib/constants";
import { getToken } from "next-auth/jwt";
import { parse } from "./utils";

export default async function AdminMiddleware(req: NextRequest) {
  const token = await getToken({ req });
  const { path } = parse(req);

  // If there is no token user is not logged in, redirect the user to the login page.
  if (!token) {
    const loginUrl = new URL(`/login`, ENV_URLS.home);
    const callbackUrl = ENV_URLS.app + path;

    // Encode the callbackUrl and add it to the searchParams so that the user will be redirected back to the page after login.
    loginUrl.searchParams.set("callbackUrl", encodeURI(callbackUrl));
    return NextResponse.redirect(loginUrl);
  }

  // User is real, allow access
  return NextResponse.rewrite(new URL(`/sites/app${path}`, req.url));
}
