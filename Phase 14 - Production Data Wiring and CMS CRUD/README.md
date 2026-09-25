# Phase 14 — Production Data Wiring and CMS CRUD

This phase connects the existing offers, hotels, leads, quotes, and users service boundaries to Supabase while preserving the local mock fallback when Supabase environment variables are unavailable.

## Files to copy

Copy each file to the matching path in the main Figma Make project:

- `supabase/migrations/0003_market_data_and_rls.sql` → `supabase/migrations/0003_market_data_and_rls.sql`
- `src/services/offers.ts` → `src/services/offers.ts`
- `src/services/hotels.ts` → `src/services/hotels.ts`
- `src/services/leads.ts` → `src/services/leads.ts`
- `src/services/quotes.ts` → `src/services/quotes.ts`
- `src/services/users.ts` → `src/services/users.ts`

The existing `src/services/index.ts` exports the same service names, so it does not need to change.

## Apply the migration

Apply `0003_market_data_and_rls.sql` after migrations 0001 and 0002. Review it in Supabase before applying it to a production project.

The migration creates or extends `offers`, `hotels`, `leads`, `quotes`, `hotel_rate_cards`, and their RLS policies/triggers.

## Runtime behavior

- With `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, services use Supabase.
- Without those variables, the existing mock data remains available for preview.
- The browser must only use the publishable/anon key. Never put a service-role key in Vite environment variables.
- Public lead capture may insert a new lead only with a `new` status and no assignee.
- Staff can read and update leads; managers and super admins can manage offers, hotels, quotes, and rate cards.

## Acceptance checks

1. Apply migrations 0001, 0002, and 0003 in order.
2. Confirm RLS is enabled on every table created by 0003.
3. Confirm the public market can read published, non-expired offers.
4. Confirm an anonymous visitor can create a new lead but cannot assign it or change its status.
5. Confirm a staff user can read/update leads but cannot manage offers.
6. Confirm a manager or super admin can create/update/archive offers and hotels.
7. Confirm the UI still loads in mock mode when environment variables are absent.
8. Run Supabase advisors before production use.
