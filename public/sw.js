/* mg-build: 2026-08-27-layout
   Matteguiden: do not cache, and NEVER reload the page.
   An older build called clients.navigate() here, which made the
   preview (and Live) blink forever. This worker only clears leftover
   caches and then uninstalls itself. */
self.addEventListener("install", function () {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches
      .keys()
      .then(function (keys) {
        return Promise.all(
          keys.map(function (k) {
            return caches.delete(k);
          }),
        );
      })
      .then(function () {
        return self.clients.claim();
      })
      .then(function () {
        return self.registration.unregister();
      }),
  );
});
