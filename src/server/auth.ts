import { env } from "@/env";
import NextAuth, { type NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/GitHub";
import Credentials from "next-auth/providers/credentials";

export const BASE_PATH = "/api/auth";

export const authConfig = {
  providers: [
    GitHub,
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
            password: env.AUTH_ADMIN_PASSWORD,
          },
        ];
        const user = users.find(
          (user) =>
            user.userName === credentials.username &&
            user.password === credentials.password,
        );
        return user ? { id: user.id, name: user.name } : null;
      },
    }),
  ],
  basePath: BASE_PATH,
  secret: env.AUTH_SECRET,
} satisfies NextAuthConfig;

export const { handlers, auth, signOut, signIn } = NextAuth(authConfig);
