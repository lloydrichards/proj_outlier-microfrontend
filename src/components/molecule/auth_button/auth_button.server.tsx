import { SessionProvider } from "next-auth/react";
import { BASE_PATH, auth } from "@/server/auth";

import AuthButtonClient from "./auth_button.client";

export default async function AuthButton() {
  const session = await auth();
  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
    };
  }

  return (
    <SessionProvider basePath={BASE_PATH} session={session}>
      <AuthButtonClient />
    </SessionProvider>
  );
}
