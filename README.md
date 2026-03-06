# Creative Hub — Vanilla Fullstack MVP

This is a small Fiverr-style marketplace built with Vanilla HTML/CSS/JS frontend and Node.js + Express backend. It includes Stripe Checkout integration, MongoDB storage, JWT auth, and role-based designer/client flows.

Quick start

- Copy `.env.example` to `.env` and fill values (Mongo, JWT secret, Stripe keys, FRONTEND_URL)
- Install dependencies:

```bash
cd creative-hub-mvp-vanilla
npm install
```

Run locally (options):

- Using npm directly:

```bash
npm run dev
```

- Using the included PowerShell helper (Windows):

```powershell
.\run-local.ps1
```

Notes when running locally:

- Make sure MongoDB is running locally (run `mongod`) or set `MONGO_URI` to a hosted MongoDB (Atlas).
- Edit `.env` and set `JWT_SECRET`, `STRIPE_SECRET`, and `STRIPE_WEBHOOK_SECRET` before testing payments.
- To test webhooks with Stripe locally, install the Stripe CLI and run:

```bash
stripe login
stripe listen --forward-to localhost:5000/api/stripe/webhook
```

Then create test payments from the UI; the webhook will create an `Order` on `checkout.session.completed` events.

Notes
- Stripe Webhook: For production, set `STRIPE_WEBHOOK_SECRET` and point Stripe webhook to `/api/stripe/webhook`.
- The webhook currently creates orders with `clientId: null` because checkout session metadata doesn't include user id by default. For mapping client id, include user id in metadata when creating sessions.

Mapping `clientId` to orders:

- To record the buying user on orders, include the logged-in user's id in the checkout session `metadata` when creating the session (frontend fetch to `/api/stripe/create-checkout-session`). Example: pass `{ gigId, clientId: user.id }` in the request body and include it when creating the session on the server. The webhook then reads `session.metadata.clientId` and stores it on the `Order`.


Folder structure
- `server.js` — express server
- `models/` — Mongoose models (User, Gig, Order)
- `routes/` — API endpoints
- `middleware/` — `auth` JWT middleware
- `public/` — static frontend (HTML/CSS/JS)
