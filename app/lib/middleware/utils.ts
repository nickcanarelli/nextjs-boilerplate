import { HOME_HOSTNAMES } from "../constants";
import { NextRequest } from "next/server";

const isProduction = process.env.NODE_ENV === "production";

export const parse = (req: NextRequest) => {
  let domain = req.headers.get("host");
  domain = domain!.replace("www.", ""); // remove www. from domain

  if (HOME_HOSTNAMES.has(domain))
    domain = isProduction ? "" : "project.com:4000"; // add domain when pushing to production
  const path = req.nextUrl.pathname;
  const key = decodeURIComponent(path.split("/")[1]); // to handle foreign languages like Hebrew

  return { domain, path, key };
};

export const isHomeHostname = (domain: string) => {
  return HOME_HOSTNAMES.has(domain) || domain.endsWith(".vercel.app");
};
