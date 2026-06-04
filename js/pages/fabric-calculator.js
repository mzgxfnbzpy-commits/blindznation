renderNav('Fabric calculator');
renderFooter(false);

// ── Tab switching ──────────────────────────────────────────────
function switchTab(id, btn) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  btn.classList.add('active');
}

// ── Fabric width helper (supports Custom option) ──────────────
function getFabricW(prefix) {
  const sel = document.querySelector('#' + prefix + '-fabricw .opt-btn.sel');
  if (!sel) return null;
  if (sel.getAttribute('data-val') === 'custom') {
    const val = parseFloat(document.getElementById(prefix + '-fabricw-val').value);
    return (isNaN(val) || val <= 0) ? null : val;
  }
  return parseFloat(sel.getAttribute('data-val'));
}
function toggleCustomW(prefix) {
  const sel = document.querySelector('#' + prefix + '-fabricw .opt-btn.sel');
  const wrap = document.getElementById(prefix + '-fabricw-custom');
  if (wrap) wrap.style.display = (sel && sel.getAttribute('data-val') === 'custom') ? 'block' : 'none';
}

// ── Shared helpers ────────────────────────────────────────────
function getOptVal(groupId) {
  const s = document.querySelector('#' + groupId + ' .opt-btn.sel');
  return s ? parseFloat(s.getAttribute('data-val')) : null;
}
function getOptStr(groupId) {
  const s = document.querySelector('#' + groupId + ' .opt-btn.sel');
  return s ? s.getAttribute('data-val') : null;
}
function v(id) {
  const el = document.getElementById(id);
  const n = parseFloat(el ? el.value : '');
  return isNaN(n) ? null : n;
}
function roundUp(yards, step) {
  step = step || 0.25;
  return Math.ceil(yards / step) * step;
}
function fmtYards(y) {
  return y.toFixed(2);
}

// ── Drapery Calculator ────────────────────────────────────────
function calcDrapery() {
  const width    = v('d-width');
  const length   = v('d-length');
  const fullness = getOptVal('d-fullness');
  const panels   = getOptVal('d-panels');
  const fabricW  = getFabricW('d');
  const repeat   = v('d-repeat') || 0;
  const topHem   = v('d-top')    != null ? v('d-top')    : 8;
  const botHem   = v('d-bot')    != null ? v('d-bot')    : 8;
  const retAllow = v('d-return') != null ? v('d-return') : 4;
  const leadAllow= v('d-lead')   != null ? v('d-lead')   : 4;

  if (!width || !length) {
    document.getElementById('d-result-body').innerHTML = emptyState();
    return;
  }

  // Cut length = drop + top header + bottom hem + pattern repeat
  const cutLength = length + topHem + botHem + (repeat > 0 ? repeat : 0);
  // Flat fabric needed per panel (ungathered) + side allowances
  const flatPerPanel = (width * fullness) / panels;
  const cutWidthPerPanel = flatPerPanel + retAllow + leadAllow;
  // Widths from bolt per panel
  const widthsPerPanel = Math.ceil(cutWidthPerPanel / fabricW);
  const totalWidths = widthsPerPanel * panels;
  const rawYards = (totalWidths * cutLength) / 36;
  const finalYards = roundUp(rawYards * 1.10);
  // Lining: same widths, no pattern repeat
  const liningYards = roundUp((totalWidths * (length + topHem + botHem)) / 36 * 1.05);

  const drawLabel = panels === 1 ? 'One way draw' : 'Split draw (2 panels)';

  document.getElementById('d-result-body').innerHTML = `
    <div class="result-row">
      <span class="result-label">Face fabric</span>
      <span class="result-val">${fmtYards(finalYards)}<span class="val-unit">yds</span></span>
    </div>
    <div class="result-row">
      <span class="result-label">Lining (if lined)</span>
      <span class="result-val">${fmtYards(liningYards)}<span class="val-unit">yds</span></span>
    </div>
    <div class="result-breakdown">
      <h4>Cut length</h4>
      <div class="breakdown-row"><span>Finished drop</span><span>${length}″</span></div>
      <div class="breakdown-row"><span>+ Top header</span><span>+${topHem}″</span></div>
      <div class="breakdown-row"><span>+ Bottom hem</span><span>+${botHem}″</span></div>
      ${repeat > 0 ? `<div class="breakdown-row"><span>+ Pattern repeat</span><span>+${repeat}″</span></div>` : ''}
      <div class="breakdown-row" style="border-top:1px solid #3A2E24;margin-top:4px;padding-top:4px"><span><strong>= Cut length</strong></span><span><strong>${cutLength.toFixed(1)}″</strong></span></div>
    </div>
    <div class="result-breakdown">
      <h4>Cut width (per panel)</h4>
      <div class="breakdown-row"><span>Draw type</span><span>${drawLabel}</span></div>
      <div class="breakdown-row"><span>Flat fabric per panel</span><span>${flatPerPanel.toFixed(1)}″</span></div>
      <div class="breakdown-row"><span>+ Return allowance</span><span>+${retAllow}″</span></div>
      <div class="breakdown-row"><span>+ Leading edge</span><span>+${leadAllow}″</span></div>
      <div class="breakdown-row" style="border-top:1px solid #3A2E24;margin-top:4px;padding-top:4px"><span><strong>= Cut width / panel</strong></span><span><strong>${cutWidthPerPanel.toFixed(1)}″</strong></span></div>
      <div class="breakdown-row"><span>Widths from bolt / panel</span><span>${widthsPerPanel} × ${fabricW}″</span></div>
      <div class="breakdown-row"><span>Total fabric widths</span><span>${totalWidths}</span></div>
      <div class="breakdown-row"><span>Raw yardage</span><span>${rawYards.toFixed(2)} yds</span></div>
      <div class="breakdown-row"><span>+10% waste buffer</span><span>+${(rawYards * 0.10).toFixed(2)} yds</span></div>
    </div>
    ${repeat > 0 ? `<div class="result-note">Pattern repeat of ${repeat}″ added to cut length. For seam matching at a split-draw center, add one extra repeat per fabric width.</div>` : ''}
  `;
}

