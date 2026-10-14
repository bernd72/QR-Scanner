importScripts('./zxing.min.js','./scanner-engine.js');
self.onmessage = e => {
 const {id,data,width,height,profile}=e.data;
 try {const answer=self.ScannerEngine.scan(new Uint8ClampedArray(data),width,height,profile);self.postMessage({id,...answer});}
 catch(err){self.postMessage({id,error:String(err?.message||err)});}
};
