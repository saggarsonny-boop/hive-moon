# ENGINE_GRAMMAR — HiveMoon

<GrapplerHook>
engine: HiveMoon
version: 1.0.0
governance: QueenBee.MasterGrappler
safety: enabled
multilingual: pending
premium: false
</GrapplerHook>

## Engine Identity
- **Name:** HiveMoon
- **Domain:** hivemoon.hive.baby
- **Repo:** saggarsonny-boop/hive-moon
- **Status:** Live
- **Stack:** Next.js + TypeScript (client-only, no Anthropic SDK)

## Purpose
Real-time moon phase, position, and lunar cycle engine. Displays the current moon phase using precise astronomical algorithms — no API calls, no polling. Designed to be beautiful, accurate, and immediately understandable. Viral hook: "Does the moon affect you?"

## Inputs
- Current date/time (auto, from device)
- No user input required

## Outputs
- Current moon phase (name + emoji + percentage illuminated)
- Days to next phase (new, first quarter, full, last quarter)
- Moon rise / set times (device location if granted, UTC fallback)
- Lunar portrait: visual moon dial with phase arc
- Shareable Lunar Portrait card

## Modes
- **Live:** Current phase, updating in real time
- **Portrait:** Shareable visual card of today's moon
- **Calendar:** 30-day lunar calendar (planned)

## Reasoning Steps
1. Calculate Julian date from device time
2. Compute moon phase angle using simplified astronomical formulae
3. Map angle → phase name, emoji, illumination percentage
4. Calculate days to each upcoming phase event
5. Render dial and portrait card

## Safety Templates
- None required. Pure astronomical data.
- Note on any health claims: "Lunar cycle correlations are observational. This is not medical advice."

## Multilingual Ribbon
- Status: pending
- Target: all languages (moon is universal)
- MLLR integration: post-QB deployment

## Premium Locks
- Free: all current features forever
- Future Pro: push notifications for phase changes, personalised lunar journal, 12-month lunar calendar PDF

## Governance Inheritance
- Governed by: QueenBee.MasterGrappler (pending)
- Safety level: standard
- Output schema: moon-response
- Tone: warm

## API Model Strings
- None (client-only, no LLM calls)

## Deployment Notes
- Vercel: deploy via `cd /workspaces/hive-moon && npx vercel --prod --yes`
- Domain: hivemoon.hive.baby → Cloudflare CNAME → cname.vercel-dns.com
- Deployment Protection: OFF
- Project ID: prj_UZ75MoGAgd3dKAFUkI5XKLybATl2