function resetDrapery() {
  ['d-width','d-length','d-repeat'].forEach(id => { document.getElementById(id).value = ''; });
  document.getElementById('d-top').value    = '8';
  document.getElementById('d-bot').value    = '8';
  document.getElementById('d-return').value = '4';
  document.getElementById('d-lead').value   = '4';
  setDefault('d-fullness','2.0');
  setDefault('d-panels','2');
  setDefault('d-fabricw','54');
  document.getElementById('d-fabricw-val').value = '';
  document.getElementById('d-fabricw-custom').style.display = 'none';
  document.getElementById('d-result-body').innerHTML = emptyState();
}

// ── Roman Shade Calculator ────────────────────────────────────
function calcRoman() {
  const width    = v('r-width');
  const length   = v('r-length');
  const qty      = v('r-qty') || 1;
  const fabricW  = getFabricW('r');
  const repeat   = v('r-repeat') || 0;
  const lining   = getOptStr('r-lining');
  const sideEach = v('r-side') != null ? v('r-side') : 4;
  const topMount = v('r-top')  != null ? v('r-top')  : 1;
  const botHem   = v('r-bot')  != null ? v('r-bot')  : 8;

  if (!width || !length) {
    document.getElementById('r-result-body').innerHTML = emptyState();
    return;
  }

  const sideTotal = sideEach * 2;
  const cutWidth  = width + sideTotal;
  const cutLength = length + topMount + botHem + (repeat > 0 ? repeat : 0);
  const widthsPerShade = Math.ceil(cutWidth / fabricW);
  const yardsPerShade  = (widthsPerShade * cutLength) / 36;
  const totalFaceYards = roundUp(yardsPerShade * qty * 1.10);

  let liningLine = '';
  let liningYards = 0;
  if (lining !== 'none') {
    const lineCutLength = length + topMount + botHem;
    liningYards = roundUp((Math.ceil(cutWidth / fabricW) * lineCutLength / 36) * qty * 1.05);
    liningLine = `
      <div class="result-row">
        <span class="result-label">${lining === 'blackout' ? 'Blackout lining' : 'Standard lining'}</span>
        <span class="result-val">${fmtYards(liningYards)}<span class="val-unit">yds</span></span>
      </div>`;
  }

  document.getElementById('r-result-body').innerHTML = `
    <div class="result-row">
      <span class="result-label">Face fabric</span>
      <span class="result-val">${fmtYards(totalFaceYards)}<span class="val-unit">yds</span></span>
    </div>
    ${liningLine}
    <div class="result-breakdown">
      <h4>Cut width</h4>
      <div class="breakdown-row"><span>Finished width</span><span>${width}″</span></div>
      <div class="breakdown-row"><span>+ Side hems (${sideEach}″ × 2)</span><span>+${sideTotal}″</span></div>
      <div class="breakdown-row" style="border-top:1px solid #3A2E24;margin-top:4px;padding-top:4px"><span><strong>= Cut width</strong></span><span><strong>${cutWidth.toFixed(1)}″</strong></span></div>
    </div>
    <div class="result-breakdown">
      <h4>Cut length</h4>
      <div class="breakdown-row"><span>Finished drop</span><span>${length}″</span></div>
      <div class="breakdown-row"><span>+ Top mount allowance</span><span>+${topMount}″</span></div>
      <div class="breakdown-row"><span>+ Bottom hem</span><span>+${botHem}″</span></div>
      ${repeat > 0 ? `<div class="breakdown-row"><span>+ Pattern repeat</span><span>+${repeat}″</span></div>` : ''}
      <div class="breakdown-row" style="border-top:1px solid #3A2E24;margin-top:4px;padding-top:4px"><span><strong>= Cut length</strong></span><span><strong>${cutLength.toFixed(1)}″</strong></span></div>
      <div class="breakdown-row"><span>Widths from bolt</span><span>${widthsPerShade} × ${fabricW}″</span></div>
      <div class="breakdown-row"><span>Yards / shade (raw)</span><span>${yardsPerShade.toFixed(2)} yds</span></div>
      <div class="breakdown-row"><span>Qty</span><span>${qty} shade${qty > 1 ? 's' : ''}</span></div>
    </div>
    ${widthsPerShade > 1 ? '<div class="result-note">Shade wider than bolt — seam required. Position at edge, not center.</div>' : ''}
    ${repeat > 0 ? `<div class="result-note" style="margin-top:6px">Pattern repeat of ${repeat}″ added to cut length. Buy extra to align folds at pattern breaks.</div>` : ''}
  `;
}

