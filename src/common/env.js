let baseUrl = '';
let swPath = '';

switch (build.env.NODE_ENV) {
    case 'dev':
        baseUrl = '//dev.host.com/proxy/';
        swPath = '/dev/';
        break;
    case 'test':
        baseUrl = '//test.host.com/proxy/';
        swPath = '/dist/';
        break;
    case 'prev':
        baseUrl = '//prev.host.com/proxy/';
        swPath = '/dist/';
        break;
    case 'production':
        baseUrl = '//production.host.com/proxy/';
        swPath = '/dist/';
        break;
}

export {
    baseUrl,
    swPath
};
