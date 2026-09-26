# Phase 21 — Post-Publish CTA and Lead Submission Fix

Fixes the two production issues found after publishing:

- The public offer-detail “Request quote” button now links to `/plan`.
- Public trip-planning submissions use the secure `create_public_lead` RPC instead of requesting public read access to `leads`.

Copy the files into the matching paths in the main Figma Make project, then publish.

Supabase migration:

- `supabase/migrations/0005_secure_public_lead_submission.sql`

