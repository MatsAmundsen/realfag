/* mg-build: 2026-08-27-safari
   Network-first for HTML, deretter avinstaller. Safari kan holde en
   gammel worker i opptil et døgn hvis den aldri treffer nettverket. */
self.addEventListener("install", function () {
  self.skipWaiting();
});

self.addEventListener("fetch", function (event) {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request, { cache: "reload" }).catch(function () {
        return fetch(event.request);
      }),
    );
  }
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches
      .keys()
      .then(function (keys) {
        return Promise.all(keys.map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
      .then(function () { return self.registration.unregister(); }),
  );
});
