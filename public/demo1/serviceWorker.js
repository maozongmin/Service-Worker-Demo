// /* 注册fetch事件，拦截全站的请求 */
// this.addEventListener('fetch', function (event) {
//     event.respondWith(
//         /* 在缓存中匹配对应请求资源直接返回 */
//         caches.match(event.request)
//             .then(function (response) {
//                 //该fetch请求已经缓存
//                 if (response) {
//                     return response;
//                 }
//                 // 未匹配到就重新发起请求
//                 return fetch(event.request);
//             })
//     );
// });

//service worker安装成功后开始缓存所需的资源
var CACHE_PREFIX = 'cms-sw-cache';
var CACHE_VERSION = '0.0.21';
var CACHE_NAME = CACHE_PREFIX + '-' + CACHE_VERSION;
var allAssets = [
    './index.html',
    // './error', // 404失败的请求
    'main.js',
    'main.css'
];
this.addEventListener('install', function (event) {
    //调试时跳过等待过程
    console.log('install event')
    // self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('[SW]: Opened cache');
                return cache.addAll(allAssets);
            })
    );

});
this.addEventListener('activate', function (event) {
    console.log('activate event 激活了')
});