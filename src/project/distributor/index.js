/* eslint-disable */
import Vue from 'vue';
import VueRouter from 'vue-router';
import {
    loadCSSByArray,
    allPolyFill
} from '@/utils';
import routeConfig from './routeConfig';
import App from './app.vue';
import {Toast} from 'vant';

allPolyFill();
Vue.use(Toast);
loadCSSByArray([
    ...(window.__cssList || []),
]).finally(() => {
    Vue.use(VueRouter);
    App.router = new VueRouter(routeConfig);
    const app = new Vue(App).$mount('#app');
});