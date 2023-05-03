import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User {
    role?: Role;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
  }
}
