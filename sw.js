// Service Worker for Khedapati Sarkar Mandir Website
// Enables offline functionality and PWA capabilities

const CACHE_NAME = 'khedapati-sarkar-mandir-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Kalam:wght@300;400;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('🙏 Temple website cached successfully');
                return cache.addAll(urlsToCache);
            })
            .catch(function(error) {
                console.log('Cache failed:', error);
            })
    );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // Clone the request because it's a stream
                var fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    function(response) {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response because it's a stream
                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
            .catch(function() {
                // Offline fallback
                return caches.match('/index.html');
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Background sync for form submissions when offline
self.addEventListener('sync', function(event) {
    if (event.tag === 'puja-booking-sync') {
        event.waitUntil(
            // Handle offline puja booking submissions
            handleOfflinePujaBooking()
        );
    }
});

function handleOfflinePujaBooking() {
    // Retrieve offline submissions from IndexedDB and sync when online
    return new Promise((resolve, reject) => {
        // This would integrate with IndexedDB to store offline form submissions
        // and sync them when the device comes back online
        console.log('🙏 Syncing offline puja bookings...');
        resolve();
    });
}

// Push notifications for aarti reminders
self.addEventListener('push', function(event) {
    if (event.data) {
        const pushData = event.data.json();
        
        const options = {
            body: pushData.body || '🙏 Temple aarti is starting soon',
            icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🕉️</text></svg>',
            badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🪔</text></svg>',
            vibrate: [200, 100, 200],
            tag: 'aarti-reminder',
            requireInteraction: true,
            actions: [
                {
                    action: 'join-darshan',
                    title: 'Join Live Darshan',
                    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">📹</text></svg>'
                },
                {
                    action: 'dismiss',
                    title: 'Dismiss',
                    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">✖️</text></svg>'
                }
            ]
        };

        event.waitUntil(
            self.registration.showNotification(
                pushData.title || '🙏 Shri Khedapati Sarkar Mandir',
                options
            )
        );
    }
});

// Handle notification clicks
self.addEventListener('notificationclick', function(event) {
    event.notification.close();

    if (event.action === 'join-darshan') {
        // Open the website and scroll to live darshan section
        event.waitUntil(
            clients.openWindow('/#live-darshan')
        );
    } else if (event.action === 'dismiss') {
        // Just close the notification
        return;
    } else {
        // Default action - open the website
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Handle message from main thread
self.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Periodic background sync for temple timings
self.addEventListener('periodicsync', function(event) {
    if (event.tag === 'temple-timings-sync') {
        event.waitUntil(
            syncTempleTimings()
        );
    }
});

function syncTempleTimings() {
    // Sync latest temple timings and events in the background
    return fetch('/api/temple-timings')
        .then(response => response.json())
        .then(data => {
            // Update cached temple information
            return caches.open(CACHE_NAME).then(cache => {
                cache.put('/api/temple-timings', new Response(JSON.stringify(data)));
            });
        })
        .catch(error => {
            console.log('Failed to sync temple timings:', error);
        });
}