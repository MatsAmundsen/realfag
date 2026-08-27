/* Vanilla-bro: Safari og gamle faner laster denne fra b/{versjon}/app.js */
(function () {
  var BUILD = "2026-08-27-safari";
  try {
    if (document.querySelector('meta[name="mg-build"]')) return;
  } catch (e) {}
  function go() {
    try {
      var u = new URL(location.href);
      if (u.pathname.indexOf("/b/") === 0) {
        u.pathname = "/";
      }
      u.searchParams.set("v", BUILD);
      u.searchParams.set("mg", String(Date.now()));
      location.replace(u.pathname + u.search + u.hash);
    } catch (err) {
      location.replace("/?v=" + BUILD + "&mg=" + Date.now());
    }
  }
  var jobs = [];
  try {
    if ("serviceWorker" in navigator) {
      jobs.push(
        navigator.serviceWorker.getRegistrations().then(function (regs) {
          return Promise.all(regs.map(function (r) { return r.unregister(); }));
        }),
      );
    }
    if (window.caches) {
      jobs.push(
        caches.keys().then(function (keys) {
          return Promise.all(keys.map(function (k) { return caches.delete(k); }));
        }),
      );
    }
  } catch (e) {}
  Promise.all(jobs).then(go, go);
})();
