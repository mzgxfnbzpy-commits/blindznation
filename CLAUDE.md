# CLAUDE.md — Blindznation Website
> READ THIS ENTIRE FILE BEFORE TOUCHING ANYTHING.
> Every agent — Claude Code, Claude.ai chat, any future agent — must read this first.
> Last updated: May 2026

---

## ⚠️ CRITICAL — PROJECT IDENTITY

**This is the BLINDZNATION project.**
It is NOT phillyblinds. Do not confuse them.

- If you are currently in a phillyblinds session → STOP. Exit and open a blindznation session.
- If you are currently in a blindznation session → all file edits go to THIS folder ONLY.
- Never cross-write between the two projects.

**Local path for this project:**
`C:\Users\Blind\Desktop\BUSINESS\Important PB\AI claude\blindznation\`

**phillyblinds lives at (do not touch from here):**
`C:\Users\Blind\Desktop\BUSINESS\Important PB\AI claude\phillyblinds\`

---

## RELATIONSHIP TO PHILLYBLINDS

Blindznation is a **sister brand** to Philly Blinds. Same company (Michael J. Healy Installations LLC), same products, same business rules. The website is a branded copy of phillyblinds with different:
- Domain: blindznation.com
- Brand colors / design tokens
- Contact email

**phillyblinds is the MASTER.**
All product specs, motorization rules, business logic, and configurator data originate in phillyblinds first. When a product rule changes, it changes in phillyblinds first, then gets ported to blindznation.

**Before working on any product configurator or business rule in blindznation:**
Check phillyblinds's `CLAUDE.md` for the authoritative spec. The product audits (Norman, Paris Texas, Kirsch, Wallace, etc.) all live there.

---

## HOW ALL AGENTS STAY IN SYNC

### Contact info (always use exactly for this brand)
- **Phone:** (609) 742-1720 — call or text 24/7
- **Email:** justin@blindznation.com
- **Domain:** blindznation.com

### The three agents on this project:
1. **Claude.ai chat** — Design decisions, new page specs, content, review
2. **Claude Code (PowerShell)** — Builds and edits actual files in this blindznation folder
3. **GitHub** — blindznation's own separate repo. Single source of truth for blindznation.

### Branch structure
```
dev    → all work happens here. Safe to push anytime.
main   → LIVE website. Only merge from dev when user says "confirmed push to live".
```

### ⚠️ NEVER auto-push to main. Always ask first.
Claude Code must say: **"Ready to push to live — confirm?"**
User must reply: "confirmed" or "yes push live"

```powershell
# Start every session:
cd "C:\Users\Blind\Desktop\BUSINESS\Important PB\AI claude\blindznation"
git checkout dev
git pull

# End of session (safe, not live):
git add . && git commit -m "what changed" && git push origin dev

# Merge to LIVE (only after confirmation):
git checkout main && git merge dev && git push origin main && git checkout dev
```

### LIVE vs TEST behavior
| Feature | TEST (dev) | LIVE (main) |
|---------|-----------|-------------|
| Configurators | Full | Contact popup only |
| Pricing | Visible | Hidden |
| Gallery, About, Measure guides | Full | Full |
| Phone number | Everywhere | Everywhere |

On LIVE — ALL product card clicks and configure buttons must call `pbShowContact()` instead of opening configurators. **This feature is still to be built.**

### The golden rules:
- **GitHub is always the master for blindznation.** Before starting: `git pull`
- **Claude Code owns the files.** All edits happen through Claude Code in PowerShell.
- **Never copy files from phillyblinds by hand and overwrite.** Apply changes surgically.
- **Never push blindznation changes to the phillyblinds GitHub repo.**
- **Vercel auto-deploys** every push to blindznation's GitHub. Live site updates in ~30 seconds.

---

## PROJECT INFO

**Business:** Blindznation · Michael J. Healy Installations LLC
**Phone:** (609) 742-1720 — 24/7 call or text
**Family:** Justin Healy (owner) · Michael Healy (dad, 60yr exp) · Sarah Healy (sister, design/fab)
**Established:** 2014

---

## INFRASTRUCTURE

| Item | Value | Status |
|------|-------|--------|
| GitHub repo | github.com/mzgxfnbzpy-commits/blindznation | ✅ Live |
| Vercel project | blindz-nations/blindznation (prj_8hEaQMSC6Zs5jGZdqI6xiPnihwZQ) | ✅ Live |
| Local files | C:\Users\Blind\Desktop\BUSINESS\Important PB\AI claude\blindznation | ✅ |
| Domain | blindznation.com → Vercel (apex A record 216.198.79.1) | ✅ Live |
| www redirect | www.blindznation.com → 308 → blindznation.com (Vercel platform-level domain redirect, NOT vercel.json) | ✅ Live |
| Google Search Console | blindznation.com verified (HTML file method) | ✅ Verified |
| Business email | justin@blindznation.com | ✅ Set |
| Quote form backend | mailto:blindznation@gmail.com (all quote forms) | ✅ Active |
| Chatbot API key | ANTHROPIC_API_KEY needed in Vercel env vars | ❌ Not set |

### Domain redirect note
The www → apex redirect is configured as a **Vercel platform-level domain redirect**, not via vercel.json.
The `has: [{type: "host"}]` condition in vercel.json does not fire reliably for static sites.
To change the redirect: use the Vercel API PATCH endpoint:
```
PATCH /v9/projects/prj_8hEaQMSC6Zs5jGZdqI6xiPnihwZQ/domains/www.blindznation.com
{"redirect": "blindznation.com", "redirectStatusCode": 308}
```

---

## DESIGN SYSTEM — BLINDZNATION SPECIFIC

> ⚠️ These tokens are DIFFERENT from phillyblinds. Do NOT use phillyblinds's espresso/gold palette here.

```css
/* BLINDZNATION BRAND TOKENS — confirmed and live in css/global.css */
--espresso:      #111110   /* onyx — nav, dark sections (replaces phillyblinds espresso brown) */
--gold:          #C9A96E   /* champagne gold — CTAs, accents (replaces phillyblinds gold) */
/* Cream, card bg, footer, border, text tones follow same variable names as phillyblinds */
/* but are set to warm ivory/onyx variants in the blindznation css/global.css */
Font: system sans-serif — no external fonts
Border radius: 8px buttons, 12px cards
```

theme-color meta: `#111110` (onyx)

