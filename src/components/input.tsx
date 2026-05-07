import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Input({ className, id, label, ...props }: InputProps) {
  return (
    <label className="grid gap-2 text-sm font-medium text-zinc-800" htmlFor={id}>
      {label}
      <input
        className={cn(
          "h-11 rounded-md border border-zinc-300 bg-white px-3 text-base text-zinc-950 outline-none transition-colors placeholder:text-zinc-400 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/15",
          className
        )}
        id={id}
        {...props}
      />
    </label>
  );
}
