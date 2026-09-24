# Price gap analysis — site vs current Norman/Wallace books

Started 2026-09-20, overnight run at Justin's request. **Nothing has been
changed.** This is read-only analysis; rebuilding any table is a pricing change
and needs Justin's approval.

Method: extract each book's Suggested Retail grids as text (`pdfjs-dist`), match
them to the site's price tables **by value** rather than by label or position,
then report the median ratio across every comparable cell. A tight spread
(<0.02) means the match is real; a wide spread means the pairing is wrong.

Site tables read from the **Blindznation** repo (the focus site). Philly Blinds
is frozen and carries the same tables.

---

## 1. Norman Roller Shades (Soluna) — CONFIRMED 3.1% behind

Book: `Norman - Soluna Roller Shades.pdf` (83pp).

| Book chart | Group (per book) | Site grid | Cells | Ratio |
|---|---|---|---|---|
| p6 / RETAIL 14 | Solar PG1 | `s1` | 150 | **×1.031** (x1.030–x1.033) |
| p7 / RETAIL 15 | Solar PG3 | matched `s2` | 150 | **×1.031** (x1.030–x1.033) |
| p9 / RETAIL 17 | Fabric PG2 | `f2` | 150 | **×1.031** (x1.030–x1.033) |
| p10 / RETAIL 18 | Fabric PG3 | `f3` | 150 | ×1.186 (x1.185–x1.189) |

**Confirmed:** Soluna list prices are up **3.1%**. Three independent grids agree
to within 0.003 across 450 cells, so the uplift is certain.

### TWO THINGS NEEDING A HUMAN EYE before any rebuild

1. **Fabric PG3 is out of line (×1.186, not ×1.031).** If the uplift is uniform
   at 3.1%, the site's `f3` does not hold Fabric PG3's values. Either `f3` is
   wrong today, or the chart labelled PG3 is not the one `f3` is built from.
2. **Solar PG3's chart matches the site's `s2`, not `s3`,** at exactly ×1.031.
   That suggests the site's solar groups may be shifted — `s2` appearing to hold
   PG3 data. Against `s3` the ratio is ×0.860, i.e. the site would be ~16% ABOVE
   the book.

Why this cannot be settled from the text alone: one retail chart (**RETAIL 16**)
is an **image** and yields no numbers, so at least one price group has no
readable counterpart. Group labels are also recovered by proximity within a
page, and a page can hold more than one chart, so the label→chart pairing is not
reliable. **Pages 6–10 need to be read visually to confirm which chart is which
group.** Do not rebuild f3/s2/s3 until that is done.

The site's own group assignments are documented in `_SOL_COLL_GROUP` and were
built from the "book May 2026", so they were deliberate — which makes a genuine
mismatch more likely than a careless error, and worth checking rather than
assuming.

---

## 2. Portrait Cellular — CONFIRMED ~3.8% behind

Book: `Norman - Portrait Cellular (2).pdf` (58pp), effective **9/1/2026**.

