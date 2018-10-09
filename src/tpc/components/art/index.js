import registerTpc from '../../register';
import app from './app.vue';

registerTpc('art', app);
window.tpcLoadCallBack && window.tpcLoadCallBack();

export {
    app
};
