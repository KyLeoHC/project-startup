/* eslint-disable */
import Vue from 'vue';
import VueConfig from 'vue-router';
import myPolyFill from '@/utils/myPolyFill';
import globalRouterConfig from '@/common/globalRouterConfig';
import routeConfig from './routeConfig';
import App from './app.vue';

myPolyFill();

Vue.use(VueConfig);
App.router = globalRouterConfig(new VueConfig(routeConfig));

const app = new Vue(App).$mount('#app');