import type { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import type { Block } from "@/server/db/schema";
import { cn } from "@/lib/utils";
import { typefaceSubtitle } from "../typeface";

type BlockCardProps = {
  type: Block["type"];
  className?: string;
};

export const BlockCard: FC<BlockCardProps> = ({ type, className }) => {
  switch (type) {
    case "ANNOUNCEMENT":
      return (
        <Card className={className}>
          <CardHeader>
            <span className={typefaceSubtitle()}>ANNOUNCEMENT</span>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>Grab a coffee</CardDescription>
          </CardHeader>
        </Card>
      );
    case "LIGHTENING":
      return (
        <Card variant="turquoise" className={cn("", className)}>
          <CardHeader>
            <span className={typefaceSubtitle()}>LIGHTENING</span>
          </CardHeader>
          <CardContent>
            <p>Speaker - Title</p>
            <p>Speaker - Title</p>
            <p>Speaker - Title</p>
          </CardContent>
        </Card>
      );
    case "NETWORKING":
      return (
        <Card className={className}>
          <CardHeader>
            <span className={typefaceSubtitle()}>NETWORKING</span>

            <CardTitle></CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      );
    case "PAUSE":
      return (
        <Card variant="transparent" className={cn("", className)}>
          <CardHeader>
            <CardTitle className="text-center text-foreground/50">
              PAUSE
            </CardTitle>
          </CardHeader>
        </Card>
      );
    case "SPEAKER":
      return (
        <Card variant="plum" className={cn("", className)}>
          <CardHeader>
            <span className={typefaceSubtitle()}>SPEAKER</span>

            <CardTitle>Title</CardTitle>
            <CardDescription>Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Speaker 1, Speaker 2</p>
          </CardContent>
        </Card>
      );
    case "UNCONF":
      return (
        <Card variant="mustard" className={cn("", className)}>
          <CardHeader>
            <span className={typefaceSubtitle()}>UNCONF</span>
            <CardTitle></CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      );
  }
};