| Chart | Site table | Cells | Ratio |
|---|---|---|---|
| p7 / RETAIL 10 (3/8" Single) | `CELL_3_8S` | 182 | **×1.038** (x0.999–x1.044) |

36×60 reads **$415 on the site vs $430 in the book**.

Cellular is live-priced on both sites, so every cellular quote is ~4% light.

The previous Portrait book's grids were **images** (zero extractable numbers), so
no book-to-book diff was possible — the site table had to serve as the baseline.
That also means this gap was undetectable until this edition.

**Still to check on cellular:** the other five cell-size tables
(`CELL_9_16S`, `CELL_1_2D`, `CELL_3_4S`, `CELL_3_4D`, `CELL_1_1_4S`). Only the
3/8" Single chart was extractable in this pass.

**Separate question, not yet answered:** driving the configurator with cell size
`34s` returned the 3/8-Single price ($415). Either the harness click did not
register or the cell-size selector does not change the table. Worth a direct
test — if real, it is a bug independent of the uplift.

---

## 3. Faux Wood — Ultimate program — NO GAP

Book: `Norman - Ultimate Faux Woods.pdf` (18pp), chart RETAIL 29
"ULTIMATE CORDLESS FAUX WOOD BLINDS".

Site table `MATRIX` in `js/pages/faux-wood-blinds.js`. Widths line up exactly
(24,28,32,36,42,48,54,60,66,72,78,84,96).

**142 cells compared. Median ×1.000, range ×1.000–×1.000. Exact match.**

Confirmed the site is on the right book: its quote line reads "SmartPrivacy Faux
Wood Blinds (Ultimate program)", i.e. the Ultimate program as Justin specified,
not the separate SmartPrivacy price book.

Nothing to do.

---

## 4. Real Wood — Ultimate Normandy — ONE CELL OFF

Book: `Norman - Ultimate Normandy Woods.pdf` (27pp), chart RETAIL 32
"ULTIMATE NORMANDY CORDLESS WOOD BLINDS".

Site table `NW_MATRIX` in `js/pages/real-wood-blinds.js`. Heights and widths
line up exactly.

**168 cells compared. 167 match exactly. One differs:**

| Size | Site | Book | |
|---|---|---|---|
| 54″H × 32″W | **$449** | **$464** | ×1.033 |

A $15 undercharge on that one size. Could be a book correction or a
transcription slip when the table was first entered — either way the book is
authoritative. Trivial one-line fix, but it is still a price change and needs
Justin's OK.

Note RETAIL 31 (the other half of the wood grid) is an **image** and yields no
numbers, so part of the wood pricing could not be verified.

### Surcharges the book states for Normandy wood — worth cross-checking
Designer color **10%** · Premium color **50%** · Shim **$7 each** · Side mount
bracket **$25 per blind** · Keystone **$81** · Cut-out **$99 per side**.

The site's colour surcharges (0 / 0.10 / 0.50) match. **The side-mount bracket
is worth checking** — faux wood uses $23 in the site code, and this book says
$25 for wood. Not yet verified which page uses which.

---

## 5. Motorization — Norman Smart AND Rollease Automate — NO GAP

Book: `Norman Automated - Motorized shades.pdf` (96pp).

Every motor and accessory figure in the site's `nmGetMotorPrice()` was found in
the current book:

| Item | Site | In book |
|---|---|---|
| Norman Smart motor (per shade) | $482 | yes |
| Norman Smart — SmartDrape | $642 | yes |
| Wired Charging Wand | $161 | yes |
| Wireless Charging Wand | $428 | yes |
| ShadeAuto hub | $321 | yes |
| SmartDial G2 remote | $268 | yes |
| Basic remote | $75 | yes |
| Automate motor — Li-ion | $682 | yes |
| Automate motor — DC low voltage | $814 | yes |
| Automate charging kit | $103 | yes |
| Automate hub | $483 | yes |
| Automate 15-channel remote | $140 | yes |
| Automate solar panel | $242 | yes |
| Repeater $107 · 5-ch wall switch $163 · extension cable $43 | present | yes |

**Nothing to change.**

Two things checked rather than assumed:

- The book lists **two** charging kits. **$103** sits in the *Automate Home*
  section next to Hub $483 — that is the one the site uses, correctly. The **$45**
  kit belongs to the **AutoWand** section, and AutoWand is deliberately removed
  from the sites per CLAUDE.md, so its absence is intentional, not a gap.
- The book also prices a **Single Motor for Skylights at $611**. Not offered on
  the site. Probably deliberate (no skylight product), but worth a decision.

---

## 6. PerfectSheer — NO GAP

Book: `Norman - Perfect Sheer Smart Drape.pdf` (54pp).

- `PS_PRICES` — **leading 8 values of all 14 rows found verbatim in the book.**
  The trailing values are all present too, just not contiguous (the chart is
  laid out across a page break, so a full 15-value row never appears as one run).
- `PS_WOOD_V` — 15 values, **exact match.**
- `PS_FABRIC_V` — 15 values, **exact match.**

Nothing to change.

---

## 7. SmartDrape — prices current, but FIVE ACCESSORIES ARE NEVER CHARGED

`SD_PRICES` leading 8 values of all 8 rows found verbatim, and all eight
`SD_ADD_PER_FT` values present. **The price grid is current.**

`calcPrice()` correctly applies Room Darkening **+20%** and Alternating colours
**+10%**, and bills the motor separately.

### The gap: offered but not priced

`pages/norman-sheers.html` offers these as tick-boxes (`acc-keystone`,
`acc-extra-wand`, `acc-shims`, `acc-long-bracket`, `acc-vane-pack`), and
`updateAcc()` collects them **as labels only** — into `S.accs`, shown in the spec
summary, never added to any total:

| Accessory offered | Book price | Charged? |
|---|---|---|
| Keystones | **$73 each** | NO |
| Additional wand | **$89 each** | NO |
| Aluminum shims | **$28 each** | NO |
| Long L brackets | **$61 per shade** | NO |
| Additional vane pack | $230–$540 (per CLAUDE.md; range not re-extracted) | NO |

A customer can tick all five and the quote does not move. SmartDrape became
live-priced on 2026-09-20, so this is now money.

Two things to decide, not just implement:
- Whether these should be priced at all, or deliberately left as "confirmed at
  order" items. CLAUDE.md's detail-hiding rule says only motor, remote, charger,
  hub, TDBU, D&N and drape trim show as visible surcharges — these five are not
  on that list, so silently folding them into the subtotal may be the intent.
  But they are currently **not charged at all**, which is different from hidden.
- The vane pack price is a range, so it needs a rule (per pack? by size?).

---

## 8. City Lights Aluminum — NO GAP

Book `Norman - City Lights Aluminum Blinds.pdf` (21pp), chart RETAIL 34
"CITYLIGHTS CORDLESS ALUMINUM BLINDS". Widths and heights line up exactly.

**125 cells compared, 0 differ.**

(The site has a 96″ height row; the book's extractable grid stops at 90″, so that
one row is unverified.)

---

## 9. Synchrony Verticals — NO GAP

Book `Norman - Synchrony Verticals.pdf` (14pp), chart RETAIL 33.

**All 24 price rows across every group matched the book verbatim.**

---

## 10. Centerpiece Roman — ⚠️ NEEDS A HUMAN EYE, POSSIBLY SERIOUS

**Surcharges all confirmed correct** against RETAIL 25:
SmartRelease **$89** · Blackout lining **10%** · Ribbon banding **15%** ·
Soft fold / edge banding **30%** · **Day & Night (incl. roller shade) $425** ·
Magnetic hold down **$28** · Pole attachment **$40** · Cordless operating pole
**$89** · Shim **$7**. The site's `dnAdd = 425` matches exactly.

**The base price table is the problem.** The site's `CP_PRICE` is indexed
`[group][widthIndex][heightIndex]` — transposed relative to the book, which is
fine in itself. But the *magnitudes* do not reconcile:

| | width 36 | |
|---|---|---|
| Site `CP_PRICE` group 1, height 36 | **$176** | |
| Site group 3 (dearest), height 60 | **$325** | |
| Book RETAIL 26, width 36, height 36 | **$840** | |

None of the site's values (range roughly $148–$483) appears anywhere in the
book, whose extractable grid runs $593–$2,047. That is a **3–4× gap** and it
does not close by picking a different price group.

**Do not act on this without reading the book by eye.** Two readings are
possible and they lead to opposite conclusions:
1. The site's Centerpiece base table is wrong/from another program — in which
   case Centerpiece is drastically under-quoting, and it went **live-priced on
   2026-09-20**, so this is urgent.
2. RETAIL 26 is a different variant (a premium fabric tier, or the D&N version
   that bundles the roller), and the real price-group charts are the
   **image-only** pages — RETAIL 24 yields a single number, so at least one
   chart genuinely cannot be read as text.

The book does carry PRICE GROUP 1/2/3 labels, which supports reading 2, but the
group charts could not be extracted to confirm.

**Recommended:** open the Centerpiece book at the Suggested Retail pages and
check what a 36″×60″ group-1 shade should cost. If it is ~$250 the site is fine;
if it is ~$1,300 the product should be switched back to quote-only immediately
until the table is rebuilt.

### Centerpiece addendum — the site's numbers trace to no book

Checked the **previous** Centerpiece book as well (`phillyblinds/pdfs/specs/
Norman/Norman-Centerpiece-Roman-Shades.pdf`, 46pp). The site's values
(148 / 162 / 176 / 250 / 325 / 483) appear in **neither the old nor the new
book**. Both editions' price-group grids are **images**, so neither can confirm
them.

This corroborates a warning already sitting in CLAUDE.md for this product:
*"All pricing marked as MSRP estimates. Fabric data needs PDF verification
(PDF is image-based)."* The Centerpiece table appears never to have been
verified against a price book.

**Recommendation: switch Centerpiece Roman back to quote-only** until someone
reads the Suggested Retail pages by eye. It was only opened to live pricing on
2026-09-20, so reverting costs nothing and removes the risk of quoting a third
of the correct price. That is a one-line change to `PB_QUOTE_ONLY_PAGES` —
Justin's call.

---

## 11. Rest of the Norman line — NOTHING TO COMPARE

- **SmartPrivacy Faux Wood** (12pp) — the site does not price from this book.
  `faux-wood-blinds.js` uses the **Ultimate** program, as Justin specified, and
  that matched exactly (§3). "SmartPrivacy" appears on the site as branding
  only. No gap.
- **Smart Fold Shades** (39pp) — **no product page exists** on the site.
  Reference only.
- **Palladium Shelf** (21pp) — **no product page exists.** Reference only.

---

## 12. Shutters — NO PRICE DATA EXISTS TO COMPARE

The three 2026 shutter manuals (Normandy 150pp, Woodlore 105pp, Woodlore Plus
136pp) contain **zero dollar figures** — they are specification and installation
manuals with revision logs, not price books. PerfectTilt G4 (17pp) is likewise
a spec document.

The site's `shutters.js` holds only line/louver/colour data (`SHUTTER_LINES`,
`ND_PAINT`, `ND_STAIN`, `ND_OSMO`, `WL_COLORS`) — no price matrix — and
`shutters` is in `PB_QUOTE_ONLY_PAGES`, so it quotes nothing. Consistent.

