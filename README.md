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

- **`ANTHROPIC_API_KEY`** — Anthropic (Claude) API key for chat replies after you speak or type.
- **`OPENAI_API_KEY`** — OpenAI API key for **voice**. We use Whisper on the server to transcribe, so it works on strict Wi‑Fi (e.g. school). Get a key at [platform.openai.com](https://platform.openai.com). Billing is about $0.006 per minute of audio.

**Never commit API keys or hardcode them.**

## Deploy to Vercel

1. Push the repo to GitHub (or connect your Git provider in Vercel).
2. In Vercel: **New Project** → import this repo → **Deploy**.
3. In the project **Settings → Environment Variables**, add:
   - **`ANTHROPIC_API_KEY`** — your Anthropic API key
   - **`OPENAI_API_KEY`** — your OpenAI API key (for voice transcription)
   - **Environments:** Production (and Preview if you want).
4. Redeploy so the variables are applied.

Voice and chat will not work until both keys are set in Vercel.
