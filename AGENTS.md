# AGENTS.md — LLM Agent Instructions

This file is the **entry point** for all LLM coding agents working in this repository.  
All agents **must** read this file before generating, modifying, or reviewing any code.

> [!CAUTION]
> **MANDATORY — DO NOT SKIP:** You **MUST** read every relevant document inside the `/docs` directory **before writing a single line of code**. This is not optional. Generating code without first reading the applicable instruction file(s) is a critical violation of these agent rules. If you are unsure which doc applies, read **all** of them.

Detailed instructions are broken out into focused documents inside the `/docs` directory.  
Always consult the relevant doc(s) before performing any task. **STOP — ALWAYS read the relevant `.md` file(s) inside `/docs` BEFORE generating ANY code, no exceptions.**

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
2. **Identify which `/docs` files apply** to the task at hand (auth-related? → `AUTH.md`; UI-related? → `UI.md`; unsure? → read both).
3. **Read each applicable `/docs` file completely** — do not skim.
4. **Only then** begin generating or modifying code.

> Skipping any step above will result in incorrect, non-compliant code that violates project standards.

---

## Agent Instruction Documents

| Document | When to Read | Description |
|---|---|---|
| [AUTH.md](docs/AUTH.md) | **Any task touching auth, users, or protected routes** | **Authentication rules** — Clerk integration, route protection, sign-in/sign-up modals, and user access patterns |
| [UI.md](docs/UI.md) | **Any task touching UI, components, or styling** | **UI component rules** — shadcn/ui usage, component composition, styling patterns, and forbidden custom components |

---

## Non-Negotiable Rules

The following rules apply globally and override anything else:

1. **Always** read the relevant `/docs` instruction file(s) **before generating any code** — this is rule #1 and supersedes all others.
2. **Never** use JavaScript (`.js` / `.jsx`) — all source files must be TypeScript (`.ts` / `.tsx`).
3. **Never** disable TypeScript strict mode or add `// @ts-ignore` / `// @ts-nocheck` without an explicit comment explaining why.
4. **Never** install a new dependency without first checking whether the existing stack already covers the need.
5. **Never** use `middleware.ts` — it is deprecated in Next.js 16 (the version used in this project). All middleware/proxy logic must go in `proxy.ts` instead.
6. **Never** write raw SQL — all database access goes through Drizzle ORM.
7. **Never** store secrets in source code — use environment variables via `.env` (see `.env` and `drizzle.config.ts` for reference).
8. **Always** use the `cn()` utility from `@/lib/utils` when composing Tailwind class names conditionally.
9. **Always** follow the Next.js App Router conventions (server components by default, `"use client"` only when required).
10. **Always** run `eslint` and fix all lint errors before considering a task complete.

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

| Variable | Description |
|---|---|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key |
| `CLERK_SECRET_KEY` | Clerk secret key |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Clerk sign-in redirect path |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Clerk sign-up redirect path |

All variables must be present in `.env` locally and in the deployment environment.  
Never commit `.env` to version control — it is listed in `.gitignore`.
