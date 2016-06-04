var path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    merge = require('webpack-merge'),
    validate = require('webpack-validator');

var parts = require('./lib/parts');

var PATHS = {
    app: path.join(__dirname, 'app'),
    style: [
        path.join(__dirname, 'node_modules', 'purecss'),
        path.join(__dirname, 'app', 'main.css'),
    ],
    build: path.join(__dirname, 'build')
};

var config = {};

var common = {
    entry: {
        style: PATHS.style,
        app: PATHS.app
    },
    output: {
        path: PATHS.build,
        publicPath: '/webpack-exercise/',
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({ title: 'webpack demo' })
    ]
};

switch (process.env.npm_lifecycle_event) {
    case 'build':
    case 'stats':
        config = merge(common, 
            { 
                devtool: 'source-map', 
                output: {
                    path: PATHS.build,
                    filename: '[name].[hash].js',
                    chunkFilename: '[hash].js'
                }
            },
            parts.clean(PATHS.build),
            parts.setFreeVariable('process.env.NODE_ENV', 'production'),
            parts.extractBundle({ name: 'vendor', entries: ['react'] }),
            parts.minify(),
            parts.extractCSS(PATHS.style),
            parts.purifyCSS([ PATHS.app ])
        );
        break;
    default:
        config = merge(common, 
            { devtool: 'eval-source-map' },
            parts.extractCSS(PATHS.app),
            parts.devServer({
                host: process.env.HOST,
                port: process.env.PORT
            })
        );
}

module.exports = validate(config);