Every page MUST include:
```html
<link rel="stylesheet" href="../css/global.css">  <!-- or css/global.css for index.html -->
<script src="../js/shared.js"></script>
<script>renderNav('Page Name'); renderFooter(false);</script>
```

---

## WHAT IS THE SAME AS PHILLYBLINDS

Everything below is IDENTICAL to phillyblinds unless explicitly listed as different:

- All product configurators (shades, shutters, soft treatments, hardware, etc.)
- All business rules (quote forms, delivery section, motorization rules, Hunter Douglas rules)
- All product specs and pricing logic
- All page structure and layout
- Phone number: (609) 742-1720
- Pickup address: 527 Hoyt Rd, Huntingdon Valley PA 19006 (disclosed after order only)

---

## WHAT IS DIFFERENT FROM PHILLYBLINDS

| Item | Phillyblinds | Blindznation |
|------|-------------|--------------|
| Domain | phillyblinds.com | blindznation.com |
| GitHub repo | mzgxfnbzpy-commits/phillyblinds | mzgxfnbzpy-commits/blindznation |
| Vercel URL | phillyblinds.vercel.app | blindznation.vercel.app |
| Brand colors | Espresso #1C1510 + Gold #C8973F | Onyx #111110 + Champagne Gold #C9A96E |
| Contact email | blindznation@gmail.com (Justin) | justin@blindznation.com |
| Nav logo text | Philly Blinds (active) · Blindznation | Blindznation (active) · Philly Blinds |
| Footer brand | Philly Blinds primary | Blindznation primary |
| JSON-LD schema | phillyblinds.com | blindznation.com |
| theme-color meta | #1C1510 (espresso) | #111110 (onyx) |

---

## BUSINESS RULES — SAME AS PHILLYBLINDS (CRITICAL)

These rules are IDENTICAL between both projects. Do not deviate:

- All quote forms → mailto:blindznation@gmail.com
- Every quote form MUST have delivery/pickup section above submit button
- Pickup address disclosed AFTER order only
- Norman brand → Norman Motorization ONLY (no Somfy/Lutron/Rollease on Norman pages)
- Hunter Douglas (Silhouette, Pirouette, Luminette) → ALWAYS custom quote, no instant pricing
- Drapery hardware motorization → NO brand dropdown, customer puts in notes
- Motorization is ALWAYS a sub-option inside each product configurator — never a standalone page

**For full business rules and product specs, see phillyblinds CLAUDE.md:**
`C:\Users\Blind\Desktop\BUSINESS\Important PB\AI claude\phillyblinds\CLAUDE.md`

---

## CODE STANDARDS

- All pages use `../css/global.css` and `../js/shared.js` (from this blindznation folder)
- Use blindznation color tokens — not phillyblinds's hardcoded hex colors
- Mobile-first, test at 375px width
- Phone number (609) 742-1720 visible on every page
- Forms must have a success/confirmation state
- No external font dependencies
- No frameworks — vanilla HTML/CSS/JS only
- Filenames: lowercase, hyphenated

---

## SYNC PROTOCOL — KEEPING BOTH PROJECTS ALIGNED

When a product spec changes (Norman discontinued fabric, price update, new configurator rule):
1. Apply to **phillyblinds first** (it is the master)
2. Open a **NEW Claude Code session** from the blindznation folder
3. Apply the same change to blindznation
4. Push both repos separately

**Never apply a spec change to blindznation without first verifying phillyblinds has it.**
**Never assume blindznation is up to date — always check phillyblinds CLAUDE.md.**

---

## SITE MAP

All 50+ pages ported from phillyblinds. See phillyblinds CLAUDE.md for full page status.
Blindznation has the same pages as phillyblinds with brand references updated.

### SEO STATUS (May 2026)
- ✅ Google Search Console verified (HTML file method at /google09bbbc86851ec4cd.html)
- ✅ sitemap.xml at blindznation.com/sitemap.xml — all 49 URLs use blindznation.com canonical
- ✅ robots.txt with sitemap pointer
- ✅ All pages have og:url, og:title, og:description, og:type, og:site_name
- ✅ JSON-LD LocalBusiness + Organization + Service schema in shared.js (blindznation.com URLs)
- ✅ canonical tags injected by shared.js pointing to blindznation.com
- ✅ www.blindznation.com → 308 → blindznation.com (Vercel platform redirect)
- ✅ Service areas: Salt Lake City/UT + Philadelphia/PA in schema and copy
- ⬜ Sitemaps not yet submitted to Google Search Console (must be done manually)

### Still needed:
- [ ] Set ANTHROPIC_API_KEY in Vercel env vars to enable chatbot
- [ ] Submit sitemap in Google Search Console: https://blindznation.com/sitemap.xml
- [ ] Upload real swatch photos / hero photos when available

---

*Last updated: May 2026*
*Agent: Claude Code — SEO audit complete, all redirects live, Google verified, OG tags complete*
