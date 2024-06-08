import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atom/card";
import { Header } from "@/components/organism/header/header";
import { UnconfDashboard } from "../../../../components/dashboard/unconf_dashboard/unconf_dashboard.server";
import { getTranslations } from "next-intl/server";

export const metadata = {
  title: "Unconf Dashboard",
  description: "Manage unconf events and view their status",
};

export default async function Home({
  searchParams,
}: {
  searchParams: { edition?: string };
}) {
  const t = await getTranslations("Dashboard.Unconf");
  return (
    <main className="p-4">
      <Header />
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <UnconfDashboard edition={searchParams.edition} />
        </CardContent>
      </Card>
    </main>
  );
}
