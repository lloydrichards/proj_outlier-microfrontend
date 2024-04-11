import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { typefaceMeta } from "../typeface";

const buttonVariants = cva(
  typefaceMeta(
    "inline-flex items-center justify-center whitespace-nowrap rounded ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  ),
  {
    variants: {
      variant: {
        default: "bg-background text-foreground hover:text-foreground/80",
        turquoise:
          "bg-turquoise text-turquoise-foreground hover:bg-turquoise/90",
        plum: "bg-plum text-plum-foreground hover:bg-plum/90",
        mustard: "bg-mustard text-mustard-foreground hover:bg-mustard/90",
        ghost: "hover:bg-foreground/10 hover:text-foreground",
        link: "text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded px-3",
        lg: "h-11 rounded px-8",
        icon: "size-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
