let wpDelivery = 'ship';
function wpSetDelivery(val) {
  wpDelivery = val;
  document.getElementById('wp-del-ship').classList.toggle('sel', true);
}

function submitWPQuote() {
  const name = document.getElementById('cf-name').value.trim();
  const phone = document.getElementById('cf-phone').value.trim();
  const errEl = document.getElementById('cf-contact-err');
  if (errEl) errEl.style.display = 'none';
  if (!name) { if (errEl) { errEl.textContent = 'Please enter your name.'; errEl.style.display = 'block'; } else { alert('Please enter your name.'); } return; }
  if (!phone) { if (errEl) { errEl.textContent = 'Please enter your phone number.'; errEl.style.display = 'block'; } else { alert('Please enter your phone number.'); } return; }
  const mount = getOpt('grp-mount');
  if (!mount || mount === '—') { if (errEl) { errEl.textContent = 'Please select a mount type (Inside or Outside).'; errEl.style.display = 'block'; } else { alert('Please select a mount type (Inside or Outside).'); } return; }
  const subject = encodeURIComponent('Walden Premier Woven Shade Quote — ' + name);
  const body = encodeURIComponent([
    'WALDEN PREMIER WOVEN SHADE QUOTE REQUEST',
    '==========================================',
    '',
    'CUSTOMER INFO',
    'Name: ' + name,
    'Phone: ' + phone,
    'Email: ' + (document.getElementById('cf-email').value || 'Not provided'),
    '',
    'SHADE DETAILS',
    'Pattern/Color: ' + (document.getElementById('wp-pattern').value || 'Not specified'),
    'Product Type: ' + (document.getElementById('wp-type').value || 'Roman Shade'),
    'Style: ' + (document.getElementById('wp-style').value || 'Not selected'),
    'Width: ' + (document.getElementById('wp-width').value ? document.getElementById('wp-width').value + '"' : 'Not entered'),
    'Height: ' + (document.getElementById('wp-height').value ? document.getElementById('wp-height').value + '"' : 'Not entered'),
    'Quantity: ' + (document.getElementById('wp-qty').value || '1'),
    'Control: ' + (document.getElementById('wp-control').value || 'Not selected'),
    'Mount: ' + mount,
    'Delivery: ' + ('Ship via UPS/FedEx'),
    '',
    'NOTES',
    document.getElementById('cf-notes').value || '(none)',
  ].join('\n'));
  window.location.href = 'mailto:justin@blindznation.com?subject=' + subject + '&body=' + body;
}

function addWaldenPremierToCart() {
  const type = document.getElementById('wp-type').value || 'Roman Shade';
  const pattern = document.getElementById('wp-pattern').value || '—';
  const w = document.getElementById('wp-width').value || '—';
  const h = document.getElementById('wp-height').value || '—';
  const qty = parseInt(document.getElementById('wp-qty').value) || 1;
  const control = document.getElementById('wp-control').value || '—';
  const mount = getOpt('grp-mount');
  const lines = [
    { label: 'Product', value: 'Walden Premier Natural Woven Shade' },
    { label: 'Type', value: type },
    { label: 'Pattern', value: pattern },
    { label: 'Size', value: w + '″ × ' + h + '″' },
    { label: 'Mount', value: mount },
    { label: 'Control', value: control },
    { label: 'Quantity', value: String(qty) }
  ];
  pbAddToCart({ product: 'Walden Premier Natural Woven Shade', lines: lines, specs: lines.map(function(l){ return l.label+': '+l.value; }).join(' | '), qty: qty });
  pbOpenCart();
}


// ── Pattern picker (data from Walden Premier 2026 Product Guide PDF) ──
var WP_PATTERNS = [{c:"E-M01",n:"Aires White",g:"F"},{c:"E-87K",n:"Alder Oak",g:"B"},{c:"E-232W",n:"Andell Linen",g:"F"},{c:"E-432",n:"Artisan Weave",g:"E"},{c:"E-416-3",n:"Aspen Ebony",g:"C"},{c:"E-082",n:"Aspen Walnut",g:"C"},{c:"E-416-4",n:"Aspen White",g:"C"},{c:"E-234G",n:"Avon Dawn",g:"F"},{c:"E-234W",n:"Avon Lace",g:"F"},{c:"E-R26",n:"Bamboo Forest",g:"B"},{c:"E-365",n:"Barcelona Café",g:"B"},{c:"E-861",n:"Bora Bora",g:"B"},{c:"E-430",n:"Capri Natural",g:"D"},{c:"E-233B",n:"Castelo Black",g:"D"},{c:"E-233P",n:"Castelo White",g:"D"},{c:"E-389",n:"Catalina",g:"E"},{c:"E-E11",n:"Devon Ivory",g:"A"},{c:"E-E06",n:"Devon Maple",g:"A"},{c:"E-E02",n:"Devon White",g:"A"},{c:"E-68N",n:"Driftwood Natural",g:"B"},{c:"E-055",n:"Java Cocoa",g:"B"},{c:"E-B01",n:"Mandalay Umber",g:"C"},{c:"E-801",n:"Mykonos Dunes",g:"F"},{c:"E-390",n:"Natural Jute",g:"E"},{c:"E-803",n:"Navarre White Sand",g:"F"},{c:"E-P01",n:"Orleans Macaroon",g:"E"},{c:"E-403-B",n:"Penang Oak",g:"A"},{c:"E-427",n:"Prairie Golden",g:"E"},{c:"E-828",n:"Prairie Snow",g:"F"},{c:"E-428",n:"Prairie White",g:"E"},{c:"E-M04",n:"Remi Breeze",g:"E"},{c:"E-233W",n:"Rhone Blanc",g:"E"},{c:"E-001",n:"Sakura Oregano",g:"C"},{c:"E-352",n:"Savanna Husk",g:"C"},{c:"E-U01",n:"Saybrook Stone",g:"E"},{c:"E-U03",n:"Seaside White",g:"F"},{c:"E-370",n:"Sierra Sand",g:"D"},{c:"E-438",n:"Sunshade Brown",g:"A"},{c:"E-10H",n:"Sunshade White",g:"C"},{c:"E-394",n:"Tamarind Sunset",g:"B"},{c:"E-805",n:"Telluride Frost",g:"D"},{c:"E-806",n:"Telluride Thunder",g:"D"},{c:"E-2203",n:"Twyla Cascade",g:"E"},{c:"E-2201",n:"Twyla Cotton",g:"E"},{c:"E-2104",n:"Zahra Dark Olive",g:"F"},{c:"E-2103",n:"Zahra Sepia",g:"F"},{c:"E-2102",n:"Zahra Sorbet",g:"F"}];
function wpBuildPicker(){
  if(!window.pbFabricPicker) return;
  var byG={};
  WP_PATTERNS.forEach(function(p){ if(!byG[p.g]) byG[p.g]={g:p.g,colors:[]}; byG[p.g].colors.push({n:p.n,c:p.c}); });
  var collections=Object.keys(byG).map(function(k){ return {type:"w", pg:byG[k].g, name:"", colors:byG[k].colors}; });
  pbFabricPicker.render("wp-fabric-picker", {
    hideTabs:true, showPriceGroups:true, priceGroupTabs:true,
    types:[{key:"w",label:"Pattern"}],
    collections:collections,
    onSelect:function(sel){ var el=document.getElementById("wp-pattern"); if(el){ el.value=sel.name+" ("+sel.code+")"; } }
  });
}
wpBuildPicker();
