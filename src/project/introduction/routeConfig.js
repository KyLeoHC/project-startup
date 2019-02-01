import { publicPath } from '@/common/env';
import detail from './views/detail';

const project = 'introduction';
const getPath = path => `${publicPath}${project}${path || '/'}`;

export default {
  mode: 'history',
  routes: [
    {
      name: 'default',
      path: getPath(),
      component: detail
    },
    {
      name: 'detail',
      path: getPath('/detail'),
      component: detail
    }
  ]
};
