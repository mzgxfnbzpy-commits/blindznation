# HANDOFF

Working state for the Philly Blinds / Blindznation dev branches. Update this file
every time a task changes state, not at the end of a session. See UNATTENDED
OPERATION RULES at the top of CLAUDE.md.

Branch: `dev` on both repos. Blindznation lives at
`C:\Users\Blind\Desktop\BUSINESS\Important PB\AI claude\blindznation` and its live
branch is `main`, not `master`.

**LIVE as of 2026-09-10.** Justin said go live. `dev` merged to `master` (PB,
merge `68bab14`, 84 commits) and to `main` (BZ, `fe026a0`, 37 commits), both
pushed. That closes a gap going back to 2026-06-28 — every September fix,
including the whole pricing scope, had only ever existed on `dev`, which is why
the live site still looked broken while dev tested clean. Anything merged from
here is a smaller delta; keep it that way.

---

## QUEUE

1. Woven wood: condense the fabric lists into tabs by price group, Soluna style.
   Affects galaxy-woven-woods, dynasty-woven-woods, walden-premier-woven,
   walden-select-woven. None of the four has tabs today.
2. Zebra / sheer: colours into compact tabs. Basic vs Premium already share one
   page (zebra-shades.html links both tiers to wallace-banded-shades.html), so
   that half of Justin's original request is already satisfied — verify before
   rebuilding anything.
3. General rule from Justin: any product with many colours gets tabs rather than
   one long open list.
4. Fabric width is hardcoded 54" in the drapery cut maths. Justin's 118" goods,
   drop repeats and railroading are NOT handled and are quoted by hand. Build
   this properly as its own piece of work.
5. **Migrate the mailto: recipient list to a shared constant.** The full team
   list is now correct everywhere, but it is a literal repeated 58 times (PB) /
   59 times (BZ) across ~43 files, and it must be kept in step with
   `TEAM_EMAILS` in `api/quote.js` by hand. Worth collapsing to one constant in
   `shared.js` — low risk, but it touches every configurator, so do it as its
   own task with the price harness run before and after.

## IN PROGRESS

Nothing mid-flight. Next item is QUEUE #1, the woven wood colour tabs.

**Current Philly Blinds soft-treatment pricing, for reference** (committed,
verified, and now identical on Blindznation):

- Drapery per cut: $125 unlined / $135 lined, goblet+barrel +$20. Length bands
  add 0/20/35/70 then +$35 per further 10" to 185". Ladder verified reachable at
  every band; over 185" is a custom quote with no price shown.
- Cuts: `(rod + allowance) x fullness / 54`, allowance = return x 3.
  Yards: `(length + 16) / 36` per cut.
- Cornice / valance: $35/LF, $200 minimum per piece, fabric NOT included. Rate
  steps on HEIGHT: <=15" $35 - 16-35" $70 - 36-55" $95 - 56-75" $120 - +$25 per
  further 20". Splice checkbox over 80" wide avoids the $500 board freight.
- Romans: lining +$5/sqft; over 80" wide is $500 freight.
- Basic Roller freight: tiered by WIDTH only — <=80" parcel, 81-100" $200,
  101-150" $300, 151"+ $500 min. (Chart stops at 120" wide, so the top two tiers
  are not reachable through the form yet.)
- Drapery never takes oversize freight at any width.

## BLOCKED

1. **Norman Soluna fabric list.** Justin said the fabric choices have changed and
   he will send the update. Nothing to do until that data arrives. Everything
   else on the Soluna page is current.
2. **Wallace Aluminum colour names.** Still placeholders. The chart is an image
   in the PDF and there is no OCR in this environment. Needs Justin to paste the
   names or send a screenshot.
3. **Soluna Item-1 swatches** (Verona / Sumatra / Lake Tahoe / NA300 / W120).
   W120 is discontinued, the NA300 codes contradict the book, and F0874 collides
   with Clarissa "Burlap". Needs a visual PDF or Justin's call.
4. **custom-roller-shades still discounts 35%.** Code and label agree
   (`retail * 0.35`), and it is a Philly Blinds discount, not Norman — so it was
   correctly left alone when Norman went 35% to 25%. It is a quote-only page
   today, so nothing is shown to customers. Confirm the rate with Justin before
   it is ever switched back on.

### Resolved 2026-09-10

