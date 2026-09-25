# Phase 13 — Supabase Auth and Data Integration

This phase replaces the current mock-only authentication boundary with a Supabase-ready adapter while preserving a local demo fallback until environment variables are configured.

## Files to copy

Copy the files inside this phase to the matching locations in the main Figma Make project:

- `package.json` → project root `package.json` (this adds `@supabase/supabase-js`)
- `src/lib/supabase/client.ts` → `src/lib/supabase/client.ts`
- `src/app/providers/AuthContext.tsx` → `src/app/providers/AuthContext.tsx`
- `env.example` → keep as a reference for environment variables; do not commit a real `.env` file
- `supabase/migrations/0002_profiles_and_rls.sql` → apply in Supabase after reviewing the policies

`env.example` is intentionally named without a leading dot so Figma Make can import it. You may rename it to `.env` only inside the local/runtime environment after copying the values.

## Why the package.json file matters

The Supabase client is imported by `client.ts`. Without `@supabase/supabase-js` in the project dependencies, Vite shows `Failed to resolve import '@supabase/supabase-js'`. Copying the included `package.json` resolves that error; Figma Make will install the dependency when it refreshes the project.

## Environment

Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. The anon key is intended for the browser; never expose a service-role key in Vite environment variables.

If the variables are missing, the app keeps using the existing mock user so the UI remains previewable. This fallback must be disabled before production launch.

## Acceptance checks

1. Figma Make no longer shows the unresolved `@supabase/supabase-js` import.
2. With no Supabase variables, the preview still loads using mock mode.
3. With Supabase variables, `/login` uses `signInWithPassword`.
4. Refreshing an authenticated session restores the user from `onAuthStateChange`.
5. Logout calls `signOut` and returns the user to `/login` through the existing route guard.
6. The `profiles` RLS policies prevent users from editing another user’s profile.
