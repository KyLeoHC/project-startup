const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.base');

baseConfig.output = {
    path: path.resolve(__dirname, './'),
    publicPath: '/',
    filename: '[name].js'
};

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
    proxy: {
    }
};
baseConfig.devtool = 'cheap-module-eval-source-map';

Object.keys(baseConfig.entry).forEach(name => {
    baseConfig.plugins.push(
        new HtmlWebpackPlugin({
            filename: `${name}/index.html`,
            template: `./src/project/${name}/index.html`,
            chunks: [name]
        })
    );
});
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

baseConfig.mode = 'development';

module.exports = baseConfig;