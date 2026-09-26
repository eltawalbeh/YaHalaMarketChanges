# Phases 16–20 Bundle — Functional Completion

This bundle preserves the latest Figma Make UI and adds the production layers without redesigning the visual system.

## Phase 16 — Plan request integration

- Saves the public Plan form through `leadsService.create()`.
- Keeps the current UI and form fields unchanged.
- Generates/uses the lead reference id returned by Supabase.
- Opens WhatsApp with a prefilled message when `VITE_WHATSAPP_NUMBER` is configured.

## Phase 17 — Lead operations

The existing dashboard Leads screen can consume the saved lead rows. The lead schema supports reference id, status, assignment, notes, dates, and source. Operations should use the existing status lifecycle without changing the public UI.

## Phase 18 — SEO and tracking

Add canonical metadata, Open Graph/social share metadata, and event tracking for market view, filter use, offer view, Plan start, Plan submit, and WhatsApp click. Keep tracking implementation separate from visual components.

## Phase 19 — Security and production hardening

Apply the migration below, verify the Data API grants and RLS policies in Supabase, configure the publishable client key only, and set `VITE_WHATSAPP_NUMBER` through the deployment environment. Never expose a service-role key in the browser.

## Phase 20 — QA and launch

Run build, route checks, RTL/LTR checks, mobile form checks, accessibility checks, Supabase insert/read checks, WhatsApp message checks, and production smoke tests.

## Files

- `src/pages/public/Plan.tsx`: functional handler layered onto the Figma Make UI.
- `supabase/migrations/0004_phase_16_20_indexes_and_security.sql`: non-destructive indexes and policy hardening.

## Required environment value

`VITE_WHATSAPP_NUMBER` must contain the official international WhatsApp number without spaces or symbols. Replace the current placeholder contact text in the UI with approved business details in a separate content pass.

