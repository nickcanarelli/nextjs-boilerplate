const isProduction = process.env.NODE_ENV === "production";

export default function getBaseUrl() {
  return isProduction && process.env.VERCEL === "1"
    ? process.env.NEXT_PUBLIC_PROD_HOME_URL // Replace .vercel.pub with domain name when we deploy to production
    : process.env.NEXT_PUBLIC_DEV_HOME_URL;
}
