import { ALL_LOCALES } from "@/lib/i18n";
import { Agenda } from "../../components/organism/agenda/agenda";
import { Header } from "../../components/organism/header/header";

export default async function Home({
  searchParams: { edition },
}: {
  searchParams: { edition?: string };
}) {
  return (
    <main className="grid justify-center p-1 md:p-6 ">
      <Header />
      <Agenda edition={edition} className="p-0 md:p-4 lg:max-w-screen-lg" />
    </main>
  );
}
