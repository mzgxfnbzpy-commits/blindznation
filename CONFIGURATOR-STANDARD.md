# Configurator Style & Format Standard

> **Single source of truth for the layout, style, and step order of EVERY product configurator.**
> Products differ in their *options*, but the *frame* (look, components, Step 1 & Step 2, summary card) is identical across all of them.
> Applies to **both** Blindznation and Philly Blinds (phillyblinds is master — mirror changes per the dual-site rule).
> Last updated: 2026-06-29.

---

## 1. Reference baseline
**Norman Soluna Roller Shades** is the master UI reference for *styling*: small teal pill buttons, the teal `dim-box`, the right-side summary/estimate card, spacing, and rounded corners. When in doubt, match Soluna's visual style.

---

## 2. Universal step order (every product)

| Step | Title | Contents |
|------|-------|----------|
| **Step 1** | **Window size & quantity** | Teal `dim-box`: Width × Height side by side, then Quantity `[-] [n] [+]` |
| **Step 2** | **Mount type** | Inside / Outside as small pills |
| **Step 3+** | product-specific | fabric, light control, operation, headrail, color, etc. |
| (last-1) | Delivery | Ship-to-me only (no pickup) |
| (last) | Your details | contact + **Submit Order for Review** |

**Product-specific questions ALWAYS start at Step 3.** Never put fabric/operation/lift/color before size & mount.

### Exceptions (frame stays identical, only the size fields change)
- **Hardware (rods / traverse): Width ONLY** (no height) + Quantity. If "cord draw" is selected → also ask **Cord drop length**.
- **Drapery / Ripplefold:** Width per panel × Finished length (+ return size) instead of W×H. Same dim-box style.
- **Coupled Shades:** appears on **Norman Soluna Roller Shades ONLY** — never on any other product.
- **Exterior shades:** mount offers **Inside, Outside, Wall, Ceiling / Soffit** (all four).

---

## 3. Component & style rules

**Option buttons = small pills.** Use:
```html
<div class="opt-row" id="grp-XXX">
  <button class="opt-btn" onclick="...">Inside mount</button>
  <button class="opt-btn" onclick="...">Outside mount</button>
</div>
```
- **Do NOT use large `opt-card` cards** for simple choices (mount, openness, operation, lift, etc.). Pills only.
- `opt-card` is allowed *only* for a small number of genuinely rich choices that need an icon + description (e.g. top-level product type) — keep them compact.

**Size box:** `dim-box` / `dim-box-label` / `form-row` / `form-group` (defined in `css/global.css`).
**Quantity:** `qty-btns` / `qty-btn` / `qty-num`, rendered `[-] [n] [+]`.
**Steps:** `step-block` containing either (`step-label` "Step N" + `step-title`) or (`step-num` circle + `step-head-title`) — match the page's existing system, but keep numbers **sequential and correct**.
**Selected state:** the `.sel` class (teal active border) — consistent everywhere.
**Mount labels:** "Inside mount" / "Outside mount" (+ "Wall Mount" / "Ceiling / Soffit Mount" on exterior).
**Summary card:** right-side estimate/summary styled like Soluna.

---

## 4. Accordion flow rules (for step-by-step pages)
- Keep each step-block's **element ID bound to its CONTENT, not its visual position**, so JS scoped queries (`#step-2 .opt-btn`) and `xxxDone('step-id')` keep working after a reorder.
- The "open next" chain (`crsOpen` / `ersOpen` / `activateStep`) points to the **next visual step's ID**.
- Size (Step 1) auto-advances to Mount (Step 2) once valid. **Quantity does NOT auto-advance.**
- When converting `opt-card` → `opt-btn`, update any `#step-N .opt-card` query to `#step-N .opt-btn`.

---

## 5. Terminology
- Customer-facing fabric terms: **Light Filtering · Solar Screen · Sheer · Blackout** (use "Blackout", never "Room Darkening", in customer-facing text; internal RD codes/pricing logic stay unchanged).
- Delivery: **Ship-to-me only**, no pickup option.
- Button to submit an order = **"Submit Order for Review"**.

---

## 6. Process (reduces collision & risk)
- **One product page per commit**; stage only that page's files (HTML + its JS).
- **Before each commit:** `node --check` the page's JS; grep to confirm **no duplicate IDs**; confirm step numbers are sequential.
- The live site is gated, so changes are **click-tested by Justin** after commit (not auto-tested).
- Apply to **both sites** (phillyblinds first per the dual-site rule), then mirror this file.

---

## 7. Sweep order
all roller shades → cellular → woven wood → exterior → basic → other hard window treatments (faux-wood, city-lights, synchrony-verticals, zebra) → roman → drapes → cornices / valances → hardware.

## 8. Status (live checklist)
- ✅ Basic Roller — `custom-roller-shades.html` (size+qty / mount pills)
- ✅ Exterior Roller — `exterior-roller-shades.html` (size+qty / 4 mount pills)
- ✅ Cellular — `shades.html` shared engine (also fixes Zebra / Woven that share it)
- ⏳ Soluna order (currently Fabric-first; reorder pending Justin's call — page was praised as-is)
- ⬜ faux-wood-blinds, city-lights-aluminum-blinds, synchrony-verticals, zebra-shades
- ⬜ Woven configurators (galaxy / dynasty / walden)
- ⬜ Roman / Drapes / Cornices / Valances (`soft-treatments.html`)
- ⬜ Hardware (width-only) — kirsch / paris-texas / orion / select rods
