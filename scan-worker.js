/* Data never leaves device. */
importScripts('./zxing.min.js', './scanner-engine.js');
self.onmessage = function(event) {
  const {id, data, width, height, profile} = event.data;
  try {
    const {results, tries} = self.ScannerEngine.scan(new Uint8ClampedArray(data), width, height, profile);
    self.postMessage({id, results, tries});
  } catch (err) {
    self.postMessage({id, error: String(err && err.message || err)});
  }
};
