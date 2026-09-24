# Blindznation — session handoff, 2026-09-23

> ## START HERE after a restart
>
> **Nothing is lost.** Everything below is committed and live:
> `main` = `dev` = `origin` at the commit this file was pushed with.
> Confirm with `git log --oneline -1` and `git status` (should be clean).
>
> **To bring Claude back up to speed, paste this as the first message:**
>
> > Read SESSION-HANDOFF.md in the blindznation repo. That is where we left off.
> > Confirm main and dev match origin, then tell me the open items.
>
> **Or resume this exact conversation instead** (transcripts survive a restart):
> `claude --continue` in this folder picks up the last session with full context;
> `claude --resume` lets you choose from a list.
>
> **The three things waiting on you** (detail in section 6):
> 1. Get the **Norman shutter price book** — the $/sq ft rates. Only blocker on shutters.
> 2. **Sanity-check the 300" Roman cap** — the form now accepts 300 x 250.
> 3. **Per-cut drapery rates above 185"** if you want to sell longer panels.
>
> **The one thing I can just get on with:** the Centerpiece fabric list
> (~147 rows). It is the only blocker on un-gating Centerpiece pricing.


Written so nothing is lost across a terminal restart. **Everything described below
is committed AND live** (`main` = `dev` = `0c4e2d2`), unless it sits under
"Open / not done".

---

## 1. Live state

| | |
|---|---|
| Branches | `main` and `dev` both at **`0c4e2d2`**, working tree clean |
| Repo | github.com/mzgxfnbzpy-commits/blindznation |
| Deploy | Vercel auto-deploys `main`, ~30s |
| Session start | `68f73c8` — **16 commits** shipped since |

Philly Blinds was **not touched** this session and stays frozen.

---

## 2. Current soft-treatment rules (the ones that kept changing)

These were revised several times in one day. **This table is the final word** —
anything earlier in the transcript is superseded.

### Drapery — priced per cut
- **$125/cut unlined · $135/cut lined** · goblet/barrel **+$20/cut** · interlining **+$10/cut**
- Cuts = `ceil( (rod width + allowance) × fullness ÷ 54″ )`, **min 2 cuts**, allowance = return × 3, applied **before** fullness
- Length bands added per cut: ≤99″ +0 · 100–115 +20 · 116–130 +35 · 131–141 +70 · 142″+ +70 then +35 per further 10″ · **over 185″ no auto price**
- $200 minimum per set · lining $10/yd · face fabric $25/yd · trim $15/ft
- **Size: 10″–300″ wide × 12″–185″ long.** Width cap raised 200→300 on 2026-09-23.
  Length stays 185″ because that is where the per-cut ladder ends.

**Drapery freight** — both dimensions must fit, inclusive:

| Panel | Freight |
|---|---|
| ≤ 180″ × 150″ | **$200** |
| ≤ 250″ × 200″ | **$300** |
| larger | **$500** + "can be ordered, but freight is confirmed at order and may increase" |

### Roman shades — **CUSTOM QUOTE ONLY**
Set 2026-09-22. No figure shown, none in the cart, none in the emailed spec.
Controlled by **one flag**: `RN_QUOTE_ONLY = true` in `js/pages/soft-treatments.js`.
Set it to `false` and pricing returns intact — nothing was deleted.

Dormant-but-correct pricing underneath: $40/sq ft flat·relaxed·valance, $50
pleated, lining +$5/sq ft, **minimum $150 flat / $250 pleated per shade**, square
feet **round UP** to a whole foot, pleated fabric yardage uses height × 3.

**Roman freight** (six bands, both dimensions must fit, inclusive):

| Shade | Freight |
|---|---|
| ≤ 80″ × 100″ | $100 |
| ≤ 120″ × 120″ | $150 |
| ≤ 160″ × 150″ | $200 |
| ≤ 220″ × 200″ | $300 |
| ≤ 300″ × 250″ | $400 |
| larger | $500 |

**Size cap raised 120×120 → 300×250** to match the ladder (`RN_MAX_W` / `RN_MAX_H`).

### Cornices & valances — priced per linear foot
- `ceil( (width + return×2) ÷ 12 )`, **min 4 ft**; **$200 minimum per piece** before trim
- Rate steps on **face height**: ≤15″ $35/ft · 16–35″ $70 · 36–55″ $95 · 56–75″ $120 · **+$25/ft per further 20″**
- **Fabric NOT included** — quoted separately. Trim $15/ft.
- Size 12–300″ wide.

**Board freight** — by **width only** (a board is rigid; face height is irrelevant):

| Width | Freight |
|---|---|
| ≤ 80″ | $100 |
| > 80″ | $200 |
| > 120″ | $250 |
| > 160″ | $300 |
| > 250″ | $400 |

**Splicing returns any width to $100.** 260″ board: $2,110 unspliced vs $1,710 spliced.