This matches the standing note in CLAUDE.md: *"Need: Norman shutter retail
$/sq ft rates — still image-based in PDFs, not yet extracted."* Those rates are
**not in these manuals**; a separate shutter price book would be needed.

---

# SUMMARY

| Product | Live-priced? | Result |
|---|---|---|
| Soluna roller | yes | **3.1% behind** (confirmed, 450 cells) + 2 group-mapping questions |
| Portrait cellular | yes | **3.8% behind** (confirmed, 182 cells) |
| Faux wood (Ultimate) | yes | exact match |
| Real wood (Normandy) | yes | **1 cell off** — 54×32 $449 vs $464 |
| Motorization (Norman + Automate) | yes | exact match, all 13 figures |
| PerfectSheer | yes | exact match |
| SmartDrape | yes | grid exact; **5 accessories offered but never charged** |
| City Lights | yes | exact match (125 cells) |
| Synchrony Verticals | yes | exact match (24 rows) |
| Centerpiece Roman | yes | **⚠️ unverifiable, magnitudes 3–4× low — needs eyes** |
| Smart Fold / Palladium | no page | n/a |
| Shutters | quote-only | no price data in the manuals |

**Money items, in priority order**
1. **Centerpiece Roman** — possible 3–4× under-quote, or a false alarm. Verify
   visually; consider reverting to quote-only meanwhile. *Urgent because it is
   live.*
