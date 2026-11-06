// IDA-COURS PWA Service Worker (Network First / Auto-bust Cache)
const CACHE_NAME = 'ida-cours-v' + Date.now();

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => caches.delete(key)));
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  // Always fetch fresh network content
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
