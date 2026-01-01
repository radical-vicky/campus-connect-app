import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        academic: "border-transparent bg-academic text-academic-foreground",
        events: "border-transparent bg-events text-events-foreground",
        emergency: "border-transparent bg-emergency text-emergency-foreground animate-pulse",
        social: "border-transparent bg-social text-social-foreground",
        jobs: "border-transparent bg-jobs text-jobs-foreground",
        lostfound: "border-transparent bg-lostfound text-lostfound-foreground",
        urgent: "border-transparent bg-emergency text-emergency-foreground animate-pulse",
        high: "border-transparent bg-warning text-warning-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
