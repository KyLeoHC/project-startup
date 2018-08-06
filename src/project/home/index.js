import Vue from 'vue';
import VueConfig from 'vue-router';
import promise from 'es6-promise';
import myPolyFill from '@/utils/myPolyFill';
import globalRouterConfig from '@/common/globalRouterConfig';
import routeConfig from './routeConfig';
import App from './app.vue';

promise.polyfill();
myPolyFill();

/* eslint-disable */
Vue.use(VueConfig);
App.router = globalRouterConfig(new VueConfig(routeConfig));

const app = new Vue(App).$mount('#app');