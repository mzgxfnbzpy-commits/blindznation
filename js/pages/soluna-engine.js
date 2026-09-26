// Norman Soluna roller shades — pricing engine.
//
// A port of the reference implementation in the Soluna pricing handoff (section 12),
// run against SOLUNA_DATA (js/pages/soluna-data.js, generated from the same handoff).
// tools/soluna-engine-test.js replays all 85 of the handoff's test vectors through
// this file — run it after ANY change here or to the data.
//
// House rules this encodes (handoff rev 19, Sept 2026 book):
//   · every shade prices off its own collection's chart: solar1–3 or fab1–4. There is
//     no solar group 4 — a solar4 lookup throws rather than falling through to fab4.
//   · blackout +20% only where Norman left the RD level with its LF twin; the uplift
//     is READ from the RD record (blackoutUplift), never derived.
//   · the raceway (row 4, off the SHADE width, one per bracket assembly: dual = 1,
//     coupled = one each) is charged ONLY on "raceway only" — Justin 2026-09-25. A fascia
//     or wood valance includes it. Read from SOLUNA_DATA.raceway.appliesTo (the handoff
//     said race + fascia + wood; the test runner passes that back in via opts.racewayOn).
//   · premium hem bar $16 on every shade, no exceptions.
//   · shipping is net — outside the discount, added last.
//   · client = retail × (1 − discount) + freight. Discount is 25% (Justin 2026-09-25),
//     read from SOLUNA_DATA.pricingLadder — the handoff was written at 30%.
//
// Extensions beyond the reference (all default to the reference behaviour, so the
// 85 vectors still pass):
//   · o.shades[i].width / .height — coupled shades of different sizes
//   · o.cordless === false         — the cordless tube-length limit only binds cordless
//   · o.doorMagnets === false      — a door shade without the (pre-ticked) hold down
//   · o.shades[i].code             — colour-level fabric width (Valerie Dolphin, Bali)

