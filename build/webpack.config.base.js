const path = require('path');
const webpack = require('webpack');
// const StyleLintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const devMode = process.env.BUILD_ENV === 'development';

process.env.NODE_ENV = devMode ? 'development' : 'production';

const config = {
    entry: {},
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '../src'),
            'styles': path.resolve(__dirname, '../src/styles')
        }
    },
    resolveLoader: {
        modules: [
            path.resolve(__dirname, '../build/rules'),
            'node_modules'
        ]
    },
    module: {
        noParse: /es6-promise\.js$/,
        rules: [
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [path.resolve(__dirname, '../src')],
                exclude: [/node_modules/],
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.styl/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {}
                    },
                    {
                        loader: 'stylus-loader'
                    }
                ]
            },
            {
                test: /\.css/,
                include: /node_modules/,
                use: [
                    {
                        loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                BUILD_ENV: JSON.stringify(process.env.BUILD_ENV)
            }
        })
        // new StyleLintPlugin({
        //     files: ['**/*.{vue,css,sss,less,scss,sass,styl}']
        // })
    ],
    stats: {
        children: false,
        chunkModules: false,
        entrypoints: false,
        modules: false
    }
};

module.exports = config;
