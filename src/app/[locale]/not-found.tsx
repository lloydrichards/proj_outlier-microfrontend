import { Card, CardHeader, CardTitle } from "@/components/atom/card";
import { SearchX } from "lucide-react";

const NotFound = () => {
  return (
    <section className="flex h-screen w-full items-center justify-center bg-mustard p-6">
      <Card
        variant="mustard"
        direction="row"
        className="w-fit gap-4 border-2 border-mustard-foreground p-8"
      >
        <SearchX className="size-20 self-center text-mustard-foreground" />
        <CardHeader>
          <CardTitle>Not Found</CardTitle>
          <CardTitle className="opacity-60">
            Could not find requested resource
          </CardTitle>
        </CardHeader>
      </Card>
    </section>
  );
};

export default NotFound;
