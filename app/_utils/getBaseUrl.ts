export default function getBaseUrl() {
  return process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
    ? "https://vercel.pub" // Replace .vercel.pub with domain name when we deploy to production
    : "http://localhost:4000";
}
