/* يجعل الموقع قابلاً للتثبيت ويعمل حتى بدون إنترنت للصفحات التي فُتحت من قبل */
var CACHE = "arcyber-v5";
var CORE = ["./", "index.html", "level.html", "style.css?v=5", "data.js?v=5", "app.js?v=5", "favicon.png", "icons/red-192.png", "assets/logo-base.webp", "assets/logo-needle.webp", "assets/logo-small-base.webp", "assets/logo-small-needle.webp"];
self.addEventListener("install", function (e) { e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(CORE); })); self.skipWaiting(); });
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); }));
  self.clients.claim();
});
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(fetch(e.request).then(function (r) {
    if (r.ok && new URL(e.request.url).origin === location.origin) { var copy = r.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, copy); }); }
    return r;
  }).catch(function () { return caches.match(e.request, { ignoreSearch: e.request.mode === "navigate" }); }));
});
