//service worker安装成功后开始缓存所需的资源
var CACHE_PREFIX = 'cms-sw-cache';
var CACHE_VERSION = '0.0.21';
var CACHE_NAME = CACHE_PREFIX + '-' + CACHE_VERSION;
var allAssets = [
    './index.html',
    // './error', // 404失败的请求
    'main.js',
    // 'main.css'
];

/* 注册fetch事件，拦截全站的请求 */
/**
 * 当捕获到页面请求后，首先使用caches.match在本地缓存中进行检索匹配，如果匹配成功，则返回缓存内容，否则发起新的网络请求
 * 接收到请求后，依次判断响应是否有效、状态码是否为200、是否是自身发起的请求。如果符合，就将其放入对应的缓存中，以便二次请求能够快速响应
 */
this.addEventListener('fetch', function (event) {
    console.log(8)
    event.respondWith(
        /* 在缓存中匹配对应请求资源直接返回 */
        caches.match(event.request)
            .then(function (response) {
                // 如果匹配到已有的缓存内容，就直接返回缓存内容
                if (response) {
                    return response;
                }
                // 未匹配到就重新发起请求
                // return fetch(event.request);
                const fetchRequest = event.request.clone();
                return fetch(fetchRequest).then(response => {
                    // 
                    console.log(response)
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response
                    }
                    // 请求成功返回，先将其放入缓存 
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseToCache)
                        })
                    return response
                });
            })
    );
});


this.addEventListener('install', function (event) {
    //调试时跳过等待过程
    console.log('install event3')
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('[SW]: Opened cache3');
                return cache.addAll(allAssets);
            })
    );

});
this.addEventListener('activate', function (event) {
    console.log('activate event 激活了1')
});