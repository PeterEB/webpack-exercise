var webpack = require('webpack'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    PurifyCSSPlugin = require('purifycss-webpack-plugin');

var parts = {};

parts.devServer = function (opts) {
    return {
        // watchOptions: {
        //     aggregateTimeout: 300,
        //     poll: 1000
        // },
        devServer: {
            historyApiFallback: true,  // good default
            hot: true,                 // unlike CLI flag, not set the HMR plugin yet
            inline: true,              // 
            stats: 'errors-only',      // only display errors
            host: opts.host,           // defaults to 'localhost'
            port: opts.port            // defaults to 8080
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin({ multiStep: true })
        ]
    };
};

parts.setupCSS = function (paths) {
    return {
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loaders: [ 'style', 'css' ],    // execute back to front
                    include: paths
                }
            ]
        }
    };
};

parts.extractCSS = function (paths) {
    return {
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract('style', 'css'),
                    include: paths
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin('[name].[hash].css')
        ]
    };
};

parts.setFreeVariable = function (key, value) {
    var env = {};
    env[key] = JSON.stringify(value);

    return {
        plugins: [ new webpack.DefinePlugin(env) ]
    };
};

parts.minify = function () {
    return {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false }
            })
        ]
    };
};

parts.purifyCSS = function (paths) {
    return {
        plugins: [
            new PurifyCSSPlugin(
                { basePath: process.cwd(), paths: paths }
            )
        ]
    };
};

parts.clean = function (path) {
    return {
        plugins: [
            new CleanWebpackPlugin([ path ], {
                // root is used to point to our project,
                // it is mandatory
                root: process.cwd()
            })
        ]
    };
};

parts.extractBundle = function (opts) {
    var entry = {};
    entry[opts.name] = opts.entries;

    return {
        entry: entry,
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                names: [ opts.name, 'manifest' ],
                minChunks: Infinity
            })
        ]
    };
};

module.exports = parts;
