# vlanguret

Website for VLanguret Design Build LLC. Built with Next.js, Sanity CMS, and Tailwind CSS.

## Setup

```bash
npm install
```

Create a `.env.local` file:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

# Email (Resend) - used by /api/inquiry
RESEND_API_KEY=your_resend_api_key
INQUIRY_EMAIL=info@vlanguret.com

NEXT_PUBLIC_SITE_URL=https://vlanguret.com
```

Never commit real API keys/tokens. If a token is ever pasted into chat/logs, rotate it immediately.

## Development

```bash
npm run dev           # starts next.js on localhost:3000
npm run studio        # starts sanity studio on localhost:3333
```

## Build and deploy

The site deploys to Vercel. Push to `main` and it deploys automatically.

Make sure the env vars above are set in the Vercel dashboard too.

To build locally:

```bash
npm run build
npm run start
```

## Sanity

Content is managed through Sanity. Schemas live in `src/schemas/`. Run `npm run studio` to add/edit projects, testimonials, team members, etc.

To deploy the studio separately:

```bash
npm run deploy-studio
```
