import { NextRequest, NextResponse } from "next/server";

export const protectedSubdomains = ["admin", "app"];

const isProduction = process.env.NODE_ENV === "production";
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

  if (isProtectedDomain) {
    // Redirect if user is not logged in

    // Rewrites for admin pages
    if (isAdminDomain) {
      // User is not an admin, redirect to 403 unauthorized

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
    return NextResponse.rewrite(new URL(`/home${path}`, req.url));
  }
}
