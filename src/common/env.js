let baseUrl = '';
let swPath = '';
let staticPath = '';

switch (process.env.NODE_ENV) {
    case 'dev':
        baseUrl = '//dev.host.com/proxy/';
        swPath = '/dev/';
        staticPath = '/static';
        break;
    case 'test':
        baseUrl = '//test.host.com/proxy/';
        swPath = '/dist/';
        staticPath = '/dist/static';
        break;
    case 'prev':
        baseUrl = '//prev.host.com/proxy/';
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
    staticPath
};
