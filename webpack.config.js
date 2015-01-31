var path = require('path');
var webpack = require('webpack');

module.exports = {
    cache: true,

    entry: {
        app: [
            './app/app.js'
        ]
    },

    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: "dist/",
        filename: "[name].js",
        chunkFilename: "[chunkhash].js"
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'es6'
            },

            {
                test: /\.jsx$/,
                loader: 'es6!jsx?insertPragma=React.DOM&harmony'
            },

            {
                test: /\.styl$/,
                loader: 'style!css!stylus'
            },

            {
                test: /\.css$/,
                loader: 'style!css?sourceMap'
            },

            {
                test: /\.png$/,
                loader: 'url-loader?limit=100000&mimetype=image/png'
            },

            {
                test: /\.jpg$/,
                loader: 'file-loader'
            }
        ]
    },

    resolve: {
        // Allow to omit extensions when requiring these files
        extensions: ['', '.js', '.jsx', '.styl'],
        modulesDirectories: ['node_modules', 'bower_components']
    },

    plugins: [],

    // webpack-dev-server options
    contentBase: 'http://localhost/app',

    quiet: false,
    noInfo: false,
    lazy: true,
    watchDelay: 300,
    publicPath: 'app/',
    stats: {
        colors: true
    }
};