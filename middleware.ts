import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { UserRole } from "@prisma/client";

const isProduction = process.env.NODE_ENV === "production";
const protectedSubdomains = ["admin", "app"];
const httpTrimmedUrl = isProduction
  ? process.env.NEXT_PUBLIC_PROD_HOME_URL!.replace("https://", "")
  : process.env.NEXT_PUBLIC_DEV_HOME_URL!.replace("http://", "");

export const config = {
  matcher: ["/((?!api/|_next/|_static/|examples/|[\\w-]+\\.\\w+).*)"],
};

export enum Subdomains {
  admin = "admin",
  app = "app",
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname of request
  const hostname = req.headers.get("host") || httpTrimmedUrl;

  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = url.pathname;

  const currentSubdomain =
    process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
      ? hostname.replace(".vercel.pub", "") // Replace .vercel.pub with domain name when we deploy to production
      : hostname
          .replace(".localhost:4000", "") // account for localhost & vanity on localhost
          .replace(".project.com:4000", "");

  const isAdminDomain = currentSubdomain === Subdomains.admin;
  const isAppDomain = currentSubdomain === Subdomains.app;
  const isProtectedDomain = protectedSubdomains.some(
    (subdomain) => subdomain === currentSubdomain
  );

  const token = await getToken({ req });
  console.log("token", token);

  if (isProtectedDomain) {
    // Redirect if user is not logged in
    if (!token) {
      const url = new URL(
        `/login`,
        isProduction
          ? process.env.NEXT_PUBLIC_PROD_HOME_URL
          : process.env.NEXT_PUBLIC_DEV_HOME_URL
      );

      // Encode the callbackUrl and add it to the searchParams so that the user will be redirected back to the page after login.
      // url.searchParams.set("callbackUrl", encodeURI(req.url));
      return NextResponse.redirect(url);
    }

    // Rewrites for admin pages
    if (isAdminDomain) {
      // User is not an admin, redirect to 403 unauthorized
      if (token.role !== UserRole.Admin) {
        const url = new URL(
          `/403`,
          isProduction
            ? process.env.NEXT_PUBLIC_PROD_APP_URL
            : process.env.NEXT_PUBLIC_DEV_APP_URL
        );

        return NextResponse.rewrite(url);
      }

      // User is Admin, allow access
      return NextResponse.rewrite(
        new URL(`/sites/${currentSubdomain}${path}`, req.url)
      );
    }

    // Rewrite root application to `/app` folder
    if (isAppDomain) {
      return NextResponse.rewrite(
        new URL(`/sites/${currentSubdomain}${path}`, req.url)
      );
    }
  }

  // Rewrite root application to `/home` folder
  if (currentSubdomain === httpTrimmedUrl) {
    // Check if user is logged in and on login or register page

    return NextResponse.rewrite(new URL(`/home${path}`, req.url));
  }
}
