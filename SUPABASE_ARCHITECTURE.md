# SUPABASE ARCHITECTURE

# Overview

Supabase is the primary backend platform for Pro-Fix Auto Services.

It provides:

- PostgreSQL database
- Authentication
- Row Level Security
- Storage
- Secure APIs
- Realtime capabilities

The platform must use Supabase securely and follow least-privilege principles.

---

# Supabase Services

# Authentication

Use Supabase Auth for:

- Registration
- Login
- Session management
- Password reset
- Secure cookie sessions

---

# Database

Main PostgreSQL database for:

- Users
- Vehicles
- Appointments
- Reports
- Receipts
- Repair history
- Support tickets
- Articles
- Admin logs

---

# Storage

Storage buckets for:

- Reports
- Receipts
- Vehicle images
- Profile images
- Uploaded files

Uploads must be protected with policies.

---

# Row Level Security

Enable RLS on all tables.

Default behaviour:

```txt
deny by default
```

---

# Roles

```txt
customer
staff
admin
```

---

# Access Rules

## Customers

Can access only:

- Their own vehicles
- Their own appointments
- Their own tickets
- Their own reports
- Their own receipts

## Staff

Can access:

- Operational appointments
- Customer support tickets
- Operational customer records

## Admins

Can access:

- Full operational tools
- Platform management
- Admin tools

---

# Core Tables

## users

```txt
id
role
name
email
phone
created_at
updated_at
```

## vehicles

```txt
id
user_id
make
model
year
vin
notes
created_at
updated_at
```

## appointments

```txt
id
user_id
vehicle_id
service_type
appointment_date
status
notes
internal_notes
created_at
updated_at
```

## repair_history

```txt
id
vehicle_id
appointment_id
diagnostics
repairs
technician_notes
created_at
```

## reports

```txt
id
vehicle_id
appointment_id
file_url
summary
created_at
```

## receipts

```txt
id
appointment_id
amount
currency
status
receipt_url
created_at
```

## support_tickets

```txt
id
user_id
subject
message
status
priority
created_at
updated_at
```

## articles

```txt
id
title
slug
language
content
published_at
created_at
updated_at
```

---

# Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Never expose:

```txt
SUPABASE_SERVICE_ROLE_KEY
```

---

# Supabase Client Structure

## Public Client

```txt
lib/supabase/client.ts
```

## Server Client

```txt
lib/supabase/server.ts
```

---

# Secure Upload Rules

All uploads must:

- Validate file type
- Validate file size
- Restrict access
- Use authenticated uploads
- Use signed URLs when needed

---

# Logging

Log:

- Login attempts
- Failed logins
- Appointment updates
- Ticket changes
- Admin actions

Never log:

- Passwords
- Tokens
- Secret keys

---

# Final Goal

Provide a scalable, secure and production-ready backend architecture for the Pro-Fix platform.
