const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineSourceWebpackPlugin = require('inline-source-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const config = require('./config');
// const commandOptions = require('./getCommandOptions')();

// if (commandOptions.project) {
//     baseConfig.entry[name] = `./src/project/${commandOptions.project}/index.js`;
// } else {
//     glob.sync('./src/project/*').map(function (src) {
//         const name = path.basename(src);
//         baseConfig.entry[name] = `./src/project/${name}/index.js`;
//     });
// }

glob.sync('./src/project/*').map(function (src) {
    const name = path.basename(src);
    baseConfig.entry[name] = `./src/project/${name}/index.js`;
});

baseConfig.output = {
    path: path.resolve(__dirname, './'),
    publicPath: config.publicPathMap[process.env.BUILD_ENV],
    chunkFilename: '[name]/chunk.js',
    filename: '[name]/bundle.js'
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

baseConfig.devServer = {
    hot: true,
    inline: true,
    // open: true,
    contentBase: './',
    host: '0.0.0.0',
    port: '8089',
    stats: {
        children: false
    },
    proxy: {},
    historyApiFallback: {
        rewrites: [
            {
                from: /^\/dev\/.*$/,
                to(context) {
                    return context.parsedUrl.pathname.replace(/^\/dev\/([a-zA-Z]+)\/.*$/, `/dev/$1/index.html`);
                }
            }
        ]
    }
};

baseConfig.mode = 'development';
baseConfig.devtool = 'cheap-module-eval-source-map';

module.exports = baseConfig;
