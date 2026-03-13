---
applyTo: "**/*"
description: Read this file before implementing or modifying server actions for data mutation in the project.
---

# Server Actions Instructions

## Overview

All data mutations in this app must go through **Next.js Server Actions**. Server actions handle validation, authentication, and delegate database operations to helper functions in the `/data` directory. They must always be invoked from client components.

## Rules

1. **All data mutations must use server actions.** No direct DB calls from client components or API routes.

2. **Server actions must be called from client components** (`"use client"` directive required on the calling component).

3. **File naming & colocation:** Server action files must be named `actions.ts` and placed in the same directory as the component that calls them.
   - ✅ `app/dashboard/actions.ts`
   - ❌ `lib/actions.ts`

4. **No `FormData` type.** All parameters must use explicit TypeScript types or interfaces.
   ```ts
   // ✅
   type CreateLinkInput = { url: string; slug: string };
   export async function createLink(input: CreateLinkInput) {}

   // ❌
   export async function createLink(formData: FormData) {}
   ```

5. **Validate all input with Zod** before any processing.
   ```ts
   const schema = z.object({ url: z.string().url(), slug: z.string().min(1) });
   const parsed = schema.safeParse(input);
   if (!parsed.success) return { error: parsed.error.flatten() };
   ```

6. **Check for a logged-in user first** (via Clerk) before any database operations.
   ```ts
   const { userId } = await auth();
   if (!userId) return { error: "Unauthorized" };
   ```

8. **Never throw errors.** Always return an object with an `error` or `success` property instead.
   ```ts
   // ✅
   return { success: true, data: result };
   return { error: "Something went wrong." };

   // ❌
   throw new Error("Something went wrong.");
   ```

7. **No raw Drizzle queries in server actions.** Use helper functions from the `/data` directory instead.
   ```ts
   // ✅
   import { createLinkRecord } from "@/data/links";
   await createLinkRecord({ ...parsed.data, userId });

   // ❌
   await db.insert(links).values({ ... });
   ```

## Flow

```
Client Component → actions.ts → Zod validation → Auth check → /data helper → Drizzle ORM
```
