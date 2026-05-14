# Changelog

All notable changes to the `web-starter` template are documented here. Downstream sites
should track which version of the starter they're on (commit SHA or version tag) so
upgrades are deliberate.

## [Unreleased]

## [0.1.0] - Initial release

### Added
- Next.js 15 App Router + TypeScript + Tailwind CSS baseline
- Sanity Studio embedded at `/studio` with pages, posts, authors, categories, site settings
- Page builder with Hero / RichText / CTA blocks
- Plausible analytics integration via env var
- `/api/revalidate` webhook with tag-based cache invalidation
- Dynamic sitemap and robots.txt
- SEO metadata helper with per-page OG image support
- Provisioning script (`scripts/new-project.sh`)
- Deployment checklist as GitHub issue template
- Optional modules: Supabase, Resend, Tally
