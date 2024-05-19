"use client";
import { useSession } from "next-auth/react";

import { Button } from "@/components/atom/button";

import { signIn, signOut } from "@/server/actions/auth";

export default function AuthButton() {
  const session = useSession();

  return session?.data?.user ? (
    <Button
      onClick={async () => {
        await signOut();
        await signIn();
      }}
    >
      {session.data?.user?.name} : Sign Out
    </Button>
  ) : (
    <Button onClick={async () => await signIn()}>Sign In</Button>
  );
}
