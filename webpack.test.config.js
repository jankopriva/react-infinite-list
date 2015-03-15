var _ = require('lodash');
var getWebpackConfig = require('./webpack.config.js');

var testsConfig = _.assign(getWebpackConfig(), {
    devtool: 'inline-source-map'
});

delete testsConfig.entry;
delete testsConfig.output;

module.exports = testsConfig;