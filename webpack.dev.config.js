var _ = require('lodash');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

var devConfig = _.assign({}, webpackConfig, {
    devtool: 'eval'
});

_.keysIn(devConfig.entry).forEach(function(key, index) {
    var currentValue = devConfig.entry[key];

    devConfig.entry[key] = currentValue.concat(
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server'
    );
});

devConfig.plugins = devConfig.plugins.concat(
    new webpack.DefinePlugin({
        DEBUG: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
);

module.exports = devConfig;