- **All eleven Norman products price again.** Justin reversed the September
  six-product scope: PerfectSheer, SmartDrape, Centerpiece Roman, Synchrony
  Verticals and City Lights came out of `PB_QUOTE_ONLY_PAGES`. Reference
  figures at 36x60, identical on both sites: PerfectSheer $695, SmartDrape
  ~$760, Centerpiece $288 retail -> ~$241, Synchrony $221, City Lights $275.
  **Removing the gate entry was not enough — three of the five were silently
  broken behind it**, which is the thing to remember: a product behind the gate
  gets no exercise, so its renderer rots unnoticed.
    - Centerpiece Roman hid its whole price panel (`updateCalc` hid
      `#pr-base`'s *parentElement*, but that span sits directly inside
      `.price-estimate`), and `#pr-total` still had an inline `display:none`
      from May that `setVal` never cleared.
    - City Lights and Synchrony anchored their discount rows with
      `#qp-detail .qdiv:last-of-type`, a selector that can never match — every
      child of `#qp-detail` is a div, so `:last-of-type` only matches `.qnote`.
      Null, then a throw on `.parentNode`, aborting the render one line before
      the total. City Lights also called `showRow` without declaring it.
    - Stale labels exposed by opening the gate: City Lights, Synchrony and
      Centerpiece all said **15% Norman discount** over a 25% calculation.
    - BZ's Centerpiece JS had forked (no motor refresh, no detail-hiding, a
      "-35%" total line) and was replaced from the master copy.
    - Copy sweep, 16 spots per site: all five still sold themselves as "Free
      custom quote" in hero pills and in the meta descriptions Google shows.
