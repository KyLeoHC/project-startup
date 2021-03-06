import { swPath } from './env';

let isFirst = true;

export default () => {
  // console.log('service worker init: ', navigator.serviceWorker);
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      isFirst && navigator.serviceWorker.register(`${swPath}sw.js`, { scope: swPath })
        .then(function (registration) {
          // register success
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch(function (err) {
          // register fail
          console.log('ServiceWorker registration failed: ', err);
        });
      isFirst = false;
    });
  }
};
