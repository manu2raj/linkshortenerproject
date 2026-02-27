# AUTH.md — Authentication Instructions

This document defines **all** authentication rules and patterns for this project.

---

## Authentication Provider

**Clerk** is the **only** authentication solution used in this application.

- **Never** implement custom authentication logic (JWT, sessions, cookies, etc.)
- **Never** install alternative auth libraries (NextAuth, Passport, Auth0, etc.)
- **Always** use Clerk's built-in hooks, components, and server helpers

---

## Environment Variables

The following Clerk environment variables **must** be configured:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

These are defined in `.env` and referenced in the middleware and layout.

---

## Route Protection Rules

### Protected Routes

The `/dashboard` route (and any sub-routes under `/dashboard/*`) **must** be protected:

- Users **must** be authenticated to access these routes
- Unauthenticated users attempting to access `/dashboard` are redirected to sign-in

### Public Routes

The homepage `/` and other public routes should be accessible without authentication, **but**:

- If an authenticated user visits `/`, they should be **redirected to `/dashboard`**
- This prevents logged-in users from seeing the marketing/landing page

### Implementation

Use Next.js middleware (`middleware.ts`) with Clerk's `clerkMiddleware` or `authMiddleware` to:

1. Protect `/dashboard/*` routes
2. Redirect authenticated users from `/` to `/dashboard`
3. Define public routes that don't require authentication

Example structure:

```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware((auth, req) => {
  // Protect dashboard routes
  if (isProtectedRoute(req)) {
    auth().protect();
  }

  // Redirect authenticated users from homepage to dashboard
  // (implement logic as needed)
});
```

---

## Sign-In & Sign-Up Modals

Clerk sign-in and sign-up flows **must always launch as modals**, not full-page navigations.

### Implementation

Use Clerk's `<SignIn />` and `<SignUp />` components with modal mode enabled.

#### Route-based Modal Pattern

Create catch-all routes for sign-in and sign-up that render modals:

- `/sign-in/[[...sign-in]]/page.tsx` → renders `<SignIn routing="path" path="/sign-in" />`
- `/sign-up/[[...sign-up]]/page.tsx` → renders `<SignUp routing="path" path="/sign-up" />`

Set the appearance prop to display these as modals:

```tsx
<SignIn
  routing="path"
  path="/sign-in"
  signUpUrl="/sign-up"
  appearance={{
    elements: {
      rootBox: "mx-auto",
      card: "shadow-lg"
    }
  }}
/>
```

#### Alternative: Parallel Routes

You can also use Next.js parallel routes (`@auth` slot) to render Clerk modals without full-page navigation. This is more advanced but provides better UX.

---

## User Access in Components

### Client Components

```tsx
'use client';
import { useUser, useAuth } from '@clerk/nextjs';

export function ProfileButton() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useAuth();

  if (!isSignedIn) return null;

  return (
    <button onClick={() => signOut()}>
      Sign out {user.firstName}
    </button>
  );
}
```

### Server Components

```tsx
import { currentUser, auth } from '@clerk/nextjs/server';

export default async function DashboardPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  return <div>Welcome {user.firstName}</div>;
}
```

### Server Actions

```typescript
'use server';
import { auth } from '@clerk/nextjs/server';

export async function createLink(formData: FormData) {
  const { userId } = auth();
  
  if (!userId) {
    throw new Error('Unauthorized');
  }

  // Proceed with authenticated action
}
```

---

## User Profile Components

Use Clerk's pre-built `<UserButton />` component for user menus and profile management:

```tsx
import { UserButton } from '@clerk/nextjs';

export function Header() {
  return (
    <header>
      <UserButton afterSignOutUrl="/" />
    </header>
  );
}
```

The `<UserButton />` provides:

- Avatar display
- Profile management
- Sign-out functionality
- Account settings

---

## Database User Association

When storing user-specific data in the database:

1. Use Clerk's `userId` (available from `auth().userId` or `user.id`)
2. Store this as the foreign key in your database tables
3. **Never** create a separate users table — Clerk is the source of truth

Example Drizzle schema:

```typescript
export const links = pgTable('links', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(), // Clerk user ID
  url: text('url').notNull(),
  shortCode: text('short_code').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});
```

---

## Forbidden Patterns

**Never** do the following:

❌ Implement custom login forms that store passwords  
❌ Use `bcrypt`, `jsonwebtoken`, or session management libraries  
❌ Create a `users` table with email/password fields  
❌ Install NextAuth, Auth0, Passport, or any other auth library  
❌ Store authentication tokens in localStorage or cookies manually  
❌ Bypass Clerk's middleware for protected routes  
❌ Render sign-in/sign-up as full-page routes (must be modals)  

---

## Testing Authentication

When testing locally:

1. Create a test account via Clerk Dashboard or sign-up flow
2. Verify `/dashboard` is inaccessible when logged out
3. Verify `/` redirects to `/dashboard` when logged in
4. Verify sign-in/sign-up modals appear correctly
5. Test `<UserButton />` functionality

---

## Summary Checklist

Before completing any auth-related task, verify:

- [ ] Only Clerk is used for authentication
- [ ] `/dashboard` is protected and requires authentication
- [ ] Authenticated users are redirected from `/` to `/dashboard`
- [ ] Sign-in and sign-up launch as modals, not full pages
- [ ] `userId` from Clerk is used for database associations
- [ ] No custom auth logic or alternative libraries are introduced
- [ ] Environment variables are properly configured
