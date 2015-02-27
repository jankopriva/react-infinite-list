var path = require('path');
var webpack = require('webpack');

module.exports = function getWebpackConfig() {
    return {
        entry: {
            app: ['./app/app']
        },

        output: {},

        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'react-hot!babel-loader',
                    exclude: /node_modules/
                },

                {
                    test: /\.jsx$/,
                    loader: 'react-hot!babel-loader!jsx?harmony',
                    exclude: /node_modules/
                },

                {
                    test: /\.styl$/,
                    loader: 'style!css?sourceMap!autoprefixer!stylus'
                },

                {
                    test: /\.css$/,
                    loader: 'style!css?sourceMap!autoprefixer'
                },

                {
                    test: /\.png$/,
                    loader: 'url-loader?limit=100000&mimetype=image/png'
                },

                {
                    test: /\.jpg$/,
                    loader: 'file-loader'
                }
            ]
        },

        resolve: {
            // Allow to omit extensions when requiring these files
            extensions: ['', '.js', '.jsx', '.styl'],
            modulesDirectories: ['node_modules', 'bower_components'],

            alias: {
                react: path.join(__dirname, 'node_modules/react/')
            }
        },

        plugins: [
            new webpack.ProvidePlugin({
                React: "react"
            })
        ]
    }
};