### Where freight lives
All in `js/shared.js`, one function per product so nothing drifts:
`pbDraperyFreight(w,h)` · `pbRomanFreight(w,h)` · `pbBoardFreight(w)` ·
`pbRollerFreight(...)` for Basic Roller. Tier arrays sit next to each.
**Norman products never use any of these** — they carry Norman's own table
($25 first + $11 each, or $80 + $50 each at 90″+).

Every soft-treatment shipping figure shows **"Shipping is an estimate and may change."**

---

## 3. Bugs found and fixed this session

| Product | Bug | Impact |
|---|---|---|
| **SmartDrape** | Price chart axes **transposed** — book has length down the left, width across the bottom | 184″×48″ quoted **$1,685 instead of $3,088**; 48″×144″ quoted $2,305 instead of $1,685 |
| **SmartDrape** | Lakeshore Stripe has its own cheaper chart, was priced off the other | ~$330 overcharge at 96×84 |
| **SmartDrape** | Six accessories offered as tick-boxes, never charged | keystone $73, wand $89, shim $28, long L bracket $61/shade, vane pack $230–540, charging wand $75 |
| **SmartDrape** | Freight missing from the total entirely | — |
| **Faux wood** | Width capped 72″ instead of book's 96″ | hid the 78/84/96 price columns, the 90″ freight tier **and** the whole 48 sq ft / +$18 overage rule |
| **Faux wood** | Overage in the price box but **not** in the emailed/cart price | would undercharge once width opened up |
| **Centerpiece** | Prices **never transcribed** — arithmetic ladders, 3–4× under book ($148 where book says $404) | now **quote-only** |
| **Soft treatments** | Out-of-range size kept the **last valid price in the cart** — price a 185″ drape, change to 186″, "custom quote" on screen but Add to Cart still added $2,295 | five paths |
| **Terms** | **17 submit functions had no terms check** | customers could order from most pages without agreeing to anything |
| Shutters | Frame options couldn't describe a shutter well enough to hand-price | sill/bottom plate offered 2 of 6 cases (12% swing); one "Z Frame" button spanned 3 billable tiers |

**Verified already correct** (checked cell by cell, no changes needed): real wood
(168 cells), PerfectSheer (210), City Lights (140), Synchrony (192), Portrait
cellular, all Norman Smart + Rollease motorization prices, and the whole drapery /
Roman / cornice rate card.

---

## 4. Terms of Agreement

**Gate is universal now.** Central in `shared.js`, not per-page:
`_pbIsSubmitHandler` → `_pbSubmitButtons` → `_pbInjectTermsCheckboxes` →
`_pbTermsClickGuard` (capture-phase click block + `stopImmediatePropagation`).
A MutationObserver re-runs the injector as configurator steps render.
**40 of 84 pages** carry a gated submit button, every one with a checkbox.
Verified: unchecked blocks, checked submits, 40/40.

Clauses added to `pages/terms-of-agreement.html` (existing ones kept — custom
goods final sale in production, self-measure is the customer's risk, liability
capped at amount paid):
- **7** deposits non-refundable, no restocking/exchange/credit on custom goods, no returns for preference, chargeback leaves customer liable for full amount + our costs
- **17** 30-day hold on finished goods, storage charges after, abandonment at 90 days, return-visit charge
- **18** events outside our control — supplier delays, discontinued materials, carrier loss, weather, new tariffs
- **19** customer confirms ownership/authority + landlord/HOA permission, discloses what's behind the mounting surface, indemnifies us
- **20** **Pennsylvania law, 30-day informal resolution, venue Montgomery County PA, jury-trial waiver, no class actions, one-year limit**
- **21** entire agreement, severability, no waiver, no third-party rights

> Cancellation before fabrication starts is still free — deliberate. "No refunds
> once material is cut" is firmly enforceable; refusing a cancellation before any
> work invites the dispute you'd rather avoid.

---

## 5. Email routing — verified, nothing to change

Every recipient on Blindznation is **`justin@blindznation.com`** (94 occurrences):
`TEAM_EMAILS` in `api/quote.js`, the fallback address, all mailto links.
`noreply@blindznation.com` is the *sending* address. The only other addresses
anywhere are in `HANDOFF.md` documentation *stating they are retired*.
**Do not reintroduce the @phillyblinds.com team list.**

---

## 6. Open / not done

### Needs something from Justin
1. **Shutter price book — the blocker.** The $/sq ft rates are in **no document we
   hold**. Checked all six shutter manuals (2026 revisions + older), Brightwood,
   both overview decks, the 2019 PO form, `wholesale-pricing/prices/Norman/`
   (which has a book for every *other* Norman product), and every image-only page
   (all installation diagrams). No "SUGGESTED RETAIL" page exists in any of them.
   **Ask Norman for the $/sq ft rates, surcharge amounts, and any minimum.**
   Everything else is built — the billable-area engine is done and verified
   against 14 worked cases. Switching shutters on is one multiplication.
