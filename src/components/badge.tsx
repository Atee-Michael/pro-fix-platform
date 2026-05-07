import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "blue" | "silver" | "dark";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
};

const toneClasses: Record<BadgeTone, string> = {
  blue: "border-blue-800/20 bg-blue-800/10 text-blue-900",
  silver: "border-zinc-300 bg-zinc-100 text-zinc-700",
  dark: "border-zinc-800 bg-zinc-950 text-white"
};

export function Badge({ className, tone = "blue", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        toneClasses[tone],
        className
      )}
      {...props}
    />
  );
}
