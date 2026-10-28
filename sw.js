const CACHE='ciao-app-v117';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg','./apple-touch-icon.png'];
self.addEventListener('install',event=>event.waitUntil((async()=>{const cache=await caches.open(CACHE);await cache.addAll(ASSETS);await self.skipWaiting()})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)));await self.clients.claim()})()));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).pathname.includes('/api/'))return;
 const isPage=event.request.mode==='navigate'||new URL(event.request.url).pathname.endsWith('/index.html')||new URL(event.request.url).pathname.endsWith('/');
 if(isPage){event.respondWith((async()=>{try{const response=await fetch(event.request,{cache:'no-store'});if(response.ok){const cache=await caches.open(CACHE);cache.put(event.request,response.clone());cache.put('./index.html',response.clone())}return response}catch(error){return await caches.match(event.request)||await caches.match('./index.html')}})());return}
 event.respondWith(caches.match(event.request).then(response=>response||fetch(event.request).catch(()=>caches.match('./index.html')))
});