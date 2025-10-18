// Service Worker mit Offline + Push Notifications (PWABuilder)

const CACHE = "pwabuilder-offline-page";

// Offline-Seite
const offlineFallbackPage = "offline.html";

// Workbox importieren
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

// Skip waiting beim Update
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Install Event: Offline-Seite cachen
self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.add(offlineFallbackPage))
  );
});

// Navigation Preload aktivieren
if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

// Workbox Route für Stale-While-Revalidate
workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE
  })
);

// Fetch Event: Offline-Seite fallback
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;
        if (preloadResp) return preloadResp;

        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {
        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        return cachedResp;
      }
    })());
  }
});

// Push Notifications
self.addEventListener('push', event => {
  const data = event.data?.json() || {
    title: 'AniPortal Update',
    body: 'Neue Inhalte verfügbar!',
    url: '/'
  };

  const options = {
    body: data.body,
    icon: 'logo-webgame-192x192.png',
    badge: 'logo-webgame-192x192.png',
    data: { url: data.url },
    actions: [
      { action: 'open', title: 'Öffnen' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification Click Event
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
