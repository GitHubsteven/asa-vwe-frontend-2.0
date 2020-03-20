/* eslint-disable no-undef */
const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')

let port = 10090;

module.exports = {
    entry: {
        main: './src/index.js'
        // main: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        //     './src/index.js']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    mode: 'development',
    target: 'web',
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.vue']
    },
    module: {
        rules: [
            {
                test: /\.vue?$/,
                exclude: /(node_modules)/,
                use: 'vue-loader'
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            },
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {
                    emitWarning: true,
                    failOnError: false,
                    failOnWarning: false
                },
            },
            {
                // Loads the javacript into html template provided.
                // Entry point is set below in HtmlWebPackPlugin in Plugins
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        //options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            }
            // ,
            // {
            //     test: /\.styl(us)?$/,
            //     use: [
            //         'vue-style-loader',
            //         'css-loader',
            //         'stylus-loader'
            //     ]
            // }
        ]
    },
    plugins: [new HtmlWebPackPlugin({
        template: './src/index.html'
    }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new VueLoaderPlugin()
    ],
    devServer: {
        historyApiFallback: true,
        port: port
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:' + port
        })
    }
};