"use client";
import { useSession } from "next-auth/react";

import { Button } from "@/components/atom/button";

import { signIn, signOut } from "@/server/actions/auth";
import { useTranslations } from "next-intl";

export default function AuthButton() {
  const session = useSession();
  const t = useTranslations("Auth");
  return session?.data?.user ? (
    <Button
      onClick={async () => {
        await signOut();
        await signIn();
      }}
    >
      {session.data?.user?.name} : {t("signOut")}
    </Button>
  ) : (
    <Button onClick={async () => await signIn()}>{t("signIn")}</Button>
  );
}
