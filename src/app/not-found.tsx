import { Button } from "@/components/atom/button";
import { Card, CardHeader, CardTitle } from "@/components/atom/card";
import { ArrowRight, Languages } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <section className="flex h-screen w-full items-center justify-center bg-mustard p-6">
      <Card
        variant="mustard"
        direction="row"
        className="w-fit gap-4 border-2 border-mustard-foreground p-8"
      >
        <Languages className="size-20 self-center text-mustard-foreground" />
        <CardHeader>
          <CardTitle>{"Locale not Found"}</CardTitle>
          <CardTitle className="opacity-60">
            {"The locale you are looking for does not exist."}
          </CardTitle>
          <Button className="w-fit uppercase" variant="mustard" asChild>
            <Link href="/">
              <ArrowRight />
              {"Home Page"}
            </Link>
          </Button>
        </CardHeader>
      </Card>
    </section>
  );
};

export default NotFound;
