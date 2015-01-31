var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var webpackDevConfig = require('./webpack.dev.config.js');
var webpackBuildConfig = require('./webpack.build.config.js');

gulp.task('webpack:build', function(callback) {
    webpack(webpackBuildConfig, function(err, stats) {
        if (err) throw new gutil.PluginError('[webpack:build]', err);

        gutil.log('[webpack:build]', stats.toString({
            colors: true
        }));

        callback();
    });
});

gulp.task('webpack:dev', function(callback) {
    new WebpackDevServer(webpack(webpackDevConfig), {
        publicPath: webpackDevConfig.output.publicPath,
        hot: true
    }).listen(3000, 'localhost', function(err) {
        if(err) throw new gutil.PluginError('[webpack:dev]', err);

        // Server listening
        gutil.log('[webpack:dev]', 'http://localhost:3000/');

        // keep the server alive or continue?
        // callback();
    });
});

gulp.task('build', ['webpack:build']);
gulp.task('default', ['webpack:dev']);