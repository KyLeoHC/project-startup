// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
    plugins: [
        // to edit target browsers: use "browserlist" field in package.json
        require('./build/plugins/flexible')(),
        require('autoprefixer')
    ]
};
