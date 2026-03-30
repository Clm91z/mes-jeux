const CACHE_NAME = 'mes-jeux-v1';
const URLS_TO_CACHE = [
  '/mes-jeux/',
  '/mes-jeux/index.html',
  '/mes-jeux/jeu_serpent/index.html',
  '/mes-jeux/bataille_boule_neige/index.html',
  '/mes-jeux/jeu_kart/index.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
