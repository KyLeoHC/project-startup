const path = require('path');
const config = require('./config');

const baseConfig = {
    entry: './src/lib/js/sw.js',
    output: {
        path: path.resolve(__dirname, '../' + config.outputDirectory),
        filename: 'sw.js'
    },
    mode: process.env.BUILD_ENV === 'dev' ? 'development' : 'production'
};

module.exports = baseConfig;