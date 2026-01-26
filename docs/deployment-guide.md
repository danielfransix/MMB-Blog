# Deployment Guide for Strapi + Next.js Blog

This guide outlines the steps to take your project from local development to a live production environment.

## 🚨 Crucial First Step: Database & Configuration

Your current setup uses **SQLite**, which is a file-based database.
- **Local Development**: SQLite is great.
- **Production**: SQLite **will not work** on most serverless/cloud platforms (like Heroku, Vercel, Railway, Strapi Cloud) because the file system is "ephemeral" (it resets every time you deploy).

**Requirement**: For most production options below, you must switch to **PostgreSQL**.

### 1. Prepare Next.js for Production
Your `next.config.ts` currently points to `localhost`. You need to make it dynamic.

**File:** `next-js-version-strapi-copy/next.config.ts`
Update it to use an environment variable:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_STRAPI_HOST || 'localhost',
        port: '', // Leave empty for standard https (443)
        pathname: '/uploads/**',
      },
       // Keep localhost for local dev if needed, or handle via env var logic
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
```

---

## Option 1: The "Official & Easiest" Path (Strapi Cloud + Vercel)
*Best for: Ease of use, minimal configuration, budget is flexible.*

### Step 1: Deploy Strapi (CMS)
1.  **Commit & Push**: Ensure your `cms` folder is pushed to a GitHub repository.
2.  **Strapi Cloud**:
    *   Go to [cloud.strapi.io](https://cloud.strapi.io).
    *   Connect your GitHub account.
    *   Select your repository and the `cms` folder.
    *   **Database**: Strapi Cloud automatically provides a PostgreSQL database. You don't need to do anything.
    *   **Deploy**: Click deploy.
3.  **Get URL**: Once finished, you will get a URL (e.g., `https://plankton-app-123.strapi.app`).
4.  **Transfer Data**: Use Strapi's "Transfer" feature (in Settings > Transfer Tokens) to push your local content (articles, authors) to the production server.

### Step 2: Deploy Next.js (Frontend)
1.  **Vercel**:
    *   Go to [vercel.com](https://vercel.com).
    *   Import the same GitHub repository.
    *   Select the `next-js-version-strapi-copy` folder as the "Root Directory".
2.  **Environment Variables**:
    *   Add the following variables in Vercel project settings:
        *   `NEXT_PUBLIC_STRAPI_URL`: `https://plankton-app-123.strapi.app` (Your new Strapi URL)
        *   `NEXT_PUBLIC_STRAPI_HOST`: `plankton-app-123.strapi.app` (Just the hostname for image config)
        *   `STRAPI_API_TOKEN`: Create a read-only API token in your Strapi Admin panel and paste it here.
3.  **Deploy**: Click deploy.

---

## Option 2: The "Cost-Effective" Path (Render / Railway)
*Best for: Low cost, developers comfortable with some config.*

### Step 1: Database (PostgreSQL)
1.  Create an account on **Render.com** or **Railway.app**.
2.  Create a new **PostgreSQL** database.
3.  Copy the `External Database URL` (e.g., `postgres://user:pass@host:port/db`).

### Step 2: Configure Strapi for Postgres
1.  In your local `cms` folder, install the postgres client:
    ```bash
    npm install pg
    ```
2.  Update `config/database.ts` (it handles env vars already, which is good).
3.  Commit `package.json` and `package-lock.json`.

### Step 3: Deploy Strapi
1.  **Create Web Service** (on Render/Railway): Connect your GitHub repo.
2.  **Root Directory**: Set to `cms`.
3.  **Build Command**: `npm run build`
4.  **Start Command**: `npm run start`
5.  **Environment Variables**: Add these (using details from Step 1):
    *   `DATABASE_CLIENT`: `postgres`
    *   `DATABASE_URL`: (Paste the connection string from Step 1)
    *   `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`: Generate random strings for these security keys.
6.  **Deploy**.

### Step 4: Deploy Next.js
(Same as Option 1, use Vercel. It's free for personal use and works best with Next.js).
Alternatively, you can deploy Next.js on Render/Railway as well:
1.  **Build Command**: `npm run build`
2.  **Start Command**: `npm start`
3.  **Env Vars**: Same as Option 1 (`NEXT_PUBLIC_STRAPI_URL`, etc.).

---

## Option 3: The "Self-Hosted" Path (VPS - DigitalOcean/Hetzner)
*Best for: Full control, fixed pricing, keeping SQLite (optional but risky).*

If you **really** want to keep using SQLite and avoid managing a database server:
1.  Rent a VPS (e.g., Ubuntu droplet).
2.  Install Node.js (v18/v20) and PM2 (`npm i -g pm2`).
3.  Clone your repo.
4.  **Strapi**:
    *   Navigate to `cms`.
    *   `npm install && npm run build`.
    *   `pm2 start npm --name "strapi" -- run start`.
5.  **Next.js**:
    *   Navigate to `next-js-version-strapi-copy`.
    *   `npm install && npm run build`.
    *   `pm2 start npm --name "nextjs" -- start`.
6.  **Nginx**: Set up Nginx as a reverse proxy to forward domain1.com -> port 1337 and domain2.com -> port 3000.

*Note: This requires Linux system administration knowledge.*

---

## Summary Checklist
- [ ] Choose a hosting provider.
- [ ] **If Cloud/PaaS**: Install `pg` in Strapi and prepare for Postgres.
- [ ] Update `next.config.ts` to handle remote images dynamically.
- [ ] Push code to GitHub.
- [ ] Set Environment Variables on the hosting platform.
- [ ] Deploy & Test.
