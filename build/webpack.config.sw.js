const path = require('path');
const config = require('./config');

const dir = process.env.BUILD_ENV === 'dev' ? './' : ('../' + config.outputDirectory);
const baseConfig = {
    entry: './src/lib/js/sw.js',
    output: {
        path: path.resolve(__dirname, dir),
        filename: 'sw.js'
    },
    mode: process.env.BUILD_ENV === 'dev' ? 'development' : 'production'
};

module.exports = baseConfig;
