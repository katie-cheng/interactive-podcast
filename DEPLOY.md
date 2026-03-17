# Secret Graffiti — Setup & Deploy Guide

This guide walks you through getting the **voice button** working (with Claude) and **deploying to Vercel**.

---

## Part 1: Get the voice button working (Anthropic API key)

The mic records your speech and sends the transcript to Claude. That requires an **Anthropic API key**.

### 1. Get an API key

1. Go to [console.anthropic.com](https://console.anthropic.com).
2. Sign up or log in.
3. Open **API Keys** (in the dashboard or under your account).
4. Click **Create Key**, name it (e.g. “Secret Graffiti”), and copy the key.  
   (You won’t see it again, so store it somewhere safe.)

### 2. Use the key locally

1. In your project folder, copy the example env file:
   ```bash
   cp .env.example .env.local
   ```
2. Open `.env.local` and set your key:
   ```
   ANTHROPIC_API_KEY=sk-ant-api03-...your-key-here...
   ```
3. Restart the dev server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000), go to a chunk, and use the mic.  
   If the key is valid, you should see Claude’s reply in sage green.

**If the voice button still doesn’t work:**

- **Speech recognition:** Use a supported browser (e.g. Chrome) and allow microphone access when prompted.
- **No reply / error message:** If you see a message like “Voice replies aren’t set up yet…”, the app didn’t get `ANTHROPIC_API_KEY`. Confirm `.env.local` has the key and you restarted `npm run dev` after editing it.

---

## Part 2: Deploy to Vercel

### 1. Push your code to GitHub

1. If you haven’t already, init git and create a repo on GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
2. On GitHub, create a new repository (e.g. `secret-graffiti`), then:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```
   (Use your actual GitHub username and repo name.)

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (GitHub is easiest).
2. Click **Add New…** → **Project**.
3. **Import** your GitHub repo (e.g. `secret-graffiti`).  
   Vercel will detect Next.js and use default settings; you can leave them as-is.
4. **Before** clicking Deploy, open **Environment Variables**.
5. Add one variable:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** your Anthropic API key (same as in `.env.local`)
   - **Environments:** check **Production** (and **Preview** if you want voice on preview URLs too).
6. Click **Deploy**.  
   Wait for the build to finish.

### 3. After deploy

- Your site will be at a URL like `https://your-project.vercel.app`.
- **Voice will work there only if** you added `ANTHROPIC_API_KEY` in step 2.5.  
  If you forgot, go to the project in Vercel → **Settings** → **Environment Variables**, add `ANTHROPIC_API_KEY`, then **Redeploy** (Deployments → ⋮ on latest → Redeploy).

### 4. Optional: custom domain

In the Vercel project: **Settings** → **Domains** → add your domain and follow the DNS instructions.

---

## Checklist

- [ ] Anthropic API key created at [console.anthropic.com](https://console.anthropic.com)
- [ ] `.env.local` created with `ANTHROPIC_API_KEY=...` (for local dev)
- [ ] Repo pushed to GitHub
- [ ] Vercel project created and repo imported
- [ ] `ANTHROPIC_API_KEY` added in Vercel Environment Variables
- [ ] Deploy (and redeploy if you added the key later)
- [ ] Voice button tested on the live URL

Once the key is set locally and in Vercel, the voice button should work in both environments.
