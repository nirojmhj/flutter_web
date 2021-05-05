'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "f24ab8805fed2bc31689de0fa6f22ebb",
"index.html": "43e03162a0a8f1f45d657abe286c5935",
"/": "43e03162a0a8f1f45d657abe286c5935",
"main.dart.js": "0541f35cd0264bfc33223624f33e2b5d",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "d7eaf50c18bbafd907df19786bd611a8",
"assets/images/create_chapter.png": "ef9e7d5cdcd36a1505cca5be322dd7af",
"assets/images/exam_builder.png": "7d19a1aa78dd518b22ea135436b71280",
"assets/images/alarm_icon.png": "9234e664115253c641912722d348a072",
"assets/images/flash.png": "6a6b9a61b89b67cc5d4c27f98a0f9489",
"assets/images/progress.png": "510bf7fa12d183983220d777f29247d2",
"assets/images/login.png": "f09ddc537788d14d77256b7b113e4eee",
"assets/images/chapter_icon.png": "78386769d91d8834d6b694b70603daba",
"assets/images/reminder.png": "61be10b77bc83c7f7168d07bc200a1aa",
"assets/images/connect_with_facebook.png": "63f3872bacf942396bef01e3127dbfed",
"assets/images/create_question.png": "0b11f1bb8894810477b1156e397653a2",
"assets/images/unfavorite.png": "333160c4c76d507ca37d08ff9c0b131e",
"assets/images/logout.png": "7e836e83f148c46c0a8faf640c63dd02",
"assets/images/home.png": "a43c0f0b2844717f6f92ea5151d3e35b",
"assets/images/questions.png": "c6affd42ce09409111ef9b1d0f54fd74",
"assets/images/progress_icon.png": "5d28e9af18cf16821fc8b68956edd2a1",
"assets/images/about_us.png": "e3bab4ba122a03de05b18ccbefcb8a6c",
"assets/images/chapter_placeholder.png": "ea3f56a8ecbcd4427431570ad51e12f9",
"assets/images/splash.png": "67f8594878f7030b76ad2a556a44a7d4",
"assets/images/right_arrow_icon.png": "eb18216d79813199ee8a44376a0a9e52",
"assets/images/three_dots.png": "418b5312e2bf68f39a938035910add3a",
"assets/images/eguruba.png": "01d3a4762a65cb675f2d0acfed5003b6",
"assets/images/restore.png": "1eb18bfdad5b37d26a3703cf0517865f",
"assets/images/profile.png": "7280e773fba7a3785a3727635956ab70",
"assets/images/connect_with_google.png": "33c3a785be2c569ab134e01cd2f2a9bf",
"assets/images/faq.png": "99c1a4849d4b9496cfdf255b05be18d4",
"assets/images/launcher_icon.png": "778bf041fada99186b7d11563b754621",
"assets/images/google.png": "d6944c37b84fc595b4ee5cff4b4e4fb4",
"assets/images/plus_icon.png": "847d2c65cb63086b25af1790eb6d4e3a",
"assets/images/close_icon.png": "0f2e2fc31b1d59e7baa7dffcfbc839a5",
"assets/images/wave_top.png": "7bd8c7c28418a75f765214f1bbd87893",
"assets/images/wave_bottom.png": "0b904b4d047a83124233677fe122f9c7",
"assets/images/play.png": "a5f4703d733a5c773e22396fac7506bf",
"assets/images/favorite.png": "d3f522e21e40a9fd2612cc2f2e43ef93",
"assets/images/close.png": "08202123ea7645f0dde35ca291cce0a4",
"assets/AssetManifest.json": "573f399d93dbe655d458dc4c99972538",
"assets/NOTICES": "0bccaa083d79b5dbc705bc90671fd174",
"assets/FontManifest.json": "40e0c4c80618e62bc8a34e739d374ba4",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/packages/fluttertoast/assets/toastify.js": "e7006a0a033d834ef9414d48db3be6fc",
"assets/packages/fluttertoast/assets/toastify.css": "a85675050054f179444bc5ad70ffc635",
"assets/packages/progress_dialog/assets/double_ring_loading_io.gif": "e5b006904226dc824fdb6b8027f7d930",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/assets/bc_font.ttf": "fbe20f6c42a52efdca315763a8cee03b"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
