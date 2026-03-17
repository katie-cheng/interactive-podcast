# Get a Vercel link in a few minutes

## 1. Deploy from your computer

In Terminal, from your project folder:

```bash
cd /Users/katiecheng/Documents/Developer/interactive-podcast
npx vercel
```

- First time: it will ask you to **log in** (opens browser). Sign in with GitHub or email.
- When it asks **Set up and deploy?** → press **Y** (Yes).
- When it asks **Which scope?** → pick your account.
- When it asks **Link to existing project?** → **N** (No).
- When it asks **What’s your project’s name?** → press Enter (uses `interactive-podcast`).
- When it asks **In which directory is your code located?** → press Enter (uses `./`).

It will build and give you a **URL** like:

**https://interactive-podcast-xxxx.vercel.app**

That’s your live link. The site will work, but **voice/typed replies will show the “API key not set” message** until you add the key in step 2.

---

## 2. Add your API key so voice/type work

1. Go to **[vercel.com/dashboard](https://vercel.com/dashboard)** and open your project.
2. Click **Settings** → **Environment Variables**.
3. Add:
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** paste your real key (starts with `sk-ant-...`). **No quotes.**
   - **Environments:** check **Production** (and **Preview** if you want).
4. Click **Save**.
5. **Redeploy** so the key is used:
   - Go to **Deployments**.
   - Click the **⋯** on the latest deployment → **Redeploy** → **Redeploy**.

After the redeploy, open your Vercel link again. Typed replies and (if your network allows it) voice should work.

---

## If .env.local still doesn’t work locally

- **Format:** In `.env.local` you must have exactly one line:
  ```env
  ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxx
  ```
  No quotes, no space around `=`, no extra text. The value must be your **actual** key from [console.anthropic.com](https://console.anthropic.com).
- **Location:** `.env.local` must be in the **project root** (same folder as `package.json`).
- **Restart:** After any change to `.env.local`, stop the dev server (Ctrl+C) and run `npm run dev` again.

Once the key is set on **Vercel** (step 2), the deployed site will work even if local still doesn’t.
