import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Section({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn(
        "border-b border-zinc-200 py-14 dark:border-zinc-800 sm:py-18",
        className
      )}
      {...props}
    />
  );
}
