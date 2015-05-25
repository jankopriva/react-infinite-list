var webpackTestConfig = require('./webpack.test.config.js');

module.exports = function(config) {
    config.set({

        // frameworks to use
        frameworks: ['mocha', 'chai'],

        // list of files / patterns to load in the browser
        files: [
            'karma.tests.js'
        ],

        // list of preprocessors
        preprocessors: {
            'karma.tests.js': ['webpack', 'sourcemap']
        },

        webpack: webpackTestConfig,

        webpackMiddleware: {
            stats: {
                colors: true
            },

            // Don't spam the console when running in karma!
            noInfo: true
        },

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['mocha'],

        // full (default)  all output is printed to the console
        // autowatch       first run will have the full output and the next runs just output the summary and errors in mocha style
        // minimal         only the summary and errors are printed to the console in mocha style
        // noFailures      the failure details are not logged
        mochaReporter: {
            output: 'autowatch'
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        browsers: ['Chrome'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        // List plugins explicitly, since autoloading karma-webpack
        // won't work here
        plugins: [
            require('karma-webpack'),
            require('karma-mocha'),
            require('karma-mocha-reporter'),
            require('karma-chrome-launcher'),
            require('karma-chai'),
            require('karma-sourcemap-loader')
        ]
    });
};