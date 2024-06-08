import { Card, CardHeader, CardTitle } from "@/components/atom/card";
import { SearchX } from "lucide-react";
import { getTranslations } from "next-intl/server";

const NotFound = async () => {
  const t = await getTranslations("NotFound");
  return (
    <section className="flex h-screen w-full items-center justify-center bg-mustard p-6">
      <Card
        variant="mustard"
        direction="row"
        className="w-fit gap-4 border-2 border-mustard-foreground p-8"
      >
        <SearchX className="size-20 self-center text-mustard-foreground" />
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardTitle className="opacity-60">{t("message")}</CardTitle>
        </CardHeader>
      </Card>
    </section>
  );
};

export default NotFound;
