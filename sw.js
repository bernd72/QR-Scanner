const CACHE='qr-offline-v1.0';
const ASSETS=['./index.html','./zxing.min.js','./scanner-engine.js','./scan-worker.js','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png','./icon-1024.png'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('qr-offline-')&&k!==CACHE).map(k=>caches.delete(k)))),self.clients.claim()])));
self.addEventListener('fetch',e=>{
 const req=e.request;if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
 if(req.mode==='navigate'){
  e.respondWith(fetch(req,{cache:'no-store'}).then(r=>{if(r.ok){const copy=r.clone();e.waitUntil(caches.open(CACHE).then(c=>c.put('./index.html',copy)))}return r}).catch(()=>caches.match('./index.html')));
 }else{
  e.respondWith(caches.match(req,{ignoreSearch:true}).then(r=>r||fetch(req)));
 }
});