2. **Drapery above 185″ long** — needs per-cut rates above 185″ before it can be
   sold with a price. Currently a hand quote.
3. **Roman 300″ sanity check** — the form now accepts 300×250. A 300″ Roman is
   several shades on a shared headrail in practice. If there's a real fabrication
   limit, lower `RN_MAX_W` / `RN_MAX_H`.
4. **Motorization discount** — Philly Blinds discounts Norman motors 20%,
   Blindznation does not ($420 vs $525/shade). Deferred since 2026-09-10.

### Work I can do, not started
5. **Centerpiece fabric list rebuild (~147 rows)** — the blocker for un-gating
   Centerpiece. Its listed "group 1" fabrics (Brook, Emery) and two "group 2"
   (Hayes, Valerie) are **Day & Night roller fabrics**, not Roman collections, and
   ~20 real collections are missing. Price depends on the fabric's group, so
   correct tables don't help until the list is right.
   **The three real charts are already transcribed** in
   `js/pages/norman-centerpiece-roman.js` as `CP_BOOK_G1/G2/G3` —
   G1 = Scarlett ($404 at 36×24), G2 = the 24 standard collections ($492),
   G3 = Blake·Libeco·Rochelle·Bali·Breeze·Ellie ($593).
6. **Remaining per-product surcharge audits** — Soluna collections Olivia, Etch,
   Springtide were never added (partial colour data only).

---

## 7. Technique notes worth keeping

**Reading PDF price charts.** `pdftoppm` is NOT installed — pages cannot be
rendered, so image-only charts can't be read. Text extraction works via
`pdfjs-dist`.

**When a book page has two charts side by side, the flattened text layer does NOT
tell you which caption belongs to which.** Read the text-item **x/y coordinates**
instead (`tools/pdfpos.js`). This settled Centerpiece's price groups —
a 22% difference — where reading order gave the wrong answer, and confirmed
Synchrony's four groups were already right.

**The renamed-label bug class** — a guard compares a button's visible text,
someone renames the button, the guard silently stops matching and stops charging.
Four found historically. After any label rename, grep for
`textContent.trim() === '`, `.includes('`, `.indexOf('` against label variables.
Match on meaning (`pbIsBlackoutLabel()`), never wording.

**Multiple price paths drift.** Faux wood and SmartDrape both had a price box that
charged something the emailed/cart price didn't. When auditing a configurator,
always diff *every* path that computes a total. Soft treatments are built better —
one calculation, cart reads the stored result.

**Shell/heredoc traps that cost real time this session:**
- Heredocs eat backslashes — a regex written in one arrives with `\b`, `\s`, `\(`
  stripped. Avoid regex in generated scripts, or build it without escapes.
- `String.replace` with a **replacement string** treats `$'` as "everything after
  the match". These files are full of `'): $' +`. Always use `split().join()` or a
  replacer **function**.
- Quote paths with spaces in shell loops, or the path splits on "Important PB".

**jsdom harness gotchas** (harness + regression scripts saved in `tools/`, see `tools/README.md`)**:** it fetches neither `<script src>` nor stylesheets —
inline both in document order. A literal closing script tag inside a `.js` file
ends the inlined tag early (`shared.js` has one in a comment). `offsetParent` is
always null, so any visibility-dependent check can't be tested. `DOMContentLoaded`
fires *after* the constructor returns — `await` a tick before asserting.

---

## 8. Standing constraints

- **Philly Blinds is frozen.** Do not touch it unless Justin names that site.
- **Do NOT mirror between the two sites.** The old "every change applies to both"
  rule is retired (2026-09-20 separation).
- **Blindznation email is `justin@blindznation.com` only.**
- **No links to phillyblinds on Blindznation.** Keep "Est. 2014".
- **Never auto-push to `main`** — ask, get "confirmed" / "yes push live".
- Vendor price books must never go inside a deployed repo.

---

## 9. Reference documents

- `PhillyBlinds Photos/PDF PRODUCTS/Norman/PRICE-GAP-ANALYSIS.md` — the full
  per-product audit, all three passes, including the shutter investigation.
- `PhillyBlinds Photos/PDF PRODUCTS/WALLACE/2026B-current/WHAT-CHANGED.md` —
  Wallace 2026B/C/D findings (+15% on five books; all quote-only so no
  customer-facing change).
- **Soft Treatments Rate Card** (private web page, shareable):
  https://claude.ai/code/artifact/e5be89c3-38be-4a0d-a051-c2ca9bec67b2
  ⚠️ Behind as of this writing — does not yet show Romans as quote-only, the
  180×150/250×200 drapery brackets, or the six-band Roman ladder.
