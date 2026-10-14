/* QR & Data Matrix – offline detection engine. Uses bundled @zxing/library UMD. */
(function (root, make) {
  const api = make(root.ZXing || (typeof require === 'function' ? require('./zxing.min.js') : null));
  root.ScannerEngine = api;
  if (typeof module === 'object' && module.exports) module.exports = api;
})(typeof self !== 'undefined' ? self : globalThis, function (ZX) {
  'use strict';
  if (!ZX) throw new Error('ZXing konnte nicht geladen werden');
  const FORMAT_IDS = [ZX.BarcodeFormat.QR_CODE, ZX.BarcodeFormat.DATA_MATRIX];
  const hints = new Map([
    [ZX.DecodeHintType.POSSIBLE_FORMATS, FORMAT_IDS],
    [ZX.DecodeHintType.TRY_HARDER, true],
  ]);
  const reader = new ZX.MultiFormatReader();
  reader.setHints(hints);
  const pureHints = new Map([...hints, [ZX.DecodeHintType.PURE_BARCODE, true]]);
  const pureReader = new ZX.MultiFormatReader();
  pureReader.setHints(pureHints);
  let tries = 0;

  function fromRGBA(pixels, width, height) {
    const gray = new Uint8ClampedArray(width * height);
    for (let p = 0, j = 0; j < gray.length; j++, p += 4) {
      gray[j] = Math.round(pixels[p] * .299 + pixels[p + 1] * .587 + pixels[p + 2] * .114);
    }
    return gray;
  }
  function region(gray, W, H, x, y, w, h, scale, border, invert) {
    const tw = Math.round(w * scale), th = Math.round(h * scale);
    if (tw < 18 || th < 18 || tw > 2600 || th > 2600) return null;
    const pad = border ? Math.max(8, Math.ceil(Math.min(tw, th) * .07)) : 0;
    const dw = tw + 2 * pad, dh = th + 2 * pad;
    const out = new Uint8ClampedArray(dw * dh);
    out.fill(invert ? 0 : 255);
    const nearest = scale > 1;
    for (let ty = 0; ty < th; ty++) {
      const sy = Math.min(H - 1, Math.floor(y + (ty + .5) / scale));
      const fromRow = sy * W;
      const toRow = (ty + pad) * dw + pad;
      for (let tx = 0; tx < tw; tx++) {
        const sx = Math.min(W - 1, Math.floor(x + (tx + .5) / scale));
        const v = gray[fromRow + sx];
        out[toRow + tx] = invert ? 255 - v : v;
      }
    }
    return { gray: out, w: dw, h: dh, pad, scale, x, y };
  }
  function decodeOne(item, useGlobal, pure) {
    tries++;
    const source = new ZX.RGBLuminanceSource(item.gray, item.w, item.h);
    const bin = useGlobal ? new ZX.GlobalHistogramBinarizer(source) : new ZX.HybridBinarizer(source);
    const bitmap = new ZX.BinaryBitmap(bin);
    const d = pure ? pureReader : reader;
    try {
      d.reset();
      const res = d.decodeWithState(bitmap);
      const points = (res.getResultPoints() || []).map(p => ({x: (p.getX() - item.pad) / item.scale + item.x, y: (p.getY() - item.pad) / item.scale + item.y}));
      return {
        value: res.getText(),
        format: res.getBarcodeFormat() === ZX.BarcodeFormat.DATA_MATRIX ? 'Data Matrix' : 'QR-Code',
        points,
      };
    } catch (_) { return null; }
  }
  function looksSame(a, b) {
    if (a.value !== b.value || a.format !== b.format) return false;
    if (!a.points.length || !b.points.length) return true;
    const p = a.points[0], q = b.points[0];
    return Math.hypot(p.x - q.x, p.y - q.y) < 35;
  }
  function scan(rgba, W, H, profile = 'image') {
    if (rgba.length !== W * H * 4) throw new Error('Ungültige Bilddaten');
    tries = 0;
    const gray = fromRGBA(rgba, W, H);
    const results = [];
    const camera = String(profile).startsWith('camera');
    const phase = camera ? (Number(String(profile).split('-')[1]) || 0) % 12 : 0;
    // Image: full native data first; Camera: brief work per frame to stay responsive.
    const maxAttempts = camera ? 46 : 1400;
    function probe(x, y, w, h, extra = false) {
      if (tries >= maxAttempts || results.length >= 10 || w < 24 || h < 24) return;
      const scale = Math.min(1, 2000 / Math.max(w, h));
      const base = region(gray, W, H, x, y, w, h, scale, false, false);
      if (!base) return;
      function add(res) {
        if (res && !results.some(old => looksSame(old, res))) results.push(res);
        return !!res;
      }
      if (add(decodeOne(base, false, false))) return;
      if (results.length) return;
      if (extra) {
        if (add(decodeOne(base, true, false))) return;
        if (tries >= maxAttempts) return;
        const upscale = Math.min(3, 950 / Math.max(w, h));
        if (upscale >= 1.25) {
          const enlarged = region(gray, W, H, x, y, w, h, upscale, true, false);
          if (enlarged) {
            if (add(decodeOne(enlarged, false, false))) return;
            if (add(decodeOne(enlarged, false, true))) return;
          }
        }
        if (tries < maxAttempts) {
          const padded = region(gray, W, H, x, y, w, h, scale, true, false);
          if (padded && add(decodeOne(padded, false, false))) return;
        }
      }
    }
    // For cameras, start at center then whole frame. For pictures, keep full image first.
    if (camera) {
      for (const n of [.25,.55]) {
        probe(Math.floor(W * (1 - n) / 2), Math.floor(H * (1 - n) / 2), Math.round(W * n), Math.round(H * n), true);
        if (results.length) return {results,tries};
      }
    }
    probe(0, 0, W, H, !camera);
    if (results.length && camera) return {results, tries};
    // Square windows (not tall portrait tiles) give Data Matrix a fair quiet margin.
    // The overlap also prevents symbols that straddle tile borders being missed.
    if (camera) {
      // Progressive grid over four consecutive frames; catches off-center codes
      // without performing an expensive exhaustive search on every camera frame.
      const side = Math.round(Math.min(W, H) * .22), cols=16, rows=9;
      for (let r=0;r<rows;r++) for(let c=0;c<cols;c++) {
        if ((r*cols+c)%12!==phase || tries>=maxAttempts || results.length>=10) continue;
        const x=Math.round((W-side)*c/(cols-1)),y=Math.round((H-side)*r/(rows-1));
        probe(x,y,side,side,false);
      }
    } else {
      const sizes = [0.9, 0.55, 0.33, 0.20, 0.12].map(f => Math.min(W,H) * f);
      for (const s0 of sizes) {
        if (tries >= maxAttempts || results.length >= 10) break;
        const side = Math.max(75, Math.round(s0));
        const nx = Math.max(1, Math.ceil((W - side) / (side * .55)) + 1);
        const ny = Math.max(1, Math.ceil((H - side) / (side * .55)) + 1);
        for (let row = 0; row < ny; row++) {
          for (let col = 0; col < nx; col++) {
            if (tries >= maxAttempts || results.length >= 10) break;
            const x = nx === 1 ? 0 : Math.round((W - side) * col / (nx - 1));
            const y = ny === 1 ? 0 : Math.round((H - side) * row / (ny - 1));
            probe(x,y,Math.min(side,W),Math.min(side,H), true);
          }
          if (tries >= maxAttempts || results.length >= 10) break;
        }
      }
    }
    return {results, tries};
  }
  return {scan};
});
