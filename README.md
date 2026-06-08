# Vikings Gym Management Platform

A complete, production-ready full-stack gym management platform built with Next.js 15, TypeScript, TailwindCSS, and Prisma.

## 🚀 Features

### 1. Public Marketing Website
- Stunning, responsive landing pages (Home, About, Plans, Trainers, Contact, Gallery, Transformations, Blog).
- Built with Framer Motion for smooth, premium animations.
- Contact form and BMI Calculator.

### 2. Roles & Authentication
- **Role-Based Access Control (RBAC)** powered by NextAuth/Auth.js.
- Roles: `SUPER_ADMIN`, `GYM_OWNER`, `RECEPTIONIST`, `TRAINER`, `MEMBER`.
- Secure JWT-based authentication.

### 3. Admin ERP Dashboard
- **Members**: Full CRUD, status tracking, expiration alerts.
- **Trainers**: Manage staff, salaries, and clients.
- **Attendance**: Manual and QR Code-based check-ins.
- **Financials**: Payment records, revenue analytics, Razorpay integration support.
- **CRM/Leads**: Track leads across the pipeline from New to Converted.
- **Inventory**: Track supplements, merchandise, and gym equipment with low-stock alerts.
- **Marketing**: Announcements, discount coupons, and referral system.

### 4. Trainer Portal
- Manage assigned clients.
- Build and assign detailed **Workout Plans** and **Diet Plans**.
- Track client progress over time.

### 5. Member Portal
- View active membership status and remaining days.
- Access personalized Workout and Diet plans assigned by trainers.
- Track weight, BMI, and body measurements via interactive Recharts.
- View personal QR code for gym check-in.

## 🛠 Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4, Framer Motion, shadcn/ui components
- **Database**: SQLite (Development) / PostgreSQL (Production ready via Prisma)
- **ORM**: Prisma
- **Icons**: Lucide React
- **Charts**: Recharts

## ⚙️ Local Development Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Database Setup**
   The project uses SQLite for fast local development. To apply the schema and seed mock data:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

## 🔑 Seed Credentials
Use these pre-configured accounts to test different roles:
- **Admin Panel:** `admin@vikingsgym.in` / `password123`
- **Gym Owner:** `owner@vikingsgym.in` / `password123`
- **Trainer Portal:** `rahul.trainer@vikingsgym.in` / `password123`
- **Member Portal:** `arjun@email.com` / `password123`

## 📦 Production Deployment (Vercel)

1. Connect your GitHub repository to Vercel.
2. In the Vercel project settings, set the `DATABASE_URL` environment variable to a live PostgreSQL database (e.g., Supabase, Neon, or Railway).
3. Ensure your `prisma/schema.prisma` is updated to use the `postgresql` provider:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
4. Add the `NEXTAUTH_SECRET` environment variable for secure JWT sessions.
5. Deploy! Vercel will automatically build the Next.js app and run `prisma generate`.

---
*Built as a premium SaaS solution for modern fitness centers.*
