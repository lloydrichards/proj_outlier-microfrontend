import AuthButton from "@/components/molecule/auth_button/auth_button.server";
import { typefaceSubtitle } from "@/components/typeface";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atom/avatar";
import { Button } from "@/components/atom/button";
import { auth } from "@/server/auth";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { LocaleSwitcher } from "@/components/molecule/locale_switcher/locale_switcher";

export const Header = async () => {
  const session = await auth();
  const t = await getTranslations("Auth");
  return (
    <header className="sticky top-0 z-20 flex w-full items-center justify-end gap-4 bg-background px-2 py-6">
      {session ? (
        <>
          <Avatar>
            <AvatarImage src={session.user.image ?? undefined} />
            <AvatarFallback>{session.user.name?.[0] ?? "?"}</AvatarFallback>
          </Avatar>
          <p className={typefaceSubtitle("grow")}>
            {t("welcome_message", { name: session.user.name })}
          </p>
          <LocaleSwitcher />
          <Button asChild>
            <Link href="/api/auth/signout">{t("signOut")}</Link>
          </Button>
        </>
      ) : (
        <AuthButton />
      )}
    </header>
  );
};
