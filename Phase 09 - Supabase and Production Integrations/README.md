# Phase 09 - Supabase & Production Integrations

Adds the production integration contract without exposing credentials.

Included:
- Initial relational schema outline.
- RLS policy requirements.
- Storage bucket boundaries.
- Cron jobs for offer expiry and renewal reminders.
- Server-only integration boundaries for WhatsApp, email, Telegram and AI.

Apply the SQL in a reviewed Supabase migration; do not place service-role keys in frontend code.
