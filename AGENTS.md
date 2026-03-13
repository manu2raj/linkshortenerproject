# AGENTS.md — LLM Agent Instructions

This file is the **entry point** for all LLM coding agents working in this repository.  
All agents **must** read this file before generating, modifying, or reviewing any code.

---

## Project Overview

**linkshortenerproject** is a full-stack URL shortener application built with:

- **Next.js 16 (App Router)** — React framework with server components and server actions
- **TypeScript** — strict mode enabled throughout
- **Clerk** — authentication and user management
- **Drizzle ORM + Neon (PostgreSQL)** — serverless database layer
- **Tailwind CSS v4** — utility-first styling
- **shadcn/ui (New York style)** — accessible component library built on Radix UI
- **Lucide React** — icon library

---

## ⛔ Mandatory Pre-Task Checklist

Before writing **any** code, you **must** complete every step below in order:

1. **Read this file (`AGENTS.md`) in full.** ✅ (you are doing this now)
2. **Only then** begin generating or modifying code.

> Skipping any step above will result in incorrect, non-compliant code that violates project standards.

---

---

## Non-Negotiable Rules

The following rules apply globally and override anything else:

1. **Never** use JavaScript (`.js` / `.jsx`) — all source files must be TypeScript (`.ts` / `.tsx`).
2. **Never** disable TypeScript strict mode or add `// @ts-ignore` / `// @ts-nocheck` without an explicit comment explaining why.
3. **Never** install a new dependency without first checking whether the existing stack already covers the need.
4. **Never** use `middleware.ts` — it is deprecated in Next.js 16 (the version used in this project). All middleware/proxy logic must go in `proxy.ts` instead.
5. **Never** write raw SQL — all database access goes through Drizzle ORM.
6. **Never** store secrets in source code — use environment variables via `.env` (see `.env` and `drizzle.config.ts` for reference).
7. **Always** use the `cn()` utility from `@/lib/utils` when composing Tailwind class names conditionally.
8. **Always** follow the Next.js App Router conventions (server components by default, `"use client"` only when required).
9. **Always** run `eslint` and fix all lint errors before considering a task complete.

---

## Quick Reference

```bash
# Development server
npm run dev

# Production build
npm run build

# Lint
npm run lint

# Generate Drizzle migrations
npx drizzle-kit generate

# Push schema to database
npx drizzle-kit push

# Add a shadcn/ui component
npx shadcn add <component-name>
```

---

## Environment Variables

| Variable                            | Description                       |
| ----------------------------------- | --------------------------------- |
| `DATABASE_URL`                      | Neon PostgreSQL connection string |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key             |
| `CLERK_SECRET_KEY`                  | Clerk secret key                  |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL`     | Clerk sign-in redirect path       |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL`     | Clerk sign-up redirect path       |

All variables must be present in `.env` locally and in the deployment environment.  
Never commit `.env` to version control — it is listed in `.gitignore`.
