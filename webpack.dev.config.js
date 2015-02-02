var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var getWebpackConfig = require('./webpack.config.js');

var devConfig = _.assign(getWebpackConfig(), {
    devtool: 'eval',

    output: {
        path: path.join(__dirname, '/app/'),
        publicPath: '/app/',
        filename: '[name].js',
        chunkFilename: '[chunkhash].js'
    }
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