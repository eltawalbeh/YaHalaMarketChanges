# Phase 10 — SEO, QA & Launch

This phase prepares the market for production release without changing the main repository. Apply these files after Phases 01–09.

## SEO policy

- Index only public routes: `/`, `/offers`, `/offers/:slug`, and `/legal`.
- Use Arabic-first titles and descriptions, with English alternates when language switching is enabled.
- Add canonical URLs using `https://market.yahala.co`.
- Generate an XML sitemap from published offers only. Never include draft, review, expired, archived, dashboard, login, or private quotation routes.
- Add `noindex,nofollow` to `/login`, `/dashboard/*`, and `/q/*`.
- Dynamic offer metadata must be rendered before crawlers receive the page. The current Vite SPA needs prerendering/SSR or an edge-rendered route for strongest SEO.

## Launch gates

1. Build passes with no TypeScript or lint errors.
2. Every published offer has a stable slug, title, destination, image alt text, and canonical URL.
3. Mobile Lighthouse: performance, accessibility, best practices, and SEO are reviewed; no critical failures.
4. Forms have validation, keyboard access, visible focus, consent text, and a success/error state.
5. Public pages return 200; private paths are protected and marked noindex.
6. WhatsApp handoff preserves the lead reference ID and does not expose secrets.
7. Analytics/Search Console IDs are configured through environment/site configuration only.
8. Verify robots.txt, sitemap.xml, favicon, Open Graph/Twitter cards, 404 page, and legal page on the production domain.
9. Verify Arabic RTL and English LTR at common mobile widths.
10. Smoke-test offer lifecycle: draft → review → published → expired → archived.

See `seo/route-metadata.ts`, `seo/site-config.example.json`, and `qa/launch-checklist.md`.
