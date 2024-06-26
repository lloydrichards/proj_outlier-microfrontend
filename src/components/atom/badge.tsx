import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { typefaceMeta } from "../typeface";

const badgeVariants = cva(
  typefaceMeta(
    "inline-flex items-center rounded border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  ),
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        turquoise:
          "border-turquoise-foreground bg-turquoise text-turquoise-foreground",
        plum: "border-plum-foreground bg-plum text-plum-foreground",
        mustard: "border-mustard-foreground bg-mustard text-mustard-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
