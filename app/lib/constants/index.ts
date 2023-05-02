const isProduction = process.env.NODE_ENV === "production";

export const HOME_HOSTNAMES = new Set([
  "????.com",
  "localhost",
  "localhost:4000",
  "project.com:4000",
]);

export const APP_HOSTNAMES = new Set([
  "app.????.com",
  "app.localhost:4000",
  "app.project.com:4000",
]);

export const ADMIN_HOSTNAMES = new Set([
  "admin.????.com",
  "admin.localhost:4000",
  "admin.project.com:4000",
]);

export const ENV_URLS = {
  home: isProduction
    ? process.env.NEXT_PUBLIC_PROD_HOME_URL!
    : process.env.NEXT_PUBLIC_DEV_HOME_URL!,
  app: isProduction
    ? process.env.NEXT_PUBLIC_PROD_APP_URL!
    : process.env.NEXT_PUBLIC_DEV_APP_URL!,
  admin: isProduction
    ? process.env.NEXT_PUBLIC_PROD_ADMIN_URL!
    : process.env.NEXT_PUBLIC_DEV_ADMIN_URL!,
};
