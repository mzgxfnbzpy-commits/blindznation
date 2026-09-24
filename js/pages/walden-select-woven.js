// Summary card — mirrors every choice; this product is quote-only (no price shown).
function wsVal(id){ var e=document.getElementById(id); return e ? (e.value||'') : ''; }
function wsSummary() {
  var set=function(id,v){ var e=document.getElementById(id); if(e) e.textContent=v; };
  var w=wsVal('ws-width'), h=wsVal('ws-height'), qty=parseInt(wsVal('ws-qty'),10)||1;
  var pick=function(id){ var s=document.getElementById(id); return (s && s.value) ? s.options[s.selectedIndex].textContent : '—'; };
  set('ws-s-size', (w&&h) ? (w+'″ × '+h+'″') : '—');
  set('ws-s-mount', getOpt('ws-mount-grp'));
  set('ws-s-qty', String(qty));
  set('ws-s-pattern', wsVal('ws-pattern') || '—');
  set('ws-s-type', pick('ws-type'));
  set('ws-s-style', pick('ws-style'));
  set('ws-s-control', pick('ws-control'));
  set('ws-s-del', (typeof pbDeliveryLabel==='function') ? pbDeliveryLabel() : 'Ship to me');
}
function wsDeliveryLabel(){ return (typeof pbDeliveryLabel==='function') ? pbDeliveryLabel() : 'Ship to me'; }

function submitWSQuote() {
  const name = document.getElementById('cf-name').value.trim();
  const phone = document.getElementById('cf-phone').value.trim();
  if (!name) { alert('Please enter your name.'); return; }
  if (!phone) { alert('Please enter your phone number.'); return; }
  const mount = getOpt('ws-mount-grp');
  if (!mount || mount === '—') { alert('Please select a mount type (Inside or Outside).'); return; }
  const subject = encodeURIComponent('Walden Select Woven Shade Quote — ' + name);
  const body = encodeURIComponent([
    'WALDEN SELECT WOVEN SHADE QUOTE REQUEST',
    '=========================================',
    '',
    'CUSTOMER INFO',
    'Name: ' + name,
    'Phone: ' + phone,
    'Email: ' + (document.getElementById('cf-email').value || 'Not provided'),
    '',
    'SHADE DETAILS',
    'Pattern/Color: ' + (document.getElementById('ws-pattern').value || 'Not specified'),
    'Product Type: ' + (document.getElementById('ws-type').value || 'Roman Shade'),
    'Style: ' + (document.getElementById('ws-style').value || 'Not selected'),
    'Width: ' + (document.getElementById('ws-width').value ? document.getElementById('ws-width').value + '"' : 'Not entered'),
    'Height: ' + (document.getElementById('ws-height').value ? document.getElementById('ws-height').value + '"' : 'Not entered'),
    'Quantity: ' + (document.getElementById('ws-qty').value || '1'),
    'Control: ' + (document.getElementById('ws-control').value || 'Not selected'),
    'Mount: ' + mount,
    'Delivery: ' + wsDeliveryLabel(),
    '',
    'NOTES',
    document.getElementById('cf-notes').value || '(none)',
  ].join('\n'));
  window.location.href = 'mailto:justin@blindznation.com?subject=' + subject + '&body=' + body;
}

function addWaldenSelectToCart() {
  const type = document.getElementById('ws-type').value || 'Roman Shade';
  const pattern = document.getElementById('ws-pattern').value || '—';
  const w = document.getElementById('ws-width').value || '—';
  const h = document.getElementById('ws-height').value || '—';
  const qty = parseInt(document.getElementById('ws-qty').value) || 1;
  const control = document.getElementById('ws-control').value || '—';
  const lines = [
    { label: 'Product', value: 'Walden Select Natural Woven Shade' },
    { label: 'Type', value: type },
    { label: 'Pattern', value: pattern },
    { label: 'Size', value: w + '″ × ' + h + '″' },
    { label: 'Control', value: control },
    { label: 'Mount', value: getOpt('ws-mount-grp') },
    { label: 'Style', value: document.getElementById('ws-style').value || '—' },
    { label: 'Quantity', value: String(qty) }
  ];
  pbAddToCart({ product: 'Walden Select Natural Woven Shade', lines: lines, specs: lines.map(function(l){ return l.label+': '+l.value; }).join(' | '), qty: qty });
  pbOpenCart();
}


