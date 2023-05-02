import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "@prisma/client";
import { ENV_URLS } from "@lib/constants";
import { getToken } from "next-auth/jwt";
import { parse } from "./utils";

export default async function AdminMiddleware(req: NextRequest) {
  const token = await getToken({ req });
  const { path } = parse(req);

  // If there is no token user is not logged in, redirect the user to the login page.
  if (!token) {
    const loginUrl = new URL(`/login`, ENV_URLS.home);
    const callbackUrl = ENV_URLS.admin + path;

    // Encode the callbackUrl and add it to the searchParams so that the user will be redirected back to the page after login.
    loginUrl.searchParams.set("callbackUrl", encodeURI(callbackUrl));
    return NextResponse.redirect(loginUrl);
  }

  // If the user is logged in but the user is not an admin, redirect to 403 unauthorized
  if (token.role !== UserRole.Admin) {
    const url = new URL(`/403`, ENV_URLS.app);
    return NextResponse.rewrite(url);
  }

  // User is Admin, allow access
  return NextResponse.rewrite(new URL(`/sites/admin${path}`, req.url));
}
