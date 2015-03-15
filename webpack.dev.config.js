var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var getWebpackConfig = require('./webpack.config.js');

var devConfig = _.assign(getWebpackConfig(), {
    devtool: 'eval',

    output: {
        path: path.join(__dirname, '/app/'),

        // Specify complete path to force
        // chrome/FF load the images
        publicPath: 'http://localhost:3000/app/',
        filename: '[name].js'
    }
});

_.keysIn(devConfig.entry).forEach(function(key) {
    var currentValue = devConfig.entry[key];

    devConfig.entry[key] = currentValue.concat(
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server'
    );
});

devConfig.module.loaders.forEach(function(loaderDef) {
    if (loaderDef.test.toString().indexOf('.js') > 0) {
        loaderDef.loader = 'react-hot!' + loaderDef.loader;
    }
});

devConfig.plugins = devConfig.plugins.concat(
    new webpack.DefinePlugin({
        DEBUG: true
    }),
    new webpack.NoErrorsPlugin()
);

module.exports = devConfig;