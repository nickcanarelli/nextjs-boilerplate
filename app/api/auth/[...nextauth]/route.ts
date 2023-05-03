import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { type NextAuthOptions } from "next-auth";
import { prisma } from "@helpers/prisma";
import { User } from "@prisma/client";
import { compare } from "bcrypt";

const allowedSubdomains = ["admin", "app"];

const isProduction = process.env.NODE_ENV === "production";
const useSecureCookies = process.env.NEXTAUTH_URL!.startsWith("https://");
const cookiePrefix = useSecureCookies ? "__Secure-" : "";
const hostName = new URL(process.env.NEXTAUTH_URL!).hostname;

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Sign In",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        console.log("user: ", user);

        return {
          id: user.id + "",
          email: user.email,
          role: user.role,
          name: user.name,
          stripeCustomerId: user.stripeCustomerId ?? "",
          stripeSubscriptionId: user.stripeSubscriptionId ?? "",
        };
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      const baseUrlHostname = new URL(baseUrl).hostname;
      const urlHostname = new URL(url).hostname.includes(".")
        ? new URL(url).hostname.split(".")[1]
        : new URL(url).hostname;
      const currentSubdomain = isProduction
        ? url.replace("https://", "").split(".")[0]
        : url.replace("http://", "").split(".")[0];

      if (allowedSubdomains.includes(currentSubdomain)) return url;
      if (url === process.env.NEXT_PUBLIC_DEV_APP_URL) return url;
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (urlHostname === baseUrlHostname) return url;
      else if (new URL(url).origin === baseUrl) return url;

      return baseUrl;
    },
    // In order of operations, this is the order of callbacks in order to set user details to the session: JWT -> Session
    async jwt({ token, user }) {
      // console.log("JWT Callback", { token, user });
      const u = user as unknown as User;

      if (user) {
        return {
          ...token,
          id: u.id,
          role: u.role,
          stripeCustomerId: u.stripeCustomerId ?? "",
          stripeSubscriptionId: u.stripeSubscriptionId ?? "",
          // Add more user details here to then set on the session
        };
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session Callback", { session, token });

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          stripeCustomerId: token.stripeCustomerId ?? "",
          stripeSubscriptionId: token.stripeSubscriptionId ?? "",
          // Add more user details here
        },
      };
    },
  },
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        domain: hostName == "project.com:4000" ? hostName : "." + hostName, // add a . in front so that subdomains are included
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
