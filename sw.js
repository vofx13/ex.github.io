const CACHE_NAME = 'silver-digital-v1';
const urlsToCache = ['index.html', 'manifest.json'];

// Cài đặt Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Chấp nhận các yêu cầu khi offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// Lắng nghe sự kiện Push thông báo (Nếu sau này bạn nâng cấp lên server)
self.addEventListener('push', event => {
  const options = {
    body: event.data.text(),
    icon: 'https://cdn-icons-png.flaticon.com/512/883/883356.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/883/883356.png'
  };
  event.waitUntil(self.registration.showNotification('NHẮC THUỐC', options));
});