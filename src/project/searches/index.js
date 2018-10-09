/* eslint-disable */
import Vue from 'vue';
import myPolyFill from '@/utils/myPolyFill';
import App from './app.vue';
// import initServiceWorker from '@/common/initServiceWorker';

myPolyFill();

// initServiceWorker();

// change 'new Vue(App).$mount('#app');'
// To solve hot reload error 'TypeError: Cannot read property 'extend' of undefined'
const app = new Vue({
    render: h => h(App),
}).$mount('#app');