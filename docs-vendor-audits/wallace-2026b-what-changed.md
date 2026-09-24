# Wallace / Portfolio / Woven / Shutter books — downloaded 2026-09-20

Source: wallaceblinds.com, **Price Books** section (products) and **Shutter
Manuals** section (shutters). The site also has an **Order Forms** section
listing the same product names against *different* files — those were NOT taken,
since they are order forms rather than price books. Worth knowing, because the
two sections look identical in a link list.

## Headline: a real price rise, not just a re-upload

The files already on hand were revision **2026A**. These are **2026B/C/D**.
Prices are up a consistent **+15%** on five of the books.

| Book | Revision | Price change | Notes |
|---|---|---|---|
| Portfolio Fabric Roman Shades | 2026A → **2026C** | **×1.150** | 870 prices compared |
| Portfolio Natural Roller Shades | 2026A → **2026B** | **×1.150** | 1,124 prices |
| Portfolio Natural Shades | 2026A → **2026B** | **×1.150** | 1,370 prices |
| Walden Premier | 2026A → **2026B** | **×1.150** | 2,148 prices |
| Walden Select | 2026A → **2026B** | **×1.150** | 960 prices |
| Portfolio Dual Sheer Shades | 2026A → **2026D** | none found | 451 vs 452 distinct prices — effectively unchanged |
| Wallace 2D Dual Sheer Shades | eff. 01/01/26 | none found | small doc, mostly colour charts |
| Dynasty Woven Collection | — | **cannot compare** | see below |
| Galaxy Woven Collection | — | **cannot compare** | see below |
| Wallace Sheer 3D Horizontals | — | **none — byte-identical** | already current |
| Wallace Verticals | — | **none — byte-identical** | already current |
| PerfectTilt G4 Motorization | — | **new document** | no previous copy existed |

The ×1.150 is tight across thousands of values (observed range ×1.111–×1.176,
median ×1.150 on every one of the five), so it reads as a deliberate uniform
uplift rather than a re-rate.

## Dynasty and Galaxy: the old files were images

The previous Dynasty PDF yielded **0** extractable prices and Galaxy **2** — the
price tables were pictures. The new files yield **235 each**. So these two are
newly machine-readable, and no before/after comparison is possible.

This also retires a long-standing blocker: chart data that could not be read.

## Shutter manuals

Normandy, Woodlore and Woodlore Plus are all much larger than the copies on hand
(24 MB vs 10.7 MB, 18.6 vs 8.3, 21.8 vs 8.4) and open with a **2026 Shutter
Revision log**. PerfectTilt G4 Motorization is new.

## What this does NOT change

Every product in this set is **quote-only** on both sites — Portfolio Dual
Sheer, Wallace banded, Wallace verticals, all four woven woods, Portfolio Roman
and the natural rollers/shades are all listed in `PB_QUOTE_ONLY_PAGES`. So the
+15% does **not** move any customer-facing price today. It matters for internal
reference, and it matters the moment any of these is switched on.

Note also that the site's embedded Wallace matrices were **estimated** during the
July 2026 audit by applying per-family uplifts (Woven ×1.11, Portfolio Dual
Sheer ×1.06, Fabric Roman ×1.15) rather than transcribed from a book. These
2026B/C/D files are authoritative and would replace those estimates.

## Old copies deliberately kept

The 2026A editions are still in `phillyblinds/pdfs/specs/` (git-tracked, and
Philly Blinds is frozen — untouched) and in the parent WALLACE folder. Keep them:
they are the only record of what the site's current matrices were derived from,
so they are needed to verify any rebuild.

## Reading these files

`pdftoppm` is not installed, so PDF pages cannot be rendered. Text extraction
works via `pdfjs-dist` — see `pdftext.js` / `pdfall.js` in the session
scratchpad. That is enough for price tables; it will not help for anything that
is purely an image.

---

# SECOND PASS 2026-09-20 — the Norman books (the ones that matter)

The first pass took only the 15 files Justin listed. The **Price Books** section
also holds **12 Norman books plus the current Freight Policy**, which were
missed. Those matter far more: Norman products are the only ones quoting live
prices on the sites. All 13 are now downloaded into this folder.

## CONFIRMED: Portrait cellular is under-priced by ~4%

The site's `CELL_3_8S` table (3/8" Single) was compared cell by cell against the
matching Suggested Retail chart in the new Portrait Honeycomb book:

- **182 cells compared. Median ×1.038, range ×0.999–×1.044.**
- 36×60 reads **$415 on the site vs $430 in the book**.
- The gap is consistent across the whole grid, so it is a genuine list-price
  rise, not a transcription slip.

Cellular is live-priced on **both** sites, so every cellular quote is currently
about **4% under Norman's current list**.

Note the old Portrait book's price grids were IMAGES (zero extractable numbers),
so this comparison was only possible because the new book has real text. A
book-to-book diff was impossible; the site table had to be the reference.

## Soluna — newer book, not yet quantified

The new Soluna book carries several effective dates (1/1/2026, 1/13/2026,
9/1/2026) and the site's grids are annotated "book May 2026". It is therefore
also behind, but the Soluna grids are keyed by price group (s1, f3, …) and the
group-to-chart mapping has NOT yet been matched, so no ratio is claimed here.
Do that before changing anything.

## Not yet examined

Centerpiece Roman, PerfectSheer/SmartDrape, Synchrony Verticals, City Lights,
Ultimate Faux Wood, Ultimate Normandy Wood, Smart Fold, Palladium Shelf,
Automate & Motorization, and the Freight Policy (effective 2/1/2026). Several
of these are live-priced since the 2026-09-20 scope change.

## Nothing has been changed

No price table has been touched. Rebuilding these is a pricing change and needs
Justin's approval per CLAUDE.md.
