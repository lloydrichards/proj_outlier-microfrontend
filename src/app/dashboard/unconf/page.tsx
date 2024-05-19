import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atom/card";
import { Header } from "@/components/organism/header/header";
import { UnconfDashboard } from "../../../components/dashboard/unconf_dashboard/unconf_dashboard.server";

export const metadata = {
  title: "Unconf Dashboard",
  description: "Manage unconf events and view their status",
};

export default async function Home({
  searchParams,
}: {
  searchParams: { edition?: string };
}) {
  return (
    <main className="p-4">
      <Header />
      <Card>
        <CardHeader>
          <CardTitle>Pending Unconf Events</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UnconfDashboard edition={searchParams.edition} />
        </CardContent>
      </Card>
    </main>
  );
}
