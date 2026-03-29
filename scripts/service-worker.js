// Должно быть true в production
var doCache = true;

var CACHE_NAME = 'my-pwa-cache-v4';

self.addEventListener('activate', event => {
   const cacheWhitelist = [CACHE_NAME];
   event.waitUntil(
       caches.keys()
           .then(keyList =>
               Promise.all(keyList.map(key => {
                   if (!cacheWhitelist.includes(key)) {
                       return caches.delete(key);
                   }
               }))
           )
   );
});

var CDN_ASSETS = [
    'https://unpkg.com/vue@2/dist/vue.js',
    'https://unpkg.com/element-ui@2.15.14/lib/index.js',
    'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
    'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js',
    'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js',
    'https://fonts.googleapis.com/css2?family=Exo+2&display=swap',
];

self.addEventListener('install', function(event) {
   if (!doCache) return;
   event.waitUntil(
       caches.open(CACHE_NAME)
           .then(function(cache) {
               var urlsToCache = [
                    '../index.html',
                    '../manifest.json',
                    '../images/favico.png',
                    '../images/favicoSmall.png',
                    '../styles/include.css',
                    '../styles/buttons.css',
                    '../styles/menu.css',
                    '../styles/oi.css',
                    '../styles/style.css',
                    '../styles/cableSection.css',
                    '../forms/meterCheck.html',
                    '../forms/errorDecoding.html',
                    '../forms/modelDecoding.html',
                    '../forms/cableSection.html',
                    'menu.js',
                    'meterCheckScript.js',
                    'errorDecodingScript.js',
                    'modelDecodingScript.js',
                    'cableSection.js',
                ].concat(CDN_ASSETS);
               return cache.addAll(urlsToCache);
           })
           .catch(function(err) {
               console.log('Cache install failed', err);
           })
   );
});

self.addEventListener('fetch', function(event) {
   if (!doCache) return;
   event.respondWith(
       caches.match(event.request).then(function(response) {
           return response || fetch(event.request);
       })
   );
});
