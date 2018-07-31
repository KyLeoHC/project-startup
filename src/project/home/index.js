import Vue from 'vue';
import VueConfig from 'vue-router';
import promise from 'es6-promise';
import myPolyFill from '@/utils/myPolyFill';
import routesConfig from './routeConfig';
import App from './app.vue';

promise.polyfill();
myPolyFill();

/* eslint-disable */
Vue.use(VueConfig);
App.router = new VueConfig(routesConfig);

const app = new Vue(App).$mount('#app');