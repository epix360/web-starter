# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # dev server at :3000, Sanity Studio at :3000/studio
npm run build        # production build
npm run lint         # ESLint via next lint
npm run typecheck    # tsc --noEmit (no emit, type errors only)
npm run format       # Prettier over all files
npm run sanity:types # regenerate src/sanity/types.ts from schemas
npm run seed         # seed Sanity with siteSettings + a home page (needs SANITY_API_WRITE_TOKEN)
npm run new-project  # provisioning script (Sanity + Vercel + env vars)
```

There are no tests. `typecheck` and `lint` are the verification steps.

## Architecture

**CMS-driven routing.** Marketing pages live in Sanity, not as files in `app/`. The `src/app/(site)/[[...slug]]/page.tsx` catch-all resolves any `page` document by slug. The slug `home` maps to `/`. Do not create new route files for content pages.

**Page builder.** Each page has a `sections` array of typed block objects. The rendering pipeline is:
1. GROQ query returns the sections array (in `src/sanity/queries/index.ts`)
2. `Sections.tsx` switches on `section._type` and delegates to the matching block component
3. Block components live in `src/components/blocks/`

**Adding a new block type** requires four coordinated changes:
1. Schema: `src/sanity/schemas/objects/blocks/<name>.ts`
2. Register the schema in `src/sanity/schemas/index.ts` and add it to the `sections` array field in `src/sanity/schemas/documents/page.ts`
3. Add fields to the relevant GROQ query in `src/sanity/queries/index.ts`
4. Create renderer in `src/components/blocks/<Name>.tsx` and add a `case` in `Sections.tsx`

**Data fetching.** All Sanity reads go through `sanityFetch` (`src/sanity/fetch.ts`). It is server-only and wraps `client.fetch` with `next.tags` for ISR. In development it always revalidates (`revalidate: 0`). Cache tags follow the convention `<type>` and `<type>:<slug>` (e.g. `['page', 'page:about']`).

**ISR revalidation.** Sanity webhooks POST to `/api/revalidate`, which calls `revalidateTag()` for the affected document type and slug. The webhook must include `SANITY_REVALIDATE_SECRET` in the request header.

**Types.** `src/lib/types.ts` contains hand-written types as starter scaffolding. Run `npm run sanity:types` to generate `src/sanity/types.ts` from the live schema — prefer generated types once a project is provisioned.

**SEO.** Use `buildMetadata()` from `src/lib/seo.ts` in every route's `generateMetadata`. Use `resolveLink()` from the same file for all internal/external link resolution — it handles the `home` → `/` mapping and `/blog/<slug>` routing for posts.

**Styling.** Tailwind only — no inline styles. Design tokens are CSS variables prefixed `--brand-*` defined in `src/app/globals.css`.

## Environment variables

Required: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`, `SANITY_API_READ_TOKEN`, `SANITY_REVALIDATE_SECRET`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.

Local setup: `vercel env pull .env.local` to sync from Vercel. See `.env.example` for all vars including optional module vars.

## Optional modules

Modules in `modules/` are copy-in — they are not active until their source is copied into `src/`. Each has a `README.md` with instructions. Delete the corresponding section of `.env.example` for any module not in use.

- `modules/supabase` — Supabase client (browser, server, admin)
- `modules/resend` — Resend email client + React Email template
- `modules/tally` — Tally embed component + webhook handler
