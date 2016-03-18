var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var getWebpackConfig = require('./webpack.config.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var uglifyOptions = {
    mangle: true,
    compress: {
        sequences: true,
        'dead_code': true,
        'drop_debugger': true,
        conditionals: true,
        booleans: true,
        unused: true,
        'if_return': true,
        'join_vars': true,
        warnings: false
    }
};

var plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            // This has effect on the react lib size
            'NODE_ENV': JSON.stringify('production')
        }
    }),

    new webpack.optimize.DedupePlugin(),
];

var filename = 'react-infinite-list';

if (process.env.NODE_ENV === 'production') {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    );

    filename = filename + '.min';
}

var buildConfig = _.assign(getWebpackConfig(), {
    entry: {
        lib: './src/InfiniteList'
    },

    output: {
        path: path.join(__dirname, '/dist/'),
        filename: filename + '.js',
        library: 'react-infinite-list',
        libraryTarget: 'umd'
    },

    externals: [{
        'react-dom': {
            root: 'ReactDOM',
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom'
        },
        'react': {
            root: 'React',
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react'
        }
    }]
});

buildConfig.plugins = buildConfig.plugins.concat(plugins);

module.exports = buildConfig;
