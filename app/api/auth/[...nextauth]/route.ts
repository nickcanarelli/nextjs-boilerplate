import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { type NextAuthOptions } from "next-auth";
import { prisma } from "@helpers/prisma";
import { User } from "@prisma/client";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
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
        // Handle Authentication!
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

        return {
          id: user.id + "",
          email: user.email,
          role: user.role,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    // In order of operations, this is the order of callbacks in order to set user details to the session: JWT -> Session
    async jwt({ token, user }) {
      // console.log("JWT Callback", { token, user });
      const u = user as unknown as User;

      if (user) {
        return {
          ...token,
          id: u.id,
          role: u.role,
          // Add more user details here to then set on the session
        };
      }
      return token;
    },
    async session({ session, token }) {
      // console.log("Session Callback", { session, token });

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          // Add more user details here
        },
      };
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
