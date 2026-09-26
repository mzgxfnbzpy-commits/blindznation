// Basic Roller Shades — pricing engine (house line, not Norman).
//
// A port of the reference implementation printed in the Basic Roller rule book (§11),
// run against BASIC_DATA (js/pages/basic-roller-data.js, generated from the same book).
// tools/basic-roller-engine-test.js replays the book's 26 test vectors through this file.
//
// Rules (rule book rev 2, Sept 2026):
//   · shade = Norman Solar Screen group 1 grid, rounding UP on each axis; below the first
//     column/row clamps up; past the last is OFF_GRID (factory quote).
//   · blackout = the same cell + 20%, rounded to the whole dollar.
//   · fascia (4″ metal square) = fascia row 1 by width, on top of the shade. No raceway.
//   · manual = chain clutch (silver), left/right free. NO cordless on this line.
//   · motorized: Somfy or Automate by Rollease price the same; Lutron is a REFERRAL (no price).
//     Power per shade (battery $450 / hardwired $550); remote, chargers, hubs, repeaters
//     per ORDER at the chosen quantity.
//   · freight by the widest shade: ≤80″ $35+$15 · ≤120″ $100+$65 · >120″ $200+$65. Never discounted.
//   · client = retail × (1 − discount) + freight. Discount 25% (Justin 2026-09-25; the book
//     says 30%) — read from BASIC_DATA.pricingLadder.
(function (root) {
  var B = root.BASIC_DATA;
  if (!B) return;
  function r2(n) { return Math.round(n * 100) / 100; }
  function cellIndex(v, axis) { for (var i = 0; i < axis.length; i++) if (v <= axis[i]) return i; return -1; }
  function freightTier(widest) {
    for (var i = 0; i < B.freight.tiers.length; i++) { var t = B.freight.tiers[i]; if (t.maxWidth === null || widest <= t.maxWidth) return t; }
  }
  function find(list, id) { for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i]; return null; }

  function quote(o, opts) {
    opts = opts || {};
    var errs = [];
    var qty = o.qty || 1, width = o.width, height = o.height;
    var top = o.topTreatment || B.topTreatment.default;
    var lift = o.lift || B.lift.default;
    var power = o.power || B.lift.motorized.power.default;
    var blackout = !!o.blackout;
    var M = B.lift.motorized;

    var ci = cellIndex(width, B.axes.widths), ri = cellIndex(height, B.axes.heights);
    if (ci < 0 || ri < 0) errs.push('OFF_GRID: the chart runs 24"–120" wide and 36"–144" high');
    if (!blackout && o.openness && B.fabric.solar.openness.indexOf(o.openness) === -1) errs.push('NOT_OFFERED: openness ' + o.openness);
    var palette = blackout ? B.fabric.blackout.colors : B.fabric.solar.colors;
    if (o.color && palette.indexOf(o.color) === -1) errs.push('NOT_OFFERED: ' + (blackout ? 'blackout' : 'solar') + ' does not come in ' + o.color);
    if (top === 'fascia' && o.fasciaColor && B.topTreatment.fascia.colors.indexOf(o.fasciaColor) === -1) errs.push('NOT_OFFERED: fascia colour ' + o.fasciaColor);
    if (o.endCaps && top !== 'fascia') errs.push('NOT_OFFERED: end caps need a fascia');
    var accessoriesAsked = !!(o.remote || o.chargers || o.hubs || o.repeaters);
    if (lift === 'motorized') {
      var brand = o.brand;
      if (brand === M.brands.referral.name) errs.push('REFERRAL: Lutron is not priced online — take the request and call the customer');
      else if (brand && M.brands.quotable.indexOf(brand) === -1) errs.push('NOT_OFFERED: motor brand ' + brand);
      if (!find(M.power.options, power)) errs.push('NOT_OFFERED: power option ' + power);
      if (o.remote && !find(M.remote.options, o.remote)) errs.push('NOT_OFFERED: remote ' + o.remote);
    } else {
      if (accessoriesAsked) errs.push('NOT_OFFERED: remotes, chargers, hubs and repeaters are motorized only');
      var side = o.chainSide || 'right';
      if (B.lift.manual.chainSide.values.indexOf(side) === -1) errs.push('NOT_OFFERED: chain side ' + side);
    }
    if (errs.length) return { errors: errs };

    var gridPrice = B.grid[ri][ci];
    var shade = blackout ? Math.round(gridPrice * (1 + B.blackoutUplift)) : gridPrice;
    var shadeSubtotal = r2(shade * qty);
    var fascia = top === 'fascia' ? B.fasciaRow[cellIndex(o.fasciaWidth != null ? o.fasciaWidth : width, B.axes.valanceWidths)] : 0;

    var motorEach = 0, lines = [];
    if (lift === 'motorized') {
      var pw = find(M.power.options, power);
      motorEach = pw.amount;
      lines.push(pw.label + ' $' + pw.amount + ' × ' + qty);
    }
    var perShadeSubtotal = r2((fascia + motorEach) * qty);

    var accessories = 0;
    if (lift === 'motorized') {
      var add = function (label, amt, n) { accessories += amt * n; lines.push(n + ' × ' + label + ' $' + amt); };
      if (o.remote) { var rm = find(M.remote.options, o.remote); add(rm.label, rm.amount, o.remoteQty || 1); }
      if (o.chargers) add(M.charger.label, M.charger.amount, o.chargers);
      if (o.hubs) add(M.hub.label, M.hub.amount, o.hubs);
      if (o.repeaters) add(M.repeater.label, M.repeater.amount, o.repeaters);
    }
    var optionsSubtotal = r2(perShadeSubtotal + accessories);

    var tier = freightTier(o.widestWidth != null ? o.widestWidth : width);
    var freight = o.freight === false ? 0 : r2(tier.first + tier.each * Math.max(0, qty - 1));

    var disc = opts.discount != null ? opts.discount : B.pricingLadder.clientDiscount;
    var base = r2(shadeSubtotal + optionsSubtotal);
    var clientDiscount = r2(base * disc);
    var clientSubtotal = r2(base - clientDiscount);
    return {
      cell: B.axes.widths[ci] + '×' + B.axes.heights[ri],
      gridPrice: gridPrice, blackout: blackout, shade: shade, shadeSubtotal: shadeSubtotal,
      topTreatment: top, fascia: fascia, lift: lift,
      motorEach: motorEach, perShadeSubtotal: perShadeSubtotal, accessories: accessories, lines: lines,
      optionsSubtotal: optionsSubtotal, freightTier: tier.label, freight: freight,
      discountableRetail: base, clientDiscountPct: disc, clientDiscount: clientDiscount, clientSubtotal: clientSubtotal,
      clientTotal: r2(clientSubtotal + freight), retailTotal: r2(base + freight),
      cost: r2(base * B.pricingLadder.costFactor + freight)
    };
  }

  root.BasicEngine = { quote: quote, cellIndex: cellIndex, data: B };
})(typeof window !== 'undefined' ? window : globalThis);
