# tools — the dev scripts worth keeping

These lived in a session scratchpad, which is wiped when the terminal restarts.
Saved here because several of them took real time to get right.

Run from this folder. `npm install jsdom pdfjs-dist` first (nothing here is
shipped to the site — `tools/` is dev-only).

## Reading vendor price books

| Script | What it does |
|---|---|
| `pdfall.js <file.pdf> <out.txt>` | Dump every page's text. The workhorse for price charts. |
| `pdftext.js` | Single-page text dump. |
| **`pdfpos.js <file.pdf> <page> [regex]`** | **Dump each text item with its x/y.** Use this whenever a page prints two charts side by side — the flattened text layer does NOT tell you which caption belongs to which chart. This is what settled the Centerpiece price groups (a 22% difference, where reading order gave the wrong answer) and confirmed Synchrony's four groups were right. |
| `pdfimg.js <file.pdf>` | Per page: text length + image count. Finds image-only pages that text extraction cannot see. All the shutter ones turned out to be installation diagrams. |

`pdftoppm` is NOT installed, so pages cannot be rendered to pictures. Text
extraction via `pdfjs-dist` is all we have — enough for price tables, useless for
anything that is purely an image.

## Driving the site headlessly

`harness.js` — loads a page with its scripts and CSS inlined so jsdom can run it.
Everything else requires it.

Gotchas it already handles, each of which cost time:
- jsdom fetches neither `<script src>` nor stylesheets. Both are inlined **in
  document order** — loading scripts afterwards kills every inline init.
- A literal closing script tag inside a `.js` file ends the inlined tag early.
  `shared.js` has one in a comment. Harmless via `src`, fatal inlined.
- Load from the real hostname or the host-gated code takes a different path.

Two more that bit me and the harness does NOT hide:
- `offsetParent` is always null in jsdom, so any visibility-dependent check is
  untestable. `pbTermsValid()` filters on it.
- `DOMContentLoaded` fires **after** `load()` returns. `await` a tick before
  asserting, or you will conclude the site is broken when it is not.

| Script | What it checks |
|---|---|
| `regress.js <siteRoot>` | Loads all 84 pages, reports JS errors. Run after every change. |
| `finalgate2.js <siteRoot>` | Terms gate: that unchecked blocks and checked submits, on every page. Fills contact fields first — a pre-existing guard requires name/phone/email, and forgetting that made me think I had broken all 40 pages. |
| `softtest.js` · `cvtest2.js` | Roman and cornice price matrices. |
| `dv3test.js` · `rtiertest.js` · `boardtest.js` | The three freight ladders, boundary by boundary. |

Expectations inside these test scripts go stale as rates change — a "mismatch"
usually means the script is out of date, not the site. Check the rule in
`SESSION-HANDOFF.md` before believing a failure.
