import AuthButton from "@/components/molecule/auth_button/auth_button.server";
import { typefaceSubtitle } from "@/components/typeface";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { auth } from "@/server/auth";
import Link from "next/link";

export const Header = async () => {
  const session = await auth();

  return (
    <header className="sticky top-0 z-10 flex w-full items-center justify-end gap-4 bg-background px-2 py-6">
      {session ? (
        <>
          <Avatar>
            <AvatarImage src={session.user.image ?? undefined} />
            <AvatarFallback>{session.user.name?.[0] ?? "?"}</AvatarFallback>
          </Avatar>
          <p className={typefaceSubtitle("grow")}>
            Welcome, {session.user.name}
          </p>
          <Button asChild>
            <Link href="/api/auth/signout">Sign Out</Link>
          </Button>
        </>
      ) : (
        <AuthButton />
      )}
    </header>
  );
};
