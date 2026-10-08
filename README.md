# IT Asset & Ticketing System

## Overview

Helix Service Desk combines incident management and IT asset tracking in a responsive Next.js workspace. Employees can report issues against assigned equipment while technicians and administrators can see the organization-wide queue.

## Features

- Searchable support queue, SLA indicators, and asset-health dashboard
- Secure database-backed sessions with administrator, technician, and employee roles
- Protected ticket creation and role/ownership-aware ticket listing
- Linked assets, assignments, warranty dates, ticket comments, priority, and workflow status
- PostgreSQL migration, repeatable development seed, tests, Docker, and CI

## Technology Stack

Next.js 16 App Router, React 19, TypeScript 5, Node.js 24, PostgreSQL 18, Prisma ORM 7, Zod 4, and Vitest 5.

## Requirements

- Node.js 24+ and npm 11+
- PostgreSQL 16+ or Docker Desktop

## Installation

```bash
git clone https://github.com/Arjunren/it-asset-ticketing-system.git
cd it-asset-ticketing-system
npm install
cp .env.example .env
```

## Environment Variables

`DATABASE_URL` is the pooled/runtime PostgreSQL URL. `DIRECT_URL` is the direct migration URL. `SESSION_TTL_HOURS` optionally changes the default 12-hour session lifetime. Never commit real secrets.

## Database Setup

```bash
npm run prisma:generate
npm run db:migrate
npm run db:seed
```

Use `npm run db:deploy` for production migrations.

## Running the Application

Run `npm run dev` and open `http://localhost:3000`, or run `docker compose up --build`.

## Running Tests

Run `npm test` for unit tests or `npm run check` for Prisma generation, strict type checking, tests, and the production build.

## Default Development Accounts

Development only; change or remove these outside local development. All use password `ServiceDesk!2026`:

- Administrator: `admin@servicedesk.local`
- Technician: `tech@servicedesk.local`
- Employee: `employee@servicedesk.local`

## API Endpoints

| Method | Endpoint | Access | Purpose |
| --- | --- | --- | --- |
| POST | `/api/auth/login` | Public | Authenticate and create an HTTP-only session |
| POST | `/api/auth/logout` | Signed in | Revoke the session |
| GET | `/api/tickets` | Signed in | Global technician/admin queue or employee-owned tickets |
| POST | `/api/tickets` | Signed in | Create a validated ticket, optionally linked to an active asset |

## Folder Structure

`app/` contains pages and route handlers; `components/` contains the interactive dashboard; `lib/` contains server-only auth, database, validation, and HTTP helpers; `repositories/` contains Prisma persistence; `services/` contains business rules; `prisma/` contains schema, migration, and seed; `tests/` contains Vitest suites; and `types/` contains domain contracts.

## Security Notes

Passwords are salted with scrypt and compared in constant time. Raw session tokens only appear in HTTP-only, same-site cookies; database records keep SHA-256 digests. Every API handler authenticates server-side, employees can only list their own tickets, and asset links are validated against active records. Zod bounds all request fields and generic errors avoid leaking database internals. Add rate limiting, audit trails, CSRF origin checks, and enterprise identity before an internet-facing deployment.

## Remaining Limitations

The dashboard uses representative preview data. Email alerts, file attachments, approval workflows, directory synchronization, and real-time technician updates are outside this starter scope.
