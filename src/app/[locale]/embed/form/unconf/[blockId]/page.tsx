import { LocaleSwitcher } from "@/components/molecule/locale_switcher/locale_switcher";
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
    <section className="relative min-h-screen px-4 py-14">
      <UnconfForm block={block} />
      <LocaleSwitcher className="absolute left-3 top-2 opacity-80" />
    </section>
  );
}
