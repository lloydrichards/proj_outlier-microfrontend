import NextAuth, { type NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/GitHub";

export const authConfig = {
  providers: [GitHub],
  // adapter: DrizzleAdapter(db),
} satisfies NextAuthConfig;

export const { handlers, auth, signOut, signIn } = NextAuth(authConfig);
