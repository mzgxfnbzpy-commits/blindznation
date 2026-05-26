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
| GitHub repo | TBD — create blindznation-specific repo | ❌ Not yet |
| Vercel | TBD — blindznation.vercel.app or custom | ❌ Not yet |
| Local files | C:\Users\Blind\Desktop\BUSINESS\Important PB\AI claude\blindznation | ✅ |
| Domain | blindznation.com | ❌ Not yet configured |
| Business email | TBD — different from phillyblinds | ❌ TBD |
| Form backend | mailto → blindznation email (TBD) | ❌ TBD |

---

## DESIGN SYSTEM — BLINDZNATION SPECIFIC

> ⚠️ These tokens are DIFFERENT from phillyblinds. Do NOT use phillyblinds's espresso/gold palette here.
> Colors below are PLACEHOLDERS — owner must confirm final palette before finalizing design.

```css
/* BLINDZNATION BRAND TOKENS — currently set as placeholders in css/global.css */
/* Look for the "BLINDZNATION OVERRIDES" block at the top of global.css */
--bz-primary:    #1A1A2E   /* placeholder: deep navy — nav, dark sections */
--bz-accent:     #E94560   /* placeholder: crimson/red — CTAs, accents */
--bz-light:      #F0F0F0   /* placeholder: light background */
--bz-cream:      #FFFFFF   /* placeholder: headings on dark */
Font: system sans-serif — no external fonts
Border radius: 8px buttons, 12px cards
```

**When owner confirms colors:** Update the `:root` block at the top of `css/global.css` in this project only.

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
| GitHub repo | mzgxfnbzpy-commits/phillyblinds | TBD |
| Vercel URL | phillyblinds.vercel.app | TBD |
| Brand colors | Espresso #1C1510 + Gold #C8973F | TBD (placeholder navy/crimson) |
| Contact email | blindznation@gmail.com | TBD |
| Nav logo text | Philly Blinds (active) · Blindznation | Blindznation (active) · Philly Blinds |
| Footer brand | Philly Blinds primary | Blindznation primary |
| JSON-LD schema | phillyblinds.com | blindznation.com |
| theme-color meta | #1C1510 (espresso) | TBD (update with final color) |

---

## BUSINESS RULES — SAME AS PHILLYBLINDS (CRITICAL)

These rules are IDENTICAL between both projects. Do not deviate:

- All quote forms → mailto: blindznation contact email (TBD — update when confirmed)
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

All 48 pages are ported from phillyblinds. See phillyblinds CLAUDE.md for full page status.
Brand references updated in shared.js and global.css. Content is identical to phillyblinds.

### Still needed:
- [ ] Owner confirms blindznation brand colors → update `:root` in css/global.css
- [ ] Owner confirms blindznation contact email → update shared.js + all quote forms
- [ ] Create GitHub repo for blindznation
- [ ] Create Vercel project for blindznation
- [ ] Configure blindznation.com domain in Vercel
- [ ] Update JSON-LD schema URL in shared.js (search: blindznation.com — already updated)
- [ ] Set ANTHROPIC_API_KEY in Vercel env vars for chatbot

---

*Last updated: May 2026 — initial port from phillyblinds*
*Agent: Claude Code — full site copied, brand references updated in shared.js and global.css*
