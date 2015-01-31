var _ = require('lodash');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

var buildConfig = _.assign({}, webpackConfig);

buildConfig.plugins = buildConfig.plugins.concat(
    new webpack.DefinePlugin({
        'process.env': {
            // This has effect on the react lib size
            'NODE_ENV': JSON.stringify('production')
        }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
);

module.exports = buildConfig;