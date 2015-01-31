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
            // required to write "require('./style.css')"
            { test: /\.css$/,    loader: "style-loader!css-loader" },

            // required for react jsx
            { test: /\.js$/,    loader: "es6" },
            { test: /\.jsx$/,   loader: "es6!jsx?insertPragma=React.DOM&harmony" },
        ]
    },

    resolve: {
        // Allow to omit extensions when requiring these files
        extensions: ['', '.js', '.jsx']
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