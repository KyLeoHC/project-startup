let baseUrl = '';
let swPath = '';
let staticPath = '';
let pathPrefix = '';

switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = '//dev.host.com/proxy/';
    swPath = '/dev/';
    staticPath = '/static';
    pathPrefix = '/dev';
    break;
  case 'test':
    baseUrl = '//test.host.com/proxy/';
    swPath = '/dist/';
    staticPath = '/dist/static';
    pathPrefix = '/dev';
    break;
  case 'pre-production':
    baseUrl = '//prev.host.com/proxy/';
    swPath = '/dist/';
    staticPath = '/dist/static';
    pathPrefix = '/dev';
    break;
  case 'production':
    baseUrl = '//production.host.com/proxy/';
    swPath = '/dist/';
    staticPath = '/dist/static';
    pathPrefix = '/dev';
    break;
}

export {
  baseUrl,
  swPath,
  staticPath,
  pathPrefix
};
