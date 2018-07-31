let baseUrl = '';

switch (build.env.NODE_ENV) {
    case 'dev':
        baseUrl = '//dev.host.com/proxy/';
        break;
    case 'test':
        baseUrl = '//test.host.com/proxy/';
        break;
    case 'prev':
        baseUrl = '//prev.host.com/proxy/';
        break;
    case 'production':
        baseUrl = '//production.host.com/proxy/';
        break;
}

export {
    baseUrl
};
