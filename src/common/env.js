let baseUrl = '';
let swPath = '';
let staticPath = '';
let publicPath = process.env.PUBLIC_PATH || '';

switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = '//dev.host.com/proxy/';
    swPath = '/dev/';
    staticPath = '/static';
    break;
  case 'test':
    baseUrl = '//test.host.com/proxy/';
    swPath = '/dist/';
    staticPath = '/dist/static';
    break;
  case 'pre-production':
    baseUrl = '//pre.host.com/proxy/';
    swPath = '/dist/';
    staticPath = '/dist/static';
    break;
  case 'production':
    baseUrl = '//production.host.com/proxy/';
    swPath = '/dist/';
    staticPath = '/dist/static';
    break;
}

export {
  baseUrl,
  swPath,
  staticPath,
  publicPath
};
