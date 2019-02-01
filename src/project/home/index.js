/* eslint-disable */
import Vue from 'vue';
import VueConfig from 'vue-router';
import {
  loadCSSByArray,
  allPolyFill
} from '@/utils';
import globalRouterConfig from '@/common/globalRouterConfig';
import routeConfig from './routeConfig';
import App from './app.vue';

allPolyFill();
loadCSSByArray([
  ...(window.__cssList || []),
]).finally(() => {
  Vue.use(VueConfig);
  App.router = globalRouterConfig(new VueConfig(routeConfig));
  const app = new Vue(App).$mount('#app');
});
