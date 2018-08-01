const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const devMode = process.env.BUILD_ENV === 'dev';

const config = {
    entry: {},
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '../src'),
            'src': path.resolve(__dirname, '../src'),
            'project': path.resolve(__dirname, '../src/project'),
            'lib': path.resolve(__dirname, '../src/lib'),
            'utils': path.resolve(__dirname, '../src/utils'),
            'common': path.resolve(__dirname, '../src/common'),
            'components': path.resolve(__dirname, '../src/components'),
            'services': path.resolve(__dirname, '../src/services')
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
                exclude: ['node_modules'],
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
                        loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
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
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name]/bundle.[chunkhash].css',
            chunkFilename: devMode ? '[name].css' : '[name]/chunk.[chunkhash].css',
        })
    ],
    stats: {
        children: false,
        chunkModules: false,
        entrypoints: false,
        modules: false
    }
};

glob.sync('./src/project/*').map(function (src) {
    const name = path.basename(src);
    config.entry[name] = `./src/project/${name}/index.js`;
});

module.exports = config;