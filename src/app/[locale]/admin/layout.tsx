import { AdminShell } from "@/components/admin/admin-shell";

/**
 * DEVELOPMENT ACCESS ONLY:
 * Future staff authentication and admin-role authorization must be enforced
 * at this route boundary before the admin portal is used in production.
 * This temporary shell intentionally performs no session or role checks.
 */
export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
