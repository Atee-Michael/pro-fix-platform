import type { ReactNode } from "react";
import { Badge } from "@/components/badge";
import { Container } from "@/components/container";

type PageHeaderProps = {
  actions?: ReactNode;
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHeader({
  actions,
  description,
  eyebrow,
  title
}: PageHeaderProps) {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950 py-16 text-white sm:py-20">
      <Container className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-3xl">
          {eyebrow ? (
            <Badge className="border-blue-400/20 bg-blue-400/10 text-blue-100">
              {eyebrow}
            </Badge>
          ) : null}
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </Container>
    </header>
  );
}