2. **Soluna 3.1%** and **cellular 3.8%** — real, confirmed, every quote light.
3. **SmartDrape accessories** — five options billable but free today.
4. **Real wood** — one cell, $15.

**Nothing has been changed.** All of the above are pricing changes requiring
Justin's approval.

---

# PART 2 — fabric × size options, and the .125 bracket rule (2026-09-21)

## The .125 round-up rule — LOGIC WAS ALREADY CORRECT, DATA ENTRY WAS NOT

Justin: a dimension even .125 over a chart size must price at the LARGER bracket.

**Verified, not assumed.** All eight lookups select the first chart size `>=` the
ordered size (`find(v=>v>=w)`, `findIndex(v=>w<=v)`, `_pbRoundUp`, `psGetIdx`,
`_solGridLookup`). No priced page reads a dimension with `parseInt`, and nothing
rounds a dimension before the lookup. Tested end to end at 36″ vs 36.125″:

| Product | 36″ | 36.125″ |
|---|---|---|
| Portrait cellular | $311 | **$349** |
| Faux wood | $260 | **$280** |
| Basic roller | $351 | **$382** |
| Real wood | $426 | **$473** |
| City Lights | $250 | **$265** |
| Synchrony | $213 | **$252** |
| Soluna roller | $480 | **$530** |

All move up a bracket. The rule works.

**What was broken: twelve dimension inputs carried `step="0.5"`,** so eighths
could not be entered at all — both Soluna fields and ten on `shades.html`
(Basic Roller, inline Norman roller, inline cellular, faux wood, exterior).
Only real wood already used 0.125. **All now `step="0.125"`.** Fixed and live.
No rate or formula touched.

## Cellular — fabric × cell-size matrix from the book

Parsed cleanly (every row exactly 6 columns):

