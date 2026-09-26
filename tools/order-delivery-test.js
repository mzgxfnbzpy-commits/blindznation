// Every order form → does it actually reach justin@blindznation.com?
//   NODE_PATH=<folder with jsdom> node tools/order-delivery-test.js .
// For each page with a submit-for-review button: fill NAME + EMAIL only (no phone — phone
// is optional), tick the Terms box, click the real button, and capture the POST to
// /api/quote. A page either SENDS (payload checked: _t ≥ 2000, name, email, product, rows)
// or is STOPPED by one of its own "please choose X" checks — which must never be about phone.
const fs = require('fs'), path = require('path');
const { load, click } = require('./harness.js');
const wait = ms => new Promise(r => setTimeout(r, ms));
const B = process.argv[2] || '.';
const pages = fs.readdirSync(path.join(B, 'pages')).filter(f => f.endsWith('.html')).map(f => 'pages/' + f).concat(['index.html']);

function fillContact(d) {
  [...d.querySelectorAll('input, textarea')].forEach(i => {
    const id = (i.id || '').toLowerCase(), key = (i.getAttribute('data-pb-contact') || '').toLowerCase(), ty = (i.type || '').toLowerCase();
    if (['checkbox', 'radio', 'file', 'hidden'].includes(ty) || i.classList.contains('pb-hp') || /hp$/.test(id)) return;
    if (key === 'name' || /(^|-)name$|fname/.test(id)) i.value = 'Test Person';
    else if (key === 'email' || ty === 'email' || /email/.test(id)) i.value = 'test@example.com';
    else if (key === 'notes' || /notes|msg/.test(id)) i.value = 'Test note from the delivery check';
  });
}

(async () => {
  let sent = 0, stopped = 0, bad = [];
  const rows = [];
  for (const p of pages) {
    let r; try { r = load(path.join(B, p), 'blindznation.com'); } catch (e) { continue; }
    const { window: w, document: d } = r; await wait(20);
    const btns = [...d.querySelectorAll('[data-pb-terms-gate]')].filter(b => !/addTo|Cart/i.test(b.getAttribute('onclick') || ''));
    if (!btns.length) continue;
    const posts = [], alerts = [];
    w.fetch = async (url, opt) => { if (/api\/quote/.test(url)) posts.push(JSON.parse(opt.body)); return { ok: true, status: 200, json: async () => ({ ok: true }) }; };
    w.alert = m => alerts.push(String(m));
    w._formLoadTime = Date.now() - 60000;
    for (const btn of btns) {
      fillContact(d);
      d.querySelectorAll('.pb-terms-check').forEach(b => { b.checked = true; });
      try { click(d, btn); } catch (e) { alerts.push('THROW ' + e.message); }
      await wait(60);
    }
    const errText = [...d.querySelectorAll('[id$="err"], [id*="contact-err"], .warn-box')].filter(e => e.style.display !== 'none' && e.textContent.trim()).map(e => e.textContent.trim().slice(0, 90));
    const reasons = alerts.concat(errText);
    const js = r.errors.filter(e => !/navigation/i.test(e));
    if (posts.length) {
      sent++;
      const q = posts[0];
      const probs = [];
      if (!(q._t >= 2000)) probs.push('_t ' + q._t);
      if (q.name !== 'Test Person') probs.push('name ' + q.name);
      if (q.email !== 'test@example.com') probs.push('email ' + q.email);
      if (!q.product) probs.push('no product');
      if (!(q.selections || []).length) probs.push('no option rows');
      if (probs.length) bad.push(p + ': ' + probs.join(', '));
      rows.push('SENT     ' + p.padEnd(44) + ' ' + String(q.product).slice(0, 38).padEnd(38) + ' rows ' + (q.selections || []).length + (probs.length ? '  ⚠ ' + probs.join(', ') : ''));
    } else {
      stopped++;
      const phoneBlock = reasons.some(x => /phone/i.test(x) && !/email/i.test(x));
      if (phoneBlock) bad.push(p + ': blocked asking for PHONE — ' + reasons.join(' | '));
      rows.push('STOPPED  ' + p.padEnd(44) + ' ' + (reasons[0] || '(no message)').replace(/\s+/g, ' ').slice(0, 80));
    }
    if (js.length) bad.push(p + ': JS error ' + js[0].slice(0, 120));
  }
  rows.forEach(x => console.log(x));
  console.log('\nsent ' + sent + ' · stopped by a page check ' + stopped);
  console.log(bad.length ? 'PROBLEMS:\n  ' + bad.join('\n  ') : 'no problems');
  process.exit(bad.length ? 1 : 0);
})();
