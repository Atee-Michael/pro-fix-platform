import { Badge, Card, CardDescription, CardHeader, CardTitle } from "@/components";

type DashboardPlaceholderProps = {
  description: string;
  eyebrow: string;
  placeholder: string;
  title: string;
};

export function DashboardPlaceholder({
  description,
  eyebrow,
  placeholder,
  title
}: DashboardPlaceholderProps) {
  return (
    <div>
      <Badge>{eyebrow}</Badge>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl leading-7 text-zinc-600 dark:text-zinc-300">
        {description}
      </p>
      <Card className="mt-8">
        <CardHeader className="mb-0">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{placeholder}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