| Fabric type | 3/8S | 9/16S | 1/2D | 3/4S | 3/4D | 1-1/4S |
|---|---|---|---|---|---|---|
| Sheer | yes | – | – | yes | – | yes |
| Light Filtering | yes | yes | yes | yes | yes | yes |
| **Room Darkening** | **yes** | yes | yes | yes | yes | yes |
| Designer Fabric (LF) | yes | – | – | yes | – | yes |
| Designer Fabric (RD) | – | – | – | yes | – | yes |
| Designer: Ashton (LF & RD) NEW | – | – | – | yes | – | yes |
| Flame Resistant (LF & RD) | yes | – | – | yes | – | – |
| FR Essentials | yes | – | – | yes | – | – |
| Solus | – | – | – | yes | – | yes |
| Woven: Breeze & Windsong | – | – | – | yes | – | yes |

### MISMATCH: Room Darkening is blocked in 3/8″ Single on the site

Site `CELL_COMPAT.rd = [1,2,3,4,5]` — it omits index 0 (3/8″ Single). **The book
says Room Darkening IS available in 3/8″ Single.** Sheer `[0,3,5]` and Light
Filtering (all six) both match the book exactly, so this one looks like a real
restriction that should not be there. It blocks a valid order rather than
mispricing one.

(History: CLAUDE.md records an earlier fix where `rd` was `[2,3,4,5]` and 9/16″
was restored. It looks like 3/8″ was missed in the same pass.)

### Fabric types the site does not model at all

The site offers four buttons — Light Filtering, Blackout, Sheer, Day & Night.
The book defines ten fabric types, each with its own cell-size rules: Designer
Fabric LF/RD, Ashton (NEW), Flame Resistant, FR Essentials, Solus, and Woven
(Breeze & Windsong). Solus already appears in the site's +20% surcharge comment
but is not selectable.

Whether to offer these is a product decision, not a bug — but they cannot be
ordered or priced today.

## ⚠️ CORRECTION to §1 — Soluna is cleanly 3.1% behind; the f3/s2 alarms were mine

The two "needs a human eye" concerns raised in §1 were **my mis-attribution**,
not data problems. Resolved by reading the book's own price-group collection
listings instead of guessing labels by proximity:

- **Fabric PG3's grid actually begins `307 337 365 396…`**, not the
  `354 388 420…` run I had matched. Against site `f3`: **×1.031, spread 0.002**
  across 150 cells — the same uplift as every other group. `f3` is fine.
  (The `354…` grid is a different chart, most likely Fabric PG4.)
- **The solar groups are NOT shifted.** The page carrying that grid prints the
  PG3 *and* PG2 collection lists together, so proximity picked the wrong label.

Checked the fabric→group assignments directly against the book's listings:

| Group | Result |
|---|---|
| Solar PG1 | **exact match** (8 collections) |
| Solar PG2 | matches; site splits "Breeze (1% & 3%)" into two entries, which is equivalent |
| Solar PG3 | **exact match** (7 collections) |

**One stale entry:** site `s2` still carries **W120 12%**, which this book no
longer lists. CLAUDE.md already records W120 as discontinued — it should come
out of `_SOL_COLL_GROUP`.

**Revised Soluna conclusion: a clean, uniform ×1.031 (3.1%) uplift across all
groups, no structural problem.** Every group confirmed at 1.031 with spreads
under 0.003.

### Soluna fabric → price group, per the current book

- **SOLAR PG1:** Serene 7% · Flow 7% · Windsong 5% · NA400 3/5/10% · NA300 3/5%
- **SOLAR PG2:** Serene 1/3% · Flow 1/5% · Windsong 1% · Moon 5% · Breeze 1&3% ·
  NA300 1% · NA400 1% · NA820 3%
- **SOLAR PG3:** Lakeview 3/7/10% · Meadows 1/3% · Jubilee 3% · Galaxy 3%
- **FABRIC PG1:** LF Brook, Chelsea, Verona, Callie, Leah · RD Callie, Elements ·
  Sheer Scarlett · Natural Catalina
- **FABRIC PG2:** Natural Samoa, Phuket, Bora Bora, Sumatra, Java, Bali, Riviera,
  Lake Tahoe · LF Francis, Hayes, Valerie, Emery, Sierra, Shimmer, Amelia,
  Lola LF, Remy, Brill, Charlotte, Ohara, Rockville, Waikiki · RD Jamaica,
  Bermuda, Fiji, Francis, Amelia…
