/* Matteguiden: ikke cache. Avinstaller deg selv og last inn fersk side. */
self.addEventListener("install", function () {
  self.skipWaiting();
});
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches
      .keys()
      .then(function (keys) {
        return Promise.all(keys.map(function (k) { return caches.delete(k); }));
      })
      .then(function () {
        return self.clients.claim();
      })
      .then(function () {
        return self.registration.unregister();
      })
      .then(function () {
        return self.clients.matchAll({ type: "window" });
      })
      .then(function (clients) {
        return Promise.all(
          clients.map(function (c) {
            var url = c.url || "/";
            try {
              var u = new URL(url, self.location.origin);
              u.searchParams.set("mg", String(Date.now()));
              return c.navigate(u.pathname + u.search + u.hash);
            } catch (e) {
              return c.navigate(url);
            }
          })
        );
      })
  );
});
