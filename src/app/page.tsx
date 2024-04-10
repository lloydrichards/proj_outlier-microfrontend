import Link from "next/link";

import { api } from "@/trpc/server";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <Agenda />
      </div>
    </main>
  );
}

const Agenda = async () => {
  const agenda = await api.block.getAll();

  return (
    <div className="w-full max-w-xs">
      {agenda.length > 0 ? (
        agenda.map((block) => (
          <div
            key={block.id}
            className="flex flex-col gap-2 rounded border p-4"
          >
            <h2 className="text-2xl font-bold">{block.type}</h2>
            <p>
              {block.start.toLocaleDateString()} -{" "}
              {block.start.toLocaleTimeString()} to{" "}
              {block.end.toLocaleTimeString()}
            </p>
          </div>
        ))
      ) : (
        <p>Agenda has not be posted yet.</p>
      )}
    </div>
  );
};
