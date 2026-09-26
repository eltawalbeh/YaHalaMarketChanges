# Phase 15 — Live UI Integration and QA

This phase wires the public and dashboard screens to the Phase 14 Supabase-backed services and adds consistent loading, retry, error, empty, and not-found states.

## Files to copy

Copy each file into the matching path in the main `YaHalaMarket` repository:

- `src/components/shared/AsyncState.tsx`
- `src/pages/public/Market.tsx`
- `src/pages/public/Offers.tsx`
- `src/pages/public/OfferDetail.tsx`
- `src/pages/public/Quote.tsx`
- `src/pages/dashboard/Offers.tsx`
- `src/pages/dashboard/Hotels.tsx`
- `src/pages/dashboard/Leads.tsx`
- `src/pages/dashboard/Quotes.tsx`
- `src/pages/dashboard/OfferWizard.tsx`

## QA acceptance checks

1. Public market, offers, offer detail, and quote routes show loading and retryable error states.
2. Dashboard offers, hotels, leads, and quotes read from their service modules and show empty states when no rows exist.
3. Offer Wizard uses the authenticated Supabase user id when saving a draft and surfaces save failures.
4. `vite build` completes successfully with the Phase 14 services present.

No database migration is introduced in this phase.
