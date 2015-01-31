var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var WebpackDevServer = require('webpack-dev-server');

gulp.task('webpack:build', function(callback) {
    var buildConfig = Object.create(webpackConfig);

    buildConfig.plugins = buildConfig.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );

    // run webpack
    webpack(buildConfig, function(err, stats) {
        if (err) throw new gutil.PluginError('webpack:build', err);

        gutil.log('[webpack:build]', stats.toString({
            colors: true
        }));

        callback();
    });
});

gulp.task('webpack-dev-server', function(callback) {
    var devConfig = Object.create(webpackConfig);

    devConfig.devtool = "eval";
    devConfig.debug = true;
    devConfig.entry.app.concat(
        'webpack-dev-server/client?http://localhost:8080/',
        'webpack/hot/dev-server'
    );

    devConfig.plugins = devConfig.plugins.concat(
        new webpack.DefinePlugin({
            DEBUG: true
        }),
        new webpack.HotModuleReplacementPlugin()
    );

    new WebpackDevServer(webpack(devConfig)).listen(8080, 'localhost', function(err) {
        if(err) throw new gutil.PluginError('webpack-dev-server', err);

        // Server listening
        gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');

        // keep the server alive or continue?
        // callback();
    });
});

gulp.task('build', ['webpack:build']);
gulp.task('default', ['webpack-dev-server']);