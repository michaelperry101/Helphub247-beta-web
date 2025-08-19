
# HelpHub24/7 — Pro Beta (Light Mode, Vercel-ready)

SaaS-style landing page in **light mode**, floating **Carys** chat widget, and Stripe **test** checkout.

## Deploy from your phone (ZIP Upload)

1) Go to **vercel.com** → Log in.  
2) Tap **New Project** → **Upload**.  
3) Select this ZIP → **Deploy**.  
4) Open your new *.vercel.app* link (the site is live).  
5) Enable the live chatbot:  
   - Vercel → Project → **Settings** → **Environment Variables**  
   - **Key**: `OPENAI_API_KEY`  
   - **Value**: your OpenAI key  
   - Save → **Deployments** → **Redeploy**  
6) Refresh your site → Carys replies live.

## Stripe (test mode link included)
- Replace the test checkout link in `/pages/index.js` when you have a live Stripe Checkout URL.
