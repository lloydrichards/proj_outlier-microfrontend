import AuthButton from "@/components/molecule/auth_button/auth_button.server";
import { BlockCard } from "@/components/organism/block_card/block_card";
import { typefaceSubtitle } from "@/components/typeface";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <main className="container">
      <header className="sticky top-0 flex w-full items-center justify-end gap-4 bg-background px-2 py-6">
        {session ? (
          <>
            <Avatar>
              <AvatarImage src={session.user.image ?? ""} />
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
      {/* <BlockForm /> */}
      <div className="container p-4 ">
        <Agenda />
      </div>
    </main>
  );
}

const Agenda = async () => {
  const agenda = await api.block.getAll();

  return (
    <div className="grid w-full gap-2">
      {agenda.length > 0 ? (
        agenda.map((block) => <BlockCard key={block.id} type={block.type} />)
      ) : (
        <p>Agenda has not be posted yet.</p>
      )}
    </div>
  );
};
