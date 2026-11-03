// Galería Gato — service worker. Sube CACHE_VERSION al publicar cambios.
const CACHE_VERSION = 'v1';
const SHELL = 'gg-shell-' + CACHE_VERSION;
const RUNTIME = 'gg-cdn-v1'; // librerías versionadas (inmutables): se conservan entre versiones
const SHELL_FILES = ['./', './index.html', './manifest.json', './favicon.png',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png', './icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL).then(c => c.addAll(SHELL_FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('gg-shell-') && k !== SHELL).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Página: red primero (para recibir actualizaciones), caché si no hay conexión
  if (req.mode === 'navigate' || (url.origin === location.origin && /\/(index\.html)?$/.test(url.pathname))) {
    e.respondWith(fetch(req).then(r => { if (r.ok) { const c = r.clone(); caches.open(SHELL).then(ca => ca.put('./index.html', c)); } return r; })
      .catch(() => caches.match('./index.html', {ignoreSearch: true})));
    return;
  }
  // Librerías y modelos de rostros del CDN: caché primero
  if (url.hostname === 'cdn.jsdelivr.net') {
    e.respondWith(caches.open(RUNTIME).then(c => c.match(req).then(hit => hit || fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; }))));
    return;
  }
  // Archivos propios: caché primero, luego red
  if (url.origin === location.origin) {
    e.respondWith(caches.match(req, {ignoreSearch: true}).then(hit => hit || fetch(req)));
  }
  // El modelo de quitar fondo (huggingface) se guarda aparte en IndexedDB.
});