function resetRoman() {
  ['r-width','r-length'].forEach(id => { document.getElementById(id).value = ''; });
  document.getElementById('r-qty').value    = '1';
  document.getElementById('r-repeat').value = '0';
  document.getElementById('r-side').value   = '4';
  document.getElementById('r-top').value    = '1';
  document.getElementById('r-bot').value    = '8';
  setDefault('r-fabricw','54');
  setDefault('r-lining','standard');
  document.getElementById('r-fabricw-val').value = '';
  document.getElementById('r-fabricw-custom').style.display = 'none';
  document.getElementById('r-result-body').innerHTML = emptyState();
}

// ── Cornice Calculator ────────────────────────────────────────
function toggleWeltEdges(show) {
  var el = document.getElementById('c-welt-edges');
  if (el) el.style.display = show ? 'block' : 'none';
}

function calcCornice() {
  const faceW   = v('c-width');
  const ret     = v('c-return') != null ? v('c-return') : 4;
  const height  = v('c-height');
  const qty     = v('c-qty') || 1;
  const fabricW = getFabricW('c');
  const repeat  = v('c-repeat') || 0;
  const topWrap = v('c-top')  != null ? v('c-top')  : 4;
  const botWrap = v('c-bot')  != null ? v('c-bot')  : 4;
  const sideTuck= v('c-side') != null ? v('c-side') : 4;

  if (!faceW || !height) {
    document.getElementById('c-result-body').innerHTML = emptyState();
    return;
  }

  const sideTuckTotal = sideTuck * 2;
  const totalRun  = faceW + (2 * ret) + sideTuckTotal;
  const cutHeight = height + topWrap + botWrap + (repeat > 0 ? repeat : 0);
  const widthsNeeded = Math.ceil(totalRun / fabricW);
  const yardsPerCornice = (widthsNeeded * cutHeight) / 36;
  let   totalYards = roundUp(yardsPerCornice * qty * 1.10);

  // ── Welt fabric calculation ──
  const weltBtn = document.querySelector('#c-welt-type .opt-btn.sel');
  const weltType = weltBtn ? weltBtn.getAttribute('data-welt') : 'none';
  let weltYards = 0; let weltNote = '';
  if (weltType !== 'none') {
    // Calculate welt perimeter from selected edges
    let weltIn = 0;
    if (document.getElementById('cw-top')     && document.getElementById('cw-top').checked)     weltIn += faceW;
    if (document.getElementById('cw-bottom')  && document.getElementById('cw-bottom').checked)   weltIn += faceW;
    if (document.getElementById('cw-sides')   && document.getElementById('cw-sides').checked)    weltIn += height * 2;
    if (document.getElementById('cw-returns') && document.getElementById('cw-returns').checked)  weltIn += ret * 2;
    if (weltIn > 0) {
      // Strip width: single welt 1.5" bias strip, double welt 3" per strip × 2 strips
      const stripW = weltType === 'double' ? 3.0 : 1.5;
      const stripsPerFt = Math.ceil(fabricW / stripW);
      const weltFt = weltIn / 12;
      const weltRows = Math.ceil(weltFt / (fabricW / 12 * stripsPerFt));
      weltYards = roundUp((weltRows * stripW / 36) * qty * 1.10);
      weltNote = `${weltType === 'double' ? 'Double' : 'Single'} self welt — ${(weltIn/12).toFixed(1)} ft × ${stripW}″ bias strips`;
      totalYards = roundUp(totalYards + weltYards);
    }
  }

  const seamNote = widthsNeeded > 1
    ? '<div class="result-note">Face wider than bolt — seam required. Position at a return, never face center.</div>'
    : '';

  document.getElementById('c-result-body').innerHTML = `
    <div class="result-row">
      <span class="result-label">Total fabric needed</span>
      <span class="result-val">${fmtYards(totalYards)}<span class="val-unit">yds</span></span>
    </div>
    <div class="result-breakdown">
      <h4>Face / wrap fabric</h4>
      <div class="breakdown-row"><span>Face width</span><span>${faceW}″</span></div>
      <div class="breakdown-row"><span>+ Returns (${ret}″ × 2)</span><span>+${(ret*2).toFixed(0)}″</span></div>
      <div class="breakdown-row"><span>+ Side tuck (${sideTuck}″ × 2)</span><span>+${sideTuckTotal}″</span></div>
      <div class="breakdown-row" style="border-top:1px solid #3A2E24;margin-top:4px;padding-top:4px"><span><strong>= Total run</strong></span><span><strong>${totalRun.toFixed(1)}″</strong></span></div>
      <div class="breakdown-row"><span>Cut height</span><span>${cutHeight.toFixed(1)}″</span></div>
      <div class="breakdown-row"><span>Widths from bolt</span><span>${widthsNeeded} × ${fabricW}″</span></div>
      <div class="breakdown-row"><span>Yards / cornice</span><span>${yardsPerCornice.toFixed(2)} yds</span></div>
      <div class="breakdown-row"><span>Qty × +10% waste</span><span>${qty} cornice${qty > 1 ? 's' : ''}</span></div>
    </div>
    ${weltYards > 0 ? `
    <div class="result-breakdown">
      <h4>Welt fabric</h4>
      <div class="breakdown-row"><span>${weltNote}</span><span>${weltYards.toFixed(2)} yds</span></div>
    </div>` : ''}
    ${seamNote}
    ${repeat > 0 ? `<div class="result-note" style="margin-top:6px">Pattern repeat of ${repeat}″ added to cut height. Buy one extra repeat per cornice for centering on the face.</div>` : ''}
  `;
}

