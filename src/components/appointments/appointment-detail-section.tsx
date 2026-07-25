import type { ReactNode } from "react";

export function AppointmentDetailSection({
  children,
  title
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <section className="border-t border-zinc-200 pt-6 first:border-0 first:pt-0 dark:border-zinc-800">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
