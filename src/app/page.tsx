import { Agenda } from "../components/organism/agenda/agenda";
import { Header } from "../components/organism/header/header";

export default async function Home() {
  return (
    <main className="container">
      <Header />
      <div className="p-2 md:p-4 ">
        <Agenda />
      </div>
    </main>
  );
}
