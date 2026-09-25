# Phase 11 — Production Hardening & Integration

Final implementation phase after Phases 01–10.

## Required work

1. Create the real Supabase browser client using public environment variables only.
2. Add an auth/session provider and protect every /dashboard/* route.
3. Keep /login, public market routes, and legal pages accessible without authentication.
4. Enforce role permissions server-side with Supabase RLS.
5. Keep service-role keys and AI provider keys server-side.
6. Run typecheck/build and resolve all errors before deployment.
7. Verify domain, redirects, robots, sitemap, WhatsApp handoff, and error states.

The source repository currently has the route shell but no confirmed AuthContext or Supabase client path. Integrate these patterns with the actual provider created in the app.
