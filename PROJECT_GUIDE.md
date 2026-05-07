# PROJECT GUIDE

# Pro-Fix Auto Services Platform Engineering Guide

## Introduction

This document serves as the full engineering and architectural guide for the Pro-Fix Auto Services platform.

It explains how the platform was designed, how it should be built, the reasoning behind the technical decisions, the security approach, the development workflow and the overall system architecture.

The goal is to demonstrate that the project was intentionally engineered as a production-grade automotive platform rather than simply assembled as a basic website.

The platform combines:

- Premium automotive branding
- Modern web engineering
- Secure-by-design architecture
- Scalable backend systems
- Professional UX principles
- Bilingual support
- Production-ready deployment standards

The project also reflects practical automotive industry experience gained from over 30 years of BMW dealership operations across 8 Sub-Saharan African countries.

---

# 1. Project Vision

## Business Goal

Build a premium automotive digital platform for:

- BMW
- MINI
- BMW Motorrad
- Other premium automotive brands

The platform should provide customers with:

- Online booking
- Vehicle management
- Repair tracking
- Diagnostic reports
- Receipts and invoices
- Customer support
- Secure account management

The platform should also provide internal operational tools for staff and administrators.

---

# 2. Engineering Philosophy

This project follows several key principles.

## Secure by Design

Security must be integrated into the platform architecture from the start rather than added later.

The project should demonstrate:

- Secure authentication
- Role-based access control
- Defensive coding
- Secure storage
- Safe API patterns
- Data privacy awareness
- Production deployment readiness

---

## Production-First Thinking

Every feature should be built as if intended for real-world production use.

This means:

- Type safety
- Validation
- Error handling
- Logging
- Scalability
- Maintainability
- Testing
- CI/CD readiness

---

## Controlled Development

The project should be built in structured phases and small branches rather than attempting to generate everything at once.

This improves:

- Stability
- Maintainability
- Debugging
- AI-assisted development reliability
- Code review quality

---

# 3. Technology Stack Decisions

## Frontend

### Next.js App Router

Chosen for:

- Modern React architecture
- Server Components
- Route grouping
- Better scalability
- Strong TypeScript support
- Secure server actions
- Production deployment support

---

### TypeScript

Chosen to enforce:

- Type safety
- Safer refactoring
- Reduced runtime errors
- Better maintainability

Strict mode must remain enabled.

---

### Tailwind CSS

Chosen for:

- Rapid UI development
- Consistent design system
- Responsive layouts
- Easier component scaling

---

### Framer Motion

Used for:

- Smooth transitions
- Controlled animations
- Modern premium feel

Animations should remain subtle and professional.

---

### next-intl

Chosen for:

- App Router compatibility
- Locale-based routing
- Scalable translation architecture

Supported locales:

```txt
/en
/fr
```

---

# 4. Backend Architecture

## Why Supabase Was Chosen

Supabase was selected because it provides:

- PostgreSQL database
- Authentication
- Row Level Security
- Secure APIs
- Storage
- Realtime capabilities
- Strong TypeScript support

It also allows secure full-stack development without excessive infrastructure overhead during early production stages.

---

## PostgreSQL

Chosen because it provides:

- Reliability
- Scalability
- Relational integrity
- Mature indexing
- Strong querying capability

---

## Row Level Security

RLS is mandatory.

Reasoning:

The platform stores sensitive customer information including:

- Vehicle records
- Appointments
- Reports
- Receipts
- Support tickets

RLS ensures customers can only access their own records even if frontend protections fail.

---

# 5. Security Architecture

## Security Objectives

The platform must protect against:

- SQL injection
- XSS
- CSRF
- Broken access control
- Session hijacking
- Brute-force attacks
- Unsafe uploads
- Information leakage

---

## Authentication

Auth.js and Supabase Auth are used together for:

- Secure session handling
- Protected routes
- Role-based access
- Session persistence

---

## Authorisation

Roles:

```txt
public
customer
staff
admin
```

### Customers

Can only access:

- Their own vehicles
- Their own appointments
- Their own reports
- Their own receipts
- Their own support tickets

### Staff

Can manage:

- Operational bookings
- Support tickets
- Customer servicing workflows

### Admins

Can access:

- Full operational tools
- Staff management
- Article management
- Administrative systems

---

## Validation Strategy

All input validation uses:

```txt
Zod
```

Validation is enforced:

- Client-side for UX
- Server-side for security

Server validation is always authoritative.

---

# 6. Internationalisation Strategy

The platform is designed for English and French users.

## Locales

```txt
en
fr
```

## Routing Structure

```txt
/en
/fr
```

## Design Decision

No hardcoded visible text is allowed.

All text must come from:

```txt
/messages/en.json
/messages/fr.json
```

Reasoning:

- Easier scalability
- Cleaner localisation
- Better maintainability
- Reduced duplication

---

