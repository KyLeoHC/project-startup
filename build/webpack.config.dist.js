const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const config = require('./config');
const swConfig = require('./webpack.config.sw');
const baseConfig = require('./webpack.config.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const InlineSourceWebpackPlugin = require('inline-source-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const OmitCSSWebpackPlugin = require('./plugins/omit-css-webpack-plugin');
// 由于最新版的webpack-cli自己也取值了命令行入参，所以我们的参数也会被webpack-cli拿去处理
// 从而引起entry赋值异常的bug
// const commandOptions = require('./getCommandOptions')();

glob.sync('./src/project/*').map(function (src) {
    const name = path.basename(src);
    baseConfig.entry[name] = `./src/project/${name}/index.js`;
});

baseConfig.output = {
    path: path.resolve(__dirname, '../' + config.outputDirectory),
    publicPath: config.publicPathMap[process.env.BUILD_ENV],
    filename: '[name]/bundle.[contenthash].js',
    chunkFilename: '[name]/chunk.[contenthash].js'
};

baseConfig.optimization = {
    namedChunks: true,
    runtimeChunk: 'single',
    splitChunks: {
        name: true,
        chunks: 'initial', // 此处本来用all是最优解，但是由于webpack对异步文件公共模块生成的目录路径比较诡异，暂时不用all
        cacheGroups: {
            vendor: {
                name: 'vendor',
                chunks: 'all',
                enforce: true,
                test: /[\\/]node_modules[\\/]/
            },
            common: {
                name: 'common',
                chunks: 'all',
                enforce: true, // 如果不设置这个enforce值，webpack内部会有个自动优化机制，模块数量达到一定数量时，当前配置会被webpack自动调整，生成的chunk会有所不一样
                test: /[\\/]src[\\/]common[\\/]/
            }
        }
    },
    minimizer: [
        new UglifyJsPlugin({
            uglifyOptions: {
                output: {
                    comments: false,
                    beautify: false
                }
            }
        })
    ]
};

baseConfig.plugins = baseConfig.plugins.concat([
    new OptimizeCSSAssetsPlugin({}),
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
        filename: '[name]/bundle.[contenthash].css',
        chunkFilename: '[name]/chunk.[contenthash].css'
    })
]);

Object.keys(baseConfig.entry).forEach(name => {
    baseConfig.plugins.push(
        new HtmlWebpackPlugin({
            filename: `${name}/index.html`,
            template: `./src/project/${name}/index.html`,
            chunksSortMode: 'dependency',
            chunks: ['runtime', 'vendor', 'common', name],
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            }
        })
    );
});
baseConfig.plugins.push(new OmitCSSWebpackPlugin());
baseConfig.plugins.push(new InlineSourceWebpackPlugin({
    compress: true,
    rootpath: './'
}));

// baseConfig.devtool = 'source-map';
baseConfig.mode = 'production';

if (process.env.BUILD_ENV === 'production') {
    baseConfig.plugins.push(new CopyWebpackPlugin([{
        from: path.resolve(__dirname, '../static'),
        to: 'static',
        ignore: ['.*']
    }]));
}

module.exports = [baseConfig, swConfig];
