# Configurator Form Standard — Blindznation

> **The single rulebook for every customer-facing product form on blindznation.com.**
> Products differ in their *options*; the *frame* — step order, component types,
> wording, the delivery step, the final step, the summary card — is identical.
> Rewritten 2026-09-23 after a full-site audit (38 form pages). Philly Blinds is
> frozen and separate — this file applies to Blindznation only.
>
> Visual reference: **`pages/soluna-roller-shades.html`**. When in doubt, match it.

---

## 1. The frame (every product, in this order)

| # | Step | How it is built |
|---|------|-----------------|
| **1** | **Window measurements & mount** | `pbSizeMountStepHTML()` markup (or identical hand markup): teal `.dim-box` with Width × Height, "How to measure" note, **Mount type** pills `Inside mount` / `Outside mount` with **Inside mount pre-selected**, then the `.qty-btns` `[−] [n] [+]` stepper (per-unit labels auto-inject after it). |
| 2 … N | Product options | One step per decision. Product-type / collection / line choosers come **after** Step 1, never before it. |
| N+1 | **Delivery** | `pbDeliveryStepHTML({stepNum})` — "Ship to me" (default) + "Professional installation". Nothing else. |
| N+2 (last) | **Your details** | `pbContactStepHTML({stepNum, cartFn, submitFn})` — name, address, phone+email, notes, files, Terms, `+ Add to Cart`, `Submit Order for Review →`. |

Right column: the dark **summary card** (`.summary-card` › `.summary-head` "Your configuration" › `.summary-row` rows). It always shows at least **Product · Size · Mount · Qty**, then the product's key choices, then the price/estimate (or "Custom quote" on quote-only products).

### Exceptions — only the size fields change, the frame does not
- **Hardware (rods / traverse / finials):** Step 1 is titled **"Rod measurements"** — Width only + Qty (`noMount`, no height). Wall / Ceiling mount, if the product needs it, is a normal later step. Cord drop length only when cord draw is chosen.
- **Drapery / Ripplefold:** Width × Finished length (+ return), **no mount**. Title **"Drapery measurements"**.
- **Exterior shades:** mount pills are `Inside mount` / `Outside mount` / `Wall mount` / `Ceiling / soffit mount`.
- **Shutters:** mount pills may carry the frame note in the step-note, but the pill text stays `Inside mount` / `Outside mount`.
- **Coupled Shades:** Norman Soluna roller ONLY.
- **Cornices / valances:** Width × Height (face) + return, Inside/Outside mount, Qty.

## 2. Step headers
Every step is a `.step-block` with the header
```html
<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
  <div class="step-num">N</div>
  <div class="step-title" style="margin-bottom:0">Title</div>
</div>
```
(Pages that already use the accordion header `.step-head` › `.step-num` + `.step-head-title` may keep it — same look.)
- Numbers run **1, 2, 3 … with no gaps, letters or duplicates**, in visual order. Optional steps say so: `Title <span style="font-weight:400;color:#888">(optional)</span>`.
- **All steps are visible on the page.** No multi-screen wizards with Next/Back, no step hidden until the previous one is complete (conditional sub-options *inside* a step may still show/hide).
- Titles are sentence case: "Fabric & color", not "Fabric & Color".

## 3. Choosing options — pills
- Every single choice is a row of pills: `.opt-row` › `button.opt-btn`, selected = `.sel`. Price / description goes underneath in a `.step-note`, not inside a big card.
- **No `<select>` dropdowns** for a choice a customer makes (only acceptable for very long lists, >12 items, e.g. a full finish catalog).
- **No `div.opt-pill`, `opt-card`, `tier-btn`, `liner-btn`, `clr-btn`** etc. for plain text choices. Allowed exceptions: **colour / fabric swatches** (a visual grid) and **photo pickers** where the picture is the information (pleat styles, Roman fold styles).
- Multi-select add-ons: pills that toggle `.sel` independently (say "select any" in the step-note).
- A choice with an obvious default has it pre-selected; a choice that changes the price and has no safe default starts empty.

## 4. Wording
- Mount: **"Inside mount" / "Outside mount"** (lower-case m). Deductions and notes go in the step-note, not the pill.
- Fabric terms: **Light Filtering · Solar Screen · Sheer · Blackout** — never "Room Darkening" in customer text.
- Buttons: **`+ Add to Cart`** and **`Submit Order for Review →`** only. No "Send My Request", "Request Your Quote", "Get your custom quote" buttons.
- Final step title: **"Your details"**. Delivery step title: **"Delivery"**.
- Quote-only products still use the same frame; the summary shows "Custom quote — we confirm pricing" instead of a figure.

## 5. Shared code (do not re-implement per page)
| Need | Use |
|---|---|
| Step 1 | `pbSizeMountStepHTML(opts)` in `js/shared.js` |
| Qty | `pbAdjQty(id, delta, min, max)` + `.qty-btns` |
| Pill select | `selOpt(el, groupId)` |
| Delivery | `pbDeliveryStepHTML({stepNum, onPick})` — choice in `window.pbDelivery`, auto-folded into notes/cart |
| Final step | `pbContactStepHTML({stepNum, cartFn, submitFn, idPrefix?})` |
| Styles | `css/global.css` "CONFIGURATOR STANDARD" block — do not re-declare these classes in page `<style>` |

## 6. Process
- Keep element ids bound to their content so page JS keeps working; rewire `#stepN .opt-card` → `.opt-btn` queries when converting.
- After any edit: `node --check` the page JS, check for duplicate ids, run `tools/regress.js`, and confirm the price for a known size did not change.
- One product page per commit.
