# vividworks.my

Public marketing website for vividworks.my, a Malaysian AI-powered website builder. The interface is written in Bahasa Melayu (Malaysia).

This repository is the marketing site only. It does not include the SaaS platform, accounts, billing, the visual editor, or AI generation.

## Requirements

- Node.js 22 or newer
- npm

## Local development

```bash
npm install
npm run dev
```

The dev server runs at [http://127.0.0.1:4321](http://127.0.0.1:4321).

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```

`npm run build` also checks that brand colours stay in sync and regenerates the template preview SVGs.

## Pages

| Path | Purpose |
| --- | --- |
| `/` | Homepage |
| `/pricing` | Package comparison |
| `/templates` | Template preview gallery |
| `/how-it-works` | Planned platform workflow |
| `/faq` | Frequently asked questions |
| `/contact` | Contact details and a demonstration form |
| `/privacy` | Draft privacy policy |
| `/terms` | Draft terms of service |
| `/akan-datang` | Placeholder for future SaaS actions |

## Configuration

Edit these files rather than hard-coding values in components:

- `src/data/brand.ts` — brand colours (keep `src/styles/index.css` in sync; the build checks this)
- `src/data/site.ts` — name, navigation, contact fields, and future SaaS URLs
- `src/data/pricing.ts` — package names, prices, and features
- `src/data/templates.ts` — template gallery
- `src/data/faqs.ts` — FAQ copy
- `src/data/content.ts` — homepage benefits, workflow, and legal draft sections

Optional environment overrides are listed in `.env.example`. Copy it to `.env` only when you have real values. Empty values are intentional: the site must not invent an email address, phone number, or office address.

Starter, Professional, and Business are proposed labels. Leave their price and features as “Akan disahkan” until an approved specification replaces them. Do not describe FREE as free for life unless that is explicitly confirmed.

## Future actions

Log Masuk, Bina Website Percuma, Mula Percuma, and template selection open `/akan-datang` until an absolute `http` or `https` URL is set:

- `VITE_SAAS_LOGIN_URL`
- `VITE_SAAS_REGISTER_URL`
- `VITE_SAAS_EDITOR_URL`

The contact form validates input and then shows the message for copying. It does not claim the message was sent. If `VITE_CONTACT_EMAIL` is set, it also offers a `mailto` link.

## Scope

Not included, and not to be added to this site: Laravel, PostgreSQL, GrapesJS, n8n, OpenRouter, authentication, dashboards, billing, or production deployment configuration beyond a static-host rewrite in `vercel.json`.
