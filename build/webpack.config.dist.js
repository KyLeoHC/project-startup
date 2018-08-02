const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const config = require('./config');

baseConfig.output = {
    path: path.resolve(__dirname, '../' + config.outputDirectory),
    publicPath: config.publicPathMap[process.env.BUILD_ENV],
    filename: '[name]/bundle.[chunkhash].js',
    chunkFilename: '[name]/chunk.[chunkhash].js'
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
                test: /[\\/]node_modules[\\/]/
            },
            common: {
                name: 'common',
                chunks: 'all',
                test: /[\\/]src[\\/]common[\\/]/
            }
        }
    }
};

baseConfig.plugins = baseConfig.plugins.concat([
    new webpack.DefinePlugin({
        // 'process.env': {
        //     NODE_ENV: JSON.stringify('production')
        // },
        'build.env': {
            NODE_ENV: JSON.stringify(process.env.BUILD_ENV)
        }
    }),
    new UglifyJsPlugin({
        parallel: 4,
        uglifyOptions: {
            output: {
                comments: false,
                beautify: false
            }
        }
    }),
    new OptimizeCSSAssetsPlugin({}),
    new webpack.HashedModuleIdsPlugin()
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
baseConfig.plugins.push(new InlineSourceWebpackPlugin({
    compress: true,
    rootpath: './src'
}));

// baseConfig.devtool = 'source-map';
baseConfig.mode = 'production';

if (process.env.BUILD_ENV === 'production') {
    baseConfig.plugins.push(new CopyWebpackPlugin([
        {
            from: path.resolve(__dirname, '../static'),
            to: 'static',
            ignore: ['.*']
        }
    ]));
}

module.exports = baseConfig;