- **Every quote form on both sites now emails the whole team** (Justin's call):
  justin / sarah / mike / tarin @phillyblinds.com, plus justin@blindznation.com
  on Blindznation. `blindznation@gmail.com` is retired and appears nowhere.
  The API path already did this via `TEAM_EMAILS` in `api/quote.js`; it was the
  58/59 `mailto:` fallbacks that were wrong, variously pointing at the Gmail,
  justin@phillyblinds.com or justin@blindznation.com. Where an address is also
  visible link text the page shows one readable brand address while the href
  reaches everyone. CLAUDE.md's "Form backend" row and quote-email rule were
  documenting the retired Gmail and have been corrected.
- **FAQ structured data quoted superseded drapery labour rates.** The JSON-LD
  said "$120-$140 per width panel"; it has been $125 unlined / $135 lined per
  cut, +$20 goblet/barrel, since 2026-09-07. Rewritten on both sites and
  re-parsed as valid JSON. The rest of that block was checked rather than
  assumed and left alone — the $200 drapery minimum, the roman $150/$250
  minimums and the $25/yd fabric and $10/yd lining rates are all still correct,
  as are the cornice height steps and the meta-description minimums.
- **Basic Roller quoted nothing on the fabric type it opens with.**
  `pbCalcPrice` gated on `fabType === 'Solar Screen'`; `ec5ed30` (Jun 8) renamed
  that button "Light Filtering" and left the guard alone. Light Filtering is the
  button that starts selected, so the product looked dead until you clicked
  Blackout. The guard now accepts both labels. This is the bug behind "the
  roller shades don't price".
- Stale discount labels from `9087f9f` (Norman 35% to 25%): the price box on
  portrait-cellular and perfectsheer announced a 35% discount over a breakdown
  applying 25%, and norman-sheers read "Norman retail - 35%". Corrected on both
  sites.
- **Blindznation soft-treatment port done** (was QUEUE #1). Replayed as a
  straight copy of PB's two files plus a brand re-apply, not a string-replace
  diff — 246 changed JS lines over ~25 hunks was past the point where replaying
  by hand is safe. The eight BZ brand lines come back byte-identical; BZ keeps
  its own #FAF8F3 swatch ground.

### Resolved 2026-09-07

- Oversize freight scope: **Basic Roller yes, drapery no** (Justin). Romans and
  cornice/valance already had it. Norman keeps its own table.
- Width allowance: **return x 3 confirmed** (4" to 12", 6" to 18").
- Roller freight is TIERED by width, not flat: <=80" parcel, 81-100" $200,
  101-150" $300, 151"+ $500 min. Width only — length never affects it.
- Drapery length cap raised 150" to 185" so the top four ladder bands are
  reachable. Cap now reads D_LEN_MAX_AUTO so it cannot drift from the ladder.

## DONE

- `68bab14` (PB master) / `fe026a0` (BZ main) — **merged to live**, 2026-09-10.
- `a9fb31f` (PB) / `fe75f03` (BZ) — Basic Roller default-fabric fix and the
  stale 35% labels.
- `fe026a0` (BZ) — soft-treatment pricing rebuild ported from PB.
- `5e194a7` (PB) / `f0f7dc3` (BZ) — stopped quote-only products advertising
  instant pricing: 46 spots over 14 pages, hero pills, card badges and the meta
  descriptions Google shows. The six priced products keep their copy.
- `e891e56` (PB) / `dab9746` + `3aec6f3` (BZ) — live pricing scope. Six products
  price (soft treatments, Basic Roller, Norman Soluna roller, Portrait cellular,
  faux wood, real wood); everything else configures fully and submits for a
  custom quote with no price shown. Gated by `PB_QUOTE_ONLY_PAGES` in shared.js.
  Same commits carry the Room Darkening to Blackout display rename.
- Fixed: the "LIVE MODE — hide all public pricing" block in `css/global.css` had
  no body scope, so it hid `.price-box` / `.addon-price` / `#q-total` on every
  page. Faux wood was priced correctly in JS but silenced by that CSS. Now scoped
  to `.pb-quote-only`.
- `1cba5a6` (PB) / `a92111c` (BZ) — soft-treatment pricing rebuild, exterior
  roller crank/motor side, and CONF_PAGES emptied.
- `de43383` (PB) / `d9da63e` (BZ) — oversize freight scope, plus a pre-existing
  Basic Roller crash: pbCalcPrice declared its option reader as `gPBs` while
  every line called `gPB`, so it threw at selLines and the estimate panel and
  Add to Cart never rendered on a priced product.
- `747dd94` (PB) / `bdf3971` (BZ) — roller freight tiered by width.
- Fixed: the live-site hostname gate in shared.js had 33 pages (32 on BZ) whose
  configurator was deleted on load and replaced with a "call us" panel — which
  is why cellular, Soluna roller and faux wood appeared to have no pricing on
  the live domain. `CONF_PAGES` is now empty; pricing is gated per product
  instead. Put a slug back in that array to re-block a page.
- Verified resolved: the Soluna colour-picker bug (default swatches now render
  on load — 96 of them, both sites).

## NOTES FOR THE NEXT SESSION

- **There is a jsdom price harness.** It lives in the session scratchpad, not the
  repo: `harness.js` (loads a page with its scripts and CSS inlined) and
  `verify.js` (drives all 13 priced surfaces and prints a pass/fail table).
  Rebuild it before any pricing change and run it against BOTH site roots.
  Current expected output, identical on both sites:

  | surface | size | expected |
  |---|---|---|
  | Portrait cellular | 36x60 | $311 light filtering / $373 blackout |
  | faux wood | 36x60 | $260 |
  | real wood | 36x60 | $426 |
  | Soluna standalone | 36x60 | $480 retail -> $360 |
  | shades.html basic roller | 36x60 | $351 LF / $416 blackout |
  | shades.html norman roller | 36x60 | $304 |
  | shades.html cellular | 36x60 | $415 retail |
  | drapery pinch unlined | 100x96 | $825 |
  | roman | 36x60 | $675 |
  | cornice / valance | 60x16 | $420 each |

- Harness gotchas, all of which cost time to rediscover: jsdom fetches neither
  `<script src>` nor `<link rel=stylesheet>`, so both must be inlined **in
  document order**; a literal closing script tag anywhere in a .js file
  (shared.js has one inside a comment) ends the inlined tag early and must be
  escaped; pages must load from a `localhost` URL or the live-site gate changes
  what renders; and the estimate total renders into a SIBLING
  `<box-id>-checkout-panel`, not into the price box, so read that when a box
  looks empty.
- The valance price box reads `display:none` until its tab is opened. That is
  correct behaviour, not a bug — do not "fix" it.
- Watch for guards that compare a button's **label text**. That is exactly what
  broke Basic Roller. The surviving ones were audited on 2026-09-10 and all
  still match their markup: 'Bottom Up', 'Top Down / Bottom Up', 'Day & Night',
  'Fabric Wrapped', 'Square', 'Curved' in shades.js, and the three
  fabric-supply labels in soft-treatments.js. Re-check them after any rename.
- When replaying a diff from one site onto the other by string replace, pass a
  **function** to `String.replace`, never the replacement string: these files
  are full of `'): $' +` and `$'` means "everything after the match", which
  splices the whole file in. Past a couple of dozen hunks, copy the file and
  re-apply brand values instead — that is how the BZ soft-treatment port was
  done, and it is both safer and faster.
- Pricing changes require Justin's explicit approval.
