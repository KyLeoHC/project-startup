const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

glob.sync('./src/tpc/components/*').map(function (src) {
    const name = path.basename(src);
    baseConfig.entry[name] = `./src/tpc/components/${name}/index.js`;
});

baseConfig.output = {
    path: path.resolve(__dirname, '../dist-tpc'),
    filename: '[name]/bundle.js',
    chunkFilename: '[name]/chunk.js'
};

baseConfig.plugins = baseConfig.plugins.concat([
    new webpack.DefinePlugin({
        'build.env': {
            NODE_ENV: JSON.stringify(process.env.BUILD_ENV)
        }
    }),
    new UglifyJsPlugin({
        parallel: 4,
        uglifyOptions: {
            // compress: false,
            output: {
                comments: false,
                beautify: false
            }
        }
    }),
    new OptimizeCSSAssetsPlugin({}),
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
        filename: '[name]/bundle.css',
        chunkFilename: '[name]/chunk.css'
    })
]);

baseConfig.mode = 'production';

module.exports = baseConfig;
