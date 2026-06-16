// IMPORTANTE: Cada vez que subas cambios a GitHub, cambia este nombre
// Por ejemplo, la próxima vez pon 'ob-wheel-v2', luego 'ob-wheel-v3', etc.
const CACHE_NAME = 'ob-wheel-v1'; 

const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(cacheName => {
        // Borramos las cachés antiguas si el nombre no coincide
        if (cacheName !== CACHE_NAME) return caches.delete(cacheName);
      })
    ))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// NUEVO: Escuchar el mensaje de la aplicación para forzar la actualización
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});