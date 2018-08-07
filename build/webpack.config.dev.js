const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineSourceWebpackPlugin = require('inline-source-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const config = require('./config');

baseConfig.output = {
    path: path.resolve(__dirname, './'),
    publicPath: config.publicPathMap[process.env.BUILD_ENV],
    filename: '[name].js'
};

Object.keys(baseConfig.entry).forEach(name => {
    baseConfig.plugins.push(
        new HtmlWebpackPlugin({
            filename: `${name}/index.html`,
            template: `./src/project/${name}/index.html`,
            chunks: [name]
        })
    );
});

baseConfig.plugins.push(new CopyWebpackPlugin([
    {
        from: path.resolve(__dirname, '../src/lib/js/sw.js'),
        to: './',
        ignore: ['.*']
    }
]));
baseConfig.plugins.push(new InlineSourceWebpackPlugin({
    rootpath: './src'
}));
baseConfig.plugins.push(new webpack.NamedModulesPlugin());
baseConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
baseConfig.plugins.push(new webpack.DefinePlugin({
    // 'process.env': {
    //     NODE_ENV: JSON.stringify('development'),
    // },
    'build.env': {
        NODE_ENV: JSON.stringify(process.env.BUILD_ENV)
    }
}));

baseConfig.devServer = {
    hot: true,
    inline: true,
    // open: true,
    contentBase: './',
    host: '0.0.0.0',
    port: '8087',
    stats: {
        children: false
    },
    proxy: {}
};

baseConfig.mode = 'development';
baseConfig.devtool = 'cheap-module-eval-source-map';

module.exports = baseConfig;