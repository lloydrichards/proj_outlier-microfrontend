import { SessionProvider } from "next-auth/react";
import { BASE_PATH, auth } from "@/server/auth";

import AuthButtonClient from "./auth_button.client";

export default async function AuthButton() {
  const session = await auth();

  return (
    <SessionProvider basePath={BASE_PATH} session={session}>
      <AuthButtonClient />
    </SessionProvider>
  );
}
