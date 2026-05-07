import Image from "next/image";
import {
  Badge,
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Container,
  Input,
  PageHeader,
  Section
} from "@/components";

export default function DesignPage() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <PageHeader
        actions={
          <>
            <Button>Book service</Button>
            <Button variant="secondary">View inspection</Button>
          </>
        }
        description="Reusable UI foundations for the Pro-Fix platform, shaped around a premium automotive palette."
        eyebrow="Design system"
        title="Pro-Fix component preview"
      />

      <Section>
        <Container className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <div>
            <Badge tone="dark">Brand</Badge>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">
              Logo and palette
            </h2>
          </div>
          <Card className="grid gap-6 bg-gradient-to-br from-zinc-950 to-blue-950 text-white">
            <Image
              alt="Pro-Fix Auto Services"
              className="h-auto w-56"
              height={64}
              priority
              src="/pro-fix-logo.svg"
              width={220}
            />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["Black", "bg-zinc-950"],
                ["White", "bg-white"],
                ["Silver", "bg-zinc-300"],
                ["Deep blue", "bg-blue-800"]
              ].map(([label, color]) => (
                <div className="grid gap-2" key={label}>
                  <div className={`h-16 rounded-md border border-white/15 ${color}`} />
                  <p className="text-sm font-medium text-zinc-200">{label}</p>
                </div>
              ))}
            </div>
          </Card>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Badge>Buttons</Badge>
              <CardTitle>Service actions</CardTitle>
              <CardDescription>
                Clear actions for booking, review, and secondary flows.
              </CardDescription>
            </CardHeader>
            <div className="flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <Badge tone="silver">Inputs</Badge>
              <CardTitle>Customer details</CardTitle>
              <CardDescription>
                Form controls for early booking and lead capture surfaces.
              </CardDescription>
            </CardHeader>
            <Input
              id="vehicle-registration"
              label="Vehicle registration"
              placeholder="AB12 CDE"
            />
          </Card>

          <Card>
            <CardHeader>
              <Badge tone="dark">Cards</Badge>
              <CardTitle>Inspection summary</CardTitle>
              <CardDescription>
                Compact surfaces for status, notes, and service information.
              </CardDescription>
            </CardHeader>
            <div className="grid gap-3 text-sm text-zinc-700">
              <p className="flex items-center justify-between">
                <span>Brake check</span>
                <Badge tone="blue">Ready</Badge>
              </p>
              <p className="flex items-center justify-between">
                <span>Oil service</span>
                <Badge tone="silver">Queued</Badge>
              </p>
            </div>
          </Card>
        </Container>
      </Section>
    </main>
  );
}
