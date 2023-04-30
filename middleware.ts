import { NextRequest, NextResponse } from "next/server";

const LOCALHOST_URL = "localhost:4000/";

export const config = {
  matcher: ["/((?!api/|_next/|_static/|examples/|[\\w-]+\\.\\w+).*)"],
};

export const getValidSubdomain = (host?: string | null) => {
  let subdomain: string | null = null;
  if (!host && typeof window !== "undefined") {
    // On client side, get the host from window
    host = window.location.host;
  }
  if (host && host.includes(".")) {
    const candidate = host.split(".")[0];
    if (candidate && !candidate.includes("localhost")) {
      // Valid candidate
      subdomain = candidate;
    }
  }
  return subdomain;
};

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname of request
  const hostname = req.headers.get("host") || "localhost:4000";

  // Get subdomain from hostname
  const subdomain = getValidSubdomain(hostname);

  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = url.pathname;

  const currentHost =
    process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
      ? hostname.replace(".vercel.pub", "") // Replace .vercel.pub with domain name when we deploy to production
      : hostname.replace(".localhost:4000", "");

  // rewrites for app pages
  if (currentHost === "admin") {
    // redirect if user is not logged in
    // if (
    //   url.pathname === '/login' &&
    //   (req.cookies.get('next-auth.session-token') ||
    //     req.cookies.get('__Secure-next-auth.session-token'))
    // ) {
    //   url.pathname = '/';
    //   return NextResponse.redirect(url);
    // }

    console.log("admin");
    return NextResponse.rewrite(
      new URL(`/sites/${currentHost}${path}`, req.url)
    );
  }

  // rewrite root application to `/app` folder
  if (currentHost === "app") {
    console.log("app");
    return NextResponse.rewrite(
      new URL(`/sites/${currentHost}${path}`, req.url)
    );
  }

  // rewrite root application to `/home` folder
  if (currentHost === "localhost:4000") {
    console.log("home");
    return NextResponse.rewrite(new URL(`/home${path}`, req.url));
  }
}
