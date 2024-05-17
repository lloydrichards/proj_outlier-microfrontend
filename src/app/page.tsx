import { Agenda } from "../components/organism/agenda/agenda";
import { Header } from "../components/organism/header/header";

export default async function Home({
  searchParams: { edition },
}: {
  searchParams: { edition?: string };
}) {
  return (
    <main className="grid justify-center">
      <div className="p-1 md:p-6 lg:max-w-screen-lg">
        <Header />
        <div className="p-0 md:p-4 ">
          <Agenda edition={edition} />
        </div>
      </div>
    </main>
  );
}
