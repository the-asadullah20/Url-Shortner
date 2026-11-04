# Linqo

Linqo is a URL shortener that turns a long link into a short address and a QR code. A React app talks to a FastAPI service, which stores links in Supabase and caches redirects in Redis. People sign in with email or Google, and opening a short link sends the visitor to the original page.

## Features

- Shorten an `http` or `https` link and copy the result
- Generate a QR code on the server and download it as a PNG
- Redirect a short code to the original URL, with Redis in front of the database
- Register and sign in with email and password, or start Google sign-in
- Keep a local history of links created in the browser

## Stack

| Layer | Tools |
| --- | --- |
| Frontend | React, Vite, Tailwind CSS |
| API | FastAPI, Uvicorn, Pydantic |
| Data | Supabase Postgres and Auth |
| Cache | Upstash Redis |
| Hosting | Vercel for the app, Render for the API |

## Layout

```
backend/     FastAPI app, routes, and services
frontend/    React app
render.yaml  Render service definition
vercel.json  Vercel build settings
```

## Run locally

Use two terminals.

```bash
cd backend
pip install -r ../requirements.txt
uvicorn main:app --reload --port 8000
```

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173`. In dev, leave `VITE_API_BASE_URL` unset so Vite proxies `/api` to `http://127.0.0.1:8000`.

API docs are at `http://localhost:8000/docs`.

## Environment

Keep the two env files separate. Do not put backend secrets in the frontend.

**Repository root `.env`** (API only)

```
SUPABASE_URL
SUPABASE_KEY
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
BASE_URL
FRONTEND_URL
```

`BASE_URL` is the public API origin, with no trailing slash. `FRONTEND_URL` is the public app origin. Locally those are `http://localhost:8000` and `http://localhost:5173`.

**`frontend/.env`**

```
VITE_API_BASE_URL
```

Set this only for a production build. It is the API origin, with no trailing slash.

## API

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/health` | Service check |
| `POST` | `/shorten` | Create a short link. Body: `{ "original_url": "https://example.com" }` |
| `GET` | `/qr/{short_code}` | QR image for that code |
| `GET` | `/{short_code}` | Redirect to the original URL |
| `POST` | `/auth/register` | Create an account |
| `POST` | `/auth/login` | Sign in with email and password |
| `GET` | `/auth/google` | Return the Google sign-in URL |

## Deploy

The API deploys on Render from the repository root.

```
pip install -r requirements.txt
```

```
cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT
```

On Render, set the root env vars above. `BASE_URL` is the Render URL. `FRONTEND_URL` is the Vercel URL.

On Vercel, set the project root to the repository root and set `VITE_API_BASE_URL` to the Render URL before building. `vercel.json` builds `frontend/` and publishes `frontend/dist`.

In Supabase, under Authentication and URL Configuration, set Site URL to the Vercel origin. Add that same origin to Redirect URLs. For Google sign-in, the provider callback stays on the Supabase project URL: `/auth/v1/callback`.