- **FABRIC PG3 / PG4:** collection lists not captured in this pass (the PG3 run
  goes straight into its grid). Extract before relying on f3/f4 assignments.

---

# PART 3 — chart update run (2026-09-21), in Justin's order

## 1. Soluna — UPDATED ✅

All seven grids (`f1–f4`, `s1–s3`) rebuilt from the book's own numbers.
Mapping by value similarity, not page labels — the book prints one group's
collection list next to another group's grid, which is what misled the first
pass. Six grids matched at exactly ×1.031 (spread <0.003); `f4` by elimination.
Row alignment verified first: every book grid carries the site's exact ten
heights and fifteen widths.

Verified after: f4 36×60 quotes **$517 retail**, matching the book cell exactly;
36.125″ brackets up to the 42″ column at **$572**. Committed and live.

Most groups rose ~3.1%; **f4 rose ~7.7%** — that group was re-rated, or the old
f4 table was wrong. The book is authoritative either way.

## 2. Portrait Cellular — NO CHANGE NEEDED ⚠️ (two earlier findings RETRACTED)

**All four cellular tables are exact matches to the current book — 182 cells
each, zero differences:** `CELL_9_16S`, `CELL_3_8S`, `CELL_1_2D`, `CELL_3_4D`.

### RETRACTION 1 — cellular is NOT 3.8% behind
The earlier §2 finding compared `CELL_3_8S` against the book's **1/2″ Cordless
Double** chart, which sits on the next page and happens to start `281 347 364`.
That produced a spurious ×1.038. Comparing like with like, the table is exact.
**Disregard the "cellular is ~4% light" conclusion entirely.**

### RETRACTION 2 — the cell-size selector is NOT mis-assigned
`34s` falls through to `CELL_3_8S`, and `114s` uses `CELL_3_4D`. Both looked
wrong. They are correct: the book shares charts between sizes —
- p6: **"3/8″ Cordless Single & 3/4″ Single"** — one chart for both
- p7: **"3/4″ Cordless Double & 1 1/4″ Single"** — one chart for both

So the site is right, and the earlier note about `34s` returning the 3/8″ price
is expected behaviour, not a bug.

The remaining unmatched chart (`471 587 611 676…`) is the **Flame Resistant**
chart — a fabric type the site does not offer.

### Still open on cellular (unchanged)
`CELL_COMPAT.rd` omits 3/8″ Single while the book allows Room Darkening there.
That blocks a valid order; it does not mispriced anything.

## 3. Faux wood (Ultimate) — NO CHANGE (142 cells exact)
## 4. Real wood (Normandy) — UPDATED ✅
54″H × 32″W corrected $449 → **$464** per the book. All 168 cells now compare at
×1.000. Committed and live.

## 5. Motorization — NO CHANGE (all 13 Norman + Rollease figures exact)
## 6. PerfectSheer — NO CHANGE (PS_PRICES, wood and fabric valance all exact)
## 6b. SmartDrape — grid exact; accessories still NOT charged — LEFT ALONE

Deliberately not implemented tonight. The four fixed prices are unambiguous —
Aluminum Shim **$28 each**, Long L Bracket **$61 per shade**, Keystone **$73
each**, Additional Wand **$89 each** — but the site's controls are plain
tick-boxes with **no quantity inputs**, and three of those four are priced *per
unit*. Charging one of each would still be wrong, just differently.

The fifth, Additional Vanes, is a **matrix**: "pack of 6", Option A/B, one
colour vs alternating — it needs a rule, not a number.

There is also a presentation question: CLAUDE.md's detail-hiding rule lists the
only surcharges a customer should see (motor, remote, charger, hub, TDBU, D&N,
drape trim). These five are not on it, so they would have to fold silently into
the retail subtotal rather than appear as lines.

**Needs Justin: quantities, and whether they fold in or show.**

## 7. City Lights — NO CHANGE (125 cells exact)
## 8. Rest of the Norman line — no product pages exist (Smart Fold, Palladium)
## 9. Shutters — the manuals contain no prices; quote-only is correct

## Also fixed this run
`CELL_COMPAT.rd` now includes 3/8″ Single, which the book allows and the site
blocked. Opens a valid order; changes no price.

---

# RUN SUMMARY

**Changed (3):** Soluna all seven grids · real wood one cell · cellular 3/8″
Room Darkening. All committed and live on Blindznation.