# 7. Design System

## Visual Direction

The platform should feel:

- Premium
- Automotive
- Technical
- Modern
- Calm
- Professional

---

## Colour Palette

Primary tones:

- Black
- White
- Silver
- Deep blue

Reasoning:

Inspired by premium German automotive design language while remaining unique to Pro-Fix.

---

## Theme Support

Support:

- Light theme
- Dark theme
- System default theme

Reasoning:

Improved accessibility and modern UX expectations.

---

# 8. Platform Structure

# Public Website

## Pages

- Home
- Services
- Book Appointment
- News and Advice
- Support
- Contact Us
- Login
- Register

---

# Customer Dashboard

## Features

- Dashboard overview
- My Vehicles
- Repair History
- Reports
- Receipts
- Bookings
- Payments
- Support Tickets
- Profile and Settings

---

# Admin Dashboard

## Features

- Appointment management
- Customer management
- Vehicle management
- Support management
- Internal notes
- Status tracking
- Article management

---

# 9. Development Phases

The platform should be built in carefully controlled stages.

---

# Phase 1: Foundation

## Branches

```txt
foundation/projectSetup
foundation/designSystem
foundation/i18n
foundation/themes
foundation/ciPipeline
```

## Goals

- Configure Next.js
- Configure TypeScript
- Configure Tailwind
- Configure ESLint
- Configure Prettier
- Configure folder structure
- Configure GitHub Actions
- Configure i18n
- Configure themes

---

# Phase 2: Public Website

## Branches

```txt
publicPages/layoutAndNav
publicPages/home
publicPages/services
publicPages/contactSupport
```

## Goals

Build:

- Header
- Footer
- Navigation
- Homepage
- Service pages
- Contact pages
- Responsive layouts
- Mobile navigation

---

# Phase 3: Authentication

## Branches

```txt
auth/coreAuth
auth/rolesAndGuards
```

## Goals

Build:

- Login
- Register
- Session handling
- Route protection
- Role enforcement

---

# Phase 4: Dashboard Shell

## Branches

```txt
portal/dashboardShell
portal/profileSettings
```

## Goals

Build dashboard layouts and navigation before backend functionality.

Reasoning:

Separating UI structure from backend logic improves stability and reduces complexity.

---

# Phase 5: Vehicles

## Branches

```txt
vehicles/crud
```

## Goals

Build:

- Add vehicle
- Edit vehicle
- Delete vehicle
- Vehicle listing
- Ownership enforcement

---

# Phase 6: Appointments

## Branches

```txt
appointments/dataModelAndStatuses
appointments/bookingFlow
appointments/manageMyAppointments
```

## Goals

Build:

- Appointment creation
- Booking flow
- Status management
- Rescheduling
- Cancellation logic

---

# Phase 7: Support System

## Branches

```txt
support/tickets
```

## Goals

Build:

- Ticket creation
- Ticket replies
- Ticket tracking
- Staff management workflows

---

# Phase 8: Content Management

## Branches

```txt
content/articlesPublic
admin/articlesCrud
```

## Goals

Build bilingual article management system.

Topics include:

- BMW diagnostics
- Warning lights
- Maintenance guidance
- German vehicle servicing
- BMW Motorrad care

---

# Phase 9: Admin Portal

## Branches

```txt
admin/appointmentsManagement
admin/customersAndVehicles
admin/supportManagement
```

## Goals

Build secure operational tools for internal staff.

---

# Phase 10: Testing and Hardening

## Branches

```txt
quality/e2eBooking
quality/securityReview
release/v1
```

## Goals

Perform:

- E2E testing
- Security reviews
- Validation checks
- Performance checks
- Final deployment preparation

---

# 10. CI/CD Strategy

Every branch must pass:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Reasoning:

This prevents unstable or unsafe code from reaching production.

---

# 11. Deployment Strategy

## Hosting

Use:

```txt
Vercel
```

Reasoning:

- Strong Next.js integration
- Fast deployment
- Preview deployments
- Simple CI/CD pipeline

---

# 12. Performance Goals

The platform should:

- Load quickly
- Be mobile responsive
- Avoid layout shifts
- Optimise images
- Use lazy loading
- Maintain accessibility standards

---

# 13. Cybersecurity Portfolio Value

This project is also intended to demonstrate practical cybersecurity engineering capability.

Areas demonstrated include:

- Secure architecture
- Access control
- Secure backend integration
- Defensive coding
- Validation systems
- Secure authentication
- Security-first engineering mindset
- Production-grade thinking

---

# 14. Final Objective

The final goal is to deliver a secure, premium and scalable automotive platform that combines modern software engineering with real-world automotive operational experience.

The platform should demonstrate:

- Full-stack engineering capability
- Secure system design
- Premium UX design
- Scalable architecture
- Production deployment readiness
- Practical cybersecurity implementation
- Strong project planning and execution
