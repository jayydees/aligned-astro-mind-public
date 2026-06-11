# Aligned — Dating Without the Photos

**The average dating app user decides in under 3 seconds. That's not matchmaking — that's a reflex test.**

Photo-first swiping has optimized dating into a vending machine for snap judgments: carefully written bios go unread, genuinely compatible people get filtered out by a thumbnail, and everyone ends up exhausted. Meanwhile, in the Indian context specifically, millions of families *already* run a compatibility-first process — kundali matching — that modern apps treat as a relic instead of a signal.

Aligned is my experiment in flipping the model entirely: **a text-first dating app with zero photos**, where matching runs on two parallel engines — psychology (Big Five, attachment styles, values) and Vedic astrology (Lagna, Rashi, Nakshatra compatibility). You match on who someone is, not what their best angle looks like.

## How it works

**Profiles are written, not shot.** Onboarding is a deliberate 6-step journey:
1. Birth details — date, time, place (the inputs a kundali actually needs)
2. Identity — name, gender
3. Relationship status & location
4. Languages & interests
5. **About you** — profession, a "Life Journey" narrative (50–1000 chars), and your values. This is the profile.
6. Contact & account — WhatsApp-first, because that's where Indian dating conversations actually happen

**Matches come with receipts.** Every match card shows two scores — **Psychological** and **Vedic** — each with a plain-language justification ("You both value emotional depth...", "Compatible Moon signs in harmonious houses..."). Expand the card for the full reasoning. Connect or pass, but either way you know *why* this person was suggested.

## Privacy is structural, not a checkbox

This app collects genuinely sensitive data (exact birth time and coordinates, phone numbers), so the data model treats privacy as architecture:

- Sensitive fields live in a locked-down `profiles` table with row-level security — you can only ever read your own row
- Other users see you through a `public_profiles` **view** that exposes the curated persona only: age is computed on the fly (your birth date never leaves the table), and birth coordinates, phone, and legal name are simply not in the view
- The view runs with `security_invoker` so RLS can't be bypassed through it

## Run it

```bash
npm i
cp .env.example .env.local
# VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY, VITE_SUPABASE_PROJECT_ID
# → from your Supabase dashboard (Settings → API)
npm run dev    # http://localhost:8080
```

Apply the migrations in `supabase/migrations/` to your Supabase project and you have the full schema, RLS policies, and the public view.

## Stack

Vite + React 18 + TypeScript, shadcn/ui + Tailwind, Supabase (Postgres + Auth + RLS), React Hook Form + Zod, TanStack Query. Registration state persists to localStorage so closing the tab mid-onboarding loses nothing.

## Honest status

The full product surface is built — landing, education pages (Psychology / Vedic / Text-First), auth, 6-step onboarding, dashboard with match cards, and the privacy-hardened schema. The scoring engines are currently stubbed (scores are placeholders); computing real psychological and kundali compatibility from the collected birth data is the next build phase, most likely as Supabase edge functions.

---

Built by [@jayydees](https://github.com/jayydees). Compatibility was never a photograph.
