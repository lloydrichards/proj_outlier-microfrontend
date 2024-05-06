import type { FC } from "react";
import { Card, CardHeader, CardTitle } from "../../ui/card";

export const PauseCard: FC<{ className?: string }> = ({ className }) => {
  return (
    <Card variant="transparent" className={className}>
      <CardHeader>
        <CardTitle className="text-center text-foreground/50">PAUSE</CardTitle>
      </CardHeader>
    </Card>
  );
};
