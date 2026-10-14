// Amerikano Pointtæller - offline cache
const CACHE = 'amerikano-v2';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('amerikano-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function store(key, res) {
  if (res && !res.redirected && (res.ok || res.type === 'opaque')) {
    const copy = res.clone();
    caches.open(CACHE).then((c) => c.put(key, copy));
  }
  return res;
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (url.origin !== self.location.origin && !isFont) return;

  // The app page: answer from cache at once (works offline and on poor signal), refresh it in the background.
  if (req.mode === 'navigate') {
    e.respondWith(
      caches.match('./index.html').then((hit) => {
        const net = fetch(req).then((res) => store('./index.html', res)).catch(() => hit);
        return hit || net;
      })
    );
    return;
  }

  // Icons, manifest and fonts: cache first, update in the background.
  e.respondWith(
    caches.match(req).then((hit) => {
      const net = fetch(req).then((res) => store(req, res)).catch(() => hit);
      return hit || net;
    })
  );
});
