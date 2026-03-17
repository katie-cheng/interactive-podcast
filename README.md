# Secret Graffiti

An interactive annotated podcast: a personal story about a father who was a graffiti artist in 1980s San Francisco, with 2026 annotations on AI and creative labor. Listeners can speak back via voice; responses are transcribed and sent to Claude.

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** (no UI component libraries)
- **Vercel** (deployment)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Create a `.env.local` file (see `.env.example`) and set:

- `ANTHROPIC_API_KEY` — your Anthropic API key for the chat API (voice responses).

**Never commit the API key or hardcode it.**

## Deploy to Vercel

1. Push the repo to GitHub (or connect your Git provider in Vercel).
2. In Vercel: **New Project** → import this repo → **Deploy**.
3. In the project **Settings → Environment Variables**, add:
   - **Name:** `ANTHROPIC_API_KEY`  
   - **Value:** your Anthropic API key  
   - **Environment:** Production (and Preview if you want).
4. Redeploy so the variable is applied.

Voice replies will not work until `ANTHROPIC_API_KEY` is set in Vercel.
