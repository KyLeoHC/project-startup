/* eslint-disable */
import Vue from 'vue';
import {
  loadCSSByArray,
  allPolyFill
} from '@/utils';
import App from './app.vue';
// import initServiceWorker from '@/common/initServiceWorker';

allPolyFill();

// initServiceWorker();

// change 'new Vue(App).$mount('#app');'
// To solve hot reload error 'TypeError: Cannot read property 'extend' of undefined'
loadCSSByArray([
  ...(window.__cssList || []),
]).finally(() => {
  const app = new Vue({
    render: h => h(App),
  }).$mount('#app');
});
