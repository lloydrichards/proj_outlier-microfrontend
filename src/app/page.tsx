import { Agenda } from "../components/organism/agenda/agenda";
import { Header } from "../components/organism/header/header";

export default async function Home() {
  return (
    <main className="p-1 md:p-6 lg:max-w-screen-lg">
      <Header />
      <div className="p-0 md:p-4 ">
        <Agenda />
      </div>
    </main>
  );
}
