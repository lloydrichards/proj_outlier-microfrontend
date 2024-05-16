import { UnconfForm } from "@/components/organism/unconf_form/unconf_form";
import { api } from "@/trpc/server";
import { notFound } from "next/navigation";

export default async function UnconfFormPage({
  params,
}: {
  params: { blockId: number };
}) {
  const agenda = await api.block.getAgenda({ edition: null, date: null });
  const unconfBlocks = agenda.filter((block) => block.type === "UNCONF");
  const block = unconfBlocks.find((block) => block.id === +params.blockId);
  if (!block) {
    return notFound();
  }
  return (
    <section className="min-h-screen px-4 py-8">
      <UnconfForm blockId={+params.blockId} />
    </section>
  );
}
