var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var del = require('del');

var paths = {
    js: ['./src/*.js']
};

gulp.task('clean', function(done) {
    del(['dist'], done);
});

gulp.task('dist', function() {
    browserify('./src/infinite_list.js', {standalone: 'InfiniteList'})
        .external('react')
        .transform(reactify)
        .bundle()
        .pipe(source('infinite_list.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('bundle', function() {
    browserify('./src/infinite_list.js')
        .require('./src/infinite_list.js', {expose: 'react-infinite-list'})
        .require('react')
        .transform(reactify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['bundle', 'dist'], function() {
    gulp.watch(paths.js, ['bundle', 'dist']);
});

gulp.task('default', ['clean', 'dist', 'bundle']);
