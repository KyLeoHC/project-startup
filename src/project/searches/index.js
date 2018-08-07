import Vue from 'vue';
import promise from 'es6-promise';
import myPolyFill from '@/utils/myPolyFill';
import App from './app.vue';

promise.polyfill();
myPolyFill();

/* eslint-disable */
// change 'new Vue(App).$mount('#app');'
// To solve hot reload error 'TypeError: Cannot read property 'extend' of undefined'
const app = new Vue({
    render: h => h(App),
}).$mount('#app');