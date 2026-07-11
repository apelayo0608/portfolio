# Professional Developer Portfolio

A React, Vite, TypeScript, and Supabase portfolio with a protected content CRM. It is configured for GitHub Pages at `/portfolio/` using hash-based routes.

## Features

- Responsive portfolio, searchable projects, Markdown case studies, services, skills, experience, and validated contact form.
- Supabase-backed content and media, public setup states, and protected admin access at `/#/admin`.
- Row Level Security policies, an `admin_users` allow-list, storage policies, seed projects, and GitHub Actions deployment.

## Local setup

1. Install Node.js 22+, then run `npm ci`.
2. Copy `.env.example` to `.env.local` and add your Supabase project URL and anon key. Never use a service-role key in this application.
3. In Supabase SQL Editor, run `supabase/migrations/202607110001_portfolio.sql`, followed by `supabase/seed.sql`.
4. Create an Auth user manually in Supabase (public sign-up is not enabled), then insert their UUID into `public.admin_users`.
5. Run `npm run dev`. Sign in at `/#/admin` and add profile/contact details, experience, and media.

## Database and storage

The migration creates portfolio tables, indexes, cascades, public read policies for published content only, admin CRUD policies, contact insert policy, and public asset buckets. Administrators are authenticated users explicitly listed in `admin_users`; the frontend never grants privileges itself.

Use the Admin area for content changes. Project screenshots and covers belong in `project-images`; profile photos in `profile-assets`, resumes in `resume-files`, and social/logo assets in `website-assets`.

## Deployment

1. Push this repository to GitHub as `portfolio`.
2. In **Settings → Pages**, select **GitHub Actions** as the source.
3. Add `VITE_SUPABASE_URL` as a repository variable and `VITE_SUPABASE_ANON_KEY` as a repository secret.
4. Push `main`; the workflow builds `dist` and deploys it. The live routes use `/#/projects/...` so direct navigation works on static hosting.

Run `npm run build` before each release and `npm test` to run the behavior tests. GitHub Pages serves a client-rendered application, so crawlers that do not execute JavaScript have limited dynamic SEO visibility; static metadata and robots rules are included.

## Troubleshooting

- **Setup banner remains:** check `.env.local`, restart the dev server, and apply the migration.
- **Admin access denied:** ensure the Auth user UUID appears in `admin_users` and sign in again.
- **Empty public portfolio:** publish projects/skills/services and confirm they are not archived.
- **Deployment has blank data:** check GitHub Actions variables/secrets and confirm your Supabase project permits the deployed domain where needed.
