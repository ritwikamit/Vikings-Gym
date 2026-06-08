<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Vikings Gym ERP — SaaS Architecture Guide

## Architecture Overview

Multi-tenant Gym Management SaaS with tenant isolation at the database level.

### Tenant Isolation Strategy
- Every tenant-scoped table has a `tenantId` column
- All queries filter by `tenantId` via `createTenantFilter()` helper
- `src/lib/tenant.ts` provides `getTenantId()`, `requireTenant()`, `getTenantContext()`
- Domain-based tenant resolution via `x-tenant-slug` header or host header

### Folder Structure

```
src/
├── actions/         # Server Actions (form handlers)
├── api/             # Shared API utilities
├── app/             # Next.js App Router
│   ├── (public)/    # Marketing website routes
│   ├── (auth)/      # Login/Register routes
│   ├── (dashboard)/ # Admin/Trainer/Member dashboards
│   └── api/         # Route Handlers
├── components/
│   ├── ui/          # shadcn/ui components
│   └── layout/      # Shared layout components
├── features/
│   ├── admin/       # Admin-specific components
│   ├── auth/        # Auth components
│   ├── public/      # Public site components
│   ├── member/      # Member portal components
│   └── trainer/     # Trainer portal components
├── hooks/           # Shared React hooks
├── lib/             # Core utilities
├── modules/         # Feature modules (attendance, billing, etc.)
├── services/        # Business logic services
├── types/           # TypeScript types & enums
├── validators/      # Zod validation schemas
└── emails/          # Email templates
```

### RBAC System

Roles (hierarchical): SUPER_ADMIN > GYM_OWNER > RECEPTIONIST > TRAINER > MEMBER

- `src/types/index.ts` — `ROLE_PERMISSIONS` map and `ROLE_HIERARCHY`
- `src/lib/permissions.ts` — `hasPermission()`, `requirePermission()`, `scopeFilter()`
- Proxy middleware handles route protection
- Server actions/route handlers use `requirePermission()` for fine-grained control

### Key Models

**SaaS Core:** Tenant, Subscription, Organization, GymSettings
**Auth:** User (scoped to tenant)
**Business:** Member, Trainer, MembershipPlan, Membership, Attendance
**Plans:** WorkoutPlan, WorkoutExercise, DietPlan, DietMeal
**Finance:** Payment, Coupon, CommissionLog
**Engagement:** Notification, Lead, Referral, Announcement
**Operations:** InventoryItem, InventoryTransaction, SupportTicket
**Compliance:** AuditLog
**Content:** BlogPost
**Configuration:** FeatureFlag

### API Pattern

```
src/app/api/[module]/route.ts  — RESTful route handlers
src/modules/[module]/service.ts — Business logic
```

All routes: validate → authorize → execute → respond

### Deployment

- Vercel (frontend + API routes)
- PostgreSQL via Neon/Supabase
- Prisma generate during build (`prisma generate && next build`)
- Multi-tenant via domain-based routing

### Migration from Single-Tenant

The existing single-tenant schema is replaced by the multi-tenant schema in `prisma/schema.prisma`. Key changes:
- Added `Tenant`, `Subscription`, `Organization`, `GymSettings`, `FeatureFlag`, `SupportTicket` models
- Added `tenantId` to all tenant-scoped models
- Added proper Prisma enums
- Added composite unique constraints where needed
- Added comprehensive indexes for query performance

Run `npx prisma migrate dev --name init` to create the initial migration.
