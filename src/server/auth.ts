import { env } from "@/env";
import NextAuth, { type NextAuthConfig, type DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/GitHub";
import Credentials from "next-auth/providers/credentials";

export const BASE_PATH = "/api/auth";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }
  interface User {
    role: UserRole;
  }
}

type UserRole = "ADMIN" | "USER";
export const ROLE: Record<UserRole, UserRole> = {
  ADMIN: "ADMIN",
  USER: "USER",
};

export const authConfig = {
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role as UserRole;
      return session;
    },
  },
  providers: [
    GitHub({
      profile(profile) {
        return {
          ...profile,
          id: profile.id.toString(),
          role: ROLE.USER,
        };
      },
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const users = [
          {
            id: "sudo",
            userName: "admin",
            name: "Admin Mode",
            email: "admin@outlier.com",
            password: env.AUTH_ADMIN_PASSWORD,
          },
        ];
        const user = users.find(
          (user) =>
            user.userName === credentials.username &&
            user.password === credentials.password,
        );
        return user ? { ...user, role: ROLE.ADMIN } : null;
      },
    }),
  ],
  basePath: BASE_PATH,
  secret: env.AUTH_SECRET,
} satisfies NextAuthConfig;

export const { handlers, auth, signOut, signIn } = NextAuth(authConfig);