// ── Pattern picker (data from Walden Select 2026 Product Guide PDF) ──
var WS_PATTERNS = [{c:"WS-F132",n:"Alisia Antique White",g:"E"},{c:"WS-F111",n:"Alisia Chiffon",g:"E"},{c:"WS-F122",n:"Alisia Morning",g:"E"},{c:"WS-V043",n:"Andros Birch",g:"E"},{c:"WS-V049",n:"Andros Harbor",g:"E"},{c:"WS-1922",n:"Antilles Mist",g:"D"},{c:"WS-1903",n:"Antilles Sand",g:"D"},{c:"WS-1905",n:"Antilles Seagrass",g:"D"},{c:"WS-5322",n:"Cala Platinum",g:"B"},{c:"WS-5302",n:"Cala Titanium",g:"B"},{c:"WS-0390",n:"Camden Natural",g:"D"},{c:"WS-0392",n:"Camden Snow",g:"D"},{c:"WS-W116",n:"Chelsea Lace",g:"D"},{c:"WS-W118",n:"Chelsea Taupe",g:"D"},{c:"WS-1322",n:"Como Charcoal",g:"E"},{c:"WS-1302",n:"Como Ecru",g:"E"},{c:"WS-1323",n:"Como Gray",g:"E"},{c:"WS-1388",n:"Como Midnight",g:"E"},{c:"WS-1303",n:"Como Umber",g:"E"},{c:"WS-A904",n:"Fay Black",g:"E"},{c:"WS-A133",n:"Fay Snow",g:"E"},{c:"WS-D601",n:"Fay Tan",g:"E"},{c:"WS-0389",n:"Halifax Natural",g:"D"},{c:"WS-0427",n:"Harbor Golden",g:"D"},{c:"WS-0428",n:"Harbor White",g:"D"},{c:"WS-E402",n:"Lou Coconut",g:"C"},{c:"WS-E302",n:"Lou Contrast",g:"C"},{c:"WS-E401",n:"Lou Cotton",g:"C"},{c:"WS-E501",n:"Lou Driftwood",g:"C"},{c:"WS-0702",n:"Malvern Chalk",g:"B"},{c:"WS-0722",n:"Malvern Gray",g:"B"},{c:"WS-0721",n:"Malvern Light Gray",g:"B"},{c:"WS-0723",n:"Malvern Platinum",g:"B"},{c:"WS-0812",n:"Metro Caramel",g:"C"},{c:"WS-0802",n:"Metro Chalk",g:"C"},{c:"WS-0822",n:"Metro Smoke",g:"C"},{c:"WS-1806",n:"Montana Inkwash",g:"D"},{c:"WS-1888",n:"Montana Mineral",g:"D"},{c:"WS-1605",n:"Nantucket Sea Mist",g:"D"},{c:"WS-0522",n:"Osaka Granite",g:"B"},{c:"WS-0502",n:"Osaka Snow",g:"B"},{c:"WS-1516",n:"Parchment Husk",g:"D"},{c:"WS-1201",n:"Peri Mist",g:"E"},{c:"WS-1517",n:"Portland Inkwash",g:"D"},{c:"WS-1522",n:"Portland Sky",g:"D"},{c:"WS-0602",n:"Pudong White",g:"A"},{c:"WS-1101",n:"Selene Natural",g:"E"},{c:"WS-1102",n:"Selene White",g:"E"},{c:"WS-0004",n:"Soft Jute Beige",g:"F"},{c:"WS-0022",n:"Soft Jute Gray",g:"F"},{c:"WS-0001",n:"Soft Jute White",g:"F"},{c:"WS-1504",n:"Sonoma Dusk",g:"D"},{c:"WS-9077",n:"Terra Oak",g:"C"},{c:"WS-0833",n:"Tortola Natural",g:"D"},{c:"WS-0288",n:"Umbria Ink",g:"C"},{c:"WS-0222",n:"Umbria Mist",g:"C"},{c:"WS-0219",n:"Umbria Sepia",g:"C"}];
function wsBuildPicker(){
  if(!window.pbFabricPicker) return;
  var byG={};
  WS_PATTERNS.forEach(function(p){ if(!byG[p.g]) byG[p.g]={g:p.g,colors:[]}; byG[p.g].colors.push({n:p.n,c:p.c}); });
  var collections=Object.keys(byG).map(function(k){ return {type:"w", pg:byG[k].g, name:"", colors:byG[k].colors}; });
  pbFabricPicker.render("ws-fabric-picker", {
    hideTabs:true, showPriceGroups:true, priceGroupTabs:true,
    types:[{key:"w",label:"Pattern"}],
    collections:collections,
    onSelect:function(sel){ var el=document.getElementById("ws-pattern"); if(el){ el.value=sel.name+" ("+sel.code+")"; } wsSummary(); }
  });
}
wsBuildPicker();
