# Security Guidelines

This project should treat security-sensitive functionality as explicit work, not incidental implementation detail.

## Environment Variables

- Do not commit real secrets, API keys, service-role keys, tokens, or database credentials.
- Use `.env.example` for required variable names only.
- Keep local values in `.env.local`, which must remain ignored by Git.
- Never expose server-only secrets through `NEXT_PUBLIC_` variables.

## Supabase Keys

- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are safe for browser use when paired with correct Row Level Security policies.
- `SUPABASE_SERVICE_ROLE_KEY` is server-only and must never be imported into client components, bundled code, or public routes.
- Enable and verify Row Level Security before adding data access features.

## Application Boundaries

- Keep authentication, authorization, Supabase access, and dashboard functionality out of the base scaffold until they are intentionally added.
- Validate all server-side inputs before using them in database calls or privileged operations.
- Prefer least-privilege access patterns for API routes, server actions, and background tasks.

## Dependency Hygiene

- Review dependency changes before merging.
- Run `npm audit` periodically and assess fixes before applying breaking updates.
- Keep framework, linting, and build tooling current through planned maintenance changes.