**Verified exact, left alone (6):** cellular (4 tables), faux wood, real wood
(rest), motorization, PerfectSheer, City Lights, Synchrony.

**Two earlier findings retracted** — cellular was never 3.8% behind, and its
cell-size selector was never mis-assigned. Both were my comparison errors.
Checking before editing is what caught them; acting on either would have broken
correct tables.

**Still open:** SmartDrape accessories (needs quantities + presentation) and
**Centerpiece Roman**, which remains unverifiable and live-priced — still the
one item worth acting on first.

---

# PASS 3 — 2026-09-21: per-product pricing audit, in Justin's order

Everything below was checked against the **September 2026** books and driven
through the configurator in a jsdom harness, not just read.

## Verified correct — no change needed

| Product | What was checked | Result |
|---|---|---|
| **Portrait cellular** | Lift surcharges vs book | Cord Loop +$73, TDBU/D&N +$89 — correct. The book's shim/side-mount/pole/hold-down accessories are simply not offered, so nothing is given away. The two `364`s in the file are a table value and a hex colour, not a stale LightGuard price. |
| **Real wood (Ultimate Normandy)** | 168 cells, both valance rows, colour surcharges, size limits | **Exact.** Designer +10% / Premium +50% correct; 6½–96″ W, 16–96″ H, 64 sq ft cap all match. All three price paths agree. |
| **PerfectSheer** | 210 cells, both valance rows, all surcharges | **Exact.** RD +20%, Light Guard $45 / Premium $117, hold-down $28, shim $7. Over-range sizes are rejected, so the index clamp is unreachable. |
| **City Lights aluminium** | 140 cells, 33 colours, surcharges, per-slat size limits | **Exact**, including all 11 surcharge colours by code (10 at 10%, Champagne at 20%) and the separate 1″/2″ limits and 50/48 sq ft caps. |
| **Synchrony verticals** | 192 cells across 4 price groups | **Exact**, and the group→chart mapping is right (confirmed by PDF coordinates, see below). Freight correctly triggers on width *or* length ≥ 90″. |
| **Motorization (Norman Smart + Automate)** | Every price in both tables | **Exact** — 482/642 motors, 161/428 wands, 43 kit, 11 harness, 321 hub, 268/75 remotes; Automate 682/814, 19, 103, 483, 140, 272, 230, 242. Both ×2 rules (roller dual, Roman D&N) and the $642 honeycomb dual motor are applied correctly. |

## Fixed

### Faux wood — size limits blocked a third of the price chart
The book's table is width 6½″–96″ (37″ side mount), height 16″–96″, 48 sq ft
then **+$18 per extra sq ft**. The site capped width at **72″**, which made the
78/84/96 columns, the 90″ freight tier and the entire overage rule unreachable.
Min width (16½″) and min height (24″) were wrong too.
`calcPrice()` applied the overage but `submitForm()` and the cart did not — so
the moment width opened up, the emailed price would have undercharged. All
fixed; 156 cells and the valance row were already exact.

### SmartDrape — three separate faults
1. **The price axes were transposed.** The book prints shade length down the
   left and track width across the bottom; the code read them the other way.
   Every non-square shade was wrong in both directions — 184″W × 48″H quoted
   **$1,685 instead of $3,088**; 48″W × 144″H quoted **$2,305 instead of
   $1,685**. The per-foot adder ran off the wrong axis too, so it never fired
   for the widths that actually reach it (max width is 285⅝″).
2. **Lakeshore Stripe has its own, cheaper chart** and was being priced off the
   other one — $2,203 instead of $1,873 at 96×84.
3. **Five accessories were offered as tick-boxes and never charged**: keystone
   $73 ea, additional wand $89 ea, aluminium shim $28 ea, long L bracket
   $61/shade, vane pack $230–540 by length (+20% RD), charging wand $75.
   **Freight was missing from the total entirely.**

### Centerpiece Roman — stopped quoting invented prices
`CP_PRICE` was never transcribed: every row is a clean arithmetic ladder and the
values run **3–4× under** Norman list (36×24 reads $148 where the book reads
$404). The page is now **quote-only**. The new book is text-extractable (the old
one was images), so all three real charts are now in the file.

## Technique worth keeping: read the PDF coordinates

Two book pages print price charts side by side or stacked, and the flattened
text layer does not say which caption belongs to which chart — a 22% difference
on Centerpiece. `pdfpos.js` dumps each text item with its x/y, which settles it
outright. It showed the Centerpiece charts are **stacked**, giving
Group 1 = 404 (Scarlett), Group 2 = 492 (the 24 standard collections),
Group 3 = 593 — the monotonic ladder, and the opposite of the reading-order
guess. The same check confirmed Synchrony's four groups were already right.

