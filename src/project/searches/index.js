import Vue from 'vue';
import promise from 'es6-promise';
import myPolyFill from '@/utils/myPolyFill';
import App from './app.vue';

promise.polyfill();
myPolyFill();

/* eslint-disable */
const app = new Vue(App).$mount('#app');