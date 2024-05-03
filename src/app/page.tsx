import AuthButton from "@/components/molecule/auth_button/auth_button.server";
import { BlockCard } from "@/components/organism/block_card/block_card";
import { Button } from "@/components/ui/button";
import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <pre>{JSON.stringify(session, null, 2)}</pre>
        {session ? (
          <Button asChild>
            <Link href="/api/auth/signout">Sign Out</Link>
          </Button>
        ) : (
          <AuthButton />
        )}
        <Agenda />
      </div>
    </main>
  );
}

const Agenda = async () => {
  const agenda = await api.block.getAll();

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      {agenda.length > 0 ? (
        agenda.map((block) => <BlockCard key={block.id} type={block.type} />)
      ) : (
        <p>Agenda has not be posted yet.</p>
      )}
    </div>
  );
};