(function (root) {
  var DATA = root.SOLUNA_DATA;
  if (!DATA) return;

  function index(list, key) { var o = {}; list.forEach(function (x) { o[x[key]] = x; }); return o; }
  var BY  = index(DATA.collections, 'collection');
  var SUR = index(DATA.surcharges, 'id');
  var HDR = index(DATA.headerTreatments, 'id');
  var D   = DATA.defaults;
  var ALWAYS = DATA.surcharges.filter(function (x) { return x.always; }).map(function (x) { return x.id; });

  function r2(n) { return Math.round(n * 100) / 100; }
  function nz(v, d) { return v === undefined || v === null ? d : v; }
  function cellIndex(v, axis) {
    for (var i = 0; i < axis.length; i++) if (v <= axis[i]) return i;
    return -1;
  }
  function cordlessMax(w) { return w <= 20 ? 72 : w <= 24 ? 96 : 144; }
  function inch(n) { return String(n).replace('3.5', '3½').replace('4.5', '4½') + '"'; }

  // Fabric width: the colour's own override if it has one, else the widest figure the
  // collection lists ("118\" / 106\"" → 118).
  function fabricWidth(f, code) {
    if (code) {
      for (var i = 0; i < f.colors.length; i++)
        if (f.colors[i].code === code && f.colors[i].fabricWidthOverride) return parseFloat(f.colors[i].fabricWidthOverride);
    }
    var nums = String(f.fabricWidth).match(/[\d.]+/g) || [];
    return Math.max.apply(null, nums.map(parseFloat));
  }

  function resolve(name, blackout) {
    var f = BY[name];
    var own = f.blackoutUplift || 0;
    if (!blackout)
      return { chart: f.chart, group: f.priceGroup, from: name, uplift: own,
               rule: own ? 'RD_SAME_GROUP_UPLIFT_20' : 'AS_LISTED' };
    var b = f.blackout;
    if (b.type === 'self')
      return { chart: f.chart, group: f.priceGroup, from: name, uplift: own,
               rule: own ? 'RD_SAME_GROUP_UPLIFT_20' : 'ALREADY_BLACKOUT' };
    if (b.type === 'twin') {
      var t = BY[b.to], tu = t.blackoutUplift || 0;
      return { chart: t.chart, group: t.priceGroup, from: b.to, uplift: tu,
               rule: tu ? 'TWIN_SAME_GROUP_UPLIFT_20' : 'TWIN' };
    }
    return { chart: f.chart, group: f.priceGroup, from: name, uplift: 0, rule: 'NO_BLACKOUT_PRODUCT' };
  }

  function gridFor(r) {
    var key = (r.chart === 'solar' ? 'solar' : 'fab') + r.group;
    var g = DATA.grids[key];
    if (!g) throw new Error('Soluna: no price grid ' + key);   // catches solar4
    return g;
  }

  // Top treatment: header id + the three fascia dials (shape / material / size).
  function normHeader(o, dual) {
    var id = o.header || D.header;
    var spec = { shape: nz(o.shape, null), material: nz(o.material, null), size: nz(o.size, null) };
    var a = DATA.headerAliases[id];
    if (a) {
      id = a.header;
      ['shape', 'material', 'size'].forEach(function (k) { if (spec[k] == null) spec[k] = a[k]; });
    }
    if (id === 'fascia') {
      if (dual) {
        if (spec.shape == null)    spec.shape    = D.dualForces.shape;
        if (spec.material == null) spec.material = D.dualForces.material;
        if (spec.size == null)     spec.size     = D.dualForces.size;
      } else {
        if (spec.material == null) spec.material = D.fasciaMaterial;
        if (spec.size == null)     spec.size     = D.fasciaSize.single;
      }
      if (spec.shape == null) spec.shape = D.fasciaShape;
    } else if (id === 'wood') {
      spec.shape = null; spec.material = 'wood'; spec.size = 4.5;
    } else {
      spec.shape = spec.material = spec.size = null;
    }
    return { id: id, spec: spec };
  }

  function headerRow(id, spec) {
    return id === 'fascia' ? (HDR.fascia.rowBy[spec.material] || {})[String(spec.size)] : HDR[id].row;
  }

  function headerPrice(id, spec, valanceWidth) {
    var H = HDR[id];
    if (H.pricing === 'none') return 0;
    if (H.pricing === 'flat') return H.amt;
    var row = DATA.valance[headerRow(id, spec)].row;
    if (valanceWidth <= 144) return row[cellIndex(valanceWidth, DATA.axes.valanceWidths)];
    var extendable = id === 'fascia' ? true : H.extraFoot;
    if (!extendable || row[row.length - 1] == null) return null;
    return row[row.length - 1] + DATA.extraFoot.amount * Math.ceil((valanceWidth - 144) / 12);
  }

  // Raceway: off each bracket assembly's SHADE width, on the treatments in `appliesTo`.
  function racewayPrice(id, widths, appliesTo) {
    if (appliesTo.indexOf(id) === -1) return { amt: 0, each: 0 };
    var row = DATA.valance.race.row, amt = 0, each = 0;
    for (var i = 0; i < widths.length; i++) {
      var p = row[cellIndex(widths[i], DATA.axes.valanceWidths)];
      if (p == null) return null;
      amt += p; if (i === 0) each = p;
    }
    return { amt: amt, each: each };
  }

  function norman(id, spec) {
    if (id === 'fascia') {
      if (spec.shape === 'curved') return spec.material === 'fabric' ? 'Curved Fascia with Fabric' : 'Curved Fascia (Plain)';
      if (spec.material === 'metal') return 'Square Fascia';
      return spec.size === 8 ? 'Fabric Valance 8"' : 'Fabric Valance';
    }
    return { race: 'Raceway only', none: 'Open roll', wood: 'Modern Wood Valance', cassette: 'Cassette system', lg360: 'LightGuard 360' }[id];
  }

  // Error precedence is fixed so a multi-error order is deterministic.
  function validate(o, id, spec, sizes) {
    var errs = [], adds = o.addons || {};
    var n = o.shades.length, coup = o.coupledCount || 0, dual = n === 2 && !coup;
    var offGrid = sizes.some(function (s) { return cellIndex(s.w, DATA.axes.widths) < 0 || cellIndex(s.h, DATA.axes.heights) < 0; });
    if (offGrid) errs.push('OFF_GRID: grids stop at 120" wide and 144" high');
    if (sizes.some(function (s) { return s.w > 118; })) errs.push('OVER_MAX_WIDTH: 118" is the single-shade maximum');
    o.shades.forEach(function (sp, i) {
      var f = BY[sp.collection], fw = fabricWidth(f, sp.code);
      if (sizes[i].w > fw) errs.push('OVER_FABRIC_WIDTH: ' + sp.collection + ' runs ' + fw + '"');
    });
    if (o.cordless !== false) {
      for (var k = 0; k < sizes.length; k++) {
        if (sizes[k].h > cordlessMax(sizes[k].w)) {
          errs.push('CORDLESS_LIMIT: ' + sizes[k].w + '" wide cordless maxes at ' + cordlessMax(sizes[k].w) + '" long');
          break;
        }
      }
    }
    if (o.door && id === 'lg360' && (o.mount || 'IM') !== 'OM')
      errs.push('MOUNT_REQUIRED: a door shade with LightGuard 360 must be ordered outside mount');
    if (id === 'fascia') {
      if (spec.material !== 'metal' && spec.material !== 'fabric')
        errs.push("NOT_OFFERED: a fascia is metal or fabric-wrapped, not '" + spec.material + "'");
      else if (spec.shape !== 'curved' && spec.shape !== 'square')
        errs.push("NOT_OFFERED: a fascia is curved or square, not '" + spec.shape + "'");
      else if (!dual) {
        var ok = DATA.sizes.byShapeMaterial[spec.shape][spec.material];
        if (ok.indexOf(spec.size) === -1)
          errs.push('SIZE_NOT_AVAILABLE: a ' + spec.shape + ' ' + (spec.material === 'fabric' ? 'fabric-wrapped' : 'metal') +
                    ' fascia comes in ' + ok.map(inch).join(' and ') + ' — not ' + inch(spec.size));
      }
    }
    if (o.endCapColor && !HDR[id].endCaps) errs.push('NOT_OFFERED: ' + HDR[id].label + ' takes no end caps');
    if (o.hardwareFinish) {
      if (!adds.pole) errs.push('NOT_OFFERED: a hardware finish only applies when premium hardware is selected');
      else if (DATA.premiumHardware.finishes.indexOf(o.hardwareFinish) === -1)
        errs.push('NOT_OFFERED: premium hardware comes in ' + DATA.premiumHardware.finishes.join(', '));
    }
    Object.keys(adds).forEach(function (s) { if (!SUR[s]) errs.push('NOT_OFFERED: ' + s); });
    if (dual && (id === 'cassette' || id === 'lg360'))
      errs.push('INVALID_COMBO: ' + HDR[id].label + ' is a single-shade system — never a dual');
    else if (dual && (id !== 'fascia' || spec.shape !== 'square' || spec.material !== 'fabric' || spec.size !== 8))
      errs.push('INVALID_COMBO: a dual shade always takes the square 8" fabric-wrapped valance');
    if (id === 'cassette' || id === 'lg360') {
      if (n > 1) errs.push('INVALID_COMBO: ' + HDR[id].label + ' is single-shade only');
      DATA.compatibility[id].blockedSurcharges.forEach(function (s) {
        if (adds[s]) errs.push('INVALID_COMBO: ' + SUR[s].label + ' not available with ' + HDR[id].label);
      });
    }
    if (adds.pole) {
      if (id !== 'none') errs.push('INVALID_COMBO: premium hardware is for open-roll shades only — no fascia, valance or raceway');
      if (n > 1) errs.push('INVALID_COMBO: premium hardware is single-shade only');
    }
    if (dual) {
      var bo = o.shades.filter(function (sp) {
        return BY[resolve(sp.collection, sp.blackout).from].opacity === 'Room Darkening';
      }).length;
      if (bo === 0) errs.push('INVALID_DUAL: a dual needs one blackout layer — neither layer is a blackout');
      if (bo === 2) errs.push('INVALID_DUAL: a dual never has two blackout layers');
    }
    o.shades.forEach(function (sp) {
      if (resolve(sp.collection, sp.blackout).rule === 'NO_BLACKOUT_PRODUCT')
        errs.push('NO_BLACKOUT_PRODUCT: no room-darkening version of any ' + BY[sp.collection].opacity.toLowerCase());
    });
    return errs;
  }

  function quote(o, opts) {
    opts = opts || {};
    var qty = o.qty || 1;
    var n = o.shades.length, coup = o.coupledCount || 0, dual = n === 2 && !coup;
    var sizes = o.shades.map(function (sp) { return { w: nz(sp.width, o.width), h: nz(sp.height, o.height) }; });
    var hs = normHeader(o, dual), id = hs.id, spec = hs.spec;
    var errors = validate(o, id, spec, sizes);
    if (errors.length) return { errors: errors };

    var blocked = (DATA.compatibility[id] && DATA.compatibility[id].blockedSurcharges) || [];
    var adds = {};
    Object.keys(o.addons || {}).forEach(function (k) { adds[k] = o.addons[k]; });
    ALWAYS.forEach(function (s) { if (!adds[s]) adds[s] = 1; });                       // premium hem bar
    if (o.door && o.doorMagnets !== false && !adds.mag && blocked.indexOf('mag') === -1) adds.mag = 1;

    var priced = o.shades.map(function (sp, i) {
      var r = resolve(sp.collection, sp.blackout);
      var ci = cellIndex(sizes[i].w, DATA.axes.widths), ri = cellIndex(sizes[i].h, DATA.axes.heights);
      var base = gridFor(r)[ri][ci];
      return { collection: sp.collection, code: sp.code || null, blackout: !!sp.blackout, rule: r.rule,
               from: r.from, chart: r.chart, group: r.group, uplift: r.uplift,
               gridPrice: base, price: r2(base * (1 + r.uplift)) };
    });
    var shadeSubtotal = r2(priced.reduce(function (t, p) { return t + p.price; }, 0) * qty);

    var head = headerPrice(id, spec, nz(o.valanceWidth, o.width));
    if (head == null) return { errors: ['HEADER_NA'] };
    // one raceway per bracket assembly: a dual is one, coupled shades are one each
    var rwWidths = dual ? [sizes[0].w] : sizes.map(function (s) { return s.w; });
    var rw = racewayPrice(id, rwWidths, opts.racewayOn || DATA.raceway.appliesTo);
    if (rw == null) return { errors: ['RACEWAY_NA'] };

    function amt(s, q) { return SUR[s].amt * (q > 1 ? q : 1); }
    function byPer(per) {
      return Object.keys(adds).filter(function (s) { return SUR[s].per === per; })
        .reduce(function (t, s) { return t + amt(s, adds[s]); }, 0);
    }
    var unit = (dual ? DATA.dual.surcharge : 0) + (coup ? SUR.coup.amt * (coup - 1) : 0);
    var optionsSubtotal = r2((rw.amt + head + byPer('shade') * n + byPer('each') + unit) * qty);

    var units = qty * n;                       // freight counts individual shades
    var wide = sizes.some(function (s) { return s.w >= DATA.freight.wideThresholdWidthInches; });
    var fr = wide ? DATA.freight.wide : DATA.freight.standard;
    var freight = o.freight === false ? 0 : r2(fr.first + fr.each * Math.max(0, units - 1));

    var L = DATA.pricingLadder;
    var disc = opts.discount != null ? opts.discount : L.clientFacing.discount;
    var base = r2(shadeSubtotal + optionsSubtotal);
    var clientDiscount = r2(base * disc);
    var clientSubtotal = r2(base - clientDiscount);
    return {
      shades: priced, shadeCount: n, dual: dual, coupledCount: coup, qty: qty,
      header: id, headerLabel: HDR[id].label, normanProduct: norman(id, spec),
      shape: spec.shape, material: spec.material, size: spec.size,
      headerPrice: head, raceway: rw.amt, racewayEach: rw.each, racewayUnits: rwWidths.length,
      addons: adds,
      premiumHardware: adds.pole ? { amount: SUR.pole.amt, finish: o.hardwareFinish || DATA.premiumHardware.defaultFinish } : null,
      endCaps: HDR[id].endCaps ? { asked: o.endCapColor != null, color: o.endCapColor || D.endCapColor, charge: 0 } : null,
      shadeSubtotal: shadeSubtotal, optionsSubtotal: optionsSubtotal, freight: freight, wideFreight: wide,
      discountableRetail: base, clientDiscountPct: disc, clientDiscount: clientDiscount,
      clientSubtotal: clientSubtotal, clientTotal: r2(clientSubtotal + freight),
      retailTotal: r2(base + freight)
    };
  }

  root.SolunaEngine = {
    quote: quote, resolve: resolve, cellIndex: cellIndex, cordlessMax: cordlessMax,
    fabricWidth: fabricWidth, byCollection: BY, surcharges: SUR, headers: HDR, data: DATA
  };
})(typeof window !== 'undefined' ? window : globalThis);
