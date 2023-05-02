import { ADMIN_HOSTNAMES, APP_HOSTNAMES } from "@lib/constants";
import { isHomeHostname, parse } from "@lib/middleware/utils";
import { NextRequest } from "next/server";
import {
  AdminMiddleware,
  AppMiddleware,
  HomeMiddleware,
} from "@lib/middleware";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_proxy/, /_auth/, /_root/ (special pages for OG tags proxying, password protection, and placeholder _root pages)
     * 4. /_static (inside /public)
     * 5. /_vercel (Vercel internals)
     * 6. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_proxy/|_auth/|_root/|_static|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export async function middleware(req: NextRequest) {
  const { domain, key } = parse(req);
  const home = isHomeHostname(domain);

  // for Admin (admin.????.com,  admin.localhost:4000, admin.project.com:4000)
  if (ADMIN_HOSTNAMES.has(domain)) {
    console.log("im in admin");
    return AdminMiddleware(req);
  }

  // for App (app.????.com,  app.localhost:4000, app.project.com:4000)
  if (APP_HOSTNAMES.has(domain)) {
    console.log("im in app");
    return AppMiddleware(req);
  }

  // Root page (????.com, localhost:4000, project.com:4000)
  if (key.length === 0) {
    console.log("im in root");
    // Add marketing website here
    // return RootMiddleware(req);
  }

  if (home) {
    console.log("im in home");
    return HomeMiddleware(req);
  }
}
