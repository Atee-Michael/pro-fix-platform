# Admin portal access

The routes under `src/app/[locale]/admin` currently provide unrestricted
development access using mock data only.

Before production use, enforce staff authentication and admin-role authorization
at `src/app/[locale]/admin/layout.tsx`. The current implementation intentionally
contains no session, role, ownership, Supabase, or row-level security checks.
