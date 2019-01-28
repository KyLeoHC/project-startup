// https://github.com/michael-ciniawsky/postcss-load-config
const config = require('./build/config');

module.exports = {
    plugins: [
        // to edit target browsers: use "browserlist" field in package1.json
        require('./build/plugins/flexible')(),
        require('autoprefixer'),
        require('postcss-url')({
            url(asset) {
                return process.env.NODE_ENV === 'development' ? asset.url : `${config.cdnPrefix}${asset.url}`;
            }
        })
    ]
};