function resetCornice() {
  ['c-width','c-height'].forEach(id => { document.getElementById(id).value = ''; });
  document.getElementById('c-return').value = '4';
  document.getElementById('c-qty').value    = '1';
  document.getElementById('c-repeat').value = '0';
  document.getElementById('c-top').value    = '4';
  document.getElementById('c-bot').value    = '4';
  document.getElementById('c-side').value   = '4';
  setDefault('c-fabricw','54');
  document.getElementById('c-fabricw-val').value = '';
  document.getElementById('c-fabricw-custom').style.display = 'none';
  // Reset welt options
  document.querySelectorAll('#c-welt-type .opt-btn').forEach(function(b) {
    b.classList.toggle('sel', b.getAttribute('data-welt') === 'none');
  });
  toggleWeltEdges(false);
  ['cw-top','cw-sides','cw-returns'].forEach(function(id) {
    var el = document.getElementById(id); if (el) el.checked = false;
  });
  var cwBot = document.getElementById('cw-bottom'); if (cwBot) cwBot.checked = true;
  document.getElementById('c-result-body').innerHTML = emptyState();
}

// ── Utility ───────────────────────────────────────────────────
function emptyState() {
  return `<div class="result-empty">
    <div class="empty-icon">📐</div>
    <p>Enter your dimensions above to see the yardage estimate.</p>
  </div>`;
}
function setDefault(groupId, val) {
  document.querySelectorAll('#' + groupId + ' .opt-btn').forEach(b => {
    b.classList.toggle('sel', b.getAttribute('data-val') === val);
  });
}