## Still open

- **Centerpiece fabric list.** Price is a function of the fabric's price group,
  so the correct tables cannot be switched on until `FABRICS` is rebuilt. Its
  "group 1" entries (Brook, Emery) and two "group 2" ones (Hayes, Valerie) are
  **Day & Night roller fabrics** in this book, not Roman collections, and ~20
  real collections are missing. The book has 147 colour rows each carrying its
  group digit.
- **Shutters stay quote-only, now confirmed rather than assumed.** The 2026
  Woodlore / Woodlore Plus / Normandy revisions contain **no dollar amounts at
  all** — only the area formulas (`W × H / 144 × $/sq ft`). The $/sq ft rate
  table is in a price book we do not have.
- **Motorization discount still differs by site** — PB discounts Norman motors
  20%, BZ does not. Justin deferred this.

---

# SHUTTERS — 2026-09-21, gone through properly

## The $/sq ft rate is not in anything we hold. This is now proven, not assumed.

Norman prices shutters as **billable area × $/sq ft**. Searched for that rate in:

- all six shutter manuals — Woodlore, Woodlore Plus, Normandy, in both the 2026
  revisions and the older copies
- **Brightwood** (a fourth shutter line, not on the site)
- `Norman-Shutters-Overview.pdf` and `Shutters - Overall.pdf`
- `SHUTTER PO COMBINED - REV 2019.pdf`
- `phillyblinds/pdfs/wholesale-pricing/prices/Norman/` — which holds a price
  book for **every other Norman product** and none for shutters
- every **image-only page** in the three 2026 manuals, in case a chart was a
  picture rather than text. All of them are installation diagrams — panel
  configurations, bracket mounting, keystone fitting. No chart among them.

The manuals *name* surcharges — custom-size divider rail, premium colours,
keystone on split fascia, wood Vintage hang strip — but never give an amount.
There is no "SUGGESTED RETAIL" page in any of them; that header appears in
every other Norman book and zero times here.

**Conclusion: to price shutters we need the Norman shutter price book. Nothing
else is missing.**

## What the manuals *do* give — and it is now modelled in full

Section **"m. Pricing"** (WL m-1..3, and the matching ND m- / WLP m- sections)
gives the complete billable-area model:

1. **By max frame-to-frame** — inside/outside `W × H / 144`; semi-inside
   `W × (H − 1½″) / 144`
2. **By net panel measurement** — `W × H / 144`
3. **By window size** — `(W + a) × (H + b) / 144`, where `a` and `b` depend on
   the **frame style** and on **how many sides are framed**

That is implemented as `SH_FRAME_ADD` + `shBillableArea()` in `shutters.js` and
checked against 14 worked cases from the book — all exact. Inside mount bills
the opening; outside mount adds the frame. An unknown or "Not sure" frame
returns `null` rather than guessing.

## Two configurator faults that made even hand-pricing impossible

**Sill / bottom plate offered 2 of the 6 cases the book prices.** Only 4-sided
and 3-sided were selectable; the book branches on 4, 3-with-sill-plate, 3,
2-with-sill-plate, 2 and 1, each with a different formula. On a 36×60 opening
with a 2″ Camber frame that is **15.83 → 17.78 sq ft, a 12% spread.**

**One "Z Frame" button covered five frames across three billable tiers.**

| Tier | Frames | Width adder |
|---|---|---|
| widest | 3″ Crown Z | +4½″ |
| middle | 2″ Bel Air Z, 2″ Bullnose Z | +2½″ |
| narrow | 1½″ Bullnose Z, 1¼″ Beaded Z, Bullnose Tilt-Out Z | +2″ |

Which frame belongs to which tier could not be read from the flattened text —
the two Z-frame columns interleave — so it was taken from the PDF text
coordinates, the same technique that settled the Centerpiece price groups.
Also added 2½″ Mission Deco, Plain L and Colonial L (+2¼″, its own tier), all
priced separately in the book and never offered on the page.

## Result

The quote and the emailed spec now carry the **billable square footage**, so a
hand-priced shutter quote is that number × the rate. The page stays quote-only
and renders no dollar figure. **The moment the shutter price book arrives,
switching shutters on is one multiplication.**
