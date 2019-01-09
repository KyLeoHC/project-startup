import {pathPrefix} from '@/common/env';

export default {
    mode: 'history',
    routes: [
        {
            name: 'default',
            path: `/`,
            component: () => import(/* webpackChunkName: "distributor/home" */ './views/home')
        },
        {
            name: 'home',
            path: `${pathPrefix}/distributor/home`,
            component: () => import(/* webpackChunkName: "distributor/home" */ './views/home')
        }
    ]
};
