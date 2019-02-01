/*
 service worker
 */
const cacheName = 'static-cache-v1';
const cacheWhitelist = [];
const disableProxyList = [];
const useCorsList = [
  /at\.alicdn\.com/
];
const precacheList = [];
const cacheList = [];

self.addEventListener('install', function (event) {
  console.log('sw installing');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        // 非重要资源的预加载，即使有资源加载失败也不影响Service Worker安装
        // 注意，这里sw加载完后不会自动缓存下来，走的是http缓存
        // 后续页面需要目标资源的时候sw依然会去请求，只不过浏览器返回缓存副本(from disk)，然后我们再使用cache.put缓存起来
        cache.addAll(precacheList);
        // 重要资源的预加载，资源全部请求成功，Service Worker安装事件才顺利完成，可以进入激活事件
        return cache.addAll(cacheList);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', function (event) {
  console.log('sw now ready');
  event.waitUntil(
    Promise.all([
      // 更新客户端
      self.clients.claim(),
      // 清理旧版本
      caches.keys().then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (cacheName) {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});

self.addEventListener('fetch', function (event) {
  // 常规情况下post请求是无法被sw缓存的
  // 仅仅代理get请求，以及不在disableProxyList名单中的请求
  event.request.method.toLowerCase() === 'get' &&
    !isDisableProxy(event.request) &&
    event.respondWith(
      caches.match(event.request)
        .then(function (response) {
          if (response) {
            return response;
          }

          // 如果 service worker 没有命中缓存
          // 那就得直接请求远程服务器上的资源
          // 启用cors模式允许代理跨域get请求(不采用跨域请求的话，拿到的response类型是opaque，无法判断请求是否成功，但是依然可以缓存数据，存在缓存失败数据的风险)
          return getFetch(event.request)
            .then(function (httpResponse) {
              // 获取到新请求响应数据
              if (httpResponse && httpResponse.status === 200) {
                // 当且仅当有数据返回和状态码为200时才缓存response
                // 不缓存304、404、500等其它所有状态的缓存
                const responseClone = httpResponse.clone();
                caches.open(cacheName)
                  .then(function (cache) {
                    cache.put(event.request, responseClone);
                  });
              }

              return httpResponse;
            });
        })
    );
});

function getFetch(request) {
  // fetch加载资源跨域资源，如果设置mode为cors，目标服务器必须设置Access-Control-Allow-Origin响应头才能正常加载到资源
  // 如果没有该跨域响应头，并且不是跨域情况下，请不要设置cors的mode(改用no-cors)
  const useCors = useCorsList.some(host => host.test(request.url));
  if (useCors) {
    return fetch(request.url, { mode: 'cors' });
    // return fetch(applyCacheBust(request.url), {mode: 'cors'});
  } else {
    return fetch(request.clone());
  }
}

/**
 * 判断当前请求是否在禁止代理的名单内
 * @param obj
 * @returns {boolean}
 */
function isDisableProxy(obj) {
  return obj ? disableProxyList.some(item => item.test(obj.url)) : false;
}

// /**
//  * 在使用service worker的情况下，不走常规http缓存
//  * 常规http缓存(尤其是CDN上的)，有时候会返回304状态，这可能会导致我们缓存了错误的结果
//  * 加上时间戳强制不缓存，由我们通过service worker自行缓存
//  * @param assetURL
//  * @returns {string}
//  */
// function applyCacheBust(assetURL) {
//     const hasQuery = assetURL.indexOf('?') !== -1;
//     return assetURL + (hasQuery ? '&' : '?') + new Date().getTime();
// }
