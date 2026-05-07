# Pro-Fix Auto Services

Premium automotive service platform with secure booking, customer portal and admin management tools.

Built for BMW, MINI, BMW Motorrad and other premium automotive brands.

---

# About Pro-Fix

Pro-Fix Auto Services is based in Lomé, Togo and was built from over 30 years of experience operating as the sole BMW dealership with representation across 8 Sub-Saharan African countries.

The platform combines premium automotive expertise with modern secure web engineering to provide customers with a professional digital experience for:

- Appointment booking
- Vehicle management
- Repair tracking
- Diagnostic reports
- Receipts
- Customer support
- Secure customer portal access

---

# Core Features

## Public Website

- Modern premium homepage
- Services pages
- Booking page
- News and Advice
- Contact page
- Support page
- English and French support
- Dark and light theme

## Customer Portal

- Dashboard overview
- Vehicle management
- Appointment management
- Repair history
- Reports and receipts
- Support tickets
- Profile settings

## Admin Portal

- Appointment management
- Customer management
- Vehicle management
- Support ticket management
- Article management
- Internal notes and status tracking

---

# Technology Stack

## Frontend

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- next-intl

## Backend

- Supabase
- PostgreSQL
- Auth.js
- Zod

## Hosting

- Vercel

---

# Security

The platform follows secure-by-design principles.

Key protections include:

- Row Level Security
- Role-based access control
- Secure authentication
- Zod validation
- Rate limiting
- Secure headers
- Safe server-side validation
- Protected admin routes

See:

```txt
SECURITY_GUIDELINES.md
SUPABASE_ARCHITECTURE.md
```

---

# Local Development

## Install dependencies

```bash
npm install
```

## Start development server

```bash
npm run dev
```

## Run checks

```bash
npm run lint
npm run typecheck
npm run build
```

---

# Environment Variables

Create:

```txt
.env.local
```

Example:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Never commit secrets.

---

# Internationalisation

Supported languages:

- English
- French

Routes:

```txt
/en
/fr
```

---

# Project Documentation

- PROJECT_GUIDE.md
- SUPABASE_ARCHITECTURE.md
- SECURITY_GUIDELINES.md

---

# Final Goal

Build a premium, modern and secure automotive service platform that reflects both high-end automotive standards and strong cybersecurity engineering